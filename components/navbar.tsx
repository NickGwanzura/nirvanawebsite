"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Lock } from "lucide-react"
import { Logo } from "./logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/book", label: "Book" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Only go transparent over the hero on the homepage
  const isHome = pathname === "/"
  const isTransparent = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/"
    }
    return pathname === href
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isTransparent
            ? "bg-transparent"
            : "bg-[#faf9f7]/90 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 lg:h-28 items-center justify-between">
            <Link href="/" className="select-none h-12 lg:h-20 w-36 lg:w-56 flex items-center">
              <Logo className="w-full h-full transition-all duration-500" fill={isTransparent ? "#ffffff" : "#1a1a1a"} />
            </Link>

            {/* Desktop Navigation — Center */}
            <div className="hidden md:flex md:items-center md:gap-12 lg:gap-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[12px] uppercase tracking-[0.2em] transition-all duration-300 font-medium ${
                    isTransparent
                      ? isActive(link.href) ? "text-white" : "text-white/60 hover:text-white"
                      : isActive(link.href) ? "text-foreground" : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-px bg-foreground/30 transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side — CTA + Admin */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {/* Primary CTA */}
              <Link
                href="/book"
                className={`text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3 transition-all duration-300 hover:shadow-lg ${
                  isTransparent
                    ? "bg-white text-foreground hover:bg-white/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Book a Session
              </Link>

              {/* Admin Access — discreet lock icon only */}
              <Link
                href="/admin"
                className={`transition-all duration-300 ${
                  isTransparent ? "text-white/30 hover:text-white/60" : "text-foreground/20 hover:text-foreground/50"
                }`}
                aria-label="Admin access"
              >
                <Lock size={13} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors ${isTransparent ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
              isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-6 pt-6 pb-10 border-t border-foreground/10 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-fit text-[11px] uppercase tracking-[0.15em] font-medium px-6 py-3 bg-foreground text-background mt-2"
              >
                Book a Session
              </Link>

              {/* Admin — intentionally omitted from mobile menu */}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
