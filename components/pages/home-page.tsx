"use client"

import { BrutalHero } from "@/components/brutal-hero"
import {
  CtaSection,
  FaqSection,
  IntroSection,
  MethodologySection,
  OfferStrip,
  PortfolioPreview,
  ProofStrip,
  SectorsSection,
  ServicesSection,
  Testimonials,
  ValuesSection,
} from "@/components/home-sections"
import { Marquee } from "@/components/marquee"
import { DISPLAY_TICKER } from "@/lib/site-data"

// Orden según el plan: hero → resultados → servicios → proyectos → sectores →
// metodología → por qué → testimonios → CTA auditoría → FAQ → CTA reunión.
export function HomePage() {
  return (
    <div>
      <BrutalHero />
      <ProofStrip />
      <IntroSection />
      <ServicesSection />
      <PortfolioPreview />
      <SectorsSection num="04" />
      <MethodologySection num="05" />
      <ValuesSection num="06" label="Por qué MP WebLabs" />
      <Testimonials num="07" />
      <OfferStrip num="08" />
      <Marquee items={DISPLAY_TICKER} variant="display" />
      <FaqSection num="09" />
      <CtaSection />
    </div>
  )
}
