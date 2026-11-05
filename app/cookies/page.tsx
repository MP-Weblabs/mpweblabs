import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { LegalPage, type LegalSection } from "@/components/pages/legal-page"
import { CONTACT_EMAIL } from "@/lib/site-data"
import { CLARITY_ID, GA_ID, HAS_CONSENT_TOOLS } from "@/lib/analytics"

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
      HAS_CONSENT_TOOLS
        ? "Este sitio no utiliza cookies publicitarias. Las cookies de analítica solo se instalan si las aceptas en el aviso de cookies, y puedes cambiar tu decisión en cualquier momento desde «Configurar cookies», en el pie de página."
        : "Este sitio web no instala cookies propias ni de terceros con fines analíticos, publicitarios o de seguimiento. Por eso no te mostramos un banner de consentimiento.",
      [
        "Estadísticas sin cookies: usamos Vercel Web Analytics, que mide las visitas de forma agregada y anónima sin utilizar cookies ni identificadores persistentes.",
        ...(GA_ID
          ? [
              "Google Analytics 4 (Google Ireland Ltd.), solo con tu consentimiento: cookies _ga y _ga_* para medir visitas y conversiones de forma estadística. Duración: hasta 2 años. Sin uso publicitario.",
            ]
          : []),
        ...(CLARITY_ID
          ? [
              "Microsoft Clarity (Microsoft Corporation), solo con tu consentimiento: cookies _clck y _clsk para analizar de forma agregada cómo se navega por la web (clics, desplazamiento). Duración: hasta 1 año. Sin uso publicitario.",
            ]
          : []),
        "Almacenamiento técnico: guardamos en tu navegador tu decisión sobre las cookies, el origen de tu visita durante la sesión (para saber qué canal nos trajo tu consulta si nos escribes) y un indicador para no repetir la animación de entrada. No contienen datos personales.",
      ],
      "Si incorporamos nuevas cookies que requieran tu consentimiento, actualizaremos esta política y te lo pediremos antes de instalarlas.",
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
      updated="Noviembre 2026"
      sections={SECTIONS}
    />
  )
}
