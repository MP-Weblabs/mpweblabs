"use client"

import { FOUNDERS } from "@/lib/site-data"
import { MethodologySection, ValuesSection } from "@/components/home-sections"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { useSiteChrome } from "@/components/site-chrome"

export function AboutPage() {
  const { openModal, openAudit } = useSiteChrome()
  return (
    <div>
      <section className="border-b border-border px-5 pb-20 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Nosotros)</span>
            Madrid, España
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={[
            "Maestros en diseño, ventas y en captar",
            { text: "la atención.", serif: true },
          ]}
        />
        <Reveal delay={300}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            No hacemos webs genéricas. Creamos experiencias digitales que
            posicionan tu negocio donde merece estar, en Madrid y en toda
            España.
          </p>
        </Reveal>
      </section>

      <ValuesSection num="01" label="Principios" />

      <Founders />

      <MethodologySection num="03" />

      <section className="relative overflow-hidden border-b border-border px-5 py-28 text-center md:px-10 md:py-40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <TextReveal
          as="h2"
          className="relative mx-auto max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={["¿Hablamos de", { text: "tu proyecto?", serif: true }]}
        />
        <Reveal delay={250}>
          <p className="relative mt-6 text-base text-muted-foreground">
            Cuéntanos qué necesitas. Te respondemos en menos de 24h.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <button
                onClick={openModal}
                className="btn-fill-light rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
              >
                <span>Cuéntanos tu proyecto →</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={openAudit}
                className="btn-fill-dark rounded-full border border-border px-7 py-4 text-sm font-medium"
              >
                <span>Analiza gratis tu web</span>
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function Founders() {
  return (
    <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="font-mono">(02)</span>
          Founders
        </p>
        <h2 className="max-w-lg text-3xl font-medium tracking-tight md:text-5xl">
          Sin intermediarios.{" "}
          <span className="font-serif font-normal italic">
            Solo nosotros dos.
          </span>
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          MP WebLabs lo formamos dos personas. Hablas directamente con
          quien vende, diseña y construye tu web — sin cuentas de cliente
          ni intermediarios.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
        {FOUNDERS.map((f, i) => (
          <Reveal key={f.name} delay={i * 100} className="h-full">
            <div className="flex h-full flex-col gap-5 bg-background p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                {f.initials}
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-tight">
                  {f.name}
                </h3>
                <p className="mt-0.5 text-[13px] uppercase tracking-[0.08em] text-accent">
                  {f.role}
                </p>
              </div>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {f.bio}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
