"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Trash2,
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut
} from "lucide-react"
import { getBookings, updateBooking, deleteBooking, type Booking } from "@/lib/booking-store"

const sessionLabels: Record<string, string> = {
  group: "Group",
  "semi-private": "Semi-Private",
  private: "Private",
  corporate: "Corporate",
}

const statusColors: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle2 },
  pending: { bg: "bg-amber-50", text: "text-amber-700", icon: AlertCircle },
  cancelled: { bg: "bg-red-50", text: "text-red-700", icon: XCircle },
}

export default function AdminPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [view, setView] = useState<"calendar" | "list">("calendar")

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.replace("/admin/login")
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  useEffect(() => {
    getBookings().then(setBookings)
  }, [])

  const refreshBookings = () => {
    setBookings(getBookings())
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getBookingsForDate = (date: string) => {
    return bookings.filter(b => b.date === date)
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    updateBooking(id, { status })
    refreshBookings()
    if (selectedBooking?.id === id) {
      setSelectedBooking({ ...selectedBooking, status })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteBooking(id)
      refreshBookings()
      setSelectedBooking(null)
    }
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const upcomingBookings = bookings
    .filter(b => new Date(b.date) >= new Date() && b.status !== "cancelled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  }

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="font-serif text-2xl tracking-[-0.01em] text-foreground font-light">
              Nirvana
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">
                Admin Dashboard
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[11px] text-foreground/40 hover:text-foreground/70 transition-colors tracking-wide"
                aria-label="Sign out"
              >
                <LogOut size={13} strokeWidth={1.5} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-background p-6 border border-border">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Total Bookings</p>
            <p className="font-serif text-4xl tracking-[-0.02em]">{stats.total}</p>
          </div>
          <div className="bg-background p-6 border border-border">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Confirmed</p>
            <p className="font-serif text-4xl tracking-[-0.02em] text-emerald-600">{stats.confirmed}</p>
          </div>
          <div className="bg-background p-6 border border-border">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Pending</p>
            <p className="font-serif text-4xl tracking-[-0.02em] text-amber-600">{stats.pending}</p>
          </div>
          <div className="bg-background p-6 border border-border">
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Cancelled</p>
            <p className="font-serif text-4xl tracking-[-0.02em] text-red-600">{stats.cancelled}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar / List View */}
          <div className="lg:col-span-2 bg-background border border-border">
            {/* View Toggle */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => setView("calendar")}
                  className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                    view === "calendar" ? "text-foreground" : "text-foreground/40 hover:text-foreground/60"
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                    view === "list" ? "text-foreground" : "text-foreground/40 hover:text-foreground/60"
                  }`}
                >
                  List
                </button>
              </div>
              {view === "calendar" && (
                <div className="flex items-center gap-4">
                  <button onClick={() => navigateMonth(-1)} className="p-2 text-foreground/50 hover:text-foreground">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="font-serif text-lg">{monthNames[month]} {year}</span>
                  <button onClick={() => navigateMonth(1)} className="p-2 text-foreground/50 hover:text-foreground">
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {view === "calendar" ? (
              <div className="p-6">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2 text-center text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    const dayBookings = getBookingsForDate(dateStr)
                    const hasBookings = dayBookings.length > 0
                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (hasBookings) {
                            setSelectedBooking(dayBookings[0])
                          }
                        }}
                        className={`aspect-square p-1 text-left transition-colors ${
                          isToday ? "bg-secondary" : hasBookings ? "hover:bg-muted/50" : ""
                        }`}
                      >
                        <span className={`text-sm ${isToday ? "font-medium" : ""}`}>{day}</span>
                        {hasBookings && (
                          <div className="mt-1 space-y-0.5">
                            {dayBookings.slice(0, 2).map((b) => (
                              <div
                                key={b.id}
                                className={`text-[10px] px-1 py-0.5 truncate ${statusColors[b.status].bg} ${statusColors[b.status].text}`}
                              >
                                {b.time} {b.name.split(" ")[0]}
                              </div>
                            ))}
                            {dayBookings.length > 2 && (
                              <div className="text-[10px] text-foreground/40 px-1">
                                +{dayBookings.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {bookings.length === 0 ? (
                  <div className="p-12 text-center text-foreground/40">
                    No bookings yet
                  </div>
                ) : (
                  bookings
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((booking) => {
                      const StatusIcon = statusColors[booking.status].icon
                      return (
                        <button
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                          className="w-full p-4 text-left hover:bg-muted/30 transition-colors flex items-center gap-4"
                        >
                          <div className={`p-2 rounded-full ${statusColors[booking.status].bg}`}>
                            <StatusIcon size={16} className={statusColors[booking.status].text} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{booking.name}</p>
                            <p className="text-sm text-foreground/50">
                              {sessionLabels[booking.sessionType]} · {new Date(booking.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} at {booking.time}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                            {booking.status}
                          </span>
                        </button>
                      )
                    })
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Selected Booking Details */}
            {selectedBooking ? (
              <div className="bg-background border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">Booking Details</p>
                  <button onClick={() => setSelectedBooking(null)} className="text-foreground/40 hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="font-serif text-2xl tracking-[-0.01em]">{selectedBooking.name}</p>
                    <p className="text-foreground/50">{selectedBooking.email}</p>
                    <p className="text-foreground/50">{selectedBooking.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Calendar size={16} />
                      <span className="text-sm">
                        {new Date(selectedBooking.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Clock size={16} />
                      <span className="text-sm">{selectedBooking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70 col-span-2">
                      <Users size={16} />
                      <span className="text-sm">{sessionLabels[selectedBooking.sessionType]}</span>
                    </div>
                  </div>

                  {selectedBooking.notes && (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Notes</p>
                      <p className="text-sm text-foreground/70">{selectedBooking.notes}</p>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-3">Status</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedBooking.id, "confirmed")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "confirmed"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedBooking.id, "pending")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "pending"
                            ? "bg-amber-600 text-white"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedBooking.id, "cancelled")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "cancelled"
                            ? "bg-red-600 text-white"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedBooking.id)}
                    className="w-full py-3 border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} />
                    Delete Booking
                  </button>
                </div>
              </div>
            ) : (
              /* Upcoming Bookings */
              <div className="bg-background border border-border">
                <div className="p-6 border-b border-border">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">Upcoming</p>
                </div>
                <div className="divide-y divide-border">
                  {upcomingBookings.length === 0 ? (
                    <div className="p-6 text-center text-foreground/40 text-sm">
                      No upcoming bookings
                    </div>
                  ) : (
                    upcomingBookings.map((booking) => (
                      <button
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <p className="font-medium text-sm">{booking.name}</p>
                        <p className="text-xs text-foreground/50 mt-1">
                          {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · {booking.time}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
