export const SITE_TITLE = "MP WebLabs — Diseño y desarrollo web en Madrid"
export const SITE_DESCRIPTION =
  "Agencia de diseño y desarrollo web en Madrid, con clientes en toda España. Webs rápidas, optimizadas para Google y pensadas para generar contactos, reservas y ventas."

export const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export type Service = {
  num: string
  /** ancla en /servicios y futura ruta /servicios/[slug] */
  slug: string
  title: string
  /** frase corta para listados */
  short: string
  desc: string
  includes: string[]
  idealFor: string
  /** proyectos reales donde se aplicó (slugs de PROJECTS) */
  projects?: string[]
}

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "diseno-web",
    title: "Diseño web",
    short: "Webs que se entienden y convierten",
    desc: "Webs corporativas y landings diseñadas para que quien llega entienda en segundos qué haces, confíe en ti y te contacte.",
    includes: [
      "Arquitectura de páginas orientada a conversión",
      "Diseño a medida, sin plantillas",
      "Textos y llamadas a la acción claras",
      "Mobile-first: perfecta en el móvil",
    ],
    idealFor:
      "Negocios cuya web no transmite lo que valen o no genera contactos.",
    projects: ["lotus-experience", "mammamia-daganzo"],
  },
  {
    num: "02",
    slug: "desarrollo-web",
    title: "Desarrollo web",
    short: "Código propio, rápido y seguro",
    desc: "Desarrollamos cada web desde cero, sin depender de plugins ni constructores: carga rápida, segura y fácil de mantener.",
    includes: [
      "Rendimiento y Core Web Vitals medidos",
      "Formularios conectados a email y CRM",
      "Analítica y medición de conversiones",
      "SEO técnico integrado desde el código",
    ],
    idealFor:
      "Empresas que necesitan una web rápida y fiable, sin sustos de plugins ni actualizaciones.",
    projects: ["automoviles-cobena"],
  },
  {
    num: "03",
    slug: "aplicaciones-web",
    title: "Aplicaciones web",
    short: "Herramientas a medida para tu negocio",
    desc: "Catálogos, reservas, citas, áreas de cliente o seguimiento en tiempo real: llevamos a la web los procesos que hoy gestionas por teléfono, email o Excel.",
    includes: [
      "Catálogos y fichas con filtros",
      "Reservas y cita previa online",
      "Seguimiento y paneles en tiempo real",
      "Integraciones con servicios externos",
    ],
    idealFor:
      "Negocios con procesos manuales que les quitan tiempo o clientes.",
    projects: ["muevemicoche", "automoviles-cobena", "mammamia-daganzo"],
  },
  {
    num: "04",
    slug: "seo-local",
    title: "SEO local",
    short: "Que te encuentren cuando te buscan",
    desc: "Trabajamos tu web y tu Perfil de Empresa en Google para que aparezcas en Google y en Google Maps cuando alguien busca lo que haces en tu zona.",
    includes: [
      "SEO técnico y on-page",
      "Optimización del Perfil de Empresa en Google",
      "Páginas por servicio y por zona",
      "Seguimiento de posiciones y contactos",
    ],
    idealFor:
      "Negocios locales que dependen de que les encuentren cerca: talleres, clínicas, reformas, instaladores.",
  },
  {
    num: "05",
    slug: "mantenimiento-web",
    title: "Mantenimiento web",
    short: "Tu web al día, sin preocuparte",
    desc: "Nos ocupamos de que tu web siga funcionando, segura y actualizada, y de hacer los cambios que necesites sin que tengas que tocar nada.",
    includes: [
      "Actualizaciones y copias de seguridad",
      "Monitorización de disponibilidad y rendimiento",
      "Cambios de contenido incluidos",
      "Soporte con respuesta en menos de 24h",
    ],
    idealFor:
      "Quien quiere olvidarse de la parte técnica y centrarse en su negocio.",
  },
]

export const DISPLAY_TICKER = [
  "Diseño web",
  "Desarrollo",
  "Branding",
  "Landing pages",
  "SEO técnico",
]

export type Project = {
  num: string
  /** slug de la URL: /proyectos/[slug] */
  slug: string
  initials: string
  tag: string
  year: string
  services: string[]
  title: string
  /** se muestra en el grid de "Trabajo seleccionado" del inicio */
  featured?: boolean
  /** SEO/accessibility alt text — incluye contexto de negocio y ubicación */
  alt: string
  desc: string
  result: string
  image: string
  /** URL pública de la web entregada, si sigue online */
  url?: string
  location: string
  duration: string
  /** el problema del cliente antes de trabajar con nosotros */
  challenge: string
  /** cómo lo resolvimos, en pasos */
  approach: string[]
  /** resultados conseguidos, en bullets */
  results: string[]
  testimonial: { quote: string; name: string; role: string }
}

export const PROJECTS: Project[] = [
  {
    num: "01",
    slug: "automoviles-cobena",
    initials: "AC",
    tag: "Automoción",
    year: "2024",
    services: ["Diseño UI", "Desarrollo", "Catálogo"],
    title: "Automóviles Cobeña",
    featured: true,
    alt: "Diseño web para concesionario de coches en Madrid — Automóviles Cobeña",
    desc: "Web corporativa con catálogo de vehículos y formulario de contacto directo que multiplicó las consultas cualificadas.",
    result: "+35% consultas en 6 semanas",
    image: "/projects/cobena.webp",
    url: "https://automovilescobena.com/",
    location: "Madrid",
    duration: "5 semanas",
    challenge:
      "Automóviles Cobeña vendía coches de ocasión en Madrid con una web estática de hace más de ocho años: sin catálogo real, sin ficha de vehículo y con un único teléfono como vía de contacto. Los compradores llegaban, no encontraban lo que buscaban y se iban a otro concesionario sin dejar ni un mensaje.",
    approach: [
      "Catálogo de vehículos filtrable por marca, precio, año y kilometraje, con ficha individual y galería para cada coche.",
      "Formulario de contacto directo en cada ficha, para preguntar por ese coche concreto sin salir de la página.",
      "Diseño mobile-first: la mayoría de búsquedas de coches de ocasión se hacen desde el móvil, así que el catálogo tenía que funcionar perfecto ahí primero.",
      "SEO técnico local orientado a búsquedas como «coches de ocasión Madrid» y «concesionario Madrid».",
    ],
    results: [
      "+35% de consultas cualificadas en las primeras 6 semanas tras el lanzamiento.",
      "Los clientes empezaron a preguntar por coches concretos, no solo a pedir información genérica por teléfono.",
      "Mejor posicionamiento en búsquedas locales de Google para coches de ocasión en Madrid.",
    ],
    testimonial: {
      quote:
        "Llevaba meses buscando alguien que entendiera lo que necesitaba. En dos semanas tenía el prototipo y en cuatro la web funcionando. Los resultados se notaron desde el primer mes.",
      name: "Roberto Cobeña",
      role: "Automóviles Cobeña · Madrid",
    },
  },
  {
    num: "02",
    slug: "mammamia-daganzo",
    initials: "MM",
    tag: "Hostelería",
    year: "2024",
    services: ["Branding", "Diseño web", "Reservas"],
    title: "MammaMia Daganzo",
    featured: true,
    alt: "Diseño web para restaurante en Madrid con reservas online — MammaMia Daganzo",
    desc: "Web con menú visual y reservas online que llena mesas entre semana, no solo los fines de semana.",
    result: "+120 reservas el primer mes",
    image: "/projects/mammamia.webp",
    url: "https://mammamiadgz.com/",
    location: "Daganzo de Arriba, Madrid",
    duration: "6 semanas",
    challenge:
      "MammaMia llenaba la sala los fines de semana, pero entre semana el restaurante iba medio vacío. No tenían web: solo Instagram y una ficha de Google desactualizada. El menú se enviaba en PDF por WhatsApp y las reservas se gestionaban a golpe de llamada, saturando el teléfono en horas punta.",
    approach: [
      "Identidad visual y branding coherente con el local: tipografía, colores y fotografía de plato pensados para transmitir cocina italiana auténtica, no una plantilla genérica.",
      "Menú visual navegable por categorías, legible perfectamente en móvil — nada de PDFs.",
      "Sistema de reservas online integrado en la web, disponible 24h, para quitarle presión al teléfono en horas de servicio.",
      "SEO local para búsquedas como «restaurante italiano Daganzo», con contenido pensado para captar tráfico entre semana.",
    ],
    results: [
      "+120 reservas en el primer mes desde el lanzamiento.",
      "Aumento notable de reservas entre semana, no solo fines de semana.",
      "Menos llamadas de gestión de mesa: la reserva online absorbió buena parte del volumen telefónico.",
    ],
    testimonial: {
      quote:
        "El restaurante llenó mesas entre semana por primera vez. La web transmite exactamente lo que somos. El proceso fue claro de principio a fin, sin sorpresas ni retrasos.",
      name: "Antonio M.",
      role: "MammaMia Daganzo · Madrid",
    },
  },
  {
    num: "03",
    slug: "muevemicoche",
    initials: "MC",
    tag: "Transporte",
    year: "2023",
    services: ["Plataforma", "Desarrollo", "UX"],
    title: "MueveMiCoche",
    alt: "Plataforma web de transporte de vehículos puerta a puerta en toda España — MueveMiCoche",
    desc: "Plataforma de transporte de vehículos puerta a puerta en toda España, con seguimiento de rutas en tiempo real.",
    result: "+5.000 vehículos transportados",
    image: "/projects/muevemicoche.webp",
    url: "https://muevemicoche.vercel.app/",
    location: "Toda España",
    duration: "8 semanas",
    challenge:
      "MueveMiCoche transporta vehículos puerta a puerta por toda España, pero su web no transmitía la escala real de la operación: no había forma de seguir un traslado en curso, y cada consulta de precio requería una llamada o un email, algo que frena la captación en un sector donde la confianza y la inmediatez lo son todo.",
    approach: [
      "Plataforma web con seguimiento de rutas en tiempo real, para que el cliente vea en qué punto del trayecto está su vehículo sin tener que llamar.",
      "Arquitectura de información pensada para transmitir seguridad y escala nacional: cobertura, flota y garantías visibles desde el primer scroll.",
      "Formulario de solicitud de traslado simplificado a los datos imprescindibles, para bajar la fricción en la primera consulta.",
      "Diseño responsive y rápido, clave para un servicio que se contrata muchas veces desde el móvil, en el momento en que surge la necesidad.",
    ],
    results: [
      "Más de 5.000 vehículos transportados desde el lanzamiento de la plataforma.",
      "El seguimiento en tiempo real redujo las llamadas de «¿dónde está mi coche?» al equipo de operaciones.",
      "Cobertura y confianza percibida reforzadas de cara a nuevos clientes en toda España.",
    ],
    testimonial: {
      quote:
        "Necesitábamos una web que transmitiera que somos una operación seria a nivel nacional, no una furgoneta suelta. El seguimiento en tiempo real ha sido un antes y un después: los clientes confían más y llaman menos.",
      name: "Javier R.",
      role: "Fundador, MueveMiCoche",
    },
  },
  {
    num: "04",
    slug: "lotus-experience",
    initials: "LE",
    tag: "Lujo · Perfumería",
    year: "2023",
    services: ["Landing", "Diseño", "Catálogo"],
    title: "Lotus Experience",
    alt: "Landing page para perfumería de lujo en Madrid — Lotus Experience",
    desc: "Landing de marca con catálogo visual y cita en tienda que elevó el tráfico al punto de venta físico.",
    result: "+80% visitas a tienda física",
    image: "/projects/lotus.webp",
    location: "Madrid",
    duration: "4 semanas",
    challenge:
      "Lotus Experience es una perfumería de lujo con tienda física, pero su presencia online no estaba a la altura del producto: nada que transmitiera la experiencia de marca, ni un motivo claro para que alguien que veía el catálogo online decidiera visitar la tienda en persona.",
    approach: [
      "Landing de marca con dirección artística cuidada: fotografía de producto, tipografía y espaciados pensados para transmitir la misma sensación de lujo que la tienda física.",
      "Catálogo visual de fragancias organizado por familia olfativa, pensado para explorar, no solo para listar productos.",
      "Sistema de cita previa en tienda integrado, para convertir el interés online en una visita real al punto de venta.",
      "SEO local orientado a «perfumería de lujo Madrid», con la landing trabajando para captar búsquedas cercanas a la tienda.",
    ],
    results: [
      "+80% de visitas a la tienda física atribuibles al tráfico generado desde la web.",
      "El catálogo visual se convirtió en la herramienta principal para explorar fragancias antes de ir a probarlas en persona.",
      "Más citas reservadas desde la web que por teléfono, según el propio equipo de tienda.",
    ],
    testimonial: {
      quote:
        "La web hizo lo que ninguna otra herramienta de marketing había conseguido: que la gente viniera a la tienda ya decidida, habiendo visto antes el catálogo. Se nota en cada cita.",
      name: "Laura V.",
      role: "Store Manager, Lotus Experience",
    },
  },
]

export const FAQS = [
  {
    q: "¿Cuánto cuesta una web?",
    a: "Depende de lo que necesites: no es lo mismo una landing que una web con reservas online o una aplicación a medida. Tras una primera llamada te enviamos una propuesta cerrada, con precio y plazos por escrito. Sin sorpresas.",
  },
  {
    q: "¿Qué incluye el análisis gratuito de mi web?",
    a: "Revisamos personalmente la velocidad, la experiencia en móvil, el SEO básico y los puntos de contacto (llamadas, formularios, reservas). Te enviamos por email los problemas prioritarios y cómo solucionarlos, en lenguaje claro. Sin compromiso.",
  },
  {
    q: "¿Usáis WordPress o plantillas?",
    a: "No. Todo el código es nuestro, desde cero. No usamos WordPress genérico, temas prefabricados ni herramientas de IA sin supervisión.",
  },
  {
    q: "¿Trabajáis solo en Madrid o también en el resto de España?",
    a: "Nuestro estudio está en Madrid, pero trabajamos en remoto con negocios de toda España. Llamadas, propuesta y entrega, todo 100% online, sin que importe tu ciudad.",
  },
  {
    q: "¿Cuánto tiempo tarda?",
    a: "Entre 4 y 8 semanas dependiendo de la complejidad. Fijamos el plazo al inicio y lo cumplimos. Sin retrasos ni excusas.",
  },
  {
    q: "¿Qué pasa después de lanzar?",
    a: "Soporte técnico real durante los primeros 30 días incluido. Respondemos en menos de 24h. Después puedes contratar mantenimiento mensual y SEO local para que la web siga al día y mejorando su posicionamiento.",
  },
]

export type Founder = {
  initials: string
  name: string
  role: string
  bio: string
}

export const FOUNDERS: Founder[] = [
  {
    initials: "ME",
    name: "Manuel Espinosa",
    role: "Desarrollador · Cofounder",
    bio: "Escribe cada línea de código del estudio: rendimiento, buenas prácticas y cero plantillas. También mete mano en diseño para que la idea visual sobreviva intacta hasta producción.",
  },
  {
    initials: "P",
    name: "Pablo",
    role: "Comercial · Cofounder",
    bio: "Tu primer contacto y quien traduce tu negocio en objetivos claros para el proyecto. Participa en cada decisión de diseño para que la web venda, no solo que impresione.",
  },
]

export const VALUES = [
  {
    num: "01",
    title: "Sin plantillas, sin atajos",
    desc: "Código desde cero. No WordPress genérico, no Kit Digital, no plantillas prefabricadas. Cada web es única.",
  },
  {
    num: "02",
    title: "Diseño que vende",
    desc: "Bonito no es suficiente. Cada decisión visual tiene un objetivo: convertir visitantes en clientes.",
  },
  {
    num: "03",
    title: "Plazos reales, cumplidos",
    desc: "Fijamos fechas al inicio y las cumplimos. Sin retrasos, sin excusas. Tu negocio no puede esperar.",
  },
  {
    num: "04",
    title: "Pensadas para Google",
    desc: "SEO técnico y local integrado desde el código, no como un añadido. Que te encuentren quienes ya te están buscando.",
  },
  {
    num: "05",
    title: "Soporte real post-lanzamiento",
    desc: "No desaparecemos al lanzar. Respondemos en menos de 24h porque tu negocio no puede esperar.",
  },
  {
    num: "06",
    title: "Acceso directo al equipo",
    desc: "Hablas con quien hace tu web. Sin cuentas de cliente, sin intermediarios.",
  },
]

export type Phase = {
  id: string
  label: string
  week: string
  title: string
  desc: string
  bullets: string[]
}

export const METHODOLOGY: Phase[] = [
  {
    id: "01",
    label: "Estrategia",
    week: "Semana 01–02",
    title: "Entendemos tu negocio antes de tocar un pixel",
    desc: "Reunión inicial, briefing y análisis de competencia. Definimos objetivos, audiencia y posicionamiento visual.",
    bullets: ["Briefing y objetivos", "Análisis de mercado", "Posicionamiento"],
  },
  {
    id: "02",
    label: "Diseño",
    week: "Semana 03–04",
    title: "Diseño completo, aprobado por ti",
    desc: "Diseñamos cada página: arquitectura enfocada en conversión e interfaz. Lo apruebas todo antes de que empiece el desarrollo.",
    bullets: ["Arquitectura UX", "Diseño UI", "Prototipo navegable"],
  },
  {
    id: "03",
    label: "Desarrollo",
    week: "Semana 05–06",
    title: "Código propio, rápido y sin plantillas",
    desc: "Desarrollo frontend limpio y optimizado. Responsive perfecto, animaciones profesionales y rendimiento medido.",
    bullets: ["Código desde cero", "Responsive total", "Optimización"],
  },
  {
    id: "04",
    label: "Lanzamiento",
    week: "Semana 07–08",
    title: "Testing, lanzamiento y soporte real",
    desc: "QA en todos los dispositivos, publicación y monitorización. Soporte técnico real los primeros 30 días.",
    bullets: ["QA y testing", "Puesta en marcha", "Soporte 30 días"],
  },
]

// ————— Datos de contacto y titular —————
// Rellena los campos vacíos: todo lo que esté vacío se oculta automáticamente
// de la web (botones de WhatsApp, enlaces a redes, JSON-LD, aviso legal…).

export const CONTACT_EMAIL = "info@mpweblabs.com"

/** Teléfono/WhatsApp en formato internacional sin espacios, p. ej. "+34612345678". */
export const PHONE: string = ""

export const WHATSAPP_URL = PHONE ? `https://wa.me/${PHONE.replace(/\D/g, "")}` : ""

/** "+34612345678" → "+34 612 345 678" */
export const PHONE_DISPLAY = PHONE.replace(/^\+34(\d{3})(\d{3})(\d{3})$/, "+34 $1 $2 $3")

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
].filter((s) => s.href)

/** Datos obligatorios del titular (art. 10 LSSI-CE) para el aviso legal. */
export const LEGAL_OWNER = {
  /** Nombre y apellidos (autónomo) o razón social (sociedad) */
  name: "",
  /** NIF / CIF */
  taxId: "",
  /** Domicilio completo */
  address: "",
  /** Datos registrales, solo si es sociedad (Registro Mercantil…) */
  registry: "",
}

/** Iniciales de una persona: "Roberto Cobeña" → "RC", "Antonio M." → "AM" */
export function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// Dominio canónico de producción (www: es el que sirve Vercel). Se puede sobreescribir con NEXT_PUBLIC_SITE_URL
// (útil en previews de Vercel) para que robots.txt y sitemap.xml siempre apunten
// al host real donde se sirve el sitio.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.mpweblabs.com")
