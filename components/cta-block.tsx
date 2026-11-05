"use client"

import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { useSiteChrome } from "@/components/site-chrome"

/**
 * Bloque final de conversión, común a todas las páginas internas.
 * `lead` decide qué CTA va primero: el análisis gratuito o el proyecto.
 */
export function CtaBlock({
  title,
  titleSerif,
  text,
  lead = "proyecto",
}: {
  title: string
  titleSerif: string
  text: string
  lead?: "proyecto" | "auditoria"
}) {
  const { openModal, openAudit } = useSiteChrome()
  const project = { label: "Cuéntanos tu proyecto", onClick: openModal }
  const audit = { label: "Analiza gratis tu web", onClick: openAudit }
  const [primary, secondary] =
    lead === "auditoria" ? [audit, project] : [project, audit]

  return (
    <section className="relative overflow-hidden border-b border-border px-5 py-28 text-center md:px-10 md:py-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <TextReveal
        as="h2"
        className="relative mx-auto max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
        segments={[title, { text: titleSerif, serif: true }]}
      />
      <Reveal delay={250}>
        <p className="relative mx-auto mt-6 max-w-md text-base text-muted-foreground">
          {text}
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <button
              onClick={primary.onClick}
              className="btn-fill-light rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
            >
              <span>{primary.label} →</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={secondary.onClick}
              className="btn-fill-dark rounded-full border border-border px-7 py-4 text-sm font-medium"
            >
              <span>{secondary.label}</span>
            </button>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
