import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL && process.env.GALAXY_ACCESS_CODE),
    notionConfigured: Boolean(process.env.NOTION_API_KEY)
  }, {
    headers: { "Cache-Control": "no-store" }
  });
}
