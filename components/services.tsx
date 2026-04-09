"use client"

import { Users, UserCheck, User, Building2 } from "lucide-react"

const services = [
  {
    icon: User,
    title: "Standard",
    price: "$15",
    duration: "45–50 min",
    description: "Your personal session in a calm, focused studio environment.",
  },
  {
    icon: Users,
    title: "Group",
    price: "$30",
    duration: "45–50 min",
    description: "Join a class with others — no need to bring a group.",
  },
  {
    icon: UserCheck,
    title: "Private",
    price: "$45",
    duration: "45–50 min",
    description: "Personalised, one-on-one attention.",
  },
  {
    icon: Building2,
    title: "Corporate",
    price: "Custom",
    duration: "45–50 min",
    description: "Tailored wellness programs for your workplace.",
    accent: true,
  },
]

export function Services() {
  return (
    <section id="classes" className="py-20 md:py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-24 lg:mb-32">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
            Services
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light">
            Choose your practice
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative flex flex-col p-10 lg:p-12 bg-secondary/40
                hover:bg-secondary/70 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                transition-all duration-400 ease-out
                ${service.accent ? "ring-1 ring-foreground/10" : ""}
              `}
            >
              <service.icon
                className="w-5 h-5 mb-10 text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300"
                strokeWidth={1.5}
              />

              <h3 className="font-serif text-3xl text-foreground font-light tracking-[-0.01em] mb-2 group-hover:tracking-[-0.02em] transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-[12px] uppercase tracking-[0.25em] text-foreground/35 mb-8 transition-colors duration-300 group-hover:text-foreground/50">
                {service.price} · {service.duration}
              </p>

              <p className="text-[14px] text-foreground/55 leading-[1.8] mt-auto transition-colors duration-300 group-hover:text-foreground/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
