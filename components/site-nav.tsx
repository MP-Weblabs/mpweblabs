"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { LocalTime } from "@/components/local-time"
import { useSiteChrome } from "@/components/site-chrome"

export function SiteNav() {
  const pathname = usePathname()
  const { openModal } = useSiteChrome()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-5 py-3 transition-all duration-300 md:px-10",
          scrolled
            ? "border-border bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background/40 backdrop-blur-sm",
        )}
      >
        <Link
          href="/"
          className="flex items-center transition-transform hover:scale-[1.03]"
          aria-label="MP WebLabs · Inicio"
        >
          <Logo priority className="h-7 md:h-8" />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "link-underline flex items-baseline gap-1.5 text-[13px] tracking-wide transition-colors",
                  pathname === item.href
                    ? "is-active text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <sup className="font-mono text-[9px] text-muted-foreground">
                  0{i + 1}
                </sup>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={openModal}
          className="btn-fill-light hidden rounded-full bg-foreground px-5 py-2 text-[13px] font-semibold text-background md:block"
        >
          <span>Prototipo gratis</span>
        </button>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex-col justify-between bg-background px-6 pb-8 pt-24 transition-opacity duration-300",
          mobileOpen ? "flex opacity-100" : "pointer-events-none hidden opacity-0",
        )}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-6 top-6"
          aria-label="Cerrar menú"
        >
          <X className="h-7 w-7" />
        </button>

        <nav className="relative flex flex-col">
          {NAV_ITEMS.map((item, i) => (
            <span key={item.href} className="overflow-hidden border-b border-border">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-baseline gap-4 py-5 text-5xl font-medium tracking-tighter transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground",
                )}
                style={
                  mobileOpen
                    ? {
                        animation: `intro-word 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s both`,
                      }
                    : undefined
                }
              >
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="relative flex flex-col gap-5">
          <button
            onClick={() => {
              openModal()
              setMobileOpen(false)
            }}
            className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background"
          >
            Prototipo gratis →
          </button>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>info@mpweblabs.com</span>
            <LocalTime className="tabular-nums" />
          </div>
        </div>
      </div>
    </>
  )
}
