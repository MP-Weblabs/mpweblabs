import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about-page"

const title = "Nosotros"
const description =
  "Conoce el equipo, los principios y la metodología en 4 fases de MP WebLabs, agencia de diseño y desarrollo web en Madrid con proyectos en toda España."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: `${title} — MP WebLabs`,
    description,
    url: "/nosotros",
  },
  twitter: { title: `${title} — MP WebLabs`, description },
}

export default function Page() {
  return <AboutPage />
}
