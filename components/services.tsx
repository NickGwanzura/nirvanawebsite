"use client"

import { Users, UserCheck, User, Building2, Sparkles, Check } from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Group",
    price: "$15",
    description: "Scheduled classes in a calm, focused environment",
  },
  {
    icon: UserCheck,
    title: "Semi-Private",
    price: "$25",
    description: "Train with a friend or partner",
  },
  {
    icon: User,
    title: "Private",
    price: "$40",
    description: "Personalised, one-on-one attention",
  },
  {
    icon: Building2,
    title: "Corporate",
    price: "Custom",
    description: "Tailored wellness programs for your workplace",
    premium: true,
    features: ["On-site sessions", "Team building", "Workshops"],
  },
]

export function Services() {
  return (
    <section id="classes" className="py-20 md:py-32 lg:py-40 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-32">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
            Services
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light">
            Choose your practice
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50">
          {services.map((service) => {
            const isPremium = 'premium' in service && service.premium
            
            return (
              <div
                key={service.title}
                className={`group relative p-12 lg:p-14 transition-all duration-500 ${
                  isPremium 
                    ? "bg-foreground text-background" 
                    : "bg-background hover:bg-secondary/40"
                }`}
              >
                {/* Premium Indicator */}
                {isPremium && (
                  <div className="absolute top-8 right-8">
                    <Sparkles className="w-4 h-4 text-background/40" />
                  </div>
                )}
                
                {/* Icon */}
                <service.icon className={`w-5 h-5 mb-10 ${isPremium ? "text-background/50" : "text-foreground/40"}`} />

                {/* Title */}
                <h3 className={`font-serif text-3xl tracking-[-0.01em] mb-3 font-light ${isPremium ? "text-background" : "text-foreground"}`}>
                  {service.title}
                </h3>

                {/* Price */}
                <p className={`text-[13px] mb-8 tracking-wide ${isPremium ? "text-background/50" : "text-foreground/50"}`}>
                  {service.price}
                </p>

                {/* Description */}
                <p className={`text-[15px] leading-[1.7] ${isPremium ? "text-background/65" : "text-foreground/60"}`}>
                  {service.description}
                </p>

                {/* Premium Features */}
                {'features' in service && service.features && (
                  <ul className="mt-10 space-y-4">
                    {service.features.map((feature: string) => (
                      <li key={feature} className="flex items-center gap-3 text-[13px] text-background/60">
                        <Check className="w-3 h-3 text-background/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
