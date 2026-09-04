export const site = {
  name: "Gustavo «Tato» Clemente",
  shortName: "Tato Clemente",
  domain: "tatoclemente.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tatoclemente.dev",
  email: "hola@tatoclemente.dev",
  // Número de WhatsApp en formato internacional sin símbolos (ej. 5493511234567).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  whatsappText: "Hola Tato, vi tatoclemente.dev y quiero contarte un proyecto.",
  city: process.env.NEXT_PUBLIC_CITY ?? "Argentina",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/tatoclemente",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/tatoclemente",
  title: "Tato Clemente · Software e IA para negocios reales",
  description:
    "Fundador de PADER. Desarrollo sistemas de gestión, apps y agentes de IA que las empresas usan todos los días. Sistemas en producción, automatizaciones y soluciones con IA para negocios.",
};

export const nav = [
  { href: "#ahora", label: "Ahora" },
  { href: "#trabajo", label: "En producción" },
  { href: "#ia", label: "IA para tu negocio" },
  { href: "#sobre", label: "Algo sobre mí" },
];

export const hero = {
  status: "Tomando proyectos",
  headline: ["Software e", "IA", "que ya trabajan en negocios reales."],
  intro:
    "Soy Tato. Fundé PADER con un equipo de co-fundadores, y desarrollo sistemas de gestión, apps y agentes de IA que las empresas usan todos los días.",
  primary: "Contame tu proyecto",
  secondary: "Ver lo que está online",
  chips: {
    players: "jugadores en PADER",
    castel: "CASTEL · en producción",
    agent: "Agente de IA atendiendo leads",
    apps: ["Apps móviles", "a punto de salir"],
  },
};

export const marquee = [
  "PADER · producto propio",
  "CASTEL · en producción",
  "Nexo Salud · en producción",
  "Agentes de IA",
  "Automatización Mercado Libre",
  "Apps móviles",
];

export const pader = {
  label: "Ahora · producto propio",
  title: "PADER sale a la cancha.",
  url: "https://pader.com.ar",
  urlLabel: "pader.com.ar",
  description:
    "Club social de pádel: cargás tu nivel, el algoritmo arma partidos parejos, encontrás turnos en tu club y subís en el ranking. Lo fundé y lo construyo con un equipo de co-fundadores.",
  tags: ["Fundador principal", "Equipo de co-fundadores", "Finalistas Santex Hackathon 2025"],
  stats: [
    { value: 140, label: "jugadores registrados", count: true },
    { value: 3, label: "clubes en la red", count: true },
    { value: "Torneos", label: "desde la plataforma" },
    { value: "iOS + Android", label: "apps a punto de salir" },
  ],
  screens: [
    { src: "/images/pader-perfil.webp", alt: "PADER · perfil del jugador" },
    { src: "/images/pader-partido.webp", alt: "PADER · partido armado" },
    { src: "/images/pader-torneos.webp", alt: "PADER · torneos" },
  ],
};

export const clients = {
  label: "Para clientes",
  title: "Sistemas que ya están en producción.",
  note: "Diseño y desarrollo completos, firmados «Desarrollado por tatoclemente.dev».",
  items: [
    {
      name: "CASTEL",
      url: "https://icastel.com.ar",
      urlLabel: "icastel.com.ar",
      image: "/images/icastel.webp",
      accent: "#1ab4c4",
      description:
        "Service técnico de celulares en Las Varillas. Sistema interno de órdenes, garantías y estados, landing pública con presupuesto por WhatsApp y seguimiento por código, y un panel propio (CMS) desde el que el cliente actualiza fotos, sucursales, horarios y trabajos de antes y después sin tocar código.",
      badges: [
        { label: "En producción", tone: "live" },
        { label: "Tienda en desarrollo", tone: "wip" },
        { label: "Panel autogestionable", tone: "neutral" },
      ],
    },
    {
      name: "Nexo Salud",
      url: "https://nexosalud.ar",
      urlLabel: "nexosalud.ar",
      image: "/images/nexosalud.webp",
      accent: "#3b82f6",
      description:
        "SRSE, sistema de gestión de salud ocupacional para empresas: control de ausentismo, documentación médica firmada digitalmente, capacitaciones y tableros de auditoría.",
      badges: [{ label: "En producción", tone: "live" }],
    },
  ],
} as const;

export const ai = {
  label: "IA para tu negocio",
  title: ["Las empresas saben que la IA existe. Pocas saben cómo", "meterla en el negocio."],
  intro:
    "Yo la conecto con tus procesos reales: ventas, atención, publicaciones, gestión. Sin humo: agentes y automatizaciones que se miden en leads convertidos y horas ahorradas.",
  items: [
    {
      n: "01",
      tone: "amber",
      title: "Agentes de IA que convierten leads en clientes",
      text: "Atienden WhatsApp y la web 24/7, responden con la información de tu negocio, califican al interesado y lo dejan listo para cerrar. Vos entrás cuando ya hay una venta.",
    },
    {
      n: "02",
      tone: "violet",
      title: "Automatización de publicaciones en Mercado Libre",
      text: "Stock, precios, descripciones y respuestas a preguntas sincronizados con tu sistema. Publicás una vez y la IA mantiene el catálogo al día sin que nadie lo cargue a mano.",
      rows: [
        ["Stock actualizado", "automático", "live"],
        ["Precios y promos", "automático", "live"],
        ["Preguntas de compradores", "IA responde", "amber"],
      ],
    },
    {
      n: "03",
      tone: "blue",
      title: "Automatización de procesos internos",
      text: "Lo que hoy vive en planillas, papel y mensajes reenviados: órdenes, seguimientos, reportes, avisos. Lo convierto en un flujo que corre solo y avisa cuando hace falta una persona.",
      steps: [
        "Relevamos el proceso real, no el ideal.",
        "Automatizamos lo repetitivo, con IA donde suma.",
        "Medimos horas ahorradas y errores evitados.",
      ],
    },
  ],
} as const;

export const about = {
  label: "Algo sobre mí",
  title: "Del front al producto completo. Y ahora, con IA adentro.",
  paragraphs: [
    "Soy desarrollador full stack. Arranqué del lado del front, obsesionado con que las cosas se vean y se sientan bien, y hoy me ocupo de todo el recorrido: diseño, base de datos, backend, apps móviles y puesta en producción.",
    "Con PADER aprendí a llevar una idea hasta jugadores reales en canchas reales, junto a un equipo de co-fundadores. Esa cabeza de producto es la que aplico en cada sistema que hago para clientes.",
    "Desde hace un tiempo también construyo soluciones con IA para automatizar procesos empresariales: agentes que convierten leads en clientes, automatizaciones de publicaciones en Mercado Libre y flujos que sacan a las empresas del papel y las planillas.",
    "Fuera de la compu: batería, pádel y podcasts de startups.",
  ],
};

export const contact = {
  title: "Contame tu proyecto.",
  text: "Te llega una confirmación automática al instante y yo respondo por mail dentro de las 24 horas. Si es urgente, WhatsApp directo.",
  callNote: "¿Llamada? Proponé dos horarios en el mensaje.",
  types: ["Sistema a medida", "Agente de IA", "Automatización", "Landing o tienda", "App móvil", "Otra cosa"],
  fields: { name: "Nombre", email: "Email", message: "Qué tenés en mente, en pocas líneas" },
  submit: "Enviar",
  autoNote: "Confirmación automática por mail.",
  success: "Listo. Te mandé una confirmación por mail y te respondo dentro de las 24 horas.",
  error: "No pude enviar el mensaje. Probá de nuevo o escribime por WhatsApp.",
};

export type ProjectType = (typeof contact.types)[number];
