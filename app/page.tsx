import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { GroupExperience } from "@/components/group-experience"
import { Schedule } from "@/components/schedule"
import { Booking } from "@/components/booking"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <GroupExperience />
      <Schedule />
      <Booking />
      <CTA />
      <Footer />
    </main>
  )
}
