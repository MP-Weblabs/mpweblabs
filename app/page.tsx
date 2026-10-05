import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { FAQS, SITE_DESCRIPTION } from "@/lib/site-data"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
})

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <HomePage />
    </>
  )
}
