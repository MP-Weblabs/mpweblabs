"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS, type Project } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { useSiteChrome } from "@/components/site-chrome"

export function PortfolioPage() {
  const { openModal } = useSiteChrome()
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
            No somos una fábrica de webs. Somos tu partner tecnológico.
            Pruébanos sin riesgo.
          </p>
        </Reveal>
      </section>

      {/* Alternating showcase grid */}
      <div className="flex flex-col">
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.title}
            project={p}
            reversed={i % 2 === 1}
            onOpen={openModal}
          />
        ))}
      </div>

      <PricingStrip onOpen={openModal} />
    </div>
  )
}

function ProjectRow({
  project,
  reversed,
  onOpen,
}: {
  project: Project
  reversed: boolean
  onOpen: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="group grid grid-cols-1 items-center gap-8 border-b border-border px-5 py-12 text-left md:grid-cols-2 md:gap-14 md:px-10 md:py-20"
    >
      {/* image */}
      <Reveal
        variant={reversed ? "right" : "left"}
        className={reversed ? "md:order-2" : ""}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 group-hover:shadow-2xl">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] backdrop-blur">
            {project.year}
          </span>
        </div>
      </Reveal>

      {/* text */}
      <Reveal
        variant={reversed ? "left" : "right"}
        delay={120}
        className={reversed ? "md:order-1" : ""}
      >
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[12px] font-medium tracking-[0.1em] text-accent">
              {project.num}
            </span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {project.tag}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-medium tracking-tight md:text-5xl">
            {project.title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {project.desc}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
            <span className="text-sm font-semibold text-accent">
              {project.result}
            </span>
            <span className="flex items-center gap-1 text-[13px] font-medium text-foreground transition-colors group-hover:text-accent">
              Ver caso
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Reveal>
    </button>
  )
}

function PricingStrip({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="grid grid-cols-1 gap-6 border-b border-border px-5 py-20 md:grid-cols-2 md:gap-8 md:px-10 md:py-28">
      <Reveal variant="left" className="h-full">
        <div className="h-full rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg md:p-10">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            (Prototipo)
          </div>
          <span className="mb-3 inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-accent">
            Gratis
          </span>
          <div className="text-sm text-muted-foreground line-through">450 €</div>
          <div className="text-6xl font-medium tracking-tighter">
            0{" "}
            <span className="font-serif italic tracking-tight">€</span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            Un vídeo con la estructura estratégica y referencias visuales para tu
            proyecto. Ves nuestra visión antes de cualquier pago.
          </p>
          <Magnetic className="mt-6 block">
            <button
              onClick={onOpen}
              className="btn-fill-light w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              <span>Solicitar mi prototipo →</span>
            </button>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal variant="right" delay={120} className="h-full">
        <div className="h-full rounded-2xl bg-foreground p-8 text-background transition-shadow hover:shadow-2xl md:p-10">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-background/50">
            (Precio web)
          </div>
          <div className="text-sm text-background/40 line-through">2.500 €</div>
          <div className="text-6xl font-medium tracking-tighter">
            <span className="font-serif text-3xl italic tracking-tight">
              desde
            </span>{" "}
            600 €
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-background/65">
            Diseño 100% personalizado, animaciones profesionales, código limpio,
            responsive perfecto, integración de formularios y analíticas. Todo
            incluido.
          </p>
          <Magnetic className="mt-6 block">
            <button
              onClick={onOpen}
              className="w-full rounded-full bg-background py-3.5 text-sm font-semibold text-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              Pedir presupuesto
            </button>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
