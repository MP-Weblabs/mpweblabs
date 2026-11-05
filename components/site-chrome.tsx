"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { LeadModal } from "@/components/lead-modal"
import { track } from "@/lib/analytics"

export type LeadMode = "proyecto" | "auditoria"

type SiteChromeValue = {
  ready: boolean
  /** abre el formulario "Cuéntanos tu proyecto" */
  openModal: () => void
  /** abre el formulario "Analiza gratis tu web" */
  openAudit: () => void
}

const SiteChromeContext = createContext<SiteChromeValue | null>(null)

export function useSiteChrome() {
  const ctx = useContext(SiteChromeContext)
  if (!ctx) {
    throw new Error("useSiteChrome must be used within <SiteShell>")
  }
  return ctx
}

export function SiteShell({
  children,
  hasConsentTools = false,
}: {
  children: ReactNode
  /** muestra "Configurar cookies" en el footer */
  hasConsentTools?: boolean
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<LeadMode>("proyecto")

  const openModal = useCallback(() => {
    setModalMode("proyecto")
    setModalOpen(true)
  }, [])
  const openAudit = useCallback(() => {
    track("audit_started", { page: window.location.pathname })
    setModalMode("auditoria")
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  const value = useMemo<SiteChromeValue>(
    () => ({ ready: true, openModal, openAudit }),
    [openModal, openAudit],
  )

  return (
    <SiteChromeContext.Provider value={value}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
      >
        Saltar al contenido
      </a>
      <SiteNav />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter hasConsentTools={hasConsentTools} />
      <LeadModal open={modalOpen} mode={modalMode} onClose={closeModal} />
    </SiteChromeContext.Provider>
  )
}
