import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { AboutPage } from "@/components/pages/about-page"

const title = "Nosotros"
const description =
  "Conoce el equipo, los principios y la metodología en 4 fases de MP WebLabs, agencia de diseño y desarrollo web en Madrid con proyectos en toda España."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/nosotros",
})

export default function Page() {
  return <AboutPage />
}
