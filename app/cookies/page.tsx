import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { LegalPage, type LegalSection } from "@/components/pages/legal-page"
import { CONTACT_EMAIL } from "@/lib/site-data"

export const metadata: Metadata = pageMetadata({
  title: "Política de cookies",
  description:
    "Política de cookies de MP WebLabs. Qué cookies utilizamos y cómo gestionarlas.",
  path: "/cookies",
})

const SECTIONS: LegalSection[] = [
  {
    title: "Qué son las cookies",
    body: [
      "Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo al navegar. Sirven para recordar preferencias, medir el uso del sitio o mejorar la experiencia de navegación.",
    ],
  },
  {
    title: "Cookies que utilizamos",
    body: [
      "Este sitio web no instala cookies propias ni de terceros con fines analíticos, publicitarios o de seguimiento. Por eso no te mostramos un banner de consentimiento.",
      [
        "Estadísticas: usamos Vercel Web Analytics, que mide las visitas de forma agregada y anónima sin utilizar cookies ni identificadores persistentes.",
        "Almacenamiento técnico: guardamos en el almacenamiento de sesión de tu navegador un indicador para no repetir la animación de entrada. Se borra al cerrar la pestaña y no contiene datos personales.",
      ],
      "Si en el futuro incorporamos cookies que requieran tu consentimiento, actualizaremos esta política y te lo pediremos antes de instalarlas.",
    ],
  },
  {
    title: "Cómo gestionar las cookies",
    body: [
      "En cualquier caso, puedes configurar tu navegador para bloquear o eliminar las cookies y el almacenamiento local en cualquier momento:",
      [
        "Chrome: Configuración → Privacidad y seguridad → Cookies",
        "Firefox: Ajustes → Privacidad y seguridad",
        "Safari: Preferencias → Privacidad",
        "Edge: Configuración → Cookies y permisos del sitio",
      ],
    ],
  },
  {
    title: "Actualizaciones de esta política",
    body: [
      "Podemos actualizar esta política para reflejar cambios en las cookies que utilizamos. La fecha de la última revisión figura en la cabecera de esta página.",
      `Para cualquier duda, escríbenos a ${CONTACT_EMAIL}.`,
    ],
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      label="Uso de cookies"
      titlePlain="Política de"
      titleSerif="cookies."
      updated="Octubre 2026"
      sections={SECTIONS}
    />
  )
}
