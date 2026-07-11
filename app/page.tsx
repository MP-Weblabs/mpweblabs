import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { FAQS } from "@/lib/site-data"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

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
