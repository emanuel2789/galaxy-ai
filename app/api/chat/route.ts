import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const recentRequests = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = recentRequests.get(ip);
  if (!entry || entry.resetAt <= now) {
    recentRequests.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 8;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  const accessCode = process.env.GALAXY_ACCESS_CODE;

  if (!apiKey || !model || !accessCode) {
    return NextResponse.json({ error: "El chat todavía no está configurado. Faltan variables privadas en el servidor." }, { status: 503 });
  }

  const suppliedCode = request.headers.get("x-galaxy-access-code") || "";
  if (suppliedCode.length !== accessCode.length || suppliedCode !== accessCode) {
    return NextResponse.json({ error: "Código de acceso incorrecto. Revisa Ajustes." }, { status: 401 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Has enviado varios mensajes seguidos. Espera un minuto e inténtalo otra vez." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const message = typeof body === "object" && body !== null && "message" in body
    ? (body as { message?: unknown }).message
    : null;
  if (typeof message !== "string" || !message.trim() || message.length > 6000) {
    return NextResponse.json({ error: "Escribe un mensaje de hasta 6000 caracteres." }, { status: 400 });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        instructions: "Eres Galaxy AI, un asistente útil, claro y seguro. Responde en el idioma del usuario. No solicites contraseñas, claves API ni datos personales innecesarios.",
        input: message.trim(),
        max_output_tokens: 900
      }),
      signal: AbortSignal.timeout(45_000)
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return NextResponse.json({ error: "El proveedor de IA no pudo completar la solicitud. Revisa el modelo y el uso de la API." }, { status: upstream.status === 429 ? 429 : 502 });
    }

    const output = Array.isArray(data.output) ? data.output : [];
    const reply = output.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || [])
      .filter((part: { type?: string; text?: string }) => part.type === "output_text")
      .map((part: { text?: string }) => part.text || "")
      .join("\n").trim();

    if (!reply) return NextResponse.json({ error: "El modelo no devolvió texto. Inténtalo de nuevo." }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "No se pudo conectar con el servicio de IA. Inténtalo más tarde." }, { status: 502 });
  }
}
