import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

type Variant = "dark" | "light" | "outline"

const base =
  "group relative inline-flex items-center justify-center overflow-hidden uppercase font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"

const variantClasses: Record<Variant, string> = {
  dark: "bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-offset-background",
  light: "bg-white text-foreground hover:bg-white/90 focus-visible:ring-offset-white",
  outline:
    "border border-background/25 text-background hover:border-background focus-visible:ring-offset-foreground",
}

export function CtaLink({
  variant = "dark",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={cn(base, variantClasses[variant], className)} {...props}>
      {variant === "outline" ? (
        <>
          <span className="absolute inset-0 bg-background scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
          <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
            {children}
          </span>
        </>
      ) : (
        <>
          <span
            className={cn(
              "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent to-transparent pointer-events-none",
              variant === "dark" ? "via-white/15" : "via-black/5"
            )}
          />
          <span className="relative z-10">{children}</span>
        </>
      )}
    </Link>
  )
}
