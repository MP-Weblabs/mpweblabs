import type { Metadata } from "next"

const SITE_NAME = "MP WebLabs"

/**
 * Metadata for a page. Next.js does not deep-merge `openGraph`/`twitter`
 * with the root layout, so every page needs the shared fields repeated.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
  type = "website",
}: {
  /** page title; omit for the home page (uses the layout default) */
  title?: string
  description: string
  path: string
  /** defaults to app/opengraph-image */
  images?: string[]
  type?: "website" | "article"
}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : undefined
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "es_ES",
      siteName: SITE_NAME,
      url: path,
      description,
      ...(fullTitle ? { title: fullTitle } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      description,
      ...(fullTitle ? { title: fullTitle } : {}),
      ...(images ? { images } : {}),
    },
  }
}
