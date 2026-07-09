"use client"

import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Magnetic hover wrapper — the child gently follows the cursor while
 * hovered and springs back on leave. No-op on touch devices (mouse
 * events simply never fire).
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transition = "transform 0.2s cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = "translate(0, 0)"
  }

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
