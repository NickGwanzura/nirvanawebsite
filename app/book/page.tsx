"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { addBooking, getBookingsByDate, getWhatsAppLink, type Booking } from "@/lib/booking-store"

const sessionTypes = [
  { id: "group", label: "Group Session", price: "$15", duration: "55 min" },
  { id: "semi-private", label: "Semi-Private", price: "$25", duration: "55 min" },
  { id: "private", label: "Private Session", price: "$40", duration: "55 min" },
  { id: "corporate", label: "Corporate Wellness", price: "Custom", duration: "60+ min" },
] as const

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00", "18:00"
]

const maxCapacity: Record<string, number> = {
  group: 8,
  "semi-private": 4,
  private: 1,
  corporate: 1,
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function BookingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<typeof sessionTypes[number]["id"]>("group")
  const [step, setStep] = useState<"calendar" | "details" | "confirmation">("calendar")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [bookedSlots, setBookedSlots] = useState<Booking[]>([])
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      setBookedSlots(getBookingsByDate(dateStr))
    }
  }, [selectedDate])

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const isDateSelectable = (day: number) => {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    return date >= today
  }

  const getSlotAvailability = (time: string) => {
    const booked = bookedSlots.filter(b => b.time === time && b.sessionType === selectedSession)
    const max = maxCapacity[selectedSession]
    return { booked: booked.length, available: max - booked.length, max }
  }

  const handleDateSelect = (day: number) => {
    if (!isDateSelectable(day)) return
    setSelectedDate(new Date(year, month, day))
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    const { available } = getSlotAvailability(time)
    if (available > 0) {
      setSelectedTime(time)
    }
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep("details")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    const booking = addBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      sessionType: selectedSession,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      notes: formData.notes,
    })

    setConfirmedBooking(booking)
    setStep("confirmation")
  }

  const handleWhatsApp = () => {
    if (confirmedBooking) {
      window.open(getWhatsAppLink(confirmedBooking), "_blank")
    }
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

      {/* Content */}
      <section className="pt-48 pb-40 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Page Title */}
          <div className="text-center mb-20">
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 font-medium mb-8">
              Reserve Your Session
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-foreground leading-[0.95]">
              Book a Class
            </h1>
          </div>

          {step === "calendar" && (
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Session Type & Calendar */}
              <div>
                {/* Session Type Selection */}
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-6">
                    Session Type
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {sessionTypes.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session.id)}
                        className={`p-5 text-left border transition-all ${
                          selectedSession === session.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <span className="block text-sm font-medium">{session.label}</span>
                        <span className={`block text-xs mt-1 ${
                          selectedSession === session.id ? "text-background/60" : "text-foreground/50"
                        }`}>
                          {session.price} · {session.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-6">
                    Select Date
                  </p>
                  
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-serif text-xl tracking-[-0.01em]">
                      {monthNames[month]} {year}
                    </span>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div key={i} className="py-3 text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const isSelectable = isDateSelectable(day)
                      const isSelected = selectedDate?.getDate() === day && 
                                        selectedDate?.getMonth() === month && 
                                        selectedDate?.getFullYear() === year
                      const isToday = today.getDate() === day && 
                                     today.getMonth() === month && 
                                     today.getFullYear() === year

                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          disabled={!isSelectable}
                          className={`py-3 text-sm transition-all ${
                            isSelected
                              ? "bg-foreground text-background font-medium"
                              : isToday
                              ? "bg-secondary text-foreground"
                              : isSelectable
                              ? "hover:bg-secondary/50 text-foreground"
                              : "text-foreground/20 cursor-not-allowed"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Time Selection */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-6">
                  {selectedDate 
                    ? `Available Times · ${selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`
                    : "Select a date to view times"
                  }
                </p>

                {selectedDate ? (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-12">
                      {timeSlots.map((time) => {
                        const { available, max } = getSlotAvailability(time)
                        const isAvailable = available > 0
                        const isSelected = selectedTime === time

                        return (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            disabled={!isAvailable}
                            className={`py-4 text-sm transition-all ${
                              isSelected
                                ? "bg-foreground text-background font-medium"
                                : isAvailable
                                ? "border border-border hover:border-foreground/30"
                                : "bg-muted text-foreground/30 cursor-not-allowed"
                            }`}
                          >
                            {time}
                            {selectedSession === "group" && isAvailable && (
                              <span className={`block text-xs mt-1 ${isSelected ? "text-background/60" : "text-foreground/40"}`}>
                                {available}/{max} spots
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Continue Button */}
                    <button
                      onClick={handleContinue}
                      disabled={!selectedTime}
                      className={`w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                        selectedTime
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-muted text-foreground/30 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <div className="py-20 text-center text-foreground/40">
                    <p className="font-light">Please select a date from the calendar</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="max-w-xl mx-auto">
              <button
                onClick={() => setStep("calendar")}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground font-medium mb-12 transition-colors"
              >
                <ArrowLeft size={14} />
                Change Selection
              </button>

              {/* Summary */}
              <div className="p-8 bg-secondary/50 mb-12">
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-4">
                  Your Selection
                </p>
                <p className="font-serif text-2xl tracking-[-0.01em] mb-2">
                  {sessionTypes.find(s => s.id === selectedSession)?.label}
                </p>
                <p className="text-foreground/60">
                  {selectedDate?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} at {selectedTime}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-8">
                  Your Details
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                      placeholder="+263 77 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Notes (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground resize-none"
                      placeholder="Any injuries or special requirements?"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-10 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-foreground/90 transition-colors"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          )}

          {step === "confirmation" && confirmedBooking && (
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-10 rounded-full bg-foreground flex items-center justify-center">
                <Check size={32} className="text-background" />
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-[-0.02em] text-foreground mb-6">
                Booking Confirmed
              </h2>
              <p className="text-foreground/60 text-lg mb-12">
                Thank you, {confirmedBooking.name}. Your session has been booked.
              </p>

              {/* Booking Details */}
              <div className="p-8 bg-secondary/50 text-left mb-12">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Session</p>
                    <p className="text-foreground">{sessionTypes.find(s => s.id === confirmedBooking.sessionType)?.label}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Price</p>
                    <p className="text-foreground">{sessionTypes.find(s => s.id === confirmedBooking.sessionType)?.price}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Date</p>
                    <p className="text-foreground">
                      {new Date(confirmedBooking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Time</p>
                    <p className="text-foreground">{confirmedBooking.time}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#22c55e] transition-colors mb-4"
              >
                Confirm via WhatsApp
              </button>
              <p className="text-foreground/40 text-sm">
                Send us a WhatsApp message to confirm your booking
              </p>

              <Link
                href="/"
                className="inline-block mt-12 text-[11px] uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground font-medium transition-colors"
              >
                Return Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
