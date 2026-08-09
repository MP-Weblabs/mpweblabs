import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact-page"

const title = "Contacto"
const description =
  "Agencia de diseño web en Madrid que trabaja con clientes de toda España. Cuéntanos tu proyecto y recibe un prototipo completo gratis en menos de 48 horas. Sin compromiso."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: `${title} — MP WebLabs`,
    description,
    url: "/contacto",
  },
  twitter: { title: `${title} — MP WebLabs`, description },
}

export default function Page() {
  return <ContactPage />
}
