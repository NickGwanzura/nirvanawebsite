"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/animations"

const faqs = [
  {
    id: "getting-started",
    category: "Getting Started",
    questions: [
      {
        q: "Do I need prior experience to join a class?",
        a: "Not at all. Our classes are designed for all levels, from complete beginners to advanced practitioners. Your instructor will provide modifications throughout the session so you are always working at the right level for your body.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable, form-fitting clothing that allows for a full range of movement. Avoid loose or baggy clothing, as it can interfere with your form and the instructor's ability to observe your alignment. Leggings, fitted tops, and sports bras all work well.",
      },
      {
        q: "Do I need grip socks?",
        a: "Yes. Grip socks are required for all classes. They keep you safe on the reformer and other equipment, provide grip during movement, and maintain hygiene in the studio. If you forget, we may have some available for purchase.",
      },
      {
        q: "What should I bring?",
        a: "Bring grip socks, a small towel, and a water bottle. We provide all equipment including mats, reformers, and props. You do not need to bring anything to work out with.",
      },
      {
        q: "How early should I arrive?",
        a: "Please arrive at least 5 minutes before your session. This gives you time to settle in, get set up on the equipment, and let your instructor know of any injuries or conditions before class begins. Arriving early also ensures you do not disrupt clients already in session.",
      },
      {
        q: "What can I expect in my first class?",
        a: "Your instructor will briefly introduce the equipment and the key principles of Pilates before the session begins. You will work at your own pace with guidance throughout. First sessions can feel unfamiliar, and that is completely normal. Focus on understanding the movements rather than perfecting them.",
      },
      {
        q: "Is Pilates suitable for me if I have an injury or medical condition?",
        a: "In most cases, yes. Pilates is widely used in rehabilitation and is highly adaptable. Please let your instructor know about any injuries, conditions, or pregnancy before your first session. We will tailor the movements to keep you safe. If you are unsure, consult your doctor before starting.",
      },
      {
        q: "Is there a minimum age to participate?",
        a: "The minimum age is 16. Participants under 18 require written parental or guardian consent. Exceptions may be made at the instructor's discretion in consultation with a parent or guardian.",
      },
    ],
  },
  {
    id: "classes",
    category: "Classes and Sessions",
    questions: [
      {
        q: "What is the difference between standard, semi-private, and private sessions?",
        a: "Standard classes are open group sessions for up to 8 people at $15 per person. You join a structured class led by an instructor. Semi-private sessions are for exactly 2 people at $25 per person — ideal for friends or partners who want shared but more focused instruction. Private sessions are fully one-on-one at $45, entirely tailored to your goals, body, and pace.",
      },
      {
        q: "How long are the classes?",
        a: "All sessions are 45 to 50 minutes.",
      },
      {
        q: "What equipment is used?",
        a: "We primarily use the Pilates reformer, which is a spring-based resistance machine that supports a wide range of exercises. We also use mats, resistance bands, magic circles, and small props depending on the session type and your needs.",
      },
      {
        q: "Can I join a standard class midway through a term?",
        a: "Yes. Standard classes are ongoing and open to new participants at any time. There are no fixed terms or enrolment periods. Simply book a session and come when it suits you.",
      },
      {
        q: "How often should I practice?",
        a: "For meaningful results, we recommend 2 to 3 sessions per week. Consistency matters far more than frequency. Even one session per week, maintained over time, will produce real and lasting change in your strength, posture, and body awareness.",
      },
      {
        q: "Can I do Pilates while pregnant?",
        a: "Pilates can be highly beneficial during pregnancy, but it must be adapted to each trimester. Please inform your instructor before booking and before each session. We will modify all exercises to ensure your safety and comfort. Always consult your midwife or doctor first.",
      },
      {
        q: "What if the class is full?",
        a: "If your preferred time slot is fully booked, please check back as availability changes when bookings are cancelled. You are also welcome to message us on WhatsApp and we will let you know if a spot opens up.",
      },
    ],
  },
  {
    id: "booking",
    category: "Booking and Cancellation",
    questions: [
      {
        q: "How do I book a session?",
        a: "You can book directly through the booking page on our website. Select your session type, choose a date and available time slot, and fill in your details. We will confirm your booking via WhatsApp. You can also reach us directly on WhatsApp to arrange a session.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 24 hours in advance to secure your preferred time slot, especially for morning sessions which fill quickly. For private and semi-private sessions, 48 hours notice is ideal.",
      },
      {
        q: "What is your cancellation policy?",
        a: "We require a minimum of 12 hours notice to cancel or reschedule a booking. Cancellations made within 12 hours of the session start time will not receive a refund and no credit will be issued. This policy exists to respect the time of our instructors and other clients.",
      },
      {
        q: "What happens if I arrive late?",
        a: "If you arrive more than 5 minutes after a class has started, you will not be admitted. Late entry disrupts the session for everyone and poses a safety risk, as warming up properly is essential on the reformer. A late arrival will be treated as a cancellation and no refund or credit will be issued.",
      },
      {
        q: "What is your no-show policy?",
        a: "If you do not attend a booked session without prior notice, you will forfeit the full session fee. No refund or credit will be issued. If something unexpected happens, please contact us via WhatsApp as soon as possible. We will do our best to accommodate genuine emergencies.",
      },
      {
        q: "Can I reschedule a booking?",
        a: "Yes, provided you give at least 12 hours notice. To reschedule, contact us via WhatsApp with your original booking details and preferred new time. We will do our best to find a suitable slot for you.",
      },
      {
        q: "What if the studio cancels a class?",
        a: "In the rare event that we need to cancel a class, we will notify you via WhatsApp as early as possible. You will receive a full credit toward any future session, or a full refund at your preference.",
      },
      {
        q: "Do you offer refunds?",
        a: "Refunds are issued only when the studio cancels a class. Client-initiated cancellations outside the 12-hour window are not eligible for refunds. Monthly bundle payments are non-refundable once the bundle period has commenced.",
      },
    ],
  },
  {
    id: "etiquette",
    category: "Studio Etiquette",
    questions: [
      {
        q: "What are the core studio rules?",
        a: "Please arrive on time. Grip socks are required. Phones must be silenced and put away during sessions. No food is permitted in the studio. Do not enter a session already in progress. Move mindfully and respectfully of the space and other clients. Your body is your responsibility — always work within your limits.",
      },
      {
        q: "Why are grip socks required?",
        a: "Grip socks are mandatory for safety and hygiene. They prevent slipping on the reformer carriage and other equipment, and they protect both the client and the equipment from direct skin contact. Bare feet are not permitted on the reformer.",
      },
      {
        q: "Can I bring my phone into the studio?",
        a: "Phones must be silenced and stored away before your session begins. Using a phone during class disrupts your practice, your instructor, and other clients. If you are expecting an urgent call, please let your instructor know in advance.",
      },
      {
        q: "Can I eat before class?",
        a: "We recommend avoiding a heavy meal in the two hours before your session. Pilates involves significant core engagement and spinal articulation, which is uncomfortable on a full stomach. A light snack 30 to 60 minutes before is fine. No food is permitted inside the studio.",
      },
      {
        q: "What about personal hygiene?",
        a: "Please arrive freshly bathed and avoid heavy perfumes or colognes. Strong scents in a small studio space can be overwhelming for others and your instructor. Bring a small towel to manage perspiration during the session.",
      },
      {
        q: "Are photos or videos allowed during class?",
        a: "No personal photos or videos during live sessions. We occasionally capture content for studio social media, and you will always be asked for your consent beforehand. If you would prefer not to appear in any content, simply let us know and we will fully respect that.",
      },
      {
        q: "What if I need to leave a session early?",
        a: "If you know in advance that you will need to leave early, please inform your instructor before the class begins so they can plan accordingly. Leaving mid-session without warning is disruptive. If you feel unwell during a session, please tell your instructor immediately.",
      },
      {
        q: "Can I bring someone to watch my session?",
        a: "To protect the privacy and focus of all clients, observers are not permitted during sessions. You are welcome to wait in the reception area.",
      },
    ],
  },
  {
    id: "pricing",
    category: "Pricing and Bundles",
    questions: [
      {
        q: "What are the session prices?",
        a: "Standard group classes are $15 per person. Semi-private sessions (2 people) are $25 per person. Private one-on-one sessions are $45. Corporate wellness packages are priced on request based on group size and frequency.",
      },
      {
        q: "Do you offer monthly bundles?",
        a: "Yes. Our monthly bundles are designed for clients who want to build a consistent practice at a lower per-session rate. The Foundation bundle (4 sessions/month) is $50, the Consistent bundle (8 sessions/month) is $105, and the Dedicated bundle (12 sessions/month) is $160. All bundles are for standard classes only.",
      },
      {
        q: "What are the terms of the monthly bundles?",
        a: "Bundles are valid for one calendar month from the date of purchase. Unused sessions do not carry over to the following month. Bundle payments are non-refundable once the month has begun. Bundles apply to standard classes only and cannot be used toward semi-private, private, or corporate sessions.",
      },
      {
        q: "Is there a trial class or introductory offer?",
        a: "We do not currently offer a discounted trial class. Every standard session is $15, which we believe already reflects excellent value for the quality of instruction and individual attention you receive. You are welcome to book a single session before committing to a bundle.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash and mobile money payments in person at the studio. Payment is due before or on the day of your session. For monthly bundles, payment is collected before the bundle period begins.",
      },
    ],
  },
  {
    id: "corporate",
    category: "Corporate Wellness",
    questions: [
      {
        q: "What does a corporate wellness session include?",
        a: "Our corporate sessions are fully customisable. We offer reformer-based Pilates, mat Pilates, desk and postural stretching, and mindfulness components. Sessions address common workplace issues including poor posture, lower back tension, stress, and low energy. We can combine elements to suit your team's specific needs.",
      },
      {
        q: "Where are corporate sessions held?",
        a: "We can come to your workplace or host your team at the studio. On-site sessions require a clear, flat space large enough to accommodate the group. For reformer-based sessions, we host at the studio where the equipment is available.",
      },
      {
        q: "How many employees can participate?",
        a: "We accommodate groups of 5 to 20 participants per session. For larger teams, we can split the group into multiple sessions on the same day to maintain quality instruction. Contact us to discuss the best approach for your organisation.",
      },
      {
        q: "Do you offer ongoing corporate packages?",
        a: "Yes. We offer weekly, bi-weekly, and monthly packages for organisations that want to make wellness a consistent part of their culture. Ongoing packages are priced at a reduced rate relative to one-off sessions. We can also build a bespoke programme around your team's schedule and goals.",
      },
      {
        q: "How do I get a corporate wellness quote?",
        a: "Contact us via WhatsApp or email with details about your team size, preferred frequency, and whether you would like sessions at your workplace or our studio. We will follow up with a tailored proposal within two business days.",
      },
    ],
  },
]

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const totalQuestions = faqs.reduce((sum, s) => sum + s.questions.length, 0)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-8">
              Support
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-foreground leading-[1.0] max-w-3xl">
              Frequently Asked Questions
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-foreground/45 text-base tracking-wide">
              {totalQuestions} questions across {faqs.length} topics
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Animated divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ originX: 0 }}
          className="h-px bg-border"
        />
      </div>

      {/* Mobile category scroll strip */}
      <div className="lg:hidden overflow-x-auto border-b border-border">
        <div className="flex px-6 gap-6 py-4 min-w-max">
          {faqs.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/45 hover:text-foreground whitespace-nowrap transition-colors duration-200 py-1"
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

            {/* Sticky sidebar */}
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden lg:block lg:col-span-3"
            >
              <div className="sticky top-40">
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 mb-6 font-medium">
                  Topics
                </p>
                <nav className="flex flex-col gap-1">
                  {faqs.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center justify-between text-[13px] text-foreground/35 hover:text-foreground py-2.5 transition-colors duration-200 tracking-wide border-b border-transparent hover:border-border"
                    >
                      <span className="flex items-center gap-2">
                        <span className="block w-0 group-hover:w-3 h-px bg-foreground/30 transition-all duration-300 ease-out" />
                        {section.category}
                      </span>
                      <span className="text-[10px] text-foreground/25 tabular-nums">
                        {section.questions.length}
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="mt-12 pt-10 border-t border-border/60">
                  <p className="text-[13px] text-foreground/40 leading-relaxed mb-5">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <a
                    href="https://wa.me/263719140346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.3em] font-medium text-foreground/55 hover:text-foreground transition-colors duration-200"
                  >
                    Message us on WhatsApp →
                  </a>
                </div>
              </div>
            </motion.aside>

            {/* Questions */}
            <div className="lg:col-span-9">
              {faqs.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  className={`scroll-mt-32 ${sectionIndex > 0 ? "mt-20 pt-20 border-t border-border/60" : ""}`}
                >
                  {/* Section header */}
                  <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-10">
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-[-0.01em] text-foreground">
                      {section.category}
                    </h2>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/25 font-medium hidden sm:block">
                      {section.questions.length} questions
                    </span>
                  </motion.div>

                  <div className="divide-y divide-border/50">
                    {section.questions.map((faq, index) => {
                      const itemId = `${section.id}-${index}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <motion.div key={index} variants={fadeUp}>
                          <button
                            onClick={() => toggleItem(itemId)}
                            aria-expanded={isOpen}
                            className="w-full py-7 flex items-start justify-between text-left gap-8 group"
                          >
                            <span
                              className={`text-[15px] leading-[1.55] tracking-wide transition-colors duration-300 ${
                                isOpen ? "text-foreground" : "text-foreground/55 group-hover:text-foreground"
                              }`}
                            >
                              {faq.q}
                            </span>
                            <motion.span
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className={`shrink-0 mt-0.5 flex items-center justify-center transition-colors duration-200 ${
                                isOpen ? "text-brand/60" : "text-foreground/25 group-hover:text-foreground/50"
                              }`}
                            >
                              <Plus size={16} strokeWidth={1.5} />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="answer"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="text-[15px] text-foreground/50 leading-[1.9] pb-8 max-w-2xl pr-4 md:pr-12">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
