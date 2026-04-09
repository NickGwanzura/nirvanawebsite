import mongoose from 'mongoose'

export interface IBooking {
  name: string
  email: string
  phone: string
  date: string
  time: string
  sessionType: 'standard' | 'group' | 'private' | 'corporate'
  notes?: string
  status: 'confirmed' | 'pending' | 'cancelled'
  createdAt: Date
}

const BookingSchema = new mongoose.Schema<IBooking>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    sessionType: {
      type: String,
      enum: ['standard', 'group', 'private', 'corporate'],
      required: [true, 'Session type is required'],
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
