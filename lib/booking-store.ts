import { IBooking } from '@/models/Booking'

export type Booking = IBooking & { _id: string }

// Lightweight in-memory cache used only for availability display fallback
let localBookings: Booking[] = []

// GET all bookings (admin-authenticated; public path returns 401 for non-admins)
export async function getBookings(): Promise<Booking[]> {
  try {
    const response = await fetch('/api/bookings', { credentials: 'include' })
    if (!response.ok) {
      // If 401 (not admin), return empty — the booking page only needs availability per-date
      if (response.status === 401) return localBookings
      throw new Error('Failed to fetch bookings')
    }
    const bookings = await response.json()
    localBookings = bookings // cache for local availability fallback
    return bookings
  } catch {
    return localBookings
  }
}

// Create a booking — throws on failure so the user sees a real error
export async function createBooking(data: Omit<Booking, '_id' | 'createdAt'>): Promise<Booking> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to create booking. Please try again.')
  }
  return response.json()
}

// Update a booking — admin only, throws on failure
export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to update booking.')
  }
  return response.json()
}

// Delete a booking — admin only, throws on failure
export async function deleteBooking(id: string): Promise<void> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Failed to delete booking.')
  }
}

export function getWhatsAppLink(booking: Booking): string {
  const phone = '+263719140346'
  const sessionLabels: Record<string, string> = {
    standard: 'Standard Class',
    'semi-private': 'Semi-Private Session',
    private: 'Private Session',
    corporate: 'Corporate Wellness',
  }
  const message = encodeURIComponent(
    `Hi Nirvana Pilates! I'd like to notify you of my booking:\n\n` +
    `Name: ${booking.name}\n` +
    `Session: ${sessionLabels[booking.sessionType] || booking.sessionType}\n` +
    `Date: ${booking.date}\n` +
    `Time: ${booking.time}\n\n` +
    `Thank you!`
  )
  return `https://wa.me/${phone}?text=${message}`
}
