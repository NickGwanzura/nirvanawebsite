import { IBooking } from '@/models/Booking'

export type Booking = IBooking & { _id: string }

// In-memory fallback for client-side when API is not available
let localBookings: Booking[] = []
let localId = 0

// Client-side API functions
export async function getBookings(): Promise<Booking[]> {
  try {
    const response = await fetch('/api/bookings')
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  } catch {
    return localBookings
  }
}

export async function createBooking(data: Omit<Booking, '_id' | 'createdAt'>): Promise<Booking> {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create')
    return response.json()
  } catch {
    // Fallback to local for client-side demo
    const booking: Booking = {
      ...data,
      _id: `local-${++localId}`,
      createdAt: new Date(),
    }
    localBookings.push(booking)
    return booking
  }
}

export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
  try {
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update')
    return response.json()
  } catch {
    const index = localBookings.findIndex(b => b._id === id)
    if (index >= 0) {
      localBookings[index] = { ...localBookings[index], ...data }
      return localBookings[index]
    }
    throw new Error('Booking not found')
  }
}

export async function deleteBooking(id: string): Promise<void> {
  try {
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
  } catch {
    localBookings = localBookings.filter(b => b._id !== id)
  }
}

// Client-side synchronous functions for compatibility
export function getBookingsByDate(date: string): Booking[] {
  return localBookings.filter(b => b.date === date)
}

export function addBooking(data: Omit<Booking, '_id' | 'createdAt' | 'status'>): Booking {
  const booking: Booking = {
    ...data,
    _id: `local-${++localId}`,
    status: 'pending',
    createdAt: new Date(),
  }
  localBookings.push(booking)
  return booking
}

export function getWhatsAppLink(booking: Booking): string {
  const phone = '+263719140346'
  const sessionLabels: Record<string, string> = {
    standard: 'Standard Class',
    group: 'Group Class',
    private: 'Private Session',
    corporate: 'Corporate Wellness',
  }
  const message = encodeURIComponent(
    `Hi Nirvana Pilates! I'd like to confirm my booking:\n\n` +
    `Name: ${booking.name}\n` +
    `Session: ${sessionLabels[booking.sessionType] || booking.sessionType}\n` +
    `Date: ${booking.date}\n` +
    `Time: ${booking.time}\n\n` +
    `Please confirm my reservation. Thank you!`
  )
  return `https://wa.me/${phone}?text=${message}`
}
