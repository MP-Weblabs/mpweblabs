"use client"

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react"
import { cn } from "@/lib/utils"

type Segment = string | { text: string; serif?: boolean }

/**
 * Word-by-word masked reveal for headlines. Each word slides up out of
 * its own clipping mask with a small stagger when the element scrolls
 * into view. Segments marked `serif` render in the display serif italic.
 */
export function TextReveal({
  segments,
  as,
  className,
  delayStep = 45,
  startDelay = 0,
}: {
  segments: Segment[]
  as?: ElementType
  className?: string
  delayStep?: number
  startDelay?: number
}) {
  const Tag = (as ?? "h2") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words: { w: string; serif: boolean }[] = []
  for (const seg of segments) {
    const text = typeof seg === "string" ? seg : seg.text
    const serif = typeof seg === "string" ? false : !!seg.serif
    for (const w of text.split(/\s+/).filter(Boolean)) {
      words.push({ w, serif })
    }
  }

  return (
    <Tag ref={ref} className={cn(visible && "tr-visible", className)}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <span
              className={cn("tr-word", word.serif && "font-serif italic")}
              style={{ transitionDelay: `${startDelay + i * delayStep}ms` }}
            >
              {word.w}
            </span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  )
}
