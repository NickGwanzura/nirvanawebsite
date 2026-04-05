// Client-side booking store using localStorage
// In production, this should be replaced with a proper database

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  sessionType: "group" | "semi-private" | "private" | "corporate"
  date: string // ISO date string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
  notes?: string
}

const STORAGE_KEY = "nirvana_bookings"

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt" | "status">): Booking {
  const bookings = getBookings()
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  }
  bookings.push(newBooking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  return newBooking
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = getBookings()
  const index = bookings.findIndex(b => b.id === id)
  if (index === -1) return null
  
  bookings[index] = { ...bookings[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  return bookings[index]
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings()
  const filtered = bookings.filter(b => b.id !== id)
  if (filtered.length === bookings.length) return false
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function getBookingsByDate(date: string): Booking[] {
  return getBookings().filter(b => b.date === date && b.status !== "cancelled")
}

export function generateWhatsAppMessage(booking: Booking): string {
  const sessionLabels = {
    group: "Group Session",
    "semi-private": "Semi-Private Session",
    private: "Private Session",
    corporate: "Corporate Wellness",
  }
  
  const message = `Hello Nirvana Pilates!

I've just booked a session:

Name: ${booking.name}
Session: ${sessionLabels[booking.sessionType]}
Date: ${new Date(booking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
Time: ${booking.time}

Looking forward to it!`

  return encodeURIComponent(message)
}

export function getWhatsAppLink(booking: Booking, phoneNumber = "263771234567"): string {
  return `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage(booking)}`
}
