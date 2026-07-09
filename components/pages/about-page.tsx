"use client"

import { Check } from "lucide-react"
import { METHODOLOGY, VALUES } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { useSiteChrome } from "@/components/site-chrome"

export function AboutPage() {
  const { openModal } = useSiteChrome()
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
            posicionan tu negocio donde merece estar.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(01)</span>
            Principios
          </p>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            Lo que nos{" "}
            <span className="font-serif font-normal italic">diferencia</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.num} delay={(i % 3) * 90} className="h-full">
              <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-foreground">
                <div className="mb-4 font-mono text-[11px] tracking-[0.1em] text-muted-foreground transition-colors duration-500 group-hover:text-background/50">
                  {v.num}
                </div>
                <h3 className="mb-2 text-lg font-medium transition-colors duration-500 group-hover:text-background">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/65">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Methodology />

      <section className="relative overflow-hidden border-b border-border px-5 py-28 text-center md:px-10 md:py-40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <TextReveal
          as="h2"
          className="relative mx-auto max-w-4xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={["¿Hablamos de", { text: "tu proyecto?", serif: true }]}
        />
        <Reveal delay={250}>
          <p className="relative mt-6 text-base text-muted-foreground">
            Cuéntanos qué necesitas. Prototipo gratis en 48h.
          </p>
          <div className="relative mt-9 flex justify-center">
            <Magnetic>
              <button
                onClick={openModal}
                className="btn-fill-light rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
              >
                <span>Solicitar prototipo gratis →</span>
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function Methodology() {
  return (
    <section className="border-b border-border px-5 py-20 md:px-10 md:py-28">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* sticky intro */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="font-mono">(02)</span>
                Metodología
              </p>
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                Cuatro fases.
                <br />
                <span className="font-serif font-normal italic">
                  Cero sorpresas.
                </span>
              </h2>
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                Un flujo 100% transparente donde cada etapa garantiza claridad
                absoluta y ejecución técnica impecable.
              </p>
            </Reveal>
          </div>
        </div>

        {/* phase cards */}
        <div className="flex flex-col gap-4 md:col-span-8">
          {METHODOLOGY.map((phase, i) => (
            <Reveal key={phase.id} delay={i * 80} variant="up">
              <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl md:p-9">
                {/* big ghost number */}
                <span className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[8rem] italic leading-none tracking-tighter text-foreground/[0.05] transition-colors group-hover:text-foreground/10 md:text-[10rem]">
                  {phase.id}
                </span>
                <div className="relative">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
                      {phase.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {phase.week}
                    </span>
                  </div>
                  <h3 className="mb-2 max-w-md text-xl font-medium tracking-tight md:text-2xl">
                    {phase.title}
                  </h3>
                  <p className="mb-5 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                    {phase.desc}
                  </p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {phase.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-[13px] text-foreground/70"
                      >
                        <Check className="h-4 w-4 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
