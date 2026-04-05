import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

// Build-safe check - don't throw during build
if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
  console.warn('MONGODB_URI not defined - using mock for build')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  // Build-time safety
  if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Please define the MONGODB_URI environment variable')
    }
    console.warn('MONGODB_URI not defined - skipping DB connection')
    return null as any
  }

  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

export default connectDB
