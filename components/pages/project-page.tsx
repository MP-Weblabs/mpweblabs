"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Star } from "lucide-react"
import { PROJECTS, initialsOf, type Project } from "@/lib/site-data"
import { SECTORS } from "@/lib/sectors"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { CtaBlock } from "@/components/cta-block"

export function ProjectPage({ project }: { project: Project }) {
  const index = PROJECTS.findIndex((p) => p.slug === project.slug)
  const sector = SECTORS.find((s) => s.projects.includes(project.slug))
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <div>
      <section className="border-b border-border px-5 pb-16 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/proyectos"
              className="link-underline group flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Todos los proyectos
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {project.tag} · {project.year}
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={[project.title]}
        />
        <Reveal delay={250}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            {project.desc}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn-fill-dark group mt-6 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                Visitar web
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          )}
          {sector && (
            <Link
              href={`/sectores/${sector.slug}`}
              className="link-underline mt-6 flex w-fit items-center gap-1 text-[13px] font-medium text-muted-foreground"
            >
              Más sobre webs para {sector.name.toLowerCase()}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            <Meta label="Cliente" value={project.title} />
            <Meta label="Ubicación" value={project.location} />
            <Meta label="Duración" value={project.duration} />
            <Meta label="Resultado" value={project.result} accent />
          </div>
        </Reveal>
      </section>

      <section className="border-b border-border px-5 py-12 md:px-10 md:py-16">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:aspect-[21/9]">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
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
        </Reveal>
      </section>

      <section className="grid grid-cols-1 gap-12 border-b border-border px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="font-mono">(01)</span>
              El reto
            </p>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Dónde{" "}
              <span className="font-serif font-normal italic">
                empezamos
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={100}>
            <p className="max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-12 border-b border-border px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="font-mono">(02)</span>
              La solución
            </p>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              Cómo lo{" "}
              <span className="font-serif font-normal italic">
                resolvimos
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4 md:col-span-8">
          {project.approach.map((step, i) => (
            <Reveal key={step} delay={i * 80} variant="up">
              <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-[15px] leading-relaxed text-foreground/80">
                  {step}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-foreground px-5 py-20 text-background md:px-10 md:py-28">
        <Reveal variant="left">
          <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-background/50">
            <span className="font-mono">(03)</span>
            El resultado
          </p>
          <h2 className="max-w-lg text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            {project.result}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {project.results.map((r, i) => (
            <Reveal key={r} delay={i * 80 + 150} variant="up">
              <p className="border-t border-background/20 pt-4 text-[14px] leading-relaxed text-background/70">
                {r}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
        <Reveal as="figure">
          <div
            className="flex gap-0.5"
            role="img"
            aria-label="Valoración: 5 de 5"
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <Star
                key={j}
                className="h-3.5 w-3.5 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="mt-6 max-w-3xl font-serif text-2xl italic leading-snug text-foreground/85 md:text-4xl">
            “{project.testimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              {initialsOf(project.testimonial.name)}
            </span>
            <span>
              <span className="block text-[13px] font-medium">
                {project.testimonial.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {project.testimonial.role}
              </span>
            </span>
          </figcaption>
        </Reveal>
      </section>

      <CtaBlock
        title="¿Quieres resultados"
        titleSerif="así?"
        text="Cuéntanos qué necesitas. Te respondemos en menos de 24h."
      />

      <section className="px-5 py-12 md:px-10">
        <Link
          href={`/proyectos/${next.slug}`}
          className="group flex items-center justify-between gap-6 py-6"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Siguiente proyecto
            </p>
            <h3 className="mt-2 text-3xl font-medium tracking-tight md:text-5xl">
              {next.title}
            </h3>
          </div>
          <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </section>
    </div>
  )
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1.5 text-sm font-medium md:text-base ${accent ? "text-accent" : ""}`}
      >
        {value}
      </p>
    </div>
  )
}
