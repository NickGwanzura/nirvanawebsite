"use client"

import { motion } from "framer-motion"
import { Users, UserCheck, UserPlus, Building2 } from "lucide-react"
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/animations"
import type { LucideIcon } from "lucide-react"

const services: {
  icon: LucideIcon
  title: string
  price: string
  duration: string
  description: string
}[] = [
  {
    icon: Users,
    title: "Standard",
    price: "$15",
    duration: "45–50 min",
    description: "Join a standard group class of up to 6. A focused, instructor-led session open to all levels.",
  },
  {
    icon: UserPlus,
    title: "Semi-Private",
    price: "$25 pp",
    duration: "45–50 min",
    description: "A session for two. Shared instruction at a personal level. Bring a friend or partner.",
  },
  {
    icon: UserCheck,
    title: "Private",
    price: "$45",
    duration: "45–50 min",
    description: "One-on-one instruction tailored precisely to your body, goals, and pace.",
  },
  {
    icon: Building2,
    title: "Corporate",
    price: "Custom",
    duration: "45–50 min",
    description: "Tailored wellness programs for your workplace. Designed for teams who move and think better together.",
  },
]

export function Services() {
  return (
    <section id="classes" className="py-20 md:py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="text-center mb-14 md:mb-24 lg:mb-32"
        >
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] pl-[0.5em] text-foreground/50 mb-8">
            Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light">
            Choose your practice
          </motion.h2>
        </motion.div>

        {/* Grid — gap-px border flush */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative bg-background p-8 lg:p-10 flex flex-col overflow-hidden cursor-default"
            >
              {/* Top brand sweep */}
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-brand/50 group-hover:w-full transition-all duration-700 ease-out" />

              {/* Ghost icon */}
              <service.icon
                aria-hidden="true"
                className="absolute -bottom-3 -right-2 w-28 h-28 text-foreground/[0.04] group-hover:text-foreground/[0.08] transition-colors duration-500 pointer-events-none select-none"
                strokeWidth={0.8}
              />

              {/* Small icon */}
              <service.icon
                className="w-4 h-4 mb-8 text-brand/50 group-hover:text-brand/80 transition-colors duration-300"
                strokeWidth={1.5}
              />

              {/* Price eyebrow */}
              <span className="block text-[11px] tracking-[0.35em] text-brand/55 mb-5 font-medium uppercase">
                {service.price} · {service.duration}
              </span>

              <h3 className="font-serif text-[1.45rem] md:text-2xl text-foreground font-light tracking-[-0.02em] mb-5 leading-[1.2]">
                {service.title}
              </h3>

              <p className="text-[13.5px] text-foreground/55 leading-[1.85] mt-auto group-hover:text-foreground/70 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom: expanding line + arrow */}
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
