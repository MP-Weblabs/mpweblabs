import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/mpweblabs-logo.png"
      alt="MP WebLabs"
      // Source is 1003×243; declared at the largest display size (h-16)
      // so Next serves a small 1x/2x variant instead of the full PNG.
      width={264}
      height={64}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
    />
  )
}
