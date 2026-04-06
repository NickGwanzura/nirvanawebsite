import { Button } from "@/components/ui/button"
import { HeroSlider } from "./hero-slider"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <HeroSlider />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-white/70 mb-12">
          Hillside, Bulawayo
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[1.05] tracking-[-0.02em] text-balance font-light drop-shadow-sm">
          Find your balance
        </h1>

        <p className="mt-12 text-lg md:text-xl text-white/70 max-w-sm mx-auto font-normal leading-relaxed">
          A refined Pilates experience
        </p>
        
        <div className="mt-20">
          <Button
            asChild
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 transition-all duration-500 px-14 h-14 text-[13px] font-medium tracking-[0.1em] uppercase"
          >
            <a href="#booking">Book a Session</a>
          </Button>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-20 bg-white/30" />
      </div>
    </section>
  )
}
