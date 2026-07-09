"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { IntroLoader } from "@/components/intro-loader"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { LeadModal } from "@/components/lead-modal"
import { CustomCursor } from "@/components/custom-cursor"

type SiteChromeValue = {
  ready: boolean
  openModal: () => void
}

const SiteChromeContext = createContext<SiteChromeValue | null>(null)

export function useSiteChrome() {
  const ctx = useContext(SiteChromeContext)
  if (!ctx) {
    throw new Error("useSiteChrome must be used within <SiteShell>")
  }
  return ctx
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [introDone, setIntroDone] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleIntroDone = useCallback(() => setIntroDone(true), [])
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  const value = useMemo<SiteChromeValue>(
    () => ({ ready: introDone, openModal }),
    [introDone, openModal],
  )

  return (
    <SiteChromeContext.Provider value={value}>
      <IntroLoader onDone={handleIntroDone} />
      <SiteNav />
      <main>{children}</main>
      {pathname !== "/contacto" && <SiteFooter />}
      <LeadModal open={modalOpen} onClose={closeModal} />
      <CustomCursor />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none fixed inset-0 z-[900] opacity-[0.035]"
      />
    </SiteChromeContext.Provider>
  )
}
