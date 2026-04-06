import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 lg:pt-52 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground mb-8">
              Our Story
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight text-foreground mb-10">
              Meet Noma
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              The heart and soul behind Nirvana Pilates Studio, dedicated to 
              bringing mindful movement and holistic wellness to Bulawayo.
            </p>
          </div>
        </div>
      </section>

      {/* Portrait Section */}
      <section className="pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/noma.jpg"
                alt="Noma, founder of Nirvana Pilates Studio"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bio */}
            <div className="lg:py-12">
              <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground mb-6">
                Founder & Lead Instructor
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-[0.95] tracking-tight text-foreground mb-10">
                A Journey of<br />Transformation
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  Noma discovered Pilates during a pivotal moment in her life, seeking 
                  balance amidst the demands of modern living. What began as a personal 
                  practice quickly evolved into a profound passion for helping others 
                  discover the transformative power of mindful movement.
                </p>
                <p>
                  After years of dedicated study and certification from internationally 
                  recognised Pilates institutions, Noma returned to her home city of 
                  Bulawayo with a vision: to create a sanctuary where movement becomes 
                  meditation, and where every body is welcomed and celebrated.
                </p>
                <p>
                  Her teaching philosophy centres on the belief that Pilates is not 
                  merely exercise, but a practice of self-care that nurtures both 
                  physical strength and mental clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 lg:py-40 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground mb-8">
              Our Philosophy
            </p>
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight text-foreground mb-12">
              &ldquo;Movement should feel like a gift you give yourself, 
              not a punishment for what you ate.&rdquo;
            </blockquote>
            <p className="text-muted-foreground">— Noma</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Vision Text */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground mb-6">
                The Vision
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-[0.95] tracking-tight text-foreground mb-10">
                Why Nirvana?
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  The name Nirvana represents the ultimate state of peace and 
                  enlightenment — a place where the noise of the world fades 
                  and you reconnect with your truest self.
                </p>
                <p>
                  In our studio nestled in the heart of Hillside, Bulawayo, we 
                  have created exactly that: a space where the outside world 
                  pauses, where your breath becomes your anchor, and where 
                  each movement brings you closer to balance.
                </p>
                <p>
                  Our vision extends beyond individual practice. We believe in 
                  building a community of mindful movers who support and inspire 
                  one another on their wellness journeys.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="lg:pt-16">
              <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground mb-8">
                Our Values
              </p>
              <div className="space-y-10">
                {[
                  {
                    title: "Inclusivity",
                    description: "Every body is a Pilates body. We welcome practitioners of all levels, ages, and backgrounds."
                  },
                  {
                    title: "Authenticity",
                    description: "We honour the classical principles of Pilates while adapting to modern needs and scientific understanding."
                  },
                  {
                    title: "Community",
                    description: "Beyond fitness, we cultivate meaningful connections and a supportive environment for growth."
                  },
                  {
                    title: "Excellence",
                    description: "From our equipment to our instruction, we uphold the highest standards in everything we do."
                  }
                ].map((value) => (
                  <div key={value.title} className="border-l border-foreground/20 pl-6">
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Image */}
      <section className="pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <Image
              src="/images/studio-interior.jpg"
              alt="Nirvana Pilates Studio interior"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Our studio in Hillside, Bulawayo
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-primary-foreground/60 mb-8">
            Begin Your Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95] tracking-tight mb-10">
            Ready to experience<br />Nirvana?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-12 leading-relaxed">
            Join Noma and our community of mindful movers. Your first 
            session is the beginning of something beautiful.
          </p>
          <Link
            href="/book"
            className="inline-block px-10 py-4 bg-primary-foreground text-primary text-sm font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors"
          >
            Book Your First Class
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
