"use client"

import { useEffect, useRef } from "react"

type Particle = {
  hx: number // home x
  hy: number // home y
  x: number
  y: number
  vx: number
  vy: number
  phase: number // ambient oscillation phase
}

type HeroParticlesProps = {
  lines: string[]
  start: boolean
}

export function HeroParticles({ lines, start }: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: -9999, y: -9999, active: false })
  const userInteracted = useRef(false)
  const particles = useRef<Particle[]>([])
  const raf = useRef<number>(0)
  const startTime = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1

    const fgColor = () => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim()
      return c || "#222"
    }
    let color = "#222"

    // Build particle home positions by sampling rendered text pixels
    const buildParticles = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      color = fgColor()

      // offscreen render to sample
      const off = document.createElement("canvas")
      off.width = Math.floor(width)
      off.height = Math.floor(height)
      const octx = off.getContext("2d")
      if (!octx) return

      const isMobile = width < 640
      const fontSize = Math.min(
        width / (isMobile ? 6.2 : 8.8),
        height / (lines.length * 1.5),
      )
      const lineHeight = fontSize * 1.02
      octx.fillStyle = "#000"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = `800 ${fontSize}px ${getComputedStyle(document.body).fontFamily || "sans-serif"}`

      const totalH = lineHeight * lines.length
      const startY = height / 2 - totalH / 2 + lineHeight / 2
      lines.forEach((ln, i) => {
        octx.fillText(ln.toUpperCase(), width / 2, startY + i * lineHeight)
      })

      const image = octx.getImageData(0, 0, off.width, off.height).data
      const gap = isMobile ? 4 : 5 // sampling step (px)
      const next: Particle[] = []
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          const alpha = image[(y * off.width + x) * 4 + 3]
          if (alpha > 128) {
            next.push({
              hx: x,
              hy: y,
              x: x + (Math.random() - 0.5) * 60,
              y: y + (Math.random() - 0.5) * 60,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
      }
      particles.current = next
    }

    const REPEL_RADIUS = 90
    const REPEL_FORCE = 2.6
    const SPRING = 0.06
    const FRICTION = 0.86

    const render = (t: number) => {
      if (!startTime.current) startTime.current = t
      const elapsed = (t - startTime.current) / 1000
      const intro = Math.min(elapsed / 1.1, 1)
      const ease = 1 - Math.pow(1 - intro, 3)

      ctx.clearRect(0, 0, width, height)

      // Determine the active repel point: real pointer, or an automatic
      // self-demonstrating sweep that runs after the text forms.
      let fx = pointer.current.x
      let fy = pointer.current.y
      let active = pointer.current.active
      let auto = false

      if (!userInteracted.current && elapsed > 1.4 && elapsed < 5.2) {
        // sweep a force point horizontally across the text, twice
        const p = (elapsed - 1.4) / 3.8 // 0..1
        const eased = 0.5 - 0.5 * Math.cos(p * Math.PI * 2) // ease both ends
        fx = width * (0.16 + eased * 0.68)
        fy = height * 0.5
        active = true
        auto = true
      }

      const list = particles.current
      const dotR = width < 640 ? 1.1 : 1.3
      const time = elapsed

      for (let i = 0; i < list.length; i++) {
        const p = list[i]

        // ambient drift so the whole thing feels alive at rest
        const ax = Math.sin(time * 1.1 + p.phase) * 0.9
        const ay = Math.cos(time * 0.9 + p.phase * 1.3) * 0.9
        const homeX = p.hx + ax
        const homeY = p.hy + ay

        if (active) {
          const dx = p.x - fx
          const dy = p.y - fy
          const dist2 = dx * dx + dy * dy
          if (dist2 < REPEL_RADIUS * REPEL_RADIUS) {
            const dist = Math.sqrt(dist2) || 1
            const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.vx += (homeX - p.x) * SPRING
        p.vy += (homeY - p.y) * SPRING
        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x += p.vx
        p.y += p.vy

        ctx.globalAlpha = ease
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2)
        ctx.fill()
      }

      // Visible cursor halo so it's obvious you control the field
      if (active && intro >= 1) {
        ctx.globalAlpha = auto ? 0.5 : 0.8
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(fx, fy, REPEL_RADIUS * 0.5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = auto ? 0.12 : 0.18
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(fx, fy, REPEL_RADIUS * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf.current = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current.x = e.clientX - rect.left
      pointer.current.y = e.clientY - rect.top
      pointer.current.active = true
      userInteracted.current = true
    }
    const onLeave = () => {
      pointer.current.active = false
      pointer.current.x = -9999
      pointer.current.y = -9999
    }

    buildParticles()
    raf.current = requestAnimationFrame(render)

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerdown", onMove)
    canvas.addEventListener("pointerleave", onLeave)

    let resizeT: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(buildParticles, 180)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("resize", onResize)
      clearTimeout(resizeT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")])

  // reset intro timer when (re)started
  useEffect(() => {
    if (start) {
      startTime.current = 0
      userInteracted.current = false
    }
  }, [start])

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  )
}
