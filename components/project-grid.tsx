"use client"

import { Reveal } from "@/components/reveal"
import { ProjectCard } from "@/components/project-card"
import type { Project } from "@/lib/site-data"

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
      {projects.map((p, i) => {
        const wide = i % 3 === 0
        return (
          <Reveal
            key={p.slug}
            delay={(i % 2) * 120}
            variant="scale"
            className={
              wide
                ? "md:col-span-7"
                : i % 3 === 1
                  ? "md:col-span-5 md:mt-24"
                  : "md:col-span-5 md:-mt-10"
            }
          >
            <ProjectCard project={p} wide={wide} />
          </Reveal>
        )
      })}
    </div>
  )
}
