"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { submitLead, type LeadStatus } from "@/lib/web3forms"
import { CONTACT_EMAIL } from "@/lib/site-data"

export function LeadModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
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
    const ok = await submitLead(e.currentTarget, "Nuevo lead — Prototipo gratis")
    setStatus(ok ? "sent" : "error")
  }

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
              Te contactamos en menos de 48h con tu prototipo. Revisa tu correo.
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
              Riesgo cero
            </span>
            <h2
              id="lead-modal-title"
              className="mb-2 text-2xl font-semibold tracking-tight"
            >
              Obtener mi prototipo gratis
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Estamos seleccionando 3 proyectos al mes. Cuéntanos tu idea y te
              enviamos el prototipo en 48h.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />
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
                aria-label="Cuéntanos sobre tu proyecto (opcional)"
                placeholder="Cuéntanos sobre tu proyecto (opcional)"
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
                {status === "sending" ? "Enviando…" : "Obtener prototipo →"}
              </button>
              {status === "error" && (
                <p role="alert" className="text-xs leading-relaxed text-red-700">
                  No se pudo enviar el formulario. Inténtalo de nuevo o
                  escríbenos a {CONTACT_EMAIL}
                </p>
              )}
            </form>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              * Sujeto a disponibilidad y selección por parte de nuestro equipo
              creativo.
            </p>
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
}: {
  name: string
  placeholder: string
  type?: string
  required?: boolean
  autoComplete?: string
  maxLength?: number
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
      className="rounded-md border border-border bg-foreground/5 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/50 focus:border-foreground/40"
    />
  )
}
