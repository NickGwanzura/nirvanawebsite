"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, UserCheck, User, Building2, Check, Plus, Minus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const services = [
  {
    icon: Users,
    title: "Group",
    price: "$15",
    duration: "55 min",
    capacity: "Up to 8",
    description: "Scheduled classes in a calm, focused environment. A shared practice that builds community and consistency.",
  },
  {
    icon: UserCheck,
    title: "Semi-Private",
    price: "$25",
    duration: "55 min",
    capacity: "2–4 people",
    description: "Train with a friend or partner. More personal attention without sacrificing the energy of shared movement.",
  },
  {
    icon: User,
    title: "Private",
    price: "$40",
    duration: "55 min",
    capacity: "1-on-1",
    description: "Fully personalised, one-on-one instruction tailored precisely to your body, goals, and pace.",
  },
  {
    icon: Building2,
    title: "Corporate",
    price: "Custom",
    duration: "60+ min",
    capacity: "5–20 people",
    description: "Tailored wellness programs brought to your workplace. Designed for teams who move and think better together.",
    premium: true,
    features: ["On-site or in-studio", "Team building", "Posture & stress workshops"],
  },
]

const faqs = [
  {
    q: "What is the difference between group, semi-private, and private sessions?",
    a: "Group sessions accommodate up to 8 participants, offering a community atmosphere. Semi-private sessions have 2–4 participants, allowing for more personalised attention. Private sessions are one-on-one with an instructor, fully tailored to your specific needs and goals.",
  },
  {
    q: "Do I need prior experience to join a class?",
    a: "Not at all. Our classes welcome all levels, from complete beginners to advanced practitioners. Our instructors provide modifications to suit your experience and fitness level.",
  },
  {
    q: "How long are the classes?",
    a: "Group and semi-private sessions are 55 minutes. Private sessions can be 55 or 90 minutes depending on your preference and goals.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, form-fitting clothing that allows for a full range of movement. Pilates is practiced barefoot or in grip socks — no shoes required.",
  },
  {
    q: "How often should I practice?",
    a: "For optimal results, we recommend 2–3 sessions per week. Consistency matters more than frequency — even one session a week delivers meaningful benefits over time.",
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
      <section className="pt-48 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-8">
            The Practice
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-foreground leading-[1.05] max-w-3xl">
            Choose your practice
          </h1>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Classes grid */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const isAccent = "premium" in service && service.premium
              return (
                <div
                  key={service.title}
                  className={`group relative flex flex-col p-10 lg:p-12 bg-secondary/40
                    hover:bg-secondary/70 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5
                    transition-all duration-400 ease-out
                    ${isAccent ? "ring-1 ring-foreground/10" : ""}
                  `}
                >
                  <service.icon
                    className="w-5 h-5 mb-10 text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300"
                    strokeWidth={1.5}
                  />

                  <h2 className="font-serif text-3xl font-light tracking-[-0.01em] mb-2 text-foreground group-hover:tracking-[-0.02em] transition-all duration-300">
                    {service.title}
                  </h2>

                  <p className="text-[12px] uppercase tracking-[0.25em] text-foreground/35 mb-8 group-hover:text-foreground/50 transition-colors duration-300">
                    {service.price} · {service.duration}
                  </p>

                  <p className="text-[14px] text-foreground/55 leading-[1.8] mb-6 group-hover:text-foreground/70 transition-colors duration-300">
                    {service.description}
                  </p>

                  <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/25 mt-auto group-hover:text-foreground/40 transition-colors duration-300">
                    {service.capacity}
                  </p>

                  {"features" in service && service.features && (
                    <ul className="mt-8 space-y-3 border-t border-foreground/8 pt-8">
                      {service.features.map((f: string) => (
                        <li key={f} className="flex items-center gap-3 text-[13px] text-foreground/45 group-hover:text-foreground/60 transition-colors duration-300">
                          <Check className="w-3 h-3 shrink-0 text-foreground/25" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>

          {/* Book CTA */}
          <div className="mt-12 flex justify-end">
            <Link
              href="/book"
              className="text-[11px] uppercase tracking-[0.25em] font-medium px-10 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* FAQs */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-6">
              Questions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-[-0.02em] text-foreground leading-[1.1] mb-8">
              Everything you need to know
            </h2>
            <Link
              href="/faqs"
              className="text-[11px] uppercase tracking-[0.25em] text-foreground/40 hover:text-foreground transition-colors duration-200"
            >
              View all FAQs →
            </Link>
          </div>

          <div className="lg:col-span-8 divide-y divide-border">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={index}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full py-7 flex items-start justify-between text-left gap-8 group"
                  >
                    <span className={`text-[15px] leading-snug tracking-wide transition-colors duration-200 ${isOpen ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {faq.q}
                    </span>
                    <span className="shrink-0 mt-0.5 text-foreground/30 group-hover:text-foreground/60 transition-colors duration-200">
                      {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-64 pb-7" : "max-h-0"}`}>
                    <p className="text-[14px] text-foreground/50 leading-[1.9] pr-4 md:pr-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
