"use client"

import { FOUNDERS } from "@/lib/site-data"
import { MethodologySection, ValuesSection } from "@/components/home-sections"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { CtaBlock } from "@/components/cta-block"

export function AboutPage() {
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

      <CtaBlock
        title="¿Hablamos de"
        titleSerif="tu proyecto?"
        text="Cuéntanos qué necesitas. Te respondemos en menos de 24h."
      />
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
