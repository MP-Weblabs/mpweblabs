import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Política de cookies de MP WebLabs. Qué cookies utilizamos y cómo gestionarlas.",
}

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
      "Este sitio web utiliza un número mínimo de cookies:",
      [
        "Cookies técnicas imprescindibles para el funcionamiento del sitio.",
        "Cookies de analítica (Vercel Analytics) que recogen datos agregados y anónimos de visitas, sin identificarte personalmente.",
      ],
      "No utilizamos cookies publicitarias ni de seguimiento entre sitios.",
    ],
  },
  {
    title: "Cómo gestionar las cookies",
    body: [
      "Puedes configurar tu navegador para bloquear o eliminar las cookies en cualquier momento. Ten en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del sitio.",
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
      "Para cualquier duda, escríbenos a hola@mpweblabs.com.",
    ],
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      label="Uso de cookies"
      titlePlain="Política de"
      titleSerif="cookies."
      updated="Julio 2026"
      sections={SECTIONS}
    />
  )
}
