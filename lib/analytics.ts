// Analítica y conversiones.
//
// - Vercel Analytics: sin cookies, siempre activo en producción (layout).
// - GA4 y Microsoft Clarity: usan cookies → solo se cargan si el visitante
//   acepta en el banner (LSSI art. 22.2 / RGPD). Se activan definiendo
//   GA_ID y CLARITY_ID en Vercel (ver lib/analytics-config.ts).

/** Eventos de conversión definidos en el plan (sección 23). */
export type AnalyticsEvent =
  | "audit_started" // abre el formulario "Analiza gratis tu web"
  | "audit_completed" // reservado para MP WebLabs Audit (herramienta automática)
  | "lead_submitted" // cualquier formulario enviado con éxito
  | "contact_clicked" // clic en email, teléfono o WhatsApp
  | "meeting_booked" // reservado: cuando exista agenda online
  | "proposal_requested" // formulario "Cuéntanos tu proyecto" / contacto enviado

type Params = Record<string, string | number | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    clarity?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return
  try {
    window.gtag?.("event", event, params)
    window.clarity?.("event", event)
  } catch {
    // la analítica nunca debe romper la web
  }
}

// ————— Consentimiento —————

export type Consent = "granted" | "denied"
const CONSENT_KEY = "mpw-consent"
export const OPEN_CONSENT_EVENT = "mpw:open-consent"

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

const CONSENT_CHANGE_EVENT = "mpw:consent-change"

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // sin almacenamiento: se volverá a preguntar en la próxima visita
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/** Para useSyncExternalStore: avisa cuando cambia el consentimiento. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** Borra las cookies de GA4 y Clarity al retirar el consentimiento. */
export function clearAnalyticsCookies() {
  const host = location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim()
    if (/^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID)/.test(name)) {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`
      }
    }
  }
}

// ————— Atribución (UTMs y referer) —————

const ATTR_KEY = "mpw-attribution"
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]

/** Guarda el origen de la primera página vista en la sesión. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return
    const url = new URL(location.href)
    const parts: string[] = []
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k)
      if (v) parts.push(`${k}=${v.slice(0, 80)}`)
    }
    const ref = document.referrer
    if (ref && new URL(ref).host !== location.host) {
      parts.push(`referer=${new URL(ref).host}`)
    }
    parts.push(`entrada=${url.pathname}`)
    sessionStorage.setItem(ATTR_KEY, parts.join(" · "))
  } catch {
    // sin almacenamiento de sesión: sin atribución
  }
}

export function readAttribution(): string {
  try {
    return sessionStorage.getItem(ATTR_KEY) ?? ""
  } catch {
    return ""
  }
}
