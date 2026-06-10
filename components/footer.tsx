"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { CtaLink } from "@/components/ui/cta-link"
import { motion } from "framer-motion"
import { fadeUp, fadeIn, staggerContainer, viewportOptions } from "@/lib/animations"

const studioLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/book", label: "Book a Session" },
]

const supportLinks = [
  { href: "/faqs#getting-started", label: "Getting started" },
  { href: "/faqs#classes", label: "Classes and sessions" },
  { href: "/faqs#booking", label: "Booking and cancellation" },
  { href: "/faqs#etiquette", label: "Studio etiquette" },
  { href: "/faqs#pricing", label: "Pricing and bundles" },
  { href: "/faqs#corporate", label: "Corporate wellness" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background overflow-hidden">

      {/* ── PRE-FOOTER CTA ─────────────────────────────────────────── */}
      <div className="border-b border-background/[0.08]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32 lg:py-44"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">

            {/* Left: headline */}
            <div>
              <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-background/35 mb-8 font-medium">
                Hillside, Bulawayo · Mon – Sat
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-light tracking-[-0.03em] text-background leading-[0.92]">
                Begin your<br />
                <span className="italic text-background/45">practice.</span>
              </motion.h2>
            </div>

            {/* Right: sub-copy + CTAs */}
            <div className="lg:pb-2">
              <motion.p variants={fadeUp} className="text-background/50 text-lg leading-relaxed mb-10 max-w-sm">
                Classes from $15. Private sessions available. No prior experience necessary.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <CtaLink
                  href="/book"
                  variant="light"
                  className="text-[11px] tracking-[0.3em] px-8 py-4 w-fit"
                >
                  Book a Session
                </CtaLink>
                <a
                  href="https://wa.me/263719140346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium text-background/55 border border-background/20 hover:border-background/50 hover:text-background transition-all duration-400 w-fit"
                >
                  WhatsApp Us
                </a>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ── MAIN FOOTER ────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10 lg:pt-20 lg:pb-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-4 flex flex-col gap-6 pb-10 border-b border-background/[0.08] lg:border-0 lg:pb-0"
          >
            <Link href="/" className="inline-flex select-none items-center group text-background w-fit">
              <Logo
                className="h-6 lg:h-8 w-18 lg:w-24 transition-opacity duration-300 group-hover:opacity-50"
                fill="currentColor"
              />
            </Link>

            <p className="font-serif text-base text-background/45 font-light tracking-[-0.01em] leading-[1.65] max-w-[190px]">
              Move with intention.<br />Live with clarity.
            </p>

            <div className="flex flex-col gap-1.5 text-[12px] text-background/30 leading-[1.9]">
              <span>26 Moffat Street, Hillside</span>
              <span>Bulawayo, Zimbabwe</span>
              <span className="mt-1">Mon – Sat · 07:00 to 18:00</span>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 gap-y-10 lg:col-span-7 lg:grid-cols-3">

            {/* Studio */}
            <motion.div variants={fadeUp}>
              <p className="text-[10px] uppercase tracking-[0.45em] text-background/30 mb-6 font-medium">
                Studio
              </p>
              <nav className="flex flex-col gap-3.5">
                {studioLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-background/50 hover:text-background transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Support */}
            <motion.div variants={fadeUp}>
              <p className="text-[10px] uppercase tracking-[0.45em] text-background/30 mb-6 font-medium">
                Support
              </p>
              <nav className="flex flex-col gap-3.5">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-background/50 hover:text-background transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase tracking-[0.45em] text-background/30 mb-6 font-medium">
                Contact
              </p>
              <div className="flex flex-col gap-3.5">
                <a
                  href="tel:+263719140346"
                  className="text-[13px] text-background/50 hover:text-background transition-colors duration-300 w-fit"
                >
                  +263 719 140 346
                </a>
                <a
                  href="https://wa.me/263719140346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-background/50 hover:text-background transition-colors duration-300 w-fit"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/nirvanapilatesbyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-background/50 hover:text-background transition-colors duration-300 w-fit"
                >
                  Instagram
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-background/[0.07]" />
      </div>

      {/* Bottom bar */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mx-auto max-w-7xl px-6 lg:px-8 py-5"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <p className="text-[10px] tracking-[0.15em] text-background/30 uppercase">
              © {currentYear} Nirvana Pilates Studio
            </p>
            <Link
              href="/privacy"
              className="text-[10px] tracking-[0.15em] text-background/22 hover:text-background/50 uppercase transition-colors duration-300"
            >
              Privacy
            </Link>
          </div>
          <a
            href="https://wa.me/263777816368"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.15em] text-background/22 hover:text-background/50 uppercase transition-colors duration-500"
          >
            Designed &amp; Built by NT Global
          </a>
        </div>
      </motion.div>

    </footer>
  )
}
