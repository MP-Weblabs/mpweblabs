import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { ContactPage } from "@/components/pages/contact-page"

const title = "Contacto"
const description =
  "Agencia de diseño web en Madrid que trabaja con clientes de toda España. Cuéntanos tu proyecto: te respondemos en menos de 24h y te enviamos una propuesta a medida."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contacto",
})

export default function Page() {
  return <ContactPage />
}
