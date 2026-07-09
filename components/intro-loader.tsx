"use client"

import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"

/**
 * Full-screen logo intro animation.
 * Sequence:
 *  1. "MP" mark + "WebLabs" word slide up into view
 *  2. Brief hold
 *  3. Panel wipes upward to reveal the hero
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in")

  useEffect(() => {
    const outTimer = setTimeout(() => setPhase("out"), 1600)
    const goneTimer = setTimeout(() => {
      setPhase("gone")
      onDone()
    }, 2500)
    return () => {
      clearTimeout(outTimer)
      clearTimeout(goneTimer)
    }
  }, [onDone])

  if (phase === "gone") return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transform: phase === "out" ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex flex-col items-center gap-5">
        <div className="overflow-hidden">
          <div
            style={{
              animation:
                "intro-word 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}
          >
            <Logo priority className="h-12 md:h-16" />
          </div>
        </div>

        <div className="h-px w-48 md:w-64">
          <div
            className="h-px w-full origin-left bg-foreground/20"
            style={{
              animation:
                "intro-line 0.7s cubic-bezier(0.76,0,0.24,1) 0.55s both",
            }}
          />
        </div>

        <div className="overflow-hidden">
          <p
            className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
            style={{
              animation: "intro-word 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }}
          >
            Madrid · España
          </p>
        </div>
      </div>
    </div>
  )
}
