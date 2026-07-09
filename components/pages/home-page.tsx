"use client"

import { BrutalHero } from "@/components/brutal-hero"
import {
  CtaSection,
  FaqSection,
  IntroSection,
  OfferStrip,
  PortfolioPreview,
  ServicesSection,
  Testimonials,
} from "@/components/home-sections"
import { Marquee } from "@/components/marquee"
import { DISPLAY_TICKER, TICKER_CTA_ITEMS } from "@/lib/site-data"

export function HomePage() {
  return (
    <div>
      <BrutalHero />
      <Marquee items={DISPLAY_TICKER} variant="display" />
      <IntroSection />
      <ServicesSection />
      <PortfolioPreview />
      <OfferStrip />
      <Marquee items={TICKER_CTA_ITEMS} variant="bold" />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
