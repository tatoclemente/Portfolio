# tatoclemente.dev

Sitio personal de Gustavo «Tato» Clemente: fundador de PADER, sistemas en producción para clientes y soluciones con IA para negocios.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS 4
- Resend para el módulo de contacto (aviso + confirmación automática)
- Vercel Analytics

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar RESEND_API_KEY y NEXT_PUBLIC_WHATSAPP
npm run dev
```

Otros comandos: `npm run build`, `npm run lint`, `npm run typecheck`.

## Estructura

- `src/content/site.ts`: todo el contenido del sitio (textos, proyectos, enlaces). Editar acá para cambiar copy.
- `src/components/`: una pieza por sección de la home (Hero, Pader, Clients, Ai, About, Contact…).
- `src/app/api/contact/route.ts`: recibe el formulario, valida con zod, aplica honeypot y límite por IP, y manda dos mails con Resend (`src/lib/email.ts`).
- `src/app/globals.css`: tokens de diseño, animaciones y revelados por scroll (`RevealObserver` agrega `.is-in`).
- `public/images/`: foto, capturas de PADER y de los sitios de clientes.

## Variables de entorno

Ver `.env.example`. El dominio `tatoclemente.dev` tiene que estar verificado en Resend para enviar desde `hola@tatoclemente.dev`.
