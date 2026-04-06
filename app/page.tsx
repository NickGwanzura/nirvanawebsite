import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhyPilates } from "@/components/why-pilates"
import { Services } from "@/components/services"
import { GroupExperience } from "@/components/group-experience"
import { Schedule } from "@/components/schedule"
import { Booking } from "@/components/booking"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyPilates />
      <Services />
<GroupExperience />
      <Schedule />
      <Booking />
<Footer />
    </main>
  )
}
