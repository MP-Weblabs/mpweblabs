"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/lib/site-data"
import type { Sector } from "@/lib/sectors"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { ProjectGrid } from "@/components/project-grid"
import { FaqSection, SectionLabel } from "@/components/home-sections"
import { useSiteChrome } from "@/components/site-chrome"
import { CtaBlock } from "@/components/cta-block"

export function SectorPage({ sector }: { sector: Sector }) {
  const { openModal, openAudit } = useSiteChrome()
  const projects = PROJECTS.filter((p) => sector.projects.includes(p.slug))

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border px-5 pb-20 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Sectores)</span>
            {sector.name}
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-5xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={[sector.headline[0], { text: sector.headline[1], serif: true }]}
        />
        <Reveal delay={300}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            {sector.intro}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <button
                onClick={openAudit}
                className="btn-fill-light w-full rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"
              >
                <span>Analiza gratis tu web →</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={openModal}
                className="btn-fill-dark w-full rounded-full border border-border px-7 py-4 text-sm font-semibold"
              >
                <span>Cuéntanos tu proyecto</span>
              </button>
            </Magnetic>
          </div>
          <ul
            aria-label="Para quién"
            className="mt-12 flex flex-wrap gap-2"
          >
            {sector.audiences.map((a) => (
              <li
                key={a}
                className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Problemas */}
      <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <SectionLabel num="01">El problema</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Por qué muchas webs del sector{" "}
            <span className="font-serif font-normal italic">
              pierden clientes
            </span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {sector.problems.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90} className="h-full">
              <div className="h-full bg-background p-8 md:p-10">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Solución */}
      <section className="bg-foreground px-5 py-20 text-background md:px-10 md:py-28">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-background/50">
            <span className="font-mono">(02)</span>
            Qué hacemos
          </p>
          <h2 className="mt-6 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">
            Una web pensada para{" "}
            <span className="font-serif font-normal italic">
              cómo compra tu cliente
            </span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16">
          {sector.solutions.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 90}>
              <div className="border-t border-background/20 pt-6">
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-background/65">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            href="/servicios"
            className="mt-14 inline-flex items-center gap-1 text-[13px] font-medium text-background/80 underline-offset-4 hover:underline"
          >
            Ver todos los servicios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Proyectos reales */}
      {projects.length > 0 && (
        <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="pb-12">
              <SectionLabel num="03">Casos reales</SectionLabel>
              <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
                Lo que hemos hecho{" "}
                <span className="font-serif font-normal italic">
                  en {sector.name.toLowerCase()}
                </span>
              </h2>
            </div>
          </Reveal>
          <ProjectGrid projects={projects} />
        </section>
      )}

      <FaqSection items={sector.faqs} num="04" />

      {/* CTA final */}
      <CtaBlock
        title="¿Cuántas consultas"
        titleSerif="estás perdiendo?"
        text="Revisamos tu web gratis y te decimos qué cambiaríamos primero."
        lead="auditoria"
      />
    </div>
  )
}
