# Galaxy AI Ultimate — Fundación 0.1

Primera base de la nueva versión web + móvil (PWA preparada), construida con Next.js y TypeScript.

## Estado actual
- Interfaz adaptable a móvil y escritorio.
- Navegación inicial por módulos.
- Chat de demostración local: **no llama a ningún modelo de IA**.
- Base preparada para despliegue en Vercel.
- No requiere API key para ejecutar la demostración.

## Requisitos
- Node.js 20.9 o superior.
- npm.

## Ejecutar
```bash
npm install
npm run dev
```
Abre http://localhost:3000.

## Publicar en Vercel
1. Sube este proyecto a un repositorio GitHub.
2. En Vercel, importa ese repositorio.
3. Framework: Next.js; Build command: `npm run build`.
4. Despliega. No añadas una API key para esta fase.

## Próximas fases
1. Autenticación y base de datos con límites gratuitos.
2. Endpoint de servidor para OpenAI, activado solo cuando exista presupuesto.
3. Memoria y agentes con permisos.
4. Integración de documentación con Notion.
5. PWA completa y pruebas en Android.

## Seguridad
- Nunca pongas `OPENAI_API_KEY` en archivos `NEXT_PUBLIC_*`.
- Nunca publiques secretos en GitHub.
- La API de OpenAI puede generar cargos; esta versión no realiza llamadas a ella.
- No se debe prometer uso gratuito de modelos de pago.
