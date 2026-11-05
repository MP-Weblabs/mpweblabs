// Motor de auditoría rápida de una web (plan §9-§12).
// Sin dependencias: fetch nativo de Node + heurísticas sobre el HTML.
// Pensado para reutilizarse en MP WebLabs Audit (plan §17).

const UA = "MPWebLabsAudit/1.0 (+https://www.mpweblabs.com)"
const AÑO = new Date().getFullYear()

/** Sectores donde la reserva / cita online suele tener sentido. */
const SECTORES_CON_RESERVA = [
  "Taller",
  "Clínica dental",
  "Clínica estética",
  "Fisioterapia",
  "Academia",
  "Hostelería",
]

export function normalizarUrl(url) {
  const u = String(url || "").trim()
  if (!u) return ""
  return /^https?:\/\//i.test(u) ? u : `https://${u}`
}

async function obtener(url, { timeoutMs = 20000 } = {}) {
  const inicio = Date.now()
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": UA, Accept: "text/html,*/*" },
    signal: AbortSignal.timeout(timeoutMs),
  })
  const texto = await res.text()
  return { res, texto, ms: Date.now() - inicio }
}

async function existe(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(10000),
    })
    return res.ok
  } catch {
    return false
  }
}

/** PageSpeed Insights (móvil). Gratis; con PSI_API_KEY tiene más cuota. */
async function pageSpeed(url, apiKey) {
  const p = new URLSearchParams({ url, strategy: "mobile" })
  for (const c of ["performance", "seo", "accessibility"]) p.append("category", c)
  if (apiKey) p.set("key", apiKey)
  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${p}`,
      { signal: AbortSignal.timeout(90000) },
    )
    if (!res.ok) return { error: `PageSpeed ${res.status}` }
    const j = await res.json()
    const cat = j.lighthouseResult?.categories ?? {}
    const aud = j.lighthouseResult?.audits ?? {}
    return {
      rendimiento: Math.round((cat.performance?.score ?? 0) * 100),
      seo: Math.round((cat.seo?.score ?? 0) * 100),
      accesibilidad: Math.round((cat.accessibility?.score ?? 0) * 100),
      lcpSeg: (aud["largest-contentful-paint"]?.numericValue ?? 0) / 1000,
      cls: aud["cumulative-layout-shift"]?.numericValue ?? 0,
    }
  } catch (e) {
    return { error: `PageSpeed: ${e.name === "TimeoutError" ? "timeout" : e.message}` }
  }
}

const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const limpiar = (s) => texto(s || "").slice(0, 300)

function leerHtml(html) {
  const lower = html.toLowerCase()
  const title = limpiar((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1])
  const desc =
    (html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i) ||
      [])[1] || ""
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => limpiar(m[1]))
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  const sinAlt = imgs.filter((t) => !/\balt=["'][^"']+["']/i.test(t)).length
  const cuerpo = texto(html).toLowerCase()
  const años = [...cuerpo.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)]
    .map((m) => Number(m[1]))
    .filter((a) => a > 1995 && a <= AÑO)
  const jqueryViejo = /jquery[.-]?(1\.\d+|2\.\d+)/i.test(html)
  const enlaces = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1])

  return {
    title,
    desc: desc.trim(),
    h1s,
    viewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    lang: /<html[^>]+\blang=["'][a-z]/i.test(html),
    imagenes: imgs.length,
    imagenesSinAlt: sinAlt,
    schemaLocal: /"@type"\s*:\s*"(LocalBusiness|ProfessionalService|AutoRepair|AutoDealer|Dentist|MedicalClinic|HomeAndConstructionBusiness|Restaurant|[A-Za-z]*Store|[A-Za-z]*Business)"/i.test(
      html,
    ),
    mapa: /google\.[a-z.]+\/maps|maps\.google|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(html),
    tel: enlaces.some((h) => /^tel:/i.test(h)),
    whatsapp: enlaces.some((h) => /wa\.me|api\.whatsapp|whatsapp\.com\/send/i.test(h)),
    email: enlaces.find((h) => /^mailto:/i.test(h))?.replace(/^mailto:/i, "").split("?")[0] || "",
    telefono: enlaces.find((h) => /^tel:/i.test(h))?.replace(/^tel:/i, "") || "",
    formulario: /<form\b/i.test(html) && /<(input|textarea)\b/i.test(html),
    cta: /(pide|solicita|reserva|pedir|contacta|llámanos|llamanos|presupuesto|cita previa|pedir cita|reservar)/i.test(
      cuerpo,
    ),
    reserva: /(reserv|cita online|pedir cita|cita previa|booking|calendly|doctoralia|treatwell|bookitit|thefork|covermanager)/i.test(
      lower,
    ),
    paginasServicios: enlaces.some((h) => /servicio|tratamiento|especialidad/i.test(h)),
    añoCopyright: años.length ? Math.max(...años) : null,
    tecnologiaVieja: jqueryViejo || /<table[^>]+(width|bgcolor)=/i.test(html) || /\.swf\b/i.test(lower),
    generador: (html.match(/<meta[^>]+name=["']generator["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "",
  }
}

/**
 * Analiza una web y devuelve hallazgos, puntos del scoring del plan §10
 * (solo los criterios medibles automáticamente) y problemas para el CRM.
 */
export async function analizarWeb(urlEntrada, { sector = "", localidad = "", psiKey = "" } = {}) {
  const url = normalizarUrl(urlEntrada)
  const r = { url, urlFinal: url, ok: false, hallazgos: [], problemas: new Set(), pts: {} }

  // 1) Descarga de la home (y si redirige http → https)
  let html = ""
  try {
    const { res, texto: t, ms } = await obtener(url)
    r.estado = res.status
    r.urlFinal = res.url
    r.ms = ms
    html = t
    r.ok = res.ok
  } catch (e) {
    r.error = e.name === "TimeoutError" ? "La web no responde (timeout)" : `No se pudo abrir: ${e.message}`
  }
  r.https = r.urlFinal.startsWith("https://")
  if (r.https) {
    const http = r.urlFinal.replace(/^https:/, "http:")
    try {
      const res = await fetch(http, { redirect: "manual", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(10000) })
      r.redirigeAHttps = res.status >= 300 && res.status < 400 && /^https:/i.test(res.headers.get("location") || "")
    } catch {
      r.redirigeAHttps = null
    }
  }

  const h = r.ok ? leerHtml(html) : null
  r.html = h
  const origen = (() => {
    try {
      return new URL(r.urlFinal).origin
    } catch {
      return ""
    }
  })()
  if (r.ok && origen) {
    let robotsTxt = ""
    try {
      const rr = await fetch(`${origen}/robots.txt`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(10000) })
      r.robots = rr.ok
      if (rr.ok) robotsTxt = await rr.text()
    } catch {
      r.robots = false
    }
    r.sitemap =
      /^\s*sitemap:\s*\S+/im.test(robotsTxt) ||
      (await existe(`${origen}/sitemap.xml`)) ||
      (await existe(`${origen}/sitemap_index.xml`))
  }
  // La conversión se valora en la home + la página de contacto (si existe)
  if (h && origen && (!h.formulario || !h.tel || !h.whatsapp)) {
    const enlace = [...html.matchAll(/href=["']([^"'#]+)["']/gi)]
      .map((m) => m[1])
      .find((u) => /contact|contacto|contacta/i.test(u) && !/^mailto:|^tel:/i.test(u))
    if (enlace) {
      try {
        const urlContacto = new URL(enlace, r.urlFinal).href
        if (urlContacto.startsWith(origen)) {
          const { res, texto: t } = await obtener(urlContacto, { timeoutMs: 15000 })
          if (res.ok) {
            const c = leerHtml(t)
            r.paginaContacto = urlContacto
            h.formulario ||= c.formulario
            h.tel ||= c.tel
            h.whatsapp ||= c.whatsapp
            h.email ||= c.email
            h.telefono ||= c.telefono
            h.reserva ||= c.reserva
          }
        }
      } catch {
        // sin página de contacto accesible: se valora solo la home
      }
    }
  }
  r.psi = r.ok ? await pageSpeed(r.urlFinal, psiKey) : { error: "sin web accesible" }
  const psi = r.psi.error ? null : r.psi

  // 2) Hallazgos en lenguaje de empresario + problemas del CRM + puntos
  const add = (texto, problema) => {
    r.hallazgos.push(texto)
    if (problema) r.problemas.add(problema)
  }
  let web = 0
  let seo = 0
  let tec = 0
  let mejora = 0

  if (!r.ok) {
    add(r.error || `La web devuelve un error ${r.estado}`, "Sin HTTPS / errores técnicos")
    tec += 15
    web += 25
  } else {
    if (!r.https) {
      add("La web no usa HTTPS: el navegador la marca como «No segura».", "Sin HTTPS / errores técnicos")
      tec += 8
    } else if (r.redirigeAHttps === false) {
      add("La versión http:// no redirige a https://.", "Sin HTTPS / errores técnicos")
      tec += 3
    }
    if (psi) {
      if (psi.rendimiento < 50 || psi.lcpSeg > 4) {
        add(`En móvil carga lenta (rendimiento ${psi.rendimiento}/100, contenido principal en ${psi.lcpSeg.toFixed(1)} s): muchos visitantes se van antes de verla.`, "Web lenta")
        web += 10
      } else if (psi.rendimiento < 90) {
        add(`Velocidad en móvil mejorable (${psi.rendimiento}/100).`)
        web += 4
      }
      if (psi.cls > 0.25) {
        add("Los elementos «saltan» mientras carga la página.", "Sin HTTPS / errores técnicos")
        tec += 2
      }
    }
    if (!h.viewport) {
      add("No está adaptada al móvil (falta la configuración básica de pantalla).", "Mala experiencia móvil")
      web += 8
    }
    if (h.añoCopyright && h.añoCopyright <= AÑO - 2) {
      add(`El pie de página dice © ${h.añoCopyright}: transmite que la web no se actualiza.`, "Información obsoleta")
      web += 3
    }
    if (h.tecnologiaVieja || (h.añoCopyright && h.añoCopyright <= AÑO - 5)) {
      add("Usa tecnología o maquetación antigua.", "Web antigua")
      web += 4
    }

    // SEO local
    if (!h.title || h.title.length < 15 || h.title.length > 70) {
      add(h.title ? `El título para Google es ${h.title.length < 15 ? "demasiado corto" : "demasiado largo"}: «${h.title}».` : "La página no tiene título para Google.", "Títulos/metadatos pobres")
      seo += 4
    }
    if (!h.desc) {
      add("No tiene descripción para Google: el buscador muestra un texto al azar.", "Títulos/metadatos pobres")
      seo += 4
    }
    if (h.h1s.length !== 1) {
      add(h.h1s.length ? `Tiene ${h.h1s.length} titulares principales (H1); Google espera uno.` : "No tiene titular principal (H1).", "SEO deficiente")
      seo += 3
    }
    if (localidad) {
      const loc = localidad.toLowerCase()
      if (!`${h.title} ${h.h1s.join(" ")}`.toLowerCase().includes(loc)) {
        add(`Ni el título ni el titular mencionan «${localidad}»: cuesta aparecer en búsquedas locales.`, "Mala presencia local")
        seo += 4
      }
    }
    if (!h.schemaLocal) {
      add("No le indica a Google que es un negocio local (datos estructurados).", "Mala presencia local")
      seo += 3
    }
    if (r.sitemap === false) {
      add("No tiene sitemap.xml para ayudar a Google a encontrar sus páginas.", "SEO deficiente")
      seo += 2
    }
    if (psi && psi.seo < 80) seo += 2

    // Técnica
    if (h.imagenes >= 5 && h.imagenesSinAlt / h.imagenes > 0.3) {
      add(`${h.imagenesSinAlt} de ${h.imagenes} imágenes no tienen texto alternativo.`)
      tec += 2
    }
    if (!h.lang) tec += 1
    if (r.robots === false) tec += 1

    // Conversión
    if (!h.tel) {
      add("No hay botón de llamada: en móvil no se puede llamar con un toque.", "Sin CTA")
      mejora += 3
    }
    if (!h.formulario) {
      add("No tiene formulario de contacto (ni en la home ni en su página de contacto).", "Sin formulario eficaz")
      mejora += 4
    }
    if (!h.cta) {
      add("No hay llamadas a la acción claras (pedir presupuesto, reservar, contactar).", "Sin CTA")
      mejora += 3
    }
    if (SECTORES_CON_RESERVA.includes(sector) && !h.reserva) {
      add("No permite reservar o pedir cita online.", "Sin reserva online")
      mejora += 3
    }
    if (!h.whatsapp) mejora += 2
    if (!h.paginasServicios) {
      add("No hay páginas específicas por servicio.", "Sin páginas de servicios")
      mejora += 1
    }
  }

  r.pts = {
    web: Math.min(25, web),
    seoLocal: Math.min(20, seo),
    tecnica: Math.min(15, tec),
    mejora: Math.min(15, mejora),
  }
  r.problemas = [...r.problemas]
  return r
}

const CONSECUENCIA = {
  "Web lenta": "una web lenta en el móvil hace que mucha gente se vaya antes de llamar",
  "Mala experiencia móvil": "la mayoría de clientes os buscan desde el móvil y ahí la web no se ve bien",
  "Sin HTTPS / errores técnicos": "el navegador avisa de que la web «no es segura», y eso frena a muchos clientes",
  "Información obsoleta": "una web que parece sin actualizar resta confianza",
  "Web antigua": "una web anticuada transmite menos confianza que la competencia",
  "Títulos/metadatos pobres": "Google no muestra bien vuestro negocio en los resultados",
  "SEO deficiente": "cuesta más aparecer en Google cuando os buscan",
  "Mala presencia local": "es difícil salir cuando alguien busca vuestro servicio en la zona",
  "Sin CTA": "quien entra no tiene claro cómo contactar con vosotros",
  "Sin formulario eficaz": "se pierden las consultas de quien no quiere llamar",
  "Sin reserva online": "se pierden citas fuera del horario de teléfono",
  "Sin páginas de servicios": "Google y los clientes no encuentran cada servicio por separado",
}

/** Borrador de primer contacto (plantilla de Recursos → Emails tipo). Revisión humana obligatoria. */
export function borradorEmail({ empresa, persona }, analisis) {
  const prioridad = [
    "Sin HTTPS / errores técnicos",
    "Web lenta",
    "Mala experiencia móvil",
    "Sin CTA",
    "Sin reserva online",
    "Mala presencia local",
    "Títulos/metadatos pobres",
    "Sin formulario eficaz",
    "Información obsoleta",
    "SEO deficiente",
    "Web antigua",
    "Sin páginas de servicios",
  ]
  const top = prioridad.filter((p) => analisis.problemas.includes(p)).slice(0, 2)
  const nombre = empresa || "vuestro negocio"
  const frases = top.map((p) => analisis.hallazgos.find((hh) => hh && hallazgoDe(p, hh)) || p)
  const consecuencia = top.length ? CONSECUENCIA[top[0]] : "hay margen para conseguir más contactos desde la web"
  const asunto = `Una cosa que he visto en la web de ${nombre}`
  const cuerpo = [
    `Hola${persona ? ` ${persona}` : ""},`,
    "",
    `Soy [tu nombre], de MP WebLabs, un estudio de diseño y desarrollo web en Madrid. He estado revisando la web de ${nombre} y he visto un par de cosas: ${frases.map((f) => f.replace(/\.$/, "")).map((f) => f.charAt(0).toLowerCase() + f.slice(1)).join("; y ") || "algunos puntos de mejora"}. En negocios como el vuestro eso suele significar que ${consecuencia}.`,
    "",
    "Si te sirve, te preparo un análisis gratuito de 5 minutos con lo que cambiaría primero. Sin compromiso.",
    "",
    "Un saludo,",
    "[tu nombre] · MP WebLabs · www.mpweblabs.com",
    "",
    "Si prefieres que no vuelva a escribirte, respóndeme «no» y no lo haré.",
  ].join("\n")
  return { asunto, cuerpo }
}

function hallazgoDe(problema, hallazgo) {
  const claves = {
    "Sin HTTPS / errores técnicos": /https|segura|error|responde/i,
    "Web lenta": /lenta|carga/i,
    "Mala experiencia móvil": /móvil/i,
    "Sin CTA": /llamada|acción/i,
    "Sin reserva online": /reservar|cita/i,
    "Mala presencia local": /local|mencionan/i,
    "Títulos/metadatos pobres": /título|descripción/i,
    "Sin formulario eficaz": /formulario/i,
    "Información obsoleta": /©/i,
    "SEO deficiente": /H1|sitemap/i,
    "Web antigua": /antigua/i,
    "Sin páginas de servicios": /servicio/i,
  }
  return claves[problema]?.test(hallazgo)
}
