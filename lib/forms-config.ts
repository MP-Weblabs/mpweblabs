// Solo para componentes de servidor (layout).
// Clave de Web3Forms: se lee en el servidor (WEB3FORMS_KEY en Vercel; también
// vale NEXT_WEB3FORMS_KEY) y se pasa al navegador por props, porque el plan
// gratuito de Web3Forms solo acepta envíos hechos desde el navegador.
// No es un secreto: Web3Forms la diseña para ir en el cliente.
const KEY_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function web3formsKey(): string {
  const key = (
    process.env.WEB3FORMS_KEY ??
    process.env.NEXT_WEB3FORMS_KEY ??
    ""
  ).trim()
  return KEY_RE.test(key) ? key : ""
}
