"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, UserCheck, UserPlus, Building2, Check, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MonthlyBundles } from "@/components/monthly-bundles"
import { CtaLink } from "@/components/ui/cta-link"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, staggerContainer, scaleIn, viewportOptions } from "@/lib/animations"

const services = [
  {
    icon: Users,
    title: "Standard",
    price: "$15",
    duration: "45–50 min",
    capacity: "Up to 6",
    description: "Join a standard group class of up to 6. A focused, instructor-led session open to all levels.",
  },
  {
    icon: UserPlus,
    title: "Semi-Private",
    price: "$25 pp",
    duration: "45–50 min",
    capacity: "2 people",
    description: "A focused session for two. Shared instruction at a personal level. Ideal for friends or partners.",
  },
  {
    icon: UserCheck,
    title: "Private",
    price: "$45",
    duration: "45–50 min",
    capacity: "1-on-1",
    description: "One-on-one instruction tailored precisely to your body, goals, and pace.",
  },
  {
    icon: Building2,
    title: "Corporate",
    price: "Custom",
    duration: "45–50 min",
    capacity: "5–20 people",
    description: "Tailored wellness programs brought to your workplace. Designed for teams who move and think better together.",
    premium: true,
    features: ["On-site or in-studio", "Team building", "Posture & stress workshops"],
  },
]

const faqs = [
  {
    q: "What is the difference between standard, semi-private, and private sessions?",
    a: "Standard classes are open group sessions (up to 8 people) at $15 per person. You join a class already in progress. Semi-private sessions are for exactly 2 people at $25 per person, ideal for friends or partners wanting shared but personal instruction. Private sessions are fully one-on-one at $45, tailored entirely to your goals.",
  },
  {
    q: "Do I need prior experience to join a class?",
    a: "Not at all. Our classes welcome all levels, from complete beginners to advanced practitioners. Our instructors provide modifications to suit your experience and fitness level.",
  },
  {
    q: "How long are the classes?",
    a: "All sessions are 45–50 minutes.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, form-fitting clothing that allows for a full range of movement. Pilates is practiced barefoot or in grip socks. No shoes required.",
  },
  {
    q: "How often should I practice?",
    a: "For optimal results, we recommend 2 to 3 sessions per week. Consistency matters more than frequency. Even one session a week delivers meaningful benefits over time.",
  },
  {
    q: "What equipment do I need to bring?",
    a: "Nothing. We provide all equipment including mats, reformers, and props. A water bottle is always welcome.",
  },
]

export default function ClassesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-8">
              The Practice
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-foreground leading-[1.05] max-w-3xl">
              Choose your practice
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Animated divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ originX: 0 }}
          className="h-px bg-border"
        />
      </div>

      {/* Classes grid */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
                <span className="block text-[10px] tracking-[0.45em] text-brand/55 mb-5 font-medium uppercase">
                  {service.price} · {service.duration}
                </span>

                <h2 className="font-serif text-[1.45rem] md:text-2xl text-foreground font-light tracking-[-0.02em] mb-5 leading-[1.2]">
                  {service.title}
                </h2>

                <p className="text-[13.5px] text-foreground/55 leading-[1.85] group-hover:text-foreground/70 transition-colors duration-300">
                  {service.description}
                </p>

                {"features" in service && service.features && (
                  <ul className="mt-8 space-y-3 border-t border-border pt-8">
                    {service.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-[13px] text-foreground/45 group-hover:text-foreground/60 transition-colors duration-300">
                        <Check className="w-3 h-3 shrink-0 text-foreground/25" strokeWidth={2} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Bottom: line + arrow */}
                <div className="mt-auto pt-8 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border group-hover:bg-brand/20 transition-colors duration-500" />
                  <span className="text-foreground/20 text-sm group-hover:text-brand/40 group-hover:translate-x-1 transition-all duration-300 ease-out">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Book CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="mt-14 flex justify-end"
          >
            <CtaLink href="/book" variant="dark" className="text-[11px] tracking-[0.3em] px-10 py-4">
              Book a Session →
            </CtaLink>
          </motion.div>
        </div>
      </section>

      <MonthlyBundles />

      {/* FAQs */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="lg:col-span-4"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-6">
              Questions
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light tracking-[-0.02em] text-foreground leading-[1.1] mb-8">
              Everything you need to know
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link
                href="/faqs"
                className="text-[11px] uppercase tracking-[0.3em] text-foreground/35 hover:text-foreground transition-colors duration-300"
              >
                View all FAQs →
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="lg:col-span-8 divide-y divide-border"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <motion.div key={index} variants={fadeUp}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full py-7 flex items-start justify-between text-left gap-8 group"
                  >
                    <span className={`text-[15px] leading-snug tracking-wide transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="shrink-0 mt-0.5 text-foreground/30 group-hover:text-foreground/60 transition-colors duration-200"
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] text-foreground/50 leading-[1.9] pb-7 pr-4 md:pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
