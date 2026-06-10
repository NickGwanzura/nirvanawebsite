"use client"

import Link from "next/link"
import { CtaLink } from "@/components/ui/cta-link"
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/animations"

const scheduleData = [
  {
    period: "Morning",
    times: ["07:00", "08:00", "09:00"],
    days: "Mon – Sat",
  },
  {
    period: "Evening",
    times: ["16:30", "17:30"],
    days: "Mon – Fri",
  },
]

export function Schedule() {
  return (
    <section id="schedule" className="py-20 md:py-32 lg:py-40 bg-background scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="text-center mb-14 md:mb-24 lg:mb-32"
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] pl-[0.5em] text-foreground/50 mb-8">
            Schedule
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light">
            Find your time
          </motion.h2>
        </motion.div>

        {/* Schedule rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="space-y-px"
        >
          {scheduleData.map((schedule, i) => (
            <motion.div
              key={schedule.period}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
                },
              }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-t border-border/60 hover:border-foreground/20 transition-colors duration-500"
            >
              <div className="flex items-baseline gap-6 mb-8 md:mb-0">
                <h3 className="font-serif text-3xl text-foreground tracking-[-0.01em] font-light group-hover:tracking-[-0.02em] transition-all duration-300">
                  {schedule.period}
                </h3>
                <span className="text-[13px] text-foreground/55 tracking-wide">
                  {schedule.days}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6">
                {schedule.times.map((time, ti) => (
                  <motion.span
                    key={time}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOptions}
                    transition={{ delay: 0.4 + ti * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href="/book"
                      className="inline-block py-2 text-[15px] text-foreground/70 tabular-nums tracking-wide hover:text-brand transition-colors duration-200"
                    >
                      {time}
                    </Link>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            style={{ originX: 0 }}
            className="border-t border-border/60"
          />
        </motion.div>

        {/* Note + CTA */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <motion.p variants={fadeUp} className="text-[13px] text-foreground/60 tracking-wide">
            Standard classes · Private &amp; semi-private by arrangement
          </motion.p>
          <motion.div variants={fadeUp}>
            <CtaLink
              href="/book"
              variant="dark"
              className="text-[11px] tracking-[0.3em] px-9 py-3.5"
            >
              Reserve a spot →
            </CtaLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
