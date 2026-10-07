import { ArrowRight, MapPin } from "lucide-react"
import { CtaLink } from "@/components/ui/cta-link"
import { HeroSlider } from "./hero-slider"

export function Hero() {
  return (
    <section className="bg-[#f4f1eb]">
      <div className="grid min-h-[100svh] md:grid-cols-[0.94fr_1.06fr]">
        <div className="flex flex-col justify-center px-6 pt-24 pb-14 sm:px-10 md:px-12 lg:px-16 xl:px-24 lg:py-20">
          <p className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-foreground/55 sm:text-[11px]">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            STOTT Pilates · Bulawayo
          </p>

          <h1 className="max-w-[10ch] font-serif text-[clamp(3.5rem,6.2vw,6.25rem)] font-light leading-[0.94] tracking-[-0.045em] text-foreground">
            Find your
            <span className="mt-1 block italic text-[#576b5e]">balance.</span>
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-foreground/65 sm:text-base">
            Expert-led reformer Pilates in Hillside. Small classes, thoughtful coaching, and a welcoming place to move at your own pace.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <CtaLink
              href="/book"
              variant="dark"
              className="h-14 px-8 text-[11px] tracking-[0.16em]"
            >
              Book a Session
            </CtaLink>
            <a
              href="#classes"
              className="inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-brand"
            >
              Explore classes
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-11 flex items-start gap-3 border-t border-foreground/10 pt-5">
            <MapPin className="mt-0.5 shrink-0 text-brand" size={16} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/45">Visit the studio</p>
              <p className="mt-1 text-sm text-foreground/75">26 Moffat Street · Hillside, Bulawayo</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[42svh] md:min-h-0 lg:min-h-[100svh]">
          <HeroSlider />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 md:hidden"
            style={{
              background: "linear-gradient(180deg, #f4f1eb 0%, rgba(244,241,235,0.94) 28%, rgba(244,241,235,0.64) 58%, rgba(244,241,235,0.24) 82%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-36 md:block lg:w-44 xl:w-52"
            style={{
              background: "linear-gradient(90deg, #f4f1eb 0%, rgba(244,241,235,0.96) 28%, rgba(244,241,235,0.78) 54%, rgba(244,241,235,0.38) 78%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
