import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'

// GET /api/bookings/availability?date=YYYY-MM-DD
// Public endpoint — returns booking counts per time slot for a given date
// No personal data is exposed
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid or missing date parameter. Use YYYY-MM-DD.' },
      { status: 400 }
    )
  }

  try {
    await connectDB()

    const bookings = await Booking.find({ date }).select('time sessionType').lean()

    const counts = bookings.map((b) => ({
      time: b.time,
      sessionType: b.sessionType,
    }))

    return NextResponse.json({ date, counts })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability', counts: [] },
      { status: 500 }
    )
  }
}
