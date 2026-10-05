import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectPage } from "@/components/pages/project-page"
import { PROJECTS, SITE_URL } from "@/lib/site-data"
import { pageMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return {}

  const title = project.title
  const description = `${project.desc} ${project.result} — Caso de estudio de MP WebLabs en ${project.location}.`

  return pageMetadata({
    title,
    description,
    path: `/portfolio/${project.slug}`,
    type: "article",
    images: [project.image],
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const BREADCRUMB_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${SITE_URL}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/portfolio/${project.slug}`,
      },
    ],
  }

  const CASE_STUDY_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Caso de estudio: ${project.title}`,
    description: project.desc,
    about: project.title,
    author: { "@type": "Organization", name: "MP WebLabs", url: SITE_URL },
    image: `${SITE_URL}${project.image}`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([BREADCRUMB_JSON_LD, CASE_STUDY_JSON_LD]),
        }}
      />
      <ProjectPage project={project} />
    </>
  )
}
