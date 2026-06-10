"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import { CtaLink } from "@/components/ui/cta-link"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/faqs", label: "FAQs" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isTransparent = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false
    return pathname === href
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isTransparent
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur-xl border-b border-foreground/[0.07] shadow-[0_1px_24px_rgba(0,0,0,0.07)]"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className={`select-none flex items-center transition-colors duration-500 ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
            >
              <Logo className="h-7 lg:h-10 w-24 lg:w-36" fill="currentColor" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:gap-8 lg:gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-[11px] uppercase tracking-[0.2em] font-medium group transition-colors duration-300 ${
                      isTransparent
                        ? isActive(link.href) ? "text-white" : "text-white/60 hover:text-white"
                        : isActive(link.href) ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ease-out ${
                        isTransparent ? "bg-white" : "bg-brand"
                      } ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right — CTA + Admin */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <CtaLink
                  href="/book"
                  variant={isTransparent ? "light" : "dark"}
                  className="text-[11px] tracking-[0.18em] px-6 py-2.5"
                >
                  Book a Session
                </CtaLink>
              </motion.div>

            </div>

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden p-2.5 -mr-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isTransparent ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden bg-background"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
                  }}
                  className="flex flex-col pt-3 pb-6 border-t border-foreground/10 mt-1"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
                          isActive(link.href) ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
                    }}
                    className="pt-4"
                  >
                    <CtaLink
                      href="/book"
                      variant="dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-fit text-[11px] tracking-[0.18em] px-6 py-3.5"
                    >
                      Book a Session
                    </CtaLink>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  )
}
