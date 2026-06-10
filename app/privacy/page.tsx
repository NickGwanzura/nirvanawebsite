import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Nirvana Pilates Studio",
  description: "How Nirvana Pilates Studio collects and uses your information.",
}

const sections = [
  {
    title: "Information we collect",
    body: `When you make a booking through our website we collect your name, email address, WhatsApp number, and any notes you choose to share about your health or session preferences. We do not collect payment details on our site — all payments are handled in person at the studio.`,
  },
  {
    title: "How we use your information",
    body: `Your details are used solely to confirm and manage your studio booking, send session reminders, and communicate any changes to your scheduled class. We do not use your information for marketing without your explicit consent.`,
  },
  {
    title: "WhatsApp communication",
    body: `By providing your WhatsApp number, you consent to receiving booking confirmations and session updates via WhatsApp. You can ask us to stop contacting you at any time by sending a message to the studio.`,
  },
  {
    title: "Data storage",
    body: `Booking records are stored securely and are accessible only to Nirvana Pilates Studio staff. We retain records for as long as reasonably necessary to manage ongoing client relationships, and delete inactive records upon request.`,
  },
  {
    title: "Third parties",
    body: `We do not sell, trade, or otherwise share your personal information with third parties. Our website is hosted on Vercel. Our booking system uses MongoDB Atlas. Both providers maintain their own security practices.`,
  },
  {
    title: "Your rights",
    body: `You may request access to the personal data we hold about you, ask us to correct inaccurate data, or request deletion of your record at any time. To exercise any of these rights, contact us via WhatsApp at +263 719 140 346.`,
  },
  {
    title: "Contact",
    body: `Nirvana Pilates Studio\n26 Moffat Street, Hillside\nBulawayo, Zimbabwe\nWhatsApp: +263 719 140 346`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 font-medium mb-6">
              Legal
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light tracking-[-0.02em] text-foreground leading-[0.95]">
              Privacy Policy
            </h1>
            <p className="mt-6 text-sm text-foreground/50">
              Last updated: June 2025
            </p>
          </div>

          {/* Intro */}
          <p className="text-foreground/70 text-base leading-[1.8] mb-16">
            At Nirvana Pilates Studio we respect your privacy and are committed to being transparent about how we collect and use your personal information. This policy explains our practices in plain language.
          </p>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section, i) => (
              <div key={i} className="border-t border-border pt-10">
                <h2 className="font-serif text-2xl font-light tracking-[-0.01em] text-foreground mb-5">
                  {section.title}
                </h2>
                <p className="text-foreground/65 text-base leading-[1.8] whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-20 pt-10 border-t border-border">
            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
