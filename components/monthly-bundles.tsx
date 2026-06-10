"use client"

import { motion } from "framer-motion"
import { CtaLink } from "@/components/ui/cta-link"
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/animations"

const bundles = [
  {
    label: "Foundation",
    frequency: "1 class / week",
    sessions: 4,
    price: "$50",
    perSession: "$12.50",
  },
  {
    label: "Consistent",
    frequency: "2 classes / week",
    sessions: 8,
    price: "$105",
    perSession: "$13.13",
    recommended: true,
  },
  {
    label: "Dedicated",
    frequency: "3 classes / week",
    sessions: 12,
    price: "$160",
    perSession: "$13.33",
  },
]

export function MonthlyBundles() {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mb-14 md:mb-20 lg:mb-24"
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] pl-[0.5em] text-foreground/50 mb-8">
            Monthly Bundles
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light leading-[1.05] max-w-lg">
              Build a habit,<br />save more
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-foreground/60 leading-[1.8] max-w-xs lg:text-right">
              Designed for consistency, balance, and lasting results. A structured approach to moving with intention over time.
            </motion.p>
          </div>
        </motion.div>

        {/* Bundle rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="space-y-px"
        >
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
                },
              }}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-10 border-t border-border/50 hover:border-foreground/20 transition-colors duration-500"
            >
              {/* Left — label + frequency */}
              <div className="flex items-baseline gap-5">
                <h3 className="font-serif text-3xl text-foreground font-light tracking-[-0.01em]">
                  {bundle.label}
                </h3>
                <span className="text-[13px] text-foreground/50">
                  {bundle.frequency}
                </span>
                {bundle.recommended && (
                  <span className="text-[10px] uppercase tracking-[0.3em] text-brand border border-brand/40 px-2 py-0.5">
                    Popular
                  </span>
                )}
              </div>

              {/* Right — sessions + price per session + total */}
              <div className="flex items-baseline gap-8 sm:gap-10">
                <div className="text-center">
                  <div className="font-serif text-2xl text-foreground font-light">{bundle.sessions}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mt-1">sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-[13px] text-foreground/50">{bundle.perSession}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mt-1">per session</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl text-brand font-light">{bundle.price}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 mt-1">per month</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Closing border */}
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            style={{ originX: 0 }}
            className="border-t border-border/50"
          />
        </motion.div>

        {/* Footer note + CTA */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <motion.p variants={fadeUp} className="text-[13px] text-foreground/50 tracking-wide">
            Standard classes only · Bundles reset monthly · No carry-over
          </motion.p>
          <motion.div variants={fadeUp}>
            <CtaLink
              href="/book"
              variant="dark"
              className="text-[11px] tracking-[0.3em] px-9 py-3.5"
            >
              Get started →
            </CtaLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
