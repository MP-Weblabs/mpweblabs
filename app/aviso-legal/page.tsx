import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Aviso legal de MP WebLabs. Condiciones de uso de este sitio web.",
}

const SECTIONS: LegalSection[] = [
  {
    title: "Identificación del titular",
    body: [
      "En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de MP WebLabs, con domicilio en Madrid, España.",
      "Contacto: hola@mpweblabs.com",
    ],
  },
  {
    title: "Objeto",
    body: [
      "Este sitio web tiene por objeto dar a conocer los servicios de diseño y desarrollo web del Estudio, así como facilitar el contacto con clientes potenciales interesados en dichos servicios.",
    ],
  },
  {
    title: "Condiciones de uso",
    body: [
      "El acceso y la navegación por este sitio web atribuyen la condición de usuario e implican la aceptación de las condiciones aquí recogidas.",
      "El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.",
    ],
  },
  {
    title: "Propiedad intelectual",
    body: [
      "Todos los contenidos de este sitio web — diseño, código fuente, textos, imágenes, logotipos y demás elementos — son titularidad de MP WebLabs o de sus respectivos autores, y están protegidos por la normativa de propiedad intelectual e industrial.",
      "Queda prohibida su reproducción, distribución o transformación sin autorización expresa del titular.",
    ],
  },
  {
    title: "Responsabilidad",
    body: [
      "El Estudio no se hace responsable de los daños derivados del uso incorrecto de este sitio web ni de los contenidos de sitios de terceros enlazados desde el mismo.",
      "Trabajamos para que la información publicada sea precisa y esté actualizada, pero no garantizamos la ausencia total de errores.",
    ],
  },
  {
    title: "Legislación aplicable",
    body: [
      "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, salvo que la normativa de consumidores disponga otra cosa.",
    ],
  },
]

export default function AvisoLegalPage() {
  return (
    <LegalPage
      label="Condiciones de uso"
      titlePlain="Aviso"
      titleSerif="legal."
      updated="Julio 2026"
      sections={SECTIONS}
    />
  )
}
