export const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contacto" },
]

export const TICKER_ITEMS = [
  "Diseño web a medida",
  "Sin plantillas",
  "Prototipo gratis",
  "Resultados medibles",
  "Código propio",
  "100% personalizado",
  "Madrid · España",
  "Sin compromisos",
]

export const DISPLAY_TICKER = [
  "Diseño web",
  "Desarrollo",
  "Branding",
  "Landing pages",
  "SEO técnico",
]

export const TICKER_CTA_ITEMS = [
  "Prototipo gratis en 48h",
  "Solo 3 proyectos al mes",
  "Pagas solo si te gusta",
  "Sin plantillas ni atajos",
  "Código desde cero",
]

export const STATS = [
  { num: "+10", label: "Proyectos entregados" },
  { num: "7", label: "Años de experiencia" },
  { num: "24h", label: "Tiempo de respuesta" },
]

export type Project = {
  num: string
  initials: string
  tag: string
  year: string
  services: string[]
  title: string
  desc: string
  result: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    num: "01",
    initials: "AC",
    tag: "Automoción",
    year: "2024",
    services: ["Diseño UI", "Desarrollo", "Catálogo"],
    title: "Automóviles Cobeña",
    desc: "Web corporativa con catálogo de vehículos y formulario de contacto directo que multiplicó las consultas cualificadas.",
    result: "+35% consultas en 6 semanas",
    image: "/projects/cobena.webp",
  },
  {
    num: "02",
    initials: "MM",
    tag: "Hostelería",
    year: "2024",
    services: ["Branding", "Diseño web", "Reservas"],
    title: "MammaMia Daganzo",
    desc: "Web con menú visual y reservas online que llena mesas entre semana, no solo los fines de semana.",
    result: "+120 reservas el primer mes",
    image: "/projects/mammamia.webp",
  },
  {
    num: "03",
    initials: "MC",
    tag: "Transporte",
    year: "2023",
    services: ["Plataforma", "Desarrollo", "UX"],
    title: "MueveMiCoche",
    desc: "Plataforma de transporte de vehículos puerta a puerta en toda España, con seguimiento de rutas en tiempo real.",
    result: "+5.000 vehículos transportados",
    image: "/projects/muevemicoche.webp",
  },
  {
    num: "04",
    initials: "LE",
    tag: "Lujo · Perfumería",
    year: "2023",
    services: ["Landing", "Diseño", "Catálogo"],
    title: "Lotus Experience",
    desc: "Landing de marca con catálogo visual y cita en tienda que elevó el tráfico al punto de venta físico.",
    result: "+80% visitas a tienda física",
    image: "/projects/lotus.webp",
  },
]

export const TESTIMONIALS = [
  {
    initials: "RC",
    name: "Roberto Cobeña",
    role: "Automóviles Cobeña · Madrid",
    quote:
      "Llevaba meses buscando alguien que entendiera lo que necesitaba. En dos semanas tenía el prototipo y en cuatro la web funcionando. Los resultados se notaron desde el primer mes.",
  },
  {
    initials: "AM",
    name: "Antonio M.",
    role: "MammaMia Daganzo · Madrid",
    quote:
      "El restaurante llenó mesas entre semana por primera vez. La web transmite exactamente lo que somos. El proceso fue claro de principio a fin, sin sorpresas ni retrasos.",
  },
]

export const FAQS = [
  {
    q: "¿El prototipo es realmente gratis?",
    a: "Sí. Te diseñamos un prototipo completo antes de que decidas contratar. Ves exactamente cómo quedaría tu web. Si no te convence, no pagas nada.",
  },
  {
    q: "¿Cuánto cuesta una web?",
    a: "Desde 600€ para landing pages y proyectos de una página. Las webs corporativas completas parten de 2.000€. Te damos un presupuesto exacto en la primera llamada.",
  },
  {
    q: "¿Usáis WordPress o plantillas?",
    a: "No. Todo el código es nuestro, desde cero. No usamos WordPress genérico, temas prefabricados ni herramientas de IA sin supervisión.",
  },
  {
    q: "¿Cuánto tiempo tarda?",
    a: "Entre 4 y 8 semanas dependiendo de la complejidad. Fijamos el plazo al inicio y lo cumplimos. Sin retrasos ni excusas.",
  },
  {
    q: "¿Qué pasa después de lanzar?",
    a: "Soporte técnico real durante los primeros 30 días incluido. Respondemos en menos de 24h. Para cambios mayores, tarifas claras acordadas desde el principio.",
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
    title: "Prototipo antes de pagar",
    desc: "Ves exactamente cómo quedará tu web antes de comprometerte. Riesgo cero desde el primer día.",
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
    title: "Prototipo visual completo, antes de pagar",
    desc: "Arquitectura de información enfocada en conversión y diseño de interfaz. Lo ves todo antes de que empiece el desarrollo.",
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

export const TIMELINE = [
  {
    week: "Semana 01",
    title: "Reunión inicial y briefing",
    desc: "Conocemos tu negocio, objetivos y audiencia. Definimos la estrategia.",
  },
  {
    week: "Semana 02",
    title: "Investigación de mercado",
    desc: "Analizamos la competencia y definimos el posicionamiento visual.",
  },
  {
    week: "Semana 03",
    title: "Arquitectura de información",
    desc: "Estructura de la web enfocada en conversión y experiencia de usuario.",
  },
  {
    week: "Semana 04",
    title: "Diseño de interfaz (UI)",
    desc: "Prototipo visual completo. Lo ves antes de que empiece el desarrollo.",
  },
  {
    week: "Semana 05–06",
    title: "Desarrollo frontend",
    desc: "Código limpio y optimizado. Rápido, responsive y sin plantillas.",
  },
  {
    week: "Semana 07",
    title: "QA y testing",
    desc: "Pruebas en todos los dispositivos y navegadores. Cero errores al lanzar.",
  },
  {
    week: "Semana 08",
    title: "Lanzamiento y optimización",
    desc: "Publicamos y monitorizamos. Soporte real los primeros 30 días.",
  },
]

export const WHATSAPP_URL = "https://wa.me/34600000000"
