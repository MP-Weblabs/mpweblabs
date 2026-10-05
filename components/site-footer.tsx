"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  CONTACT_EMAIL,
  NAV_ITEMS,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from "@/lib/site-data"
import { Logo } from "@/components/logo"
import { LocalTime } from "@/components/local-time"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden">
      <div className="grid grid-cols-2 gap-8 border-t border-border px-5 py-14 md:grid-cols-4 md:px-10">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-8" />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            Estudio de diseño y desarrollo web en Madrid, con clientes en toda
            España. Webs a medida que convierten visitas en clientes.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-underline mt-5 inline-flex items-center gap-1 text-sm font-medium"
          >
            {CONTACT_EMAIL}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <FooterCol title="Páginas">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={FOOTER_LINK}
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
                className={FOOTER_LINK}
              >
                {s}
              </Link>
            ),
          )}
        </FooterCol>

        <FooterCol title="Contacto">
          <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
            {CONTACT_EMAIL}
          </a>
          {WHATSAPP_URL && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={FOOTER_LINK}
            >
              WhatsApp
            </a>
          )}
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={FOOTER_LINK}
            >
              {s.label}
            </a>
          ))}
          <LocalTime className="mt-3 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground tabular-nums" />
        </FooterCol>
      </div>

      {/* giant wordmark */}
      <div
        className="pointer-events-none select-none whitespace-nowrap px-2 text-center text-[clamp(3rem,12.5vw,11.5rem)] font-semibold leading-[0.8] tracking-[-0.04em] text-foreground/[0.06]"
        aria-hidden="true"
      >
        MP&nbsp;WEBLABS
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} MP WebLabs · Madrid, España</span>
        <div className="flex gap-6">
          <Link
            href="/privacidad"
            className="py-1 transition-colors hover:text-foreground"
          >
            Privacidad
          </Link>
          <Link
            href="/aviso-legal"
            className="py-1 transition-colors hover:text-foreground"
          >
            Aviso legal
          </Link>
          <Link
            href="/cookies"
            className="py-1 transition-colors hover:text-foreground"
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
      <h2 className="mb-3 text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  )
}

const FOOTER_LINK =
  "block w-fit py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:text-foreground"
