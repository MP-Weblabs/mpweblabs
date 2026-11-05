// Landings por sector (/sectores/[slug]).
// Regla del plan: solo crear un sector cuando haya contenido genuinamente
// específico para él — nada de páginas clonadas para posicionar.

export type Sector = {
  slug: string
  /** nombre corto para enlaces y migas */
  name: string
  metaTitle: string
  metaDescription: string
  /** h1 en dos partes: la segunda va en serif cursiva */
  headline: [string, string]
  intro: string
  /** tipos de negocio a los que va dirigida */
  audiences: string[]
  problems: { title: string; desc: string }[]
  solutions: { title: string; desc: string }[]
  /** slugs de PROJECTS reales del sector */
  projects: string[]
  faqs: { q: string; a: string }[]
}

export const SECTORS: Sector[] = [
  {
    slug: "automocion",
    name: "Automoción",
    metaTitle: "Diseño web para concesionarios, talleres y automoción",
    metaDescription:
      "Webs para concesionarios, compraventa de vehículos, talleres y transporte de coches en Madrid y toda España. Catálogo con fichas, cita previa y SEO local para generar más consultas.",
    headline: ["Webs para automoción que convierten visitas en", "consultas."],
    intro:
      "Hemos hecho la web de un concesionario de coches de ocasión en Madrid y la plataforma de una empresa de transporte de vehículos que opera en toda España. Sabemos cómo busca un comprador de coches, qué necesita ver antes de llamar y por qué se va a otro sitio cuando no lo encuentra.",
    audiences: [
      "Concesionarios",
      "Compraventa de vehículos de ocasión",
      "Talleres mecánicos y de chapa",
      "Transporte de vehículos",
      "Alquiler de vehículos",
    ],
    problems: [
      {
        title: "El stock no está en tu web",
        desc: "Los coches solo aparecen en portales de anuncios, junto a decenas de competidores. Quien llega a tu web no puede ver qué tienes ni pedir información sobre un vehículo concreto.",
      },
      {
        title: "Todo pasa por el teléfono",
        desc: "Sin formulario por vehículo, sin cita previa y sin WhatsApp, cada consulta exige una llamada en horario comercial. Muchos compradores no llaman: se van.",
      },
      {
        title: "No apareces cuando te buscan cerca",
        desc: "Búsquedas como «taller cerca de mí» o «coches de ocasión en Madrid» se deciden en Google y en Google Maps. Sin SEO local ni un Perfil de Empresa trabajado, se las llevan otros.",
      },
      {
        title: "La web no transmite confianza",
        desc: "Comprar un coche o dejarlo en un taller es una decisión de confianza. Una web antigua, lenta o que se ve mal en el móvil resta credibilidad aunque el negocio sea excelente.",
      },
    ],
    solutions: [
      {
        title: "Catálogo con ficha por vehículo",
        desc: "Filtros por marca, precio, año y kilometraje, galería de fotos y un formulario en cada ficha para preguntar por ese coche concreto.",
      },
      {
        title: "Contacto sin fricción",
        desc: "Formularios cortos, botón de llamada y WhatsApp visibles en el móvil, y cita previa o solicitud de presupuesto online para talleres.",
      },
      {
        title: "SEO local para tu zona",
        desc: "Páginas pensadas para las búsquedas reales de tu localidad y tu Perfil de Empresa en Google optimizado para aparecer en Maps.",
      },
      {
        title: "Rápida y perfecta en el móvil",
        desc: "La mayoría de búsquedas de coches y talleres se hacen desde el móvil: diseñamos primero para esa pantalla y medimos la velocidad de carga.",
      },
    ],
    projects: ["automoviles-cobena", "muevemicoche"],
    faqs: [
      {
        q: "Ya publico mis coches en portales de anuncios. ¿Para qué necesito una web?",
        a: "Los portales dan visibilidad, pero allí compites al lado de decenas de anuncios parecidos. Tu web es donde el comprador que ya te ha encontrado decide: ve todo tu stock, tu reputación y te contacta sin distracciones. Ambos canales se complementan.",
      },
      {
        q: "¿Podré actualizar yo mismo los vehículos?",
        a: "Sí. Planteamos la gestión del catálogo según cómo trabajes hoy: desde un panel sencillo para dar de alta y baja vehículos, o valorando conectarlo con la herramienta que ya utilices. Lo definimos en la propuesta.",
      },
      {
        q: "¿Trabajáis también con talleres?",
        a: "Sí. Para un taller lo prioritario suele ser aparecer en búsquedas locales, mostrar servicios claros y facilitar la cita previa o la petición de presupuesto desde el móvil.",
      },
      {
        q: "¿Podéis revisar primero mi web actual?",
        a: "Sí. Con el análisis gratuito revisamos tu web y te decimos qué problemas te están costando consultas, sin compromiso.",
      },
    ],
  },
]
