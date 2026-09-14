"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TRANSITION_MS = 700
const AUTOPLAY_MS = 6500

const slides = [
  {
    src: "/images/hero/hero-african-woman.png",
    alt: "African woman practising Pilates on a reformer at Nirvana Pilates Studio",
    objectPosition: "center 35%",
  },
  {
    src: "/images/hero/hero-mat-pilates.png",
    alt: "Elegant Pilates mat practice at Nirvana Studio",
    objectPosition: "center 42%",
  },
  {
    src: "/images/hero/reformer-session.png",
    alt: "Pilates reformer session at Nirvana Studio",
    objectPosition: "center center",
  },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goToSlide = useCallback((index: number, dir: "left" | "right") => {
    if (isTransitioning || index === currentIndex) return
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setDirection(dir)
    setCurrentIndex(index)
    transitionTimeout.current = setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
  }, [currentIndex, isTransitioning])

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % slides.length
    goToSlide(newIndex, "right")
  }, [currentIndex, goToSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length
    goToSlide(newIndex, "left")
  }, [currentIndex, goToSlide])

  // Auto-play
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      if (!document.hidden && !isPaused) nextSlide()
    }, AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide, prefersReducedMotion])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => () => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
  }, [])

  const slideClassName = (index: number) => {
    if (index === currentIndex) return "translate-x-0 opacity-100 scale-100"
    if (index === previousIndex) {
      return direction === "right"
        ? "-translate-x-full opacity-0 scale-[1.02]"
        : "translate-x-full opacity-0 scale-[1.02]"
    }
    return direction === "right"
      ? "translate-x-full opacity-0 scale-[1.04]"
      : "-translate-x-full opacity-0 scale-[1.04]"
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Nirvana Pilates Studio highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false)
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-[transform,opacity] duration-700 ease-out motion-reduce:duration-0 ${slideClassName(index)}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            style={{ objectPosition: slide.objectPosition }}
            sizes="100vw"
          />
          {/* A restrained veil keeps the hero copy readable without flattening the photography. */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        type="button"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white/90 shadow-lg shadow-black/10 hover:bg-black/35 hover:text-white transition-all duration-300 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        type="button"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white/90 shadow-lg shadow-black/10 hover:bg-black/35 hover:text-white transition-all duration-300 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > currentIndex ? "right" : "left")}
            disabled={isTransitioning}
            type="button"
            className={`relative flex items-center justify-center h-11 transition-all duration-500 motion-reduce:duration-0 ${
              index === currentIndex ? "w-12" : "w-11"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          >
            <span className={`absolute h-1 rounded-full transition-all duration-500 motion-reduce:duration-0 ${index === currentIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"}`} />
            {index === currentIndex && (
              <span className={`absolute h-1 w-8 rounded-full bg-white/60 ${isPaused ? "" : "animate-pulse"}`} />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-4 lg:right-8 z-10 text-white/60 text-[11px] tracking-[0.2em] font-medium">
        <span className="text-white">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  )
}
