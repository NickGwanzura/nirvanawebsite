"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn, viewportOptions } from "@/lib/animations"

const values = [
  {
    title: "Inclusivity",
    description: "Every body is a Pilates body. We welcome practitioners of all levels, ages, and backgrounds.",
  },
  {
    title: "Authenticity",
    description: "We honour the classical principles of Pilates while adapting to modern needs and scientific understanding.",
  },
  {
    title: "Community",
    description: "Beyond fitness, we cultivate meaningful connections and a supportive environment for growth.",
  },
  {
    title: "Excellence",
    description: "From our equipment to our instruction, we uphold the highest standards in everything we do.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-8">
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[-0.02em] text-foreground mb-10">
              Meet Lindiwe
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/55 leading-relaxed max-w-2xl">
              The heart and soul behind Nirvana Pilates Studio, dedicated to bringing mindful movement and holistic wellness to Bulawayo.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portrait + Bio */}
      <section className="pb-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="/images/noma.jpg"
                alt="Noma, founder of Nirvana Pilates Studio"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="lg:py-12"
            >
              <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-6">
                Founder & Lead Instructor
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-10">
                A Journey of<br />Transformation
              </motion.h2>
              <motion.div variants={staggerContainer} className="space-y-6 text-foreground/60 leading-[1.85]">
                {[
                  "Lindiwe discovered Pilates during a pivotal moment in her life, seeking balance amidst the demands of modern living. What began as a personal practice quickly evolved into a profound passion for helping others discover the transformative power of mindful movement.",
                  "After years of dedicated study and certification from internationally recognised Pilates institutions, Lindiwe returned to her home city of Bulawayo with a vision: to create a sanctuary where movement becomes meditation, and where every body is welcomed and celebrated.",
                  "Her teaching philosophy centres on the belief that Pilates is not merely exercise, but a practice of self-care that nurtures both physical strength and mental clarity.",
                ].map((text, i) => (
                  <motion.p key={i} variants={fadeUp} className="text-[15px]">
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-32 lg:py-40 bg-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-10">
              Our Philosophy
            </motion.p>
            {/* Decorative opening quote */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-serif text-[80px] leading-none text-foreground/10 -mb-4 select-none"
            >
              "
            </motion.div>
            <motion.blockquote
              variants={fadeUp}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.25] tracking-[-0.01em] text-foreground mb-10"
            >
              Movement should feel like a gift you give yourself, not a punishment for what you ate.
            </motion.blockquote>
            <motion.p variants={fadeUp} className="text-foreground/40 tracking-[0.2em] text-[13px] uppercase">
              Lindiwe
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision + Values */}
      <section className="py-32 lg:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Vision */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-6">
                The Vision
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em] text-foreground mb-10">
                Why Nirvana?
              </motion.h2>
              <motion.div variants={staggerContainer} className="space-y-6 text-foreground/60 leading-[1.85]">
                {[
                  "The name Nirvana represents the ultimate state of peace and enlightenment, a place where the noise of the world fades and you reconnect with your truest self.",
                  "In our studio nestled in the heart of Hillside, Bulawayo, we have created exactly that: a space where the outside world pauses, where your breath becomes your anchor, and where each movement brings you closer to balance.",
                  "Our vision extends beyond individual practice. We believe in building a community of mindful movers who support and inspire one another on their wellness journeys.",
                ].map((text, i) => (
                  <motion.p key={i} variants={fadeUp} className="text-[15px]">
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="lg:pt-16"
            >
              <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-10">
                Our Values
              </motion.p>
              <div className="space-y-8">
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    variants={fadeUp}
                    className="group flex gap-6 border-l-2 border-foreground/10 hover:border-foreground/30 transition-colors duration-500 pl-6"
                  >
                    <div>
                      <h3 className="font-serif text-xl text-foreground mb-2 font-light group-hover:tracking-[-0.01em] transition-all duration-300">
                        {value.title}
                      </h3>
                      <p className="text-[14px] text-foreground/50 leading-[1.8] group-hover:text-foreground/70 transition-colors duration-300">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Studio Images */}
      <section className="pb-20 md:pb-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["/images/about/about-class-1.png", "/images/about/about-class-2.png"].map((src, i) => (
              <motion.div
                key={src}
                variants={i === 0 ? fadeLeft : fadeRight}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={src}
                  alt="Nirvana Pilates Studio interior"
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="text-center text-[12px] text-foreground/35 tracking-[0.15em] uppercase mt-8"
          >
            Our studio in Hillside, Bulawayo
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_60%)]" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOptions}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-background/30 via-background/10 to-transparent"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-background/40 mb-8">
              Begin Your Journey
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05] tracking-[-0.02em] mb-10 text-background">
              Ready to experience<br />Nirvana?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-background/55 max-w-lg mx-auto mb-14 leading-relaxed text-lg">
              Join Lindiwe and our community of mindful movers. Your first session is the beginning of something beautiful.
            </motion.p>
            <motion.div variants={scaleIn}>
              <Link
                href="/book"
                className="group relative inline-flex items-center justify-center overflow-hidden px-12 h-14 border border-background/25 text-background text-[13px] font-medium tracking-[0.12em] uppercase transition-all duration-500 hover:border-background hover:bg-background hover:text-foreground"
              >
                <span className="absolute inset-0 bg-background scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  Book Your First Class
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
