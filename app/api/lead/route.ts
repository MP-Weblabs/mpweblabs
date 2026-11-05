import { NextResponse } from "next/server"

const NOTION_ENDPOINT = "https://api.notion.com/v1/pages"
const NOTION_LEADS_DATABASE_ID = "1b019482-2747-4091-b2da-4acca39bfab3"

// Notion rechaza textos de más de 2000 caracteres por bloque rich_text.
const NOTION_TEXT_LIMIT = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Límite básico anti-spam: N envíos por IP y ventana. Vive en memoria de cada
// instancia serverless, así que es "best-effort" (suficiente para frenar
// abusos simples; para algo más estricto, usar Upstash/Vercel KV).
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > RATE_LIMIT
}

/** Solo aceptamos peticiones hechas desde la propia web. */
function sameOrigin(req: Request) {
  const origin = req.headers.get("origin")
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : ""

// Crea el lead en la base de datos "Leads · Pipeline de ventas" de Notion.
// El email se envía por Web3Forms directamente desde el cliente.
export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ success: false }, { status: 403 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ success: false }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const nombre = clean(body.nombre, 120)
  const email = clean(body.email, 160)
  if (!nombre || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    console.error("NOTION_API_KEY no está configurada")
    return NextResponse.json({ success: false }, { status: 500 })
  }

  const telefono = clean(body.telefono, 30)
  const mensaje = clean(body.mensaje, 1800)
  const subject = clean(body.subject, 120)
  const web = clean(body.web, 200)
  const origen = clean(body.origen, 400)
  const notas = [
    web ? `Web: ${web}` : "",
    mensaje,
    subject ? `Formulario: ${subject}` : "",
    origen ? `Origen visita: ${origen}` : "",
  ]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, NOTION_TEXT_LIMIT)

  try {
    const res = await fetch(NOTION_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_LEADS_DATABASE_ID },
        properties: {
          Nombre: { title: [{ text: { content: nombre } }] },
          Email: { email },
          ...(telefono ? { Teléfono: { phone_number: telefono } } : {}),
          ...(notas
            ? { Notas: { rich_text: [{ text: { content: notas } }] } }
            : {}),
          Origen: { select: { name: "Web" } },
          Etapa: { select: { name: "Nuevo" } },
        },
      }),
    })
    if (!res.ok) {
      console.error("Notion API error:", res.status, await res.text())
      return NextResponse.json({ success: false }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Notion API request failed:", err)
    return NextResponse.json({ success: false }, { status: 502 })
  }
}
