"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/site-data"
import { Logo } from "@/components/logo"
import { LocalTime } from "@/components/local-time"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden">
      <div className="grid grid-cols-2 gap-8 border-t border-border px-5 py-14 md:grid-cols-4 md:px-10">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-8" />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            Estudio de diseño y desarrollo web en Madrid. Webs a medida que
            convierten visitas en clientes.
          </p>
          <a
            href="mailto:info@mpweblabs.com"
            className="link-underline mt-5 inline-flex items-center gap-1 text-sm font-medium"
          >
            info@mpweblabs.com
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <FooterCol title="Páginas">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block w-fit text-left text-[13px] text-foreground/50 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Servicios">
          {["Diseño web", "Desarrollo web", "Landing pages", "SEO técnico"].map(
            (s) => (
              <Link
                key={s}
                href="/#servicios"
                className="block w-fit text-[13px] text-foreground/50 transition-colors hover:text-foreground"
              >
                {s}
              </Link>
            ),
          )}
        </FooterCol>

        <FooterCol title="Contacto">
          <a
            href="mailto:info@mpweblabs.com"
            className="block w-fit text-[13px] text-foreground/50 transition-colors hover:text-foreground"
          >
            info@mpweblabs.com
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="block w-fit text-[13px] text-foreground/50 transition-colors hover:text-foreground"
          >
            WhatsApp
          </a>
          <span className="block text-[13px] text-foreground/50">
            Instagram
          </span>
          <span className="block text-[13px] text-foreground/50">
            LinkedIn
          </span>
          <LocalTime className="mt-3 block text-[11px] uppercase tracking-[0.16em] text-foreground/35 tabular-nums" />
        </FooterCol>
      </div>

      {/* giant wordmark */}
      <div
        className="pointer-events-none select-none whitespace-nowrap px-2 text-center text-[clamp(3rem,12.5vw,11.5rem)] font-semibold leading-[0.8] tracking-[-0.04em] text-foreground/[0.06]"
        aria-hidden="true"
      >
        MP&nbsp;WEBLABS
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-5 py-6 text-xs text-foreground/25 md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 MP WebLabs · Madrid, España</span>
        <div className="flex gap-6">
          <Link
            href="/privacidad"
            className="transition-colors hover:text-foreground/60"
          >
            Privacidad
          </Link>
          <Link
            href="/aviso-legal"
            className="transition-colors hover:text-foreground/60"
          >
            Aviso legal
          </Link>
          <Link
            href="/cookies"
            className="transition-colors hover:text-foreground/60"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {title}
      </h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
