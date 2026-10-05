import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { PortfolioPage } from "@/components/pages/portfolio-page"

const title = "Portfolio"
const description =
  "Webs a medida entregadas por MP WebLabs en Madrid y toda España: automoción, hostelería, transporte y perfumería, con resultados medibles en cada proyecto."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/portfolio",
})

export default function Page() {
  return <PortfolioPage />
}
