"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Plus, Star } from "lucide-react"
import { FAQS, PROJECTS, WHATSAPP_URL, initialsOf } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { ProjectGrid } from "@/components/project-grid"
import { useSiteChrome } from "@/components/site-chrome"

function SectionLabel({
  num,
  children,
}: {
  num: string
  children: React.ReactNode
}) {
  return (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="font-mono">({num})</span>
      {children}
    </p>
  )
}

export function IntroSection() {
  return (
    <section className="border-b border-border px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel num="01">Manifiesto</SectionLabel>
      </Reveal>
      <TextReveal
        as="h2"
        className="mt-8 max-w-5xl text-balance text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl"
        segments={[
          "Una web mediocre es el",
          { text: "gasto más caro", serif: true },
          "de tu negocio.",
        ]}
      />
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="hidden md:col-span-5 md:block" />
        <div className="flex flex-col gap-5 md:col-span-4">
          <Reveal delay={100}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Construimos sitios web desde cero, sin plantillas, para negocios
              de Madrid y de toda España. Cada decisión de diseño tiene un
              único objetivo: convertir a tus visitantes en clientes
              recurrentes.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              No WordPress genérico. No Kit Digital. Código propio, diseño que
              impacta, resultados medibles.
            </p>
          </Reveal>
        </div>
        <div className="flex md:col-span-3 md:justify-end">
          <Reveal delay={200}>
            <Magnetic>
              <Link
                href="/nosotros"
                className="btn-fill-light group flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                <span className="flex items-center gap-2">
                  Conocer el equipo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const SERVICES = [
  { num: "01", title: "Diseño web", desc: "Interfaces a medida que venden" },
  { num: "02", title: "Desarrollo", desc: "Código propio, rápido y limpio" },
  { num: "03", title: "Landing pages", desc: "Una página, un objetivo" },
  { num: "04", title: "SEO técnico", desc: "Visibilidad desde el código" },
]

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="scroll-mt-16 border-b border-border py-20 md:py-28"
    >
      <Reveal>
        <div className="flex items-end justify-between px-5 pb-10 md:px-10">
          <div>
            <SectionLabel num="02">Servicios</SectionLabel>
            <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
              Qué{" "}
              <span className="font-serif font-normal italic">hacemos</span>
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground md:block">
            (04)
          </span>
        </div>
      </Reveal>
      <div>
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} delay={i * 60}>
            <div className="group relative flex items-baseline justify-between gap-6 overflow-hidden border-t border-border px-5 py-7 transition-colors last:border-b md:px-10 md:py-9">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <div className="relative flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/60">
                  {s.num}
                </span>
                <h3 className="text-3xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-background md:text-5xl">
                  {s.title}
                </h3>
              </div>
              <div className="relative hidden items-center gap-6 md:flex">
                <span className="font-serif text-lg italic text-muted-foreground opacity-0 transition-all duration-500 group-hover:text-background/80 group-hover:opacity-100">
                  {s.desc}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function PortfolioPreview() {
  return (
    <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="flex items-end justify-between pb-12">
          <div>
            <SectionLabel num="03">Portfolio</SectionLabel>
            <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
              Trabajo{" "}
              <span className="font-serif font-normal italic">
                seleccionado
              </span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="link-underline group hidden items-center gap-1 text-[13px] font-medium md:flex"
          >
            Ver todos los proyectos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>

      <ProjectGrid projects={PROJECTS.filter((p) => p.featured)} />

      <Reveal>
        <div className="mt-12 md:hidden">
          <Link
            href="/portfolio"
            className="link-underline inline-flex items-center gap-1 text-sm font-medium"
          >
            Ver todos los proyectos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

export function OfferStrip() {
  const { openModal } = useSiteChrome()
  return (
    <section className="bg-foreground text-background">
      <div className="grid grid-cols-1 items-center gap-12 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-36">
        <div>
          <Reveal variant="left">
            <SectionLabelDark num="04">La oferta</SectionLabelDark>
            <h2 className="mt-8 text-6xl font-medium leading-[0.95] tracking-tighter md:text-8xl">
              Prototipo
              <br />
              en 48h.
              <br />
              <span className="font-serif font-normal italic tracking-tight">
                Gratis.
              </span>
            </h2>
          </Reveal>
        </div>
        <Reveal variant="right" delay={120}>
          <div>
            <span className="mb-6 inline-block rounded-full border border-background/25 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-background/80">
              Riesgo cero
            </span>
            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-background/65">
              Antes de que te comprometas, te mostramos nuestra propuesta para
              tu web: estructura, diseño y referencias visuales. Si no te
              convence, no pagas nada.
            </p>
            <Magnetic>
              <button
                onClick={openModal}
                className="group rounded-full bg-background px-7 py-4 text-sm font-semibold text-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                <span className="flex items-center gap-2">
                  Quiero mi prototipo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Magnetic>
            <p className="mt-4 text-xs text-background/60">
              Solo aceptamos 3 proyectos nuevos al mes para garantizar la
              calidad.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SectionLabelDark({
  num,
  children,
}: {
  num: string
  children: React.ReactNode
}) {
  return (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-background/50">
      <span className="font-mono">({num})</span>
      {children}
    </p>
  )
}

const TESTIMONIALS = PROJECTS.filter((p) => p.featured).map((p) => ({
  ...p.testimonial,
  initials: initialsOf(p.testimonial.name),
}))

export function Testimonials() {
  return (
    <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <SectionLabel num="05">Testimonios</SectionLabel>
        <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
          Lo que dicen{" "}
          <span className="font-serif font-normal italic">
            nuestros clientes
          </span>
        </h2>
      </Reveal>
      <div className="mt-14 flex flex-col">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <figure className="grid grid-cols-1 gap-6 border-t border-border py-12 last:border-b md:grid-cols-12 md:py-16">
              <div
                className="flex gap-0.5 md:col-span-2"
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
              <blockquote className="font-serif text-2xl italic leading-snug text-foreground/85 md:col-span-7 md:text-3xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-start gap-3 md:col-span-3 md:justify-end">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-[13px] font-medium">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <SectionLabel num="06">FAQ</SectionLabel>
              <TextReveal
                as="h2"
                className="mt-6 max-w-sm text-balance text-4xl font-medium tracking-tight md:text-5xl"
                segments={[
                  "Todo lo que",
                  { text: "necesitas saber.", serif: true },
                ]}
              />
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                Y si te queda alguna duda, escríbenos. Respondemos en menos de
                24h.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7">
          {FAQS.map((f, i) => {
            const open = openIndex === i
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="border-b border-border first:border-t">
                  <button
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left text-[15px] font-medium transition-colors hover:text-foreground/60 md:text-lg"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        0{i + 1}
                      </span>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 ${
                        open
                          ? "rotate-45 bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className="grid transition-all duration-300 ease-out"
                    style={{
                      gridTemplateRows: open ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-8 pr-12 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  const { openModal } = useSiteChrome()
  return (
    <section className="relative overflow-hidden border-b border-border px-5 py-28 text-center md:px-10 md:py-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <Reveal>
        <p className="relative text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          ¿Empezamos?
        </p>
      </Reveal>
      <TextReveal
        as="h2"
        className="relative mx-auto mt-6 max-w-5xl text-balance text-6xl font-medium leading-[1] tracking-tighter md:text-[7.5rem]"
        segments={["Tu web, lista en", { text: "4–8 semanas.", serif: true }]}
      />
      <Reveal delay={250}>
        <p className="relative mt-7 text-base text-muted-foreground">
          Cuéntanos tu proyecto hoy. Prototipo gratis en 48h.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <button
              onClick={openModal}
              className="btn-fill-light rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
            >
              <span>Solicitar prototipo gratis →</span>
            </button>
          </Magnetic>
          {WHATSAPP_URL && (
            <Magnetic>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-fill-dark flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium"
              >
                <span>WhatsApp</span>
              </a>
            </Magnetic>
          )}
        </div>
        <p className="relative mt-5 text-xs text-muted-foreground">
          Solo 3 proyectos nuevos al mes · Respuesta garantizada en &lt;24h
        </p>
      </Reveal>
    </section>
  )
}
