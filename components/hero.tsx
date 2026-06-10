"use client"

import { CtaLink } from "@/components/ui/cta-link"
import { HeroSlider } from "./hero-slider"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const WORDS = ["Find", "your", "balance"]

export function Hero() {
  // Mouse parallax values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 45, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 45, damping: 22 })

  // Background drifts in the mouse direction (slow)
  const bgX = useTransform(springX, [-1, 1], ["-2.5%", "2.5%"])
  const bgY = useTransform(springY, [-1, 1], ["-2.5%", "2.5%"])

  // Content moves slightly opposite — creates sense of depth
  const contentX = useTransform(springX, [-1, 1], ["10px", "-10px"])
  const contentY = useTransform(springY, [-1, 1], ["6px", "-6px"])

  // Decorative layer moves between the two for mid-depth
  const midX = useTransform(springX, [-1, 1], ["-1%", "1%"])
  const midY = useTransform(springY, [-1, 1], ["-1%", "1%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
    rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* ── LAYER 0: Background slider — extends beyond edges for parallax room ── */}
      <motion.div
        className="absolute inset-[-5%]"
        style={{ x: bgX, y: bgY }}
      >
        <HeroSlider />
      </motion.div>

      {/* ── LAYER 1: Depth overlays ── */}
      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent pointer-events-none z-[1]" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none z-[1]" />
      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none z-[1]" />
      {/* Right vignette (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* ── LAYER 2: Mid-depth decorative elements ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ x: midX, y: midY }}
      >
        {/* Horizontal rule — upper third */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          style={{ originX: 0 }}
          className="absolute top-[28%] left-0 right-0 h-px bg-white/[0.07]"
        />
        {/* Horizontal rule — lower third */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          style={{ originX: 1 }}
          className="absolute top-[70%] left-0 right-0 h-px bg-white/[0.07]"
        />

        {/* Ghost serif watermark — bottom right */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.6 }}
          aria-hidden="true"
          className="absolute -bottom-[8%] -right-[4%] font-serif italic text-[38vw] leading-none text-white/[0.028] select-none"
        >
          N
        </motion.span>

        {/* Vertical location tag — left edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-4"
        >
          <div className="h-16 w-px bg-white/20" />
          <span
            className="text-[9px] uppercase tracking-[0.5em] text-white/35 whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            26 Moffat St · Hillside
          </span>
          <div className="h-16 w-px bg-white/20" />
        </motion.div>

        {/* Minimal corner marks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute top-[88px] left-6 lg:left-8 flex items-center gap-2"
        >
          <div className="w-4 h-px bg-white/25" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Est. 2024</span>
        </motion.div>
      </motion.div>

      {/* ── LAYER 3: Main content — moves opposite to mouse ── */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.6em] pl-[0.6em] text-white/60 mb-12"
        >
          Pilates Studio · Bulawayo
        </motion.p>

        {/* H1 — word-by-word clip reveal */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-white leading-[1.05] tracking-[-0.02em] font-light">
          {WORDS.map((word, i) => (
            <span
              key={word}
              className="inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "115%", opacity: 0.4 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.38 + i * 0.14,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="mt-10 text-base md:text-lg text-white/70 max-w-xs mx-auto font-light leading-relaxed tracking-wide"
        >
          A refined Pilates experience
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CtaLink
            href="/book"
            variant="light"
            className="px-12 h-14 text-[12px] tracking-[0.15em]"
          >
            Book a Session
          </CtaLink>
          <a
            href="#classes"
            className="text-[11px] uppercase tracking-[0.35em] text-white/50 hover:text-white/80 transition-colors duration-300 h-14 flex items-center px-4"
          >
            Explore classes
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white/35 to-transparent" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.4em] text-white/30"
        >
          Scroll
        </motion.span>
      </motion.div>

    </section>
  )
}
