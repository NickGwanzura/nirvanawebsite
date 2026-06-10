"use client"

import { CtaLink } from "@/components/ui/cta-link"
import { motion } from "framer-motion"
import { fadeUp, scaleIn, staggerContainer, viewportOptions } from "@/lib/animations"

export function Booking() {
  return (
    <section id="booking" className="relative py-20 md:py-32 lg:py-48 bg-foreground text-background overflow-hidden scroll-mt-24">

      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.03),transparent_60%)]" />

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOptions}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-background/30 via-background/10 to-transparent"
      />

      <div className="relative mx-auto max-w-xl px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] pl-[0.5em] text-background/50 mb-8">
            Booking
          </motion.p>

          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-background tracking-[-0.02em] font-light mb-10 leading-[1.05]">
            Reserve your spot
          </motion.h2>

          <motion.p variants={fadeUp} className="text-background/70 text-lg font-light leading-relaxed mb-16 max-w-sm mx-auto">
            Choose your session type, date, and time. The full calendar is one click away.
          </motion.p>

          <motion.div variants={scaleIn}>
            <CtaLink
              href="/book"
              variant="outline"
              className="px-14 h-14 text-[13px] tracking-[0.12em]"
            >
              Book a Session
            </CtaLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
