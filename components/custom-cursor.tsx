"use client"

import { useEffect, useRef } from "react"

/**
 * Custom cursor accent: a small dot pinned to the pointer plus a lagging
 * ring that grows and fills over interactive elements. Rendered with
 * mix-blend-difference so it inverts whatever sits underneath.
 * Desktop (fine pointer) only; respects reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let scale = 1
    let targetScale = 1
    let filled = false
    let visible = false
    let raf = 0

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest("a,button,[role=button],label,summary,input,textarea,select")

    // The loop only runs while the ring is catching up, then goes idle.
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      wake()
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
    }
    const onOver = (e: PointerEvent) => {
      const hovering = isInteractive(e.target)
      targetScale = hovering ? 2.4 : 1
      wake()
      if (hovering !== filled) {
        filled = hovering
        ring.style.backgroundColor = hovering ? "#fff" : "transparent"
      }
    }
    const onLeaveDoc = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      scale += (targetScale - scale) * 0.14
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`
      const settled =
        Math.abs(x - rx) < 0.1 &&
        Math.abs(y - ry) < 0.1 &&
        Math.abs(targetScale - scale) < 0.001
      raf = settled ? 0 : requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeaveDoc)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1200] hidden h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-300 md:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1200] hidden h-9 w-9 rounded-full border border-white opacity-0 mix-blend-difference transition-[opacity,background-color] duration-300 md:block"
      />
    </>
  )
}
