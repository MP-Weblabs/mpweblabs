import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de MP WebLabs. Cómo tratamos y protegemos tus datos personales.",
}

const SECTIONS: LegalSection[] = [
  {
    title: "Responsable del tratamiento",
    body: [
      "MP WebLabs (en adelante, «el Estudio»), con domicilio en Madrid, España, es el responsable del tratamiento de los datos personales que nos facilites a través de este sitio web.",
      "Puedes contactar con nosotros en hola@mpweblabs.com para cualquier cuestión relacionada con la protección de tus datos.",
    ],
  },
  {
    title: "Datos que recopilamos",
    body: [
      "Únicamente tratamos los datos que tú nos facilitas voluntariamente a través de los formularios de contacto y solicitud de prototipo:",
      [
        "Nombre completo",
        "Dirección de correo electrónico",
        "Número de teléfono (opcional)",
        "Información sobre tu proyecto que decidas compartir",
      ],
    ],
  },
  {
    title: "Finalidad del tratamiento",
    body: [
      "Utilizamos tus datos exclusivamente para responder a tu solicitud, elaborar el prototipo o presupuesto que nos pidas y mantener la comunicación comercial relacionada con tu proyecto.",
      "No utilizamos tus datos para enviarte publicidad no solicitada ni los cedemos a terceros con fines comerciales.",
    ],
  },
  {
    title: "Base legal",
    body: [
      "La base legal para el tratamiento es tu consentimiento, otorgado al marcar la casilla de aceptación de esta política antes de enviar cualquier formulario, así como la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).",
    ],
  },
  {
    title: "Conservación de los datos",
    body: [
      "Conservamos tus datos mientras dure la relación comercial o hasta que solicites su supresión. Si tu solicitud no llega a convertirse en proyecto, eliminamos tus datos en un plazo máximo de 12 meses.",
    ],
  },
  {
    title: "Tus derechos",
    body: [
      "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a hola@mpweblabs.com.",
      "Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
    ],
  },
  {
    title: "Seguridad",
    body: [
      "Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos contra el acceso no autorizado, la alteración o la pérdida, incluyendo cifrado en tránsito (HTTPS) y acceso restringido a la información.",
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <LegalPage
      label="Protección de datos"
      titlePlain="Política de"
      titleSerif="privacidad."
      updated="Julio 2026"
      sections={SECTIONS}
    />
  )
}
