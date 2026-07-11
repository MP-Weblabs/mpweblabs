import { NextResponse } from "next/server"

const NOTION_ENDPOINT = "https://api.notion.com/v1/pages"
const NOTION_LEADS_DATABASE_ID = "1b019482-2747-4091-b2da-4acca39bfab3"

type LeadPayload = {
  nombre?: string
  email?: string
  telefono?: string
  mensaje?: string
  subject?: string
}

// Crea el lead en la base de datos "Leads · Pipeline de ventas" de Notion.
// El email se envía por Web3Forms directamente desde el cliente.
export async function POST(req: Request) {
  let body: LeadPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const nombre = body.nombre?.trim()
  const email = body.email?.trim()
  if (!nombre || !email) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    console.error("NOTION_API_KEY no está configurada")
    return NextResponse.json({ success: false }, { status: 500 })
  }

  const telefono = body.telefono?.trim() ?? ""
  const mensaje = body.mensaje?.trim() ?? ""
  const notas = [
    mensaje,
    body.subject ? `Formulario: ${body.subject.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n")

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
  } catch {
    return NextResponse.json({ success: false }, { status: 502 })
  }
}
