"use client"

import { useEffect, useRef } from "react"

/**
 * Interactive dot-field backdrop for the hero.
 * A grid of dots breathes with a slow ambient wave and parts around the
 * cursor with an eased spring feel. Runs a short automatic sweep on load
 * so first-time visitors immediately see it's alive.
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let width = 0
    let height = 0
    let gap = 26
    let raf = 0
    let startTime = 0
    let interacted = false

    // eased pointer (lerped toward target for a fluid feel)
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const fgColor = () => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim()
      return c || "#222"
    }
    let color = "#222"

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      gap = width < 640 ? 22 : 28
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      color = fgColor()
    }

    const REPEL = 170

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.13
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const render = (t: number) => {
      if (!startTime) startTime = t
      const elapsed = (t - startTime) / 1000
      const fade = Math.min(elapsed / 1.4, 1)

      pointer.x += (pointer.tx - pointer.x) * 0.14
      pointer.y += (pointer.ty - pointer.y) * 0.14

      let fx = pointer.x
      let fy = pointer.y

      // automatic elliptical sweep so the field demos itself once
      if (!interacted && elapsed > 1 && elapsed < 5.4) {
        const p = (elapsed - 1) / 4.4
        const a = p * Math.PI * 2
        fx = width / 2 + Math.cos(a) * width * 0.3
        fy = height / 2 + Math.sin(a * 1.4) * height * 0.24
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color

      for (let gy = gap / 2; gy < height; gy += gap) {
        for (let gx = gap / 2; gx < width; gx += gap) {
          const wave = Math.sin(elapsed * 0.7 + gx * 0.011 + gy * 0.008)
          let x = gx
          let y = gy + wave * 2.4

          const dx = x - fx
          const dy = y - fy
          const dist2 = dx * dx + dy * dy
          let f = 0
          if (dist2 < REPEL * REPEL) {
            const dist = Math.sqrt(dist2) || 1
            f = 1 - dist / REPEL
            const push = f * f * 36
            x += (dx / dist) * push
            y += (dy / dist) * push
          }

          ctx.globalAlpha = (0.11 + f * 0.5 + (wave + 1) * 0.015) * fade
          ctx.beginPath()
          ctx.arc(x, y, 1 + f * 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      raf = running ? requestAnimationFrame(render) : 0
    }

    // Only animate while the hero is on screen and the tab is visible.
    let running = false
    let onScreen = true
    const sync = () => {
      const shouldRun = onScreen && !document.hidden
      if (shouldRun && !running) {
        running = true
        raf = requestAnimationFrame(render)
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      interacted = true
    }

    resize()
    if (reduced) {
      drawStatic()
    } else {
      sync()
      io.observe(wrap)
      document.addEventListener("visibilitychange", sync)
      window.addEventListener("pointermove", onMove, { passive: true })
    }

    let resizeT: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => {
        resize()
        if (reduced) drawStatic()
      }, 160)
    }
    window.addEventListener("resize", onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
      clearTimeout(resizeT)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
