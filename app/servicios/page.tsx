import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { ServicesPage } from "@/components/pages/services-page"
import { SERVICES, SITE_URL } from "@/lib/site-data"

const title = "Servicios de diseño web, desarrollo y SEO local"
const description =
  "Diseño web, desarrollo web, aplicaciones web, SEO local y mantenimiento en Madrid y toda España. Webs rápidas, optimizadas para Google y pensadas para generar clientes."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/servicios",
})

const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.desc,
      url: `${SITE_URL}/servicios#${s.slug}`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "City", name: "Madrid" },
        { "@type": "Country", name: "España" },
      ],
    },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />
      <ServicesPage />
    </>
  )
}
