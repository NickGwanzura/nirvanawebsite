import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'

// GET /api/bookings - Get all bookings
export async function GET() {
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

// POST /api/bookings - Create a new booking
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
