import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SectorPage } from "@/components/pages/sector-page"
import { SECTORS } from "@/lib/sectors"
import { SITE_URL } from "@/lib/site-data"
import { pageMetadata } from "@/lib/metadata"

// Solo existen los sectores definidos en lib/sectors.ts.
export const dynamicParams = false

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sector = SECTORS.find((s) => s.slug === slug)
  if (!sector) return {}
  return pageMetadata({
    title: sector.metaTitle,
    description: sector.metaDescription,
    path: `/sectores/${sector.slug}`,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sector = SECTORS.find((s) => s.slug === slug)
  if (!sector) notFound()

  const BREADCRUMB_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: sector.name,
        item: `${SITE_URL}/sectores/${sector.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <SectorPage sector={sector} />
    </>
  )
}
