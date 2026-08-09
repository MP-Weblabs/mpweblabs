"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/site-data"

export function ProjectCard({
  project,
  wide,
}: {
  project: Project
  wide?: boolean
}) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div
          className={`relative overflow-hidden ${wide ? "aspect-[16/11]" : "aspect-[4/3]"}`}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-[11px] backdrop-blur-sm">
          {project.num}
        </span>
        <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-background/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-border pb-5">
        <div>
          <h3 className="text-xl font-medium tracking-tight md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {project.result}
          </p>
        </div>
        <span className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {project.tag} · {project.year}
        </span>
      </div>
    </Link>
  )
}
