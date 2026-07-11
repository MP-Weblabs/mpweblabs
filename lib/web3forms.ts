const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export type LeadStatus = "idle" | "sending" | "sent" | "error"

// Envía el lead por dos vías en paralelo:
// 1. Web3Forms directo desde el navegador (el plan gratuito no permite servidor) → email
// 2. /api/lead → entrada en el pipeline de leads de Notion (best-effort)
export async function submitLead(
  form: HTMLFormElement,
  subject: string,
): Promise<boolean> {
  const data = new FormData(form)
  if (data.get("botcheck") !== null) return true // honeypot: descartar bots

  const [emailOk] = await Promise.all([
    sendWeb3Forms(data, subject),
    saveToNotion(data, subject),
  ])
  return emailOk
}

async function sendWeb3Forms(
  data: FormData,
  subject: string,
): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!accessKey) {
    console.error("NEXT_PUBLIC_WEB3FORMS_KEY no está configurada")
    return false
  }
  const payload = new FormData()
  for (const [key, value] of data.entries()) {
    if (key !== "botcheck") payload.append(key, value)
  }
  payload.append("access_key", accessKey)
  payload.append("subject", subject)
  payload.append("from_name", "Web MP WebLabs")
  const clientEmail = data.get("Email")
  if (typeof clientEmail === "string" && clientEmail) {
    payload.append("replyto", clientEmail)
  }
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: payload,
    })
    const json = await res.json()
    return json.success === true
  } catch {
    return false
  }
}

async function saveToNotion(data: FormData, subject: string): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: data.get("Nombre"),
        email: data.get("Email"),
        telefono: data.get("Teléfono"),
        mensaje: data.get("Mensaje"),
        subject,
      }),
    })
    const json = await res.json()
    return json.success === true
  } catch {
    return false
  }
}
