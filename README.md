# Galaxy AI Ultimate

Base de Galaxy AI Ultimate para web y móvil, construida con Next.js 15, React 19 y TypeScript.

## Estado de esta rama
- Interfaz responsive con navegación por módulos.
- Chat conectado a una ruta de servidor que utiliza la API de OpenAI Responses.
- Clave de OpenAI y código de acceso solo en variables privadas del servidor.
- Endpoint de estado que informa si la configuración está lista sin revelar secretos.
- Manifiesto PWA e icono instalable.
- Brain, Agents, Creative, Video Studio, Research y Analytics son espacios de interfaz; todavía no son funciones completas.

## Variables privadas en Vercel
Configura en Project Settings → Environment Variables:
- `OPENAI_API_KEY`: clave de API, nunca en el navegador ni en Git.
- `OPENAI_MODEL`: identificador exacto de un modelo disponible en tu proyecto API.
- `GALAXY_ACCESS_CODE`: código largo y único que solo tú conozcas.
- `NOTION_API_KEY`: opcional; reservado para la futura integración Notion.

Después de añadir o cambiar variables, crea un nuevo deployment.

## Ejecutar localmente
Requiere Node.js 20.9 o superior:
```bash
npm install
npm run dev
```

## Comprobación
- `GET /api/status` informa únicamente si las variables están configuradas.
- `POST /api/chat` requiere `x-galaxy-access-code` y un JSON con `message`.
- El endpoint aplica un límite básico en memoria. No es un limitador distribuido ni sustituye autenticación individual para un lanzamiento público.

## Seguridad y costes
La API de OpenAI puede generar cargos según el modelo y el uso. No actives pagos ni publiques el servicio sin revisar los límites y costes con un adulto responsable. No publiques claves ni códigos en GitHub. Esta base no incluye autenticación individual, base de datos ni protección suficiente para abrirla al público general.
