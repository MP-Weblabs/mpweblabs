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
      width={1000}
      height={250}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
    />
  )
}
