import type { Metadata } from "next"
import { PortfolioPage } from "@/components/pages/portfolio-page"

const title = "Portfolio"
const description =
  "Webs a medida entregadas por MP WebLabs: automoción, hostelería, transporte y perfumería, con resultados medibles en cada proyecto."

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — MP WebLabs`, description },
  twitter: { title: `${title} — MP WebLabs`, description },
}

export default function Page() {
  return <PortfolioPage />
}
