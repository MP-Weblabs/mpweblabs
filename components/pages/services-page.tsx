"use client"

import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { PROJECTS, SERVICES } from "@/lib/site-data"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { CtaBlock } from "@/components/cta-block"

export function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border px-5 pb-20 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Servicios)</span>
            Madrid · Toda España
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-5xl text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-8xl"
          segments={[
            "Todo lo que necesitas para que tu web",
            { text: "traiga clientes.", serif: true },
          ]}
        />
        <Reveal delay={300}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Diseño, desarrollo, SEO local y mantenimiento trabajando juntos.
            Puedes contratar un servicio concreto o el sistema completo: web,
            posicionamiento y mantenimiento mes a mes.
          </p>
        </Reveal>
        <nav aria-label="Servicios" className="mt-10 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="btn-fill-dark rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
            >
              <span>{s.title}</span>
            </a>
          ))}
        </nav>
      </section>

      {SERVICES.map((s) => {
        const related = PROJECTS.filter((p) => s.projects?.includes(p.slug))
        return (
          <section
            key={s.slug}
            id={s.slug}
            className="scroll-mt-20 border-b border-border px-5 py-20 md:px-10 md:py-28"
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-5">
                <p className="font-mono text-xs text-muted-foreground">
                  {s.num}
                </p>
                <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
                  {s.title}
                </h2>
                <p className="mt-4 font-serif text-xl italic text-muted-foreground">
                  {s.short}
                </p>
              </Reveal>
              <Reveal delay={100} className="md:col-span-7">
                <p className="text-lg leading-relaxed">{s.desc}</p>
                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {s.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-foreground pl-4 text-[15px] leading-relaxed">
                  <span className="font-semibold">Ideal para: </span>
                  <span className="text-muted-foreground">{s.idealFor}</span>
                </p>
                {related.length > 0 && (
                  <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                    <span className="text-muted-foreground">
                      Lo hemos aplicado en:
                    </span>
                    {related.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/proyectos/${p.slug}`}
                        className="link-underline inline-flex items-center gap-1 font-medium"
                      >
                        {p.title}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </p>
                )}
              </Reveal>
            </div>
          </section>
        )
      })}

      <CtaBlock
        title="¿No sabes qué"
        titleSerif="necesitas?"
        text="Empieza por un análisis gratuito de tu web, o cuéntanos tu proyecto y te proponemos lo que tiene sentido para tu negocio."
      />
    </div>
  )
}
