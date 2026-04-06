import Link from "next/link"
import { Logo } from "./logo"

const studioLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/book", label: "Book a Session" },
]

const faqLinks = [
  { href: "/faqs#getting-started", label: "Getting started" },
  { href: "/faqs#classes", label: "Classes & sessions" },
  { href: "/faqs#booking", label: "Booking & cancellation" },
  { href: "/faqs#corporate", label: "Corporate wellness" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Brand — spans 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex select-none h-20 lg:h-24 w-56 lg:w-72 items-center mb-12">
                <Logo className="w-full h-full" fill="#faf9f7" />
              </Link>
              <p className="font-serif text-3xl lg:text-4xl text-background/75 font-light tracking-[-0.01em] leading-[1.35] max-w-xs">
                Move with intention.<br />Live with clarity.
              </p>
            </div>

            <Link
              href="/book"
              className="mt-8 lg:mt-14 inline-block w-fit text-[11px] uppercase tracking-[0.25em] font-medium px-8 py-4 border border-background/20 text-background/60 hover:border-background/60 hover:text-background transition-all duration-300"
            >
              Book a Session
            </Link>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Studio */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-background/30 mb-8">
              Studio
            </p>
            <nav className="flex flex-col gap-4">
              {studioLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-background/50 hover:text-background transition-colors duration-300 w-fit tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-background/30 mb-8">
              FAQs
            </p>
            <nav className="flex flex-col gap-4">
              {faqLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-background/50 hover:text-background transition-colors duration-300 w-fit tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/faqs"
                className="mt-2 text-[11px] uppercase tracking-[0.25em] text-background/30 hover:text-background/70 transition-colors duration-300 w-fit"
              >
                View all →
              </Link>
            </nav>
          </div>

          {/* Visit & Contact */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-background/30 mb-8">
              Visit
            </p>
            <address className="not-italic text-[14px] text-background/50 leading-[2] tracking-wide mb-10">
              26 Moffat Street<br />
              Hillside<br />
              Bulawayo, Zimbabwe
            </address>

            <p className="text-[10px] uppercase tracking-[0.4em] text-background/30 mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+263719140346"
                className="text-[14px] text-background/50 hover:text-background transition-colors duration-300 w-fit tracking-wide"
              >
                +263 719 140 346
              </a>
              <a
                href="https://wa.me/263719140346"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-background/50 hover:text-background transition-colors duration-300 w-fit tracking-wide"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-background/10" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-[0.15em] text-background/25 uppercase">
            © {currentYear} Nirvana Pilates Studio. All rights reserved.
          </p>
          <a
            href="https://wa.me/263777816368"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.15em] text-background/20 hover:text-background/50 uppercase transition-colors duration-300"
          >
            Designed & Built by NT Global
          </a>
        </div>
      </div>

    </footer>
  )
}
