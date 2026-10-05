"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import {
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from "@/lib/site-data"
import { TextReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { LocalTime } from "@/components/local-time"
import { submitLead, type LeadStatus } from "@/lib/web3forms"

export function ContactPage() {
  const [status, setStatus] = useState<LeadStatus>("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const ok = await submitLead(e.currentTarget, "Nuevo lead — Formulario de contacto")
    setStatus(ok ? "sent" : "error")
  }

  return (
    <div className="grid min-h-[calc(100svh-57px)] grid-cols-1 gap-14 border-b border-border px-5 pb-20 pt-28 md:grid-cols-2 md:gap-24 md:px-10 md:pt-40">
      <div className="flex flex-col justify-between">
        <div>
          <p className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="font-mono">(Contacto)</span>
            <LocalTime className="tabular-nums" />
          </p>
          <TextReveal
            as="h1"
            className="text-balance text-5xl font-medium leading-[1] tracking-tighter md:text-7xl"
            segments={["Hablemos de", { text: "tu proyecto.", serif: true }]}
          />
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Cuéntanos qué necesitas y te enviamos un prototipo completo gratis
            en menos de 48 horas. Sin compromiso. Trabajamos en remoto con
            negocios de toda España.
          </p>

          <div className="mt-12 flex flex-col">
            <ContactRow
              label="Email"
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
            />
            {WHATSAPP_URL && (
              <ContactRow
                label="WhatsApp"
                value={PHONE_DISPLAY}
                href={WHATSAPP_URL}
              />
            )}
            <ContactRow label="Estudio" value="Madrid, España" />
          </div>
        </div>

        {SOCIAL_LINKS.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="btn-fill-dark rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
              >
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div>
        {status === "sent" ? (
          <div className="flex h-full flex-col items-start justify-center gap-5 rounded-2xl border border-border bg-card p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight">
              ¡Mensaje{" "}
              <span className="font-serif font-normal italic">enviado!</span>
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Gracias por tu interés. Te enviaremos tu prototipo en menos de 48
              horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
            />
            <Field
              name="Nombre"
              label="01 — Nombre completo"
              placeholder="Tu nombre"
              autoComplete="name"
              maxLength={120}
              required
            />
            <Field
              name="Email"
              label="02 — Email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              maxLength={160}
              required
            />
            <Field
              name="Teléfono"
              label="03 — Teléfono (opcional)"
              type="tel"
              placeholder="Tu teléfono"
              autoComplete="tel"
              maxLength={30}
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-mensaje"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                04 — Cuéntanos sobre tu proyecto (opcional)
              </label>
              <textarea
                id="contact-mensaje"
                rows={4}
                name="Mensaje"
                maxLength={1800}
                placeholder="¿Qué tipo de web necesitas? ¿Tienes web actualmente?"
                className="resize-none border-b border-border bg-transparent pb-3 pt-1 text-lg outline-none transition-colors placeholder:text-foreground/45 focus:border-foreground"
              />
            </div>
            <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <input type="checkbox" required className="accent-foreground" />
              He leído y acepto la{" "}
              <Link
                href="/privacidad"
                className="underline transition-colors hover:text-foreground"
              >
                política de privacidad
              </Link>
            </label>
            <Magnetic className="block">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-fill-light group w-full rounded-full bg-foreground py-4 text-sm font-semibold text-background disabled:opacity-60"
              >
                <span className="flex items-center justify-center gap-2">
                  {status === "sending"
                    ? "Enviando…"
                    : "Obtener prototipo gratis"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Magnetic>
            {status === "error" && (
              <p role="alert" className="text-[13px] leading-relaxed text-red-700">
                No se pudo enviar el formulario. Inténtalo de nuevo o
                escríbenos a {CONTACT_EMAIL}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-1 text-base font-medium md:text-lg">
        {value}
        {href && (
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
        )}
      </span>
    </>
  )
  const cls =
    "group flex items-center justify-between gap-6 border-b border-border py-4 first:border-t"
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={`${cls} transition-colors hover:bg-card/60`}
      >
        {inner}
      </a>
    )
  }
  return <div className={cls}>{inner}</div>
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  autoComplete,
  maxLength,
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
}) {
  const id = `contact-${autoComplete ?? name}`
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="border-b border-border bg-transparent pb-3 pt-1 text-lg outline-none transition-colors placeholder:text-foreground/45 focus:border-foreground"
      />
    </div>
  )
}
