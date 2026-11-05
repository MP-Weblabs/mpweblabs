"use client"

import { PROJECTS } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { ProjectGrid } from "@/components/project-grid"
import { useSiteChrome } from "@/components/site-chrome"

export function PortfolioPage() {
  const { openModal, openAudit } = useSiteChrome()
  return (
    <div>
      <section className="border-b border-border px-5 pb-20 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Portfolio)</span>
            2023 — 2026
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={[
            "+10 webs hechas.",
            { text: "Estas son las mejores.", serif: true },
          ]}
        />
        <Reveal delay={300}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            No somos una fábrica de webs. Somos tu partner tecnológico en
            Madrid, con proyectos entregados en toda España. Cada proyecto
            empieza por un problema de negocio concreto.
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <ProjectGrid projects={PROJECTS} />
      </section>

      <CtaStrip onProject={openModal} onAudit={openAudit} />
    </div>
  )
}

function CtaStrip({
  onProject,
  onAudit,
}: {
  onProject: () => void
  onAudit: () => void
}) {
  return (
    <section className="grid grid-cols-1 gap-6 border-b border-border px-5 py-20 md:grid-cols-2 md:gap-8 md:px-10 md:py-28">
      <Reveal variant="left" className="h-full">
        <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg md:p-10">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            (Análisis gratuito)
          </div>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            ¿Tu web trae{" "}
            <span className="font-serif font-normal italic">clientes?</span>
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            Revisamos personalmente tu web —velocidad, móvil, Google y
            conversión— y te enviamos los problemas prioritarios, explicados
            sin tecnicismos. Sin compromiso.
          </p>
          <Magnetic className="mt-auto block pt-6">
            <button
              onClick={onAudit}
              className="btn-fill-light w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              <span>Analiza gratis tu web →</span>
            </button>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal variant="right" delay={120} className="h-full">
        <div className="flex h-full flex-col rounded-2xl bg-foreground p-8 text-background transition-shadow hover:shadow-2xl md:p-10">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-background/50">
            (Nuevo proyecto)
          </div>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            Propuesta{" "}
            <span className="font-serif font-normal italic">a medida</span>
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-background/65">
            Diseño personalizado, código propio, SEO técnico, formularios y
            analítica. Tras una primera llamada te enviamos precio y plazos
            por escrito, sin sorpresas.
          </p>
          <Magnetic className="mt-auto block pt-6">
            <button
              onClick={onProject}
              className="w-full rounded-full bg-background py-3.5 text-sm font-semibold text-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              Solicitar propuesta
            </button>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
