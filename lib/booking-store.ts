import { IBooking } from '@/models/Booking'

export type Booking = IBooking & { _id: string }

// Client-side API functions
export async function getBookings(): Promise<Booking[]> {
  const response = await fetch('/api/bookings')
  if (!response.ok) {
    throw new Error('Failed to fetch bookings')
  }
  return response.json()
}

export async function createBooking(data: Omit<Booking, '_id' | 'createdAt'>): Promise<Booking> {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create booking')
  }
  
  return response.json()
}

export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update booking')
  }
  
  return response.json()
}

export async function deleteBooking(id: string): Promise<void> {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete booking')
  }
}
