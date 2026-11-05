// Solo para componentes de servidor (layout, páginas).
// IDs de GA4 y Clarity. Se leen en el servidor (GA_ID / CLARITY_ID en Vercel;
// también se aceptan NEXT_GA_ID / NEXT_CLARITY_ID)
// y se pasan como props a los componentes de cliente. Se validan porque se
// insertan dentro de un <script> inline.
const GA_RE = /^G-[A-Z0-9]{4,20}$/
const CLARITY_RE = /^[a-z0-9]{4,20}$/i

export function analyticsConfig() {
  const ga = (process.env.GA_ID ?? process.env.NEXT_GA_ID ?? "").trim()
  const clarity = (
    process.env.CLARITY_ID ??
    process.env.NEXT_CLARITY_ID ??
    ""
  ).trim()
  const gaId = GA_RE.test(ga) ? ga : ""
  const clarityId = CLARITY_RE.test(clarity) ? clarity : ""
  return { gaId, clarityId, hasConsentTools: Boolean(gaId || clarityId) }
}
