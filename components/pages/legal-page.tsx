import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"

export type LegalSection = {
  title: string
  /** paragraphs; an array renders as a bullet list */
  body: (string | string[])[]
}

export function LegalPage({
  label,
  titlePlain,
  titleSerif,
  updated,
  sections,
}: {
  label: string
  titlePlain: string
  titleSerif: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <div>
      <section className="border-b border-border px-5 pb-16 pt-32 md:px-10 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Legal)</span>
            {label}
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          className="max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-tighter md:text-7xl"
          segments={[titlePlain, { text: titleSerif, serif: true }]}
        />
        <Reveal delay={250}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Última actualización — {updated}
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) * 60}>
              <article className="border-b border-border py-10 first:pt-0 last:border-b-0">
                <h2 className="flex items-baseline gap-4 text-xl font-medium tracking-tight md:text-2xl">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 flex flex-col gap-3 pl-8">
                  {s.body.map((b, j) =>
                    Array.isArray(b) ? (
                      <ul key={j} className="flex flex-col gap-2">
                        {b.map((li) => (
                          <li
                            key={li}
                            className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        key={j}
                        className="text-[15px] leading-relaxed text-muted-foreground"
                      >
                        {b}
                      </p>
                    ),
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-7">
              <p className="text-sm text-muted-foreground">
                ¿Dudas sobre este documento? Escríbenos y te respondemos en
                menos de 24h.
              </p>
              <Link
                href="/contacto"
                className="link-underline flex items-center gap-1 text-sm font-medium"
              >
                Contactar
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
