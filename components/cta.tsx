import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  const whatsappNumber = "263719140346"
  const whatsappMessage = encodeURIComponent(
    "Hello! I'd like to book a Pilates session at Nirvana."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="py-40 lg:py-56 bg-background">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
          Limited spaces
        </p>
        
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] mb-20 font-light">
          Begin your journey
        </h2>

        <Button
          asChild
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 px-14 h-14 text-[13px] font-medium tracking-[0.1em] uppercase gap-4"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4" />
            Book via WhatsApp
          </a>
        </Button>
      </div>
    </section>
  )
}
