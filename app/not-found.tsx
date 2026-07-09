import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <p className="relative flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="font-mono">(Error)</span>
        Página no encontrada
      </p>
      <h1 className="relative mt-6 text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-[-0.05em]">
        4<span className="font-serif font-normal italic">0</span>4
      </h1>
      <p className="relative mt-4 max-w-sm text-balance text-base leading-relaxed text-muted-foreground">
        La página que buscas no existe o ha cambiado de sitio. Volvamos a
        terreno conocido.
      </p>
      <Link
        href="/"
        className="btn-fill-light relative mt-9 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"
      >
        <span className="flex items-center gap-2">
          Volver al inicio
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </section>
  )
}
