"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ArrowLeft } from "lucide-react"

const faqs = [
  {
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
    category: "Classes & Sessions",
    questions: [
      {
        q: "What is the difference between group, semi-private, and private sessions?",
        a: "Group sessions accommodate up to 8 participants, offering a community atmosphere. Semi-private sessions have 2-4 participants, allowing for more personalised attention. Private sessions are one-on-one with an instructor, fully tailored to your specific needs and goals."
      },
      {
        q: "How long are the classes?",
        a: "Group and semi-private sessions are 55 minutes. Private sessions can be 55 or 90 minutes depending on your preference and goals."
      },
      {
        q: "How often should I practice?",
        a: "For optimal results, we recommend 2-3 sessions per week. Consistency is more important than frequency—regular practice, even once a week, will yield benefits."
      },
    ]
  },
  {
    category: "Booking & Cancellation",
    questions: [
      {
        q: "How do I book a class?",
        a: "You can book through our website calendar or contact us directly via WhatsApp. We recommend booking at least 24 hours in advance to secure your preferred time slot."
      },
      {
        q: "What is your cancellation policy?",
        a: "We require 12 hours notice for cancellations. Late cancellations or no-shows may be charged the full session fee. We understand emergencies happen—please contact us if you have special circumstances."
      },
      {
        q: "Can I reschedule my booking?",
        a: "Yes, you can reschedule up to 12 hours before your session. Simply contact us via WhatsApp or use the booking calendar to select a new time."
      },
    ]
  },
  {
    category: "Corporate Wellness",
    questions: [
      {
        q: "What does a corporate wellness session include?",
        a: "Our corporate sessions can be held at your workplace or our studio. We offer mat-based Pilates, desk stretches, and mindfulness components. Sessions can be tailored to address common office-related issues like posture and stress."
      },
      {
        q: "How many employees can participate?",
        a: "We can accommodate groups of 5-20 participants for corporate sessions. Larger groups can be split into multiple sessions for optimal instruction quality."
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
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-24 lg:h-28 items-center justify-between">
            <Link href="/" className="font-serif text-2xl tracking-[-0.01em] text-foreground font-light">
              Nirvana
            </Link>
            <Link 
              href="/"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/50 transition-colors hover:text-foreground font-medium"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-48 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 font-medium mb-8">
            Support
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-foreground leading-[0.95]">
            Frequently Asked Questions
          </h1>
          <p className="mt-10 text-foreground/60 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our studio, classes, and how to get started.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-40 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className={categoryIndex > 0 ? "mt-20" : ""}>
              <h2 className="font-serif text-2xl md:text-3xl font-light tracking-[-0.01em] text-foreground mb-10">
                {category.category}
              </h2>
              <div className="border-t border-border">
                {category.questions.map((faq, index) => {
                  const itemId = `${categoryIndex}-${index}`
                  const isOpen = openItems.includes(itemId)
                  
                  return (
                    <div key={index} className="border-b border-border">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full py-7 flex items-center justify-between text-left group"
                      >
                        <span className="text-foreground font-medium pr-8 group-hover:text-foreground/70 transition-colors">
                          {faq.q}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`text-foreground/40 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isOpen ? "max-h-96 pb-7" : "max-h-0"
                        }`}
                      >
                        <p className="text-foreground/60 leading-relaxed pr-12">
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
      </section>

      {/* Contact CTA */}
      <section className="pb-40 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-foreground/60 text-lg font-light mb-8">
            Still have questions?
          </p>
          <a
            href="https://wa.me/263771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
