"use client"

import { useEffect, useRef } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { HeroField } from "@/components/hero-field"
import { Magnetic } from "@/components/magnetic"
import { LocalTime } from "@/components/local-time"
import { useSiteChrome } from "@/components/site-chrome"

export function BrutalHero() {
  const { ready, openModal, openAudit } = useSiteChrome()
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Content drifts down and fades as you scroll away — depth on exit.
  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const vh = window.innerHeight || 1
        const p = Math.min(y / (vh * 0.9), 1)
        el.style.transform = `translate3d(0, ${y * 0.25}px, 0)`
        el.style.opacity = String(Math.max(1 - p * 1.2, 0))
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const rise = (delay: string) =>
    ready
      ? { animation: `rise-in 1s cubic-bezier(0.16,1,0.3,1) ${delay} both` }
      : { opacity: 0 }

  const line = (delay: string) =>
    ready
      ? {
          animation: `intro-word 1.15s cubic-bezier(0.16,1,0.3,1) ${delay} both`,
        }
      : { transform: "translateY(115%)" }

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pt-28">
      {/* interactive dot field */}
      <HeroField />

      {/* vignette so the field melts into the page edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 45% 45%, transparent 42%, var(--background) 90%)",
        }}
        aria-hidden="true"
      />

      {/* meta row */}
      <div
        className="relative z-10 flex items-center justify-between border-b border-border pb-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
        style={rise("0.2s")}
      >
        <span className="hidden md:block">
          Estudio de diseño &amp; desarrollo web en Madrid
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
          </span>
          Madrid · Toda España
        </span>
        <LocalTime className="hidden tabular-nums md:block" />
      </div>

      {/* headline block (parallax layer) */}
      <div ref={parallaxRef} className="relative z-10 py-10 md:py-6">
        <h1 className="text-[clamp(4rem,14.5vw,12.5rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="block" style={line("0.3s")}>
              Diseñamos
            </span>
          </span>{" "}
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="text-outline block" style={line("0.42s")}>
              webs que
            </span>
          </span>{" "}
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.14em]">
            <span
              className="block font-serif font-normal italic tracking-[-0.01em]"
              style={line("0.54s")}
            >
              <span className="relative inline-block pr-[0.1em]">
                venden.
                <svg
                  className="absolute -bottom-[0.03em] left-0 w-full"
                  viewBox="0 0 320 26"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 19 C 90 7, 235 4, 314 13"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset="1"
                    style={
                      ready
                        ? {
                            animation:
                              "draw-line 0.9s cubic-bezier(0.65,0,0.35,1) 1.2s both",
                          }
                        : undefined
                    }
                  />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        {/* supporting copy + CTAs — anchored right on desktop */}
        <div
          className="mt-10 flex max-w-md flex-col gap-6 lg:absolute lg:bottom-8 lg:right-0 lg:mt-0 lg:items-end lg:text-right"
          style={rise("0.95s")}
        >
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Diseñamos y desarrollamos webs rápidas, optimizadas para Google y
            pensadas para generar contactos, reservas y ventas.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <button
                onClick={openModal}
                className="btn-fill-light group rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground"
              >
                <span className="flex items-center gap-2">
                  Cuéntanos tu proyecto
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={openAudit}
                className="btn-fill-dark block w-full rounded-full border border-border bg-card/70 px-7 py-4 text-sm font-semibold backdrop-blur-sm"
              >
                <span>Analiza gratis tu web</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative z-10 flex items-end justify-between">
        <div
          className="hidden flex-col items-center gap-3 md:flex"
          style={rise("1.4s")}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative block h-14 w-px overflow-hidden bg-border">
            <span
              className="absolute inset-x-0 top-0 h-1/2 bg-foreground"
              style={{
                animation:
                  "scroll-hint 2.2s cubic-bezier(0.76,0,0.24,1) infinite",
              }}
            />
          </span>
        </div>

        <span
          className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:hidden"
          style={rise("1.4s")}
        >
          Madrid, España
        </span>

        <button
          onClick={openAudit}
          className="group relative hidden h-28 w-28 items-center justify-center lg:flex"
          style={rise("1.5s")}
          aria-label="Analiza gratis tu web"
        >
          <svg
            className="animate-spin-slow absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              <path
                id="hero-badge-circle"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
              />
            </defs>
            <text
              className="fill-foreground/70 uppercase"
              style={{ fontSize: "8.6px", letterSpacing: "0.16em" }}
            >
              <textPath href="#hero-badge-circle">
                Analiza gratis tu web · Sin compromiso ·
              </textPath>
            </text>
          </svg>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-transform duration-300 group-hover:scale-110">
            <ArrowDown className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:rotate-0" />
          </span>
        </button>
      </div>
    </section>
  )
}
