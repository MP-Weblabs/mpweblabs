import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "MP WebLabs — Diseño y desarrollo web en Madrid"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/mpweblabs-logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f1efe9",
          color: "#1f1f1f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={330} height={80} alt="" />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            Madrid · España
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: -4,
          }}
        >
          <span>Diseñamos webs</span>
          <span>que venden.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #d6d3cc",
            paddingTop: 28,
            fontSize: 28,
            color: "#4a4a4a",
          }}
        >
          <span>Diseño y desarrollo web a medida</span>
          <span
            style={{
              background: "#1f1f1f",
              color: "#f1efe9",
              padding: "12px 26px",
              borderRadius: 999,
              fontSize: 24,
            }}
          >
            Analiza gratis tu web
          </span>
        </div>
      </div>
    ),
    size,
  )
}
