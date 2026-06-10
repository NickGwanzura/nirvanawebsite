"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Check, MessageCircle, RefreshCw } from "lucide-react"
import { createBooking, getBookings, getWhatsAppLink, type Booking } from "@/lib/booking-store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const sessionTypes = [
  { id: "standard", label: "Standard Class", price: "$15 pp", duration: "45–50 min" },
  { id: "semi-private", label: "Semi-Private", price: "$25 pp", duration: "45–50 min" },
  { id: "private", label: "Private Session", price: "$45", duration: "45–50 min" },
  { id: "corporate", label: "Corporate Wellness", price: "Custom", duration: "45–50 min" },
] as const

const morningSlots = ["07:00", "08:00", "09:00"]
const eveningSlots = ["16:30", "17:30"]
const timeSlots = [...morningSlots, ...eveningSlots]

const maxCapacity: Record<string, number> = {
  standard: 6,
  "semi-private": 2,
  private: 1,
  corporate: 20,
}

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function toDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function isWeekendDay(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6
}

function validateField(name: string, value: string): string {
  if (name === "name" && value.trim().length < 2) return "Please enter your full name."
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address."
  if (name === "phone" && value.trim().length < 7) return "Please enter a valid phone number."
  return ""
}

export default function BookingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<typeof sessionTypes[number]["id"]>("standard")
  const [step, setStep] = useState<"calendar" | "details" | "confirmation">("calendar")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [bookedSlots, setBookedSlots] = useState<Booking[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

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

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()

  useEffect(() => {
    if (!selectedDate) return
    const dateStr = toDateStr(selectedDate)
    setSlotsLoading(true)
    getBookings().then((all) => {
      setBookedSlots(all.filter((b) => b.date === dateStr))
    }).finally(() => setSlotsLoading(false))
  }, [selectedDate])

  const navigateMonth = (direction: number) => {
    if (direction === -1 && isCurrentMonth) return
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const isDateSelectable = (day: number) => {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    return date >= today
  }

  const getSlotAvailability = (time: string) => {
    if (selectedDate && eveningSlots.includes(time) && isWeekendDay(selectedDate)) {
      return { booked: 0, available: 0, max: 0 }
    }
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
    if (available > 0) setSelectedTime(time)
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) setStep("details")
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field as keyof typeof formData] || "")
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    const allTouched = { name: true, email: true, phone: true }
    setTouched(allTouched)
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setSubmitting(true)
    setSubmitError("")

    try {
      const booking = await createBooking({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        sessionType: selectedSession,
        date: toDateStr(selectedDate),
        time: selectedTime,
        notes: formData.notes.trim(),
        status: "pending",
      })
      setConfirmedBooking(booking)
      setStep("confirmation")
      // Auto-notify studio via WhatsApp
      window.open(getWhatsAppLink(booking), "_blank", "noopener,noreferrer")
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBookAnother = () => {
    setStep("calendar")
    setSelectedDate(null)
    setSelectedTime(null)
    setConfirmedBooking(null)
    setFormData({ name: "", email: "", phone: "", notes: "" })
    setErrors({})
    setTouched({})
    setSubmitError("")
  }

  const SlotGroup = ({ label, slots }: { label: string; slots: string[] }) => (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {slots.map((time) => {
          const { available, max } = getSlotAvailability(time)
          const isAvailable = available > 0
          const isSelected = selectedTime === time

          return (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              disabled={!isAvailable}
              aria-label={`${time}${isAvailable ? `, ${available} spot${available !== 1 ? "s" : ""} available` : ", unavailable"}`}
              aria-pressed={isSelected}
              className={`min-w-[80px] py-4 px-3 text-sm text-center transition-all ${
                isSelected
                  ? "bg-foreground text-background font-medium"
                  : isAvailable
                  ? "border border-border hover:border-foreground/30"
                  : "bg-muted text-foreground/25 cursor-not-allowed"
              }`}
            >
              {time}
              {selectedSession === "standard" && isAvailable && max > 1 && (
                <span className={`block text-[10px] mt-1 ${isSelected ? "text-background/60" : "text-foreground/40"}`}>
                  {available}/{max}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Page Title */}
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 font-medium mb-6">
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
                {/* Session Type */}
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-6">
                    Session Type
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {sessionTypes.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => { setSelectedSession(session.id); setSelectedTime(null) }}
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

                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={() => navigateMonth(-1)}
                      disabled={isCurrentMonth}
                      className="p-2 text-foreground/50 hover:text-foreground transition-colors disabled:opacity-25 disabled:cursor-default"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-serif text-xl tracking-[-0.01em]">
                      {monthNames[month]} {year}
                    </span>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {DAY_LABELS.map((day) => (
                      <div key={day} className="py-3 text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-medium">
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
                          aria-label={`Select ${monthNames[month]} ${day}`}
                          aria-pressed={isSelected}
                          className={`min-h-[44px] text-sm transition-all ${
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
                    {slotsLoading ? (
                      <div className="space-y-6 mb-12">
                        <div className="flex gap-3">
                          {morningSlots.map((t) => (
                            <div key={t} className="min-w-[80px] py-4 bg-muted/40 animate-pulse" />
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {eveningSlots.map((t) => (
                            <div key={t} className="min-w-[80px] py-4 bg-muted/40 animate-pulse" />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-12">
                        <SlotGroup label="Morning · Mon – Sat" slots={morningSlots} />
                        <SlotGroup
                          label="Evening · Mon – Fri"
                          slots={eveningSlots}
                        />
                        {selectedDate && isWeekendDay(selectedDate) && (
                          <p className="text-[12px] text-foreground/40 -mt-2">
                            Evening sessions are not available on weekends.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Desktop Continue */}
                    <button
                      onClick={handleContinue}
                      disabled={!selectedTime || slotsLoading}
                      className={`hidden md:block w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                        selectedTime && !slotsLoading
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-muted text-foreground/30 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>

                    {/* Mobile Continue */}
                    <button
                      onClick={handleContinue}
                      disabled={!selectedTime || slotsLoading}
                      className={`md:hidden w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                        selectedTime && !slotsLoading
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-muted text-foreground/30 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <div className="py-20 text-center text-foreground/40">
                    <p className="font-light">Select a date from the calendar.</p>
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
              <form onSubmit={handleSubmit} noValidate>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-8">
                  Your Details
                </p>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="booking-name" className="block text-sm text-foreground/70 mb-2">
                      Full Name <span className="text-foreground/40">*</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={`w-full px-4 py-4 bg-transparent border outline-none transition-colors text-foreground ${
                        touched.name && errors.name ? "border-foreground/50" : "border-border focus:border-foreground"
                      }`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                    {touched.name && errors.name && (
                      <p className="text-[12px] text-foreground/55 mt-2 italic">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="booking-email" className="block text-sm text-foreground/70 mb-2">
                      Email Address <span className="text-foreground/40">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`w-full px-4 py-4 bg-transparent border outline-none transition-colors text-foreground ${
                        touched.email && errors.email ? "border-foreground/50" : "border-border focus:border-foreground"
                      }`}
                      placeholder="jane@example.com"
                      autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <p className="text-[12px] text-foreground/55 mt-2 italic">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="booking-phone" className="block text-sm text-foreground/70 mb-2">
                      WhatsApp Number <span className="text-foreground/40">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full px-4 py-4 bg-transparent border outline-none transition-colors text-foreground ${
                        touched.phone && errors.phone ? "border-foreground/50" : "border-border focus:border-foreground"
                      }`}
                      placeholder="+263 77 123 4567"
                      autoComplete="tel"
                    />
                    {touched.phone && errors.phone ? (
                      <p className="text-[12px] text-foreground/55 mt-2 italic">{errors.phone}</p>
                    ) : (
                      <p className="text-xs text-foreground/40 mt-2">
                        We'll use this to confirm your booking via WhatsApp.
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="booking-notes" className="block text-sm text-foreground/70 mb-2">
                      Notes <span className="text-foreground/40 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="booking-notes"
                      value={formData.notes}
                      onChange={(e) => handleFieldChange("notes", e.target.value)}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground resize-none"
                      placeholder="Any injuries, limitations, or special requirements?"
                    />
                    <p className="text-[11px] text-foreground/35 mt-1.5 text-right">
                      {formData.notes.length}/500
                    </p>
                  </div>
                </div>

                {submitError && (
                  <p className="mt-6 text-[13px] text-foreground/60 italic text-center">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-10 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      Confirming…
                    </>
                  ) : "Confirm Booking"}
                </button>
              </form>
            </div>
          )}

          {step === "confirmation" && confirmedBooking && (
            <div className="max-w-xl mx-auto text-center">
              {/* Success mark */}
              <div className="w-16 h-16 mx-auto mb-10 bg-foreground flex items-center justify-center">
                <Check size={28} strokeWidth={1.5} className="text-background" />
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-[-0.02em] text-foreground mb-6">
                You&apos;re booked in
              </h2>
              <p className="text-foreground/60 text-lg mb-12">
                We&apos;ll see you soon, {confirmedBooking.name.split(" ")[0]}.
              </p>

              {/* Booking Details */}
              <div className="p-8 bg-secondary/50 text-left mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      {new Date(confirmedBooking.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Time</p>
                    <p className="text-foreground">{confirmedBooking.time}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp follow-up */}
              <div className="p-6 bg-secondary/30 border border-border mb-8 text-left">
                <p className="text-sm text-foreground/65 mb-4 leading-relaxed">
                  A WhatsApp message should have opened automatically. If it didn&apos;t, tap below to notify us directly.
                </p>
                <button
                  onClick={() => window.open(getWhatsAppLink(confirmedBooking), "_blank", "noopener,noreferrer")}
                  className="w-full py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  Send WhatsApp Message
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button
                  onClick={handleBookAnother}
                  className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground font-medium transition-colors py-2"
                >
                  Book Another Session
                </button>
                <span className="hidden sm:inline text-foreground/20 self-center">·</span>
                <Link
                  href="/"
                  className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 hover:text-foreground font-medium transition-colors py-2"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile sticky Continue — only shown on step 1 when a time is selected */}
      {step === "calendar" && selectedTime && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-4 bg-background border-t border-border">
          <button
            type="button"
            onClick={handleContinue}
            disabled={slotsLoading}
            className={`w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
              !slotsLoading
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted text-foreground/30 cursor-not-allowed"
            }`}
          >
            {slotsLoading ? "Loading…" : "Continue →"}
          </button>
        </div>
      )}

      <Footer />
    </main>
  )
}
