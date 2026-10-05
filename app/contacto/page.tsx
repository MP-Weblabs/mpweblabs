import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { ContactPage } from "@/components/pages/contact-page"

const title = "Contacto"
const description =
  "Agencia de diseño web en Madrid que trabaja con clientes de toda España. Cuéntanos tu proyecto y recibe una propuesta visual gratis en menos de 48 horas. Sin compromiso."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contacto",
})

export default function Page() {
  return <ContactPage />
}
