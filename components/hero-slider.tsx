"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/images/hero/SKC01884-67-2.jpg",
    alt: "Wellness journey",
  },
  {
    src: "/images/hero/reformer-session.png",
    alt: "Reformer Pilates session",
  },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const goToSlide = useCallback((index: number, dir: "left" | "right") => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(dir)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

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
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full h-full overflow-hidden bg-secondary/20">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Minimal overlay — text readability only */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 disabled:opacity-50"
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
            className={`relative flex items-center justify-center h-11 transition-all duration-500 ${
              index === currentIndex ? "w-12" : "w-8"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`absolute h-1 transition-all duration-500 ${index === currentIndex ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"}`} />
            {index === currentIndex && (
              <span className="absolute h-1 w-8 bg-white animate-pulse opacity-50" />
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
