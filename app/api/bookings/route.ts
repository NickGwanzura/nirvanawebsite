import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'
import { getExpectedAdminToken } from '@/lib/admin-auth'

async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false
  const expected = await getExpectedAdminToken()
  return token === expected
}

// GET /api/bookings - Admin only: returns all bookings
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Public: create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await connectDB()

    const booking = await Booking.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      time: body.time,
      sessionType: body.sessionType,
      notes: body.notes,
      status: body.status || 'pending',
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error: any) {
    console.error('Error creating booking:', error)

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
