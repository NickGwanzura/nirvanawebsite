"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOptions } from "@/lib/animations"

const stats = [
  { number: "8", label: "Max class size" },
  { number: "50", label: "Minutes" },
  { number: "5+", label: "Years" },
]

export function GroupExperience() {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-secondary/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/images/SECTION.jpg"
              alt="Group Pilates session at Nirvana"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            {/* Overlay shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="lg:pl-8"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-10">
              The Experience
            </motion.p>

            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-[-0.02em] mb-12 font-light">
              Stronger<br />together
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-foreground/70 leading-[1.85] max-w-md">
              A refined group experience designed for connection, control, and consistency.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="mt-20 flex gap-10 md:gap-16 lg:gap-20"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <div className="font-serif text-5xl text-foreground tracking-[-0.02em] font-light">
                    {stat.number}
                  </div>
                  <div className="text-[11px] text-foreground/55 uppercase tracking-[0.3em] mt-3">
                    {stat.label}
                  </div>
                  <div className="mt-4 h-px w-8 bg-foreground/15" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
