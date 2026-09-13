"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/animations"

const reasons = [
  { number: "01", title: "Rehabilitation", body: "Controlled, guided movement to support your rehabilitation journey." },
  { number: "02", title: "Core strength & stability", body: "Focused exercises for core strengthening, tightening, and stability." },
  { number: "03", title: "Spinal & posture correction", body: "Mindful movement with a focus on spinal alignment and posture." },
  { number: "04", title: "Muscle toning", body: "Purposeful resistance and controlled movement to strengthen and tone your muscles." },
]

export function WhyPilates() {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-6">
              The Practice
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light leading-[1.0]">
              Why Pilates
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-foreground/55 text-base max-w-xs leading-relaxed md:text-right md:pb-1">
            Four reasons to practise Pilates, just to mention a few.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.number}
              variants={fadeUp}
              className="group relative bg-background p-8 lg:p-10 flex flex-col overflow-hidden cursor-default"
            >
              {/* Animated top-border sweep */}
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-brand/50 group-hover:w-full transition-all duration-700 ease-out" />

              {/* Large ghost number */}
              <span
                aria-hidden="true"
                className="absolute -bottom-6 -right-3 font-serif text-[9rem] leading-none text-foreground/[0.045] select-none pointer-events-none group-hover:text-foreground/[0.08] transition-colors duration-500"
              >
                {reason.number}
              </span>

              {/* Small eyebrow number */}
              <span className="block text-[10px] tracking-[0.45em] text-brand/55 mb-8 font-medium uppercase">
                {reason.number}
              </span>

              <h3 className="font-serif text-[1.45rem] md:text-2xl text-foreground font-light tracking-[-0.02em] mb-5 leading-[1.2]">
                {reason.title}
              </h3>

              <p className="text-[13.5px] text-foreground/55 leading-[1.85] mt-auto group-hover:text-foreground/70 transition-colors duration-400">
                {reason.body}
              </p>

              {/* Bottom row: line + arrow */}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-border group-hover:bg-brand/20 transition-colors duration-500" />
                <span className="text-foreground/20 text-sm group-hover:text-brand/40 group-hover:translate-x-1 transition-all duration-300 ease-out">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
