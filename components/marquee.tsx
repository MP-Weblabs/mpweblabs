import { cn } from "@/lib/utils"

export function Marquee({
  items,
  variant = "muted",
  className,
}: {
  items: string[]
  variant?: "muted" | "bold" | "display"
  className?: string
}) {
  const doubled = [...items, ...items]
  const speed =
    variant === "muted"
      ? "animate-marquee gap-12"
      : variant === "bold"
        ? "animate-marquee-fast gap-10"
        : "animate-marquee-slow gap-0"
  return (
    <div
      className={cn(
        "flex overflow-hidden whitespace-nowrap border-y border-border bg-background",
        variant === "muted" && "py-2.5",
        variant === "bold" && "py-4",
        variant === "display" && "py-6 md:py-8",
        className,
      )}
    >
      <div className={cn("flex shrink-0 items-center", speed)}>
        {doubled.map((item, i) => (
          <MarqueeItem key={i} text={item} index={i} variant={variant} />
        ))}
      </div>
      <div aria-hidden className={cn("flex shrink-0 items-center", speed)}>
        {doubled.map((item, i) => (
          <MarqueeItem key={i} text={item} index={i} variant={variant} />
        ))}
      </div>
    </div>
  )
}

function MarqueeItem({
  text,
  index,
  variant,
}: {
  text: string
  index: number
  variant: "muted" | "bold" | "display"
}) {
  if (variant === "display") {
    const serif = index % 2 === 1
    return (
      <span className="flex items-center">
        <span
          className={cn(
            "px-6 text-5xl leading-none tracking-tighter md:px-10 md:text-7xl",
            serif
              ? "font-serif italic"
              : "font-medium",
          )}
        >
          {text}
        </span>
        <span
          className="h-2 w-2 rounded-full bg-foreground/30 md:h-2.5 md:w-2.5"
          aria-hidden="true"
        />
      </span>
    )
  }
  if (variant === "bold") {
    return (
      <span className="flex items-center gap-10 text-sm font-medium tracking-tight">
        {text}
        <span className="text-accent">/</span>
      </span>
    )
  }
  return (
    <span className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
      {text}
    </span>
  )
}
