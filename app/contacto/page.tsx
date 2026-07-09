import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact-page"

const title = "Contacto"
const description =
  "Cuéntanos tu proyecto y recibe un prototipo completo gratis en menos de 48 horas. Sin compromiso."

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — MP WebLabs`, description },
  twitter: { title: `${title} — MP WebLabs`, description },
}

export default function Page() {
  return <ContactPage />
}
