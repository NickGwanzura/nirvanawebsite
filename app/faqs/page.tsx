"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const faqs = [
  {
    id: "getting-started",
    category: "Getting Started",
    questions: [
      {
        q: "What should I wear to class?",
        a: "Comfortable, form-fitting clothing that allows for a full range of movement. We recommend avoiding loose clothing that may interfere with your form. Pilates is practiced barefoot or in grip socks."
      },
      {
        q: "Do I need prior experience?",
        a: "Not at all. Our classes welcome all levels, from complete beginners to advanced practitioners. Our instructors provide modifications to suit your experience and fitness level."
      },
      {
        q: "What should I bring?",
        a: "Just yourself. We provide all equipment including mats, reformers, and props. You may bring a water bottle and a small towel if you prefer."
      },
    ]
  },
  {
    id: "classes",
    category: "Classes & Sessions",
    questions: [
      {
        q: "What is the difference between group, semi-private, and private sessions?",
        a: "Group sessions accommodate up to 8 participants, offering a community atmosphere. Semi-private sessions have 2–4 participants, allowing for more personalised attention. Private sessions are one-on-one with an instructor, fully tailored to your specific needs and goals."
      },
      {
        q: "How long are the classes?",
        a: "Group and semi-private sessions are 55 minutes. Private sessions can be 55 or 90 minutes depending on your preference and goals."
      },
      {
        q: "How often should I practice?",
        a: "For optimal results, we recommend 2–3 sessions per week. Consistency is more important than frequency — regular practice, even once a week, will yield meaningful benefits."
      },
    ]
  },
  {
    id: "booking",
    category: "Booking & Cancellation",
    questions: [
      {
        q: "How do I book a class?",
        a: "You can book through our website calendar or contact us directly via WhatsApp. We recommend booking at least 24 hours in advance to secure your preferred time slot."
      },
      {
        q: "What is your cancellation policy?",
        a: "We require 12 hours notice for cancellations. Late cancellations or no-shows may be charged the full session fee. We understand emergencies happen — please contact us if you have special circumstances."
      },
      {
        q: "Can I reschedule my booking?",
        a: "Yes, you can reschedule up to 12 hours before your session. Simply contact us via WhatsApp or use the booking calendar to select a new time."
      },
    ]
  },
  {
    id: "corporate",
    category: "Corporate Wellness",
    questions: [
      {
        q: "What does a corporate wellness session include?",
        a: "Our corporate sessions can be held at your workplace or our studio. We offer mat-based Pilates, desk stretches, and mindfulness components. Sessions can be tailored to address common office-related issues like posture and stress."
      },
      {
        q: "How many employees can participate?",
        a: "We can accommodate groups of 5–20 participants for corporate sessions. Larger groups can be split into multiple sessions for optimal instruction quality."
      },
      {
        q: "Do you offer ongoing corporate packages?",
        a: "Yes, we offer weekly, bi-weekly, and monthly packages for ongoing corporate wellness programs. Contact us to discuss a customised arrangement for your organisation."
      },
    ]
  },
]

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-8">
            Support
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-foreground leading-[1.05] max-w-2xl">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Mobile category strip */}
      <div className="lg:hidden overflow-x-auto border-b border-border">
        <div className="flex px-6 gap-6 py-4 min-w-max">
          {faqs.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground whitespace-nowrap transition-colors duration-200 py-1"
            >
              {section.category}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sticky category nav — desktop only */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-40">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 mb-6">
                  Topics
                </p>
                <nav className="flex flex-col gap-1">
                  {faqs.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-[13px] text-foreground/40 hover:text-foreground py-2 transition-colors duration-200 tracking-wide"
                    >
                      {section.category}
                    </a>
                  ))}
                </nav>

                <div className="mt-16 pt-10 border-t border-border">
                  <p className="text-[13px] text-foreground/50 leading-relaxed mb-6">
                    Still have questions?
                  </p>
                  <a
                    href="https://wa.me/263719140346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.25em] font-medium text-foreground hover:text-foreground/60 transition-colors duration-200"
                  >
                    Contact us →
                  </a>
                </div>
              </div>
            </aside>

            {/* Questions */}
            <div className="lg:col-span-9">
              {faqs.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  id={section.id}
                  className={sectionIndex > 0 ? "mt-20 pt-20 border-t border-border" : ""}
                >
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-[-0.01em] text-foreground mb-12">
                    {section.category}
                  </h2>

                  <div className="divide-y divide-border">
                    {section.questions.map((faq, index) => {
                      const itemId = `${section.id}-${index}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <div key={index}>
                          <button
                            onClick={() => toggleItem(itemId)}
                            aria-expanded={isOpen}
                            className="w-full py-8 flex items-start justify-between text-left gap-8 group"
                          >
                            <span className={`text-[16px] leading-snug tracking-wide transition-colors duration-200 ${isOpen ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}>
                              {faq.q}
                            </span>
                            <span className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-foreground/30 group-hover:text-foreground/60 transition-colors duration-200">
                              {isOpen
                                ? <Minus size={16} strokeWidth={1.5} />
                                : <Plus size={16} strokeWidth={1.5} />
                              }
                            </span>
                          </button>

                          <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 pb-8" : "max-h-0"}`}>
                            <p className="text-[15px] text-foreground/55 leading-[1.9] max-w-2xl pr-4 md:pr-12">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 lg:px-8 bg-secondary/40">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-6">
              Ready to begin?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-foreground leading-[1.05]">
              Book your first session
            </h2>
          </div>
          <Link
            href="/book"
            className="shrink-0 inline-block text-[11px] uppercase tracking-[0.25em] font-medium px-10 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
          >
            Reserve a spot
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
