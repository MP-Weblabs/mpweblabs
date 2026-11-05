"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { submitLead, type LeadStatus } from "@/lib/web3forms"
import { CONTACT_EMAIL } from "@/lib/site-data"
import type { LeadMode } from "@/components/site-chrome"

const COPY: Record<
  LeadMode,
  {
    badge: string
    title: string
    desc: string
    submit: string
    subject: string
    sentText: string
  }
> = {
  proyecto: {
    badge: "Respuesta en menos de 24h",
    title: "Cuéntanos tu proyecto",
    desc: "Te respondemos en menos de 24h para entender qué necesitas y, tras una primera llamada, te enviamos una propuesta a medida.",
    submit: "Solicitar propuesta →",
    subject: "Nuevo lead — Cuéntanos tu proyecto",
    sentText: "Te respondemos en menos de 24h. Revisa tu correo.",
  },
  auditoria: {
    badge: "Gratis · Sin compromiso",
    title: "Analiza gratis tu web",
    desc: "Revisamos personalmente tu web —velocidad, móvil, Google y conversión— y te enviamos por email los problemas que más contactos te pueden estar costando.",
    submit: "Analizar mi web →",
    subject: "Nuevo lead — Análisis web gratuito",
    sentText: "Te enviaremos el análisis de tu web por email. Revisa tu correo.",
  },
}

export function LeadModal({
  open,
  mode,
  onClose,
}: {
  open: boolean
  mode: LeadMode
  onClose: () => void
}) {
  const copy = COPY[mode]
  const [status, setStatus] = useState<LeadStatus>("idle")
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    // Move focus into the dialog (first form field).
    const firstField =
      panel?.querySelector<HTMLElement>("input:not([tabindex='-1'])") ??
      panel?.querySelector<HTMLElement>("button")
    firstField?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
        return
      }
      // Keep keyboard focus trapped inside the dialog.
      if (e.key === "Tab" && panel) {
        const focusables = panel.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([tabindex='-1']), textarea",
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const ok = await submitLead(e.currentTarget, copy.subject, mode)
    setStatus(ok ? "sent" : "error")
  }

  const msgLabel =
    mode === "auditoria"
      ? "¿Algo que te preocupe de tu web? (opcional)"
      : "Cuéntanos sobre tu proyecto (opcional)"

  function handleClose() {
    setStatus("idle")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative max-h-[calc(100svh-2.5rem)] w-full max-w-md overflow-y-auto border border-border bg-card p-8"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "sent" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="h-7 w-7" />
            </div>
            <h2
              id="lead-modal-title"
              className="mb-2 text-xl font-semibold tracking-tight"
            >
              ¡Solicitud recibida!
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {copy.sentText}
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <span className="mb-4 inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-accent">
              {copy.badge}
            </span>
            <h2
              id="lead-modal-title"
              className="mb-2 text-2xl font-semibold tracking-tight"
            >
              {copy.title}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {copy.desc}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />
              {mode === "auditoria" && (
                <Field
                  name="Web"
                  placeholder="URL de tu web (p. ej. tunegocio.com)"
                  inputMode="url"
                  autoComplete="url"
                  maxLength={200}
                  required
                />
              )}
              <Field
                name="Nombre"
                placeholder="Nombre completo"
                autoComplete="name"
                maxLength={120}
                required
              />
              <Field
                name="Email"
                placeholder="Email"
                type="email"
                autoComplete="email"
                maxLength={160}
                required
              />
              <Field
                name="Teléfono"
                placeholder="Teléfono (opcional)"
                type="tel"
                autoComplete="tel"
                maxLength={30}
              />
              <textarea
                rows={3}
                name="Mensaje"
                aria-label={msgLabel}
                placeholder={msgLabel}
                maxLength={1800}
                className="resize-none rounded-md border border-border bg-foreground/5 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/50 focus:border-foreground/40"
              />
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="accent-foreground" />
                He leído y acepto la{" "}
                <Link
                  href="/privacidad"
                  onClick={handleClose}
                  className="underline transition-colors hover:text-foreground"
                >
                  política de privacidad
                </Link>
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 rounded-md bg-foreground py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : copy.submit}
              </button>
              {status === "error" && (
                <p role="alert" className="text-xs leading-relaxed text-red-700">
                  No se pudo enviar el formulario. Inténtalo de nuevo o
                  escríbenos a {CONTACT_EMAIL}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({
  name,
  placeholder,
  type = "text",
  required,
  autoComplete,
  maxLength,
  inputMode,
}: {
  name: string
  placeholder: string
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
  inputMode?: "url" | "email" | "tel" | "text"
}) {
  return (
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      aria-label={placeholder}
      autoComplete={autoComplete}
      maxLength={maxLength}
      inputMode={inputMode}
      className="rounded-md border border-border bg-foreground/5 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/50 focus:border-foreground/40"
    />
  )
}
