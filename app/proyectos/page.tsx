import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { ProjectsPage } from "@/components/pages/projects-page"

const title = "Proyectos y casos de éxito"
const description =
  "Webs a medida entregadas por MP WebLabs en Madrid y toda España: automoción, hostelería, transporte y perfumería, con resultados medibles en cada proyecto."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/proyectos",
})

export default function Page() {
  return <ProjectsPage />
}
