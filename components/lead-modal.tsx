"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"

export function LeadModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  function handleClose() {
    setSent(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="relative w-full max-w-md border border-border bg-card p-8">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-xl font-semibold tracking-tight">
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
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Obtener mi prototipo gratis
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Estamos seleccionando 3 proyectos al mes. Cuéntanos tu idea y te
              enviamos el prototipo en 48h.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Field placeholder="Nombre completo" required />
              <Field placeholder="Email" type="email" required />
              <Field placeholder="Teléfono" type="tel" />
              <textarea
                rows={3}
                placeholder="Cuéntanos sobre tu proyecto (opcional)"
                className="resize-none rounded-md border border-border bg-foreground/5 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground/30"
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
                className="mt-1 rounded-md bg-foreground py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Obtener prototipo →
              </button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-foreground/25">
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
  placeholder,
  type = "text",
  required,
}: {
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="rounded-md border border-border bg-foreground/5 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/25 focus:border-foreground/30"
    />
  )
}
