"use client"

import { useState, useEffect, useCallback } from "react"
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
  LogOut,
  ExternalLink,
  AlertTriangle,
  Search,
} from "lucide-react"
import { getBookings, updateBooking, deleteBooking, type Booking } from "@/lib/booking-store"

const sessionLabels: Record<string, string> = {
  standard: "Standard",
  "semi-private": "Semi-Private",
  private: "Private",
  corporate: "Corporate",
}

const sessionPrices: Record<string, number> = {
  standard: 15,
  "semi-private": 25,
  private: 45,
  corporate: 0,
}

const statusColors: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  confirmed: { bg: "bg-foreground/10", text: "text-foreground", icon: CheckCircle2 },
  pending: { bg: "bg-brand/15", text: "text-brand", icon: AlertCircle },
  cancelled: { bg: "bg-foreground/5", text: "text-foreground/40", icon: XCircle },
}

function getTodayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export default function AdminPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [listSearch, setListSearch] = useState("")
  const [listFilter, setListFilter] = useState<"all" | "today" | "pending" | "confirmed">("all")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string>("")
  const [updateError, setUpdateError] = useState<string>("")

  const refreshBookings = useCallback(async () => {
    const nextBookings = await getBookings()
    setBookings(nextBookings)
    if (selectedBookings.length > 0) {
      const date = selectedBookings[0].date
      setSelectedBookings(nextBookings.filter(b => b.date === date))
    }
    if (selectedBooking) {
      const updated = nextBookings.find(b => b._id === selectedBooking._id)
      if (updated) setSelectedBooking(updated)
    }
  }, [selectedBookings, selectedBooking])

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
    const loadBookings = async () => {
      setLoading(true)
      const nextBookings = await getBookings()
      setBookings(nextBookings)
      setLoading(false)
    }
    void loadBookings()
  }, [])

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay()
  const getBookingsForDate = (dateStr: string) => bookings.filter(b => b.date === dateStr)

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    setUpdateError("")
    try {
      await updateBooking(id, { status })
      await refreshBookings()
      if (selectedBooking?._id === id) {
        setSelectedBooking(prev => prev ? { ...prev, status } : null)
      }
    } catch (err: any) {
      setUpdateError(err.message || "Failed to update status.")
    }
  }

  const handleDeleteRequest = (id: string) => {
    setDeleteConfirmId(id)
    setDeleteError("")
  }

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteBooking(id)
      setDeleteConfirmId(null)
      setSelectedBooking(null)
      setSelectedBookings([])
      await refreshBookings()
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete booking.")
    }
  }

  const handleCalendarDayClick = (dayBookings: Booking[]) => {
    if (dayBookings.length === 0) return
    if (dayBookings.length === 1) {
      setSelectedBooking(dayBookings[0])
      setSelectedBookings([])
    } else {
      setSelectedBookings(dayBookings)
      setSelectedBooking(null)
    }
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const todayStr = getTodayStr()

  const upcomingBookings = bookings
    .filter(b => b.date >= todayStr && b.status !== "cancelled")
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 10)

  const confirmedRevenue = bookings
    .filter(b => b.status === "confirmed")
    .reduce((sum, b) => sum + (sessionPrices[b.sessionType] || 0), 0)

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    revenue: confirmedRevenue,
  }

  const filteredBookings = bookings
    .filter(b => {
      if (listFilter === "today") return b.date === todayStr
      if (listFilter === "pending") return b.status === "pending"
      if (listFilter === "confirmed") return b.status === "confirmed"
      return true
    })
    .filter(b => {
      if (!listSearch.trim()) return true
      const q = listSearch.toLowerCase()
      return b.name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q)
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-serif text-2xl tracking-[-0.01em] text-foreground font-light">
                Nirvana
              </Link>
              <span className="text-foreground/20">/</span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1.5 text-[11px] text-foreground/40 hover:text-foreground/70 transition-colors tracking-wide"
                target="_blank"
              >
                <ExternalLink size={12} strokeWidth={1.5} />
                View site
              </Link>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-background p-6 border border-border">
                <div className="h-3 w-24 bg-muted/60 rounded animate-pulse mb-4" />
                <div className="h-10 w-16 bg-muted/60 rounded animate-pulse" />
              </div>
            ))
          ) : (
            <>
              <div className="bg-background p-6 border border-border">
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Total</p>
                <p className="font-serif text-4xl tracking-[-0.02em] text-foreground">{stats.total}</p>
              </div>
              <div className="bg-background p-6 border border-border">
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Confirmed</p>
                <p className="font-serif text-4xl tracking-[-0.02em] text-foreground">{stats.confirmed}</p>
              </div>
              <div className="bg-background p-6 border border-border">
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Pending</p>
                <p className="font-serif text-4xl tracking-[-0.02em] text-brand">{stats.pending}</p>
              </div>
              <div className="bg-background p-6 border border-border">
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-2">Revenue</p>
                <p className="font-serif text-4xl tracking-[-0.02em] text-foreground">${stats.revenue}</p>
              </div>
            </>
          )}
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
                  <button onClick={() => navigateMonth(-1)} className="p-2 text-foreground/50 hover:text-foreground" aria-label="Previous month">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="font-serif text-lg">{monthNames[month]} {year}</span>
                  <button onClick={() => navigateMonth(1)} className="p-2 text-foreground/50 hover:text-foreground" aria-label="Next month">
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {view === "calendar" ? (
              <div className="p-6">
                {loading ? (
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2 text-center text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-muted/30 animate-pulse rounded-sm" />
                    ))}
                  </div>
                ) : (
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
                      const isToday = dateStr === todayStr

                      return (
                        <button
                          key={day}
                          onClick={() => handleCalendarDayClick(dayBookings)}
                          disabled={!hasBookings}
                          aria-label={hasBookings ? `${day}: ${dayBookings.length} booking${dayBookings.length !== 1 ? "s" : ""}` : `${day}`}
                          className={`aspect-square p-1 text-left transition-colors ${
                            isToday ? "bg-secondary" : hasBookings ? "hover:bg-muted/50 cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <span className={`text-sm ${isToday ? "font-medium" : ""} ${!hasBookings ? "text-foreground/40" : ""}`}>
                            {day}
                          </span>
                          {hasBookings && (
                            <div className="mt-1 space-y-0.5">
                              {dayBookings.slice(0, 2).map((b) => (
                                <div
                                  key={b._id}
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
                )}
              </div>
            ) : (
              <>
                {/* List view search + filter */}
                <div className="p-4 border-b border-border space-y-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/35" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={listSearch}
                      onChange={e => setListSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-muted/40 border border-border text-sm placeholder:text-foreground/35 focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(["all", "today", "pending", "confirmed"] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setListFilter(f)}
                        className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium transition-colors ${
                          listFilter === f
                            ? "bg-foreground text-background"
                            : "bg-muted/50 text-foreground/50 hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-border max-h-[540px] overflow-y-auto">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="p-4 flex items-center gap-4">
                        <div className="w-8 h-8 bg-muted/40 animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 bg-muted/40 rounded animate-pulse" />
                          <div className="h-3 w-48 bg-muted/40 rounded animate-pulse" />
                        </div>
                      </div>
                    ))
                  ) : filteredBookings.length === 0 ? (
                    <div className="p-16 text-center">
                      <Calendar size={32} className="mx-auto text-foreground/20 mb-4" />
                      <p className="text-foreground/40 text-sm">No bookings match</p>
                      <p className="text-foreground/30 text-xs mt-2">Try adjusting your search or filter.</p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => {
                      const StatusIcon = statusColors[booking.status].icon
                      return (
                        <button
                          key={booking._id}
                          onClick={() => { setSelectedBooking(booking); setSelectedBookings([]) }}
                          className="w-full p-4 text-left hover:bg-muted/30 transition-colors flex items-center gap-4"
                        >
                          <div className={`p-2 ${statusColors[booking.status].bg}`}>
                            <StatusIcon size={16} className={statusColors[booking.status].text} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{booking.name}</p>
                            <p className="text-sm text-foreground/50">
                              {sessionLabels[booking.sessionType] || booking.sessionType} · {new Date(booking.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })} at {booking.time}
                            </p>
                          </div>
                          <span className={`text-[10px] uppercase tracking-[0.15em] px-2 py-1 font-medium ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                            {booking.status}
                          </span>
                        </button>
                      )
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Multi-booking date view */}
            {selectedBookings.length > 1 && (
              <div className="bg-background border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">
                    {selectedBookings.length} Bookings
                    <span className="ml-2 normal-case text-foreground/30 tracking-normal">
                      {new Date(selectedBookings[0].date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </p>
                  <button
                    onClick={() => setSelectedBookings([])}
                    className="text-foreground/40 hover:text-foreground"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {selectedBookings
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((booking) => {
                      const StatusIcon = statusColors[booking.status].icon
                      return (
                        <button
                          key={booking._id}
                          onClick={() => { setSelectedBooking(booking); setSelectedBookings([]) }}
                          className="w-full p-4 text-left hover:bg-muted/30 transition-colors flex items-center gap-3"
                        >
                          <div className={`p-1.5 ${statusColors[booking.status].bg}`}>
                            <StatusIcon size={14} className={statusColors[booking.status].text} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{booking.name}</p>
                            <p className="text-xs text-foreground/50">{booking.time} · {sessionLabels[booking.sessionType] || booking.sessionType}</p>
                          </div>
                        </button>
                      )
                    })}
                </div>
              </div>
            )}

            {/* Selected Booking Details */}
            {selectedBooking && selectedBookings.length === 0 ? (
              <div className="bg-background border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">Booking Details</p>
                  <button onClick={() => setSelectedBooking(null)} className="text-foreground/40 hover:text-foreground" aria-label="Close">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="font-serif text-2xl tracking-[-0.01em]">{selectedBooking.name}</p>
                    <p className="text-foreground/50 text-sm mt-1">{selectedBooking.email}</p>
                    <p className="text-foreground/50 text-sm">{selectedBooking.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Calendar size={16} />
                      <span className="text-sm">
                        {new Date(selectedBooking.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Clock size={16} />
                      <span className="text-sm">{selectedBooking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70 col-span-2">
                      <Users size={16} />
                      <span className="text-sm">{sessionLabels[selectedBooking.sessionType] || selectedBooking.sessionType}</span>
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
                        onClick={() => handleStatusChange(selectedBooking._id, "confirmed")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "confirmed"
                            ? "bg-foreground text-background"
                            : "bg-foreground/8 text-foreground/60 hover:bg-foreground/15"
                        }`}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedBooking._id, "pending")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "pending"
                            ? "bg-brand text-brand-foreground"
                            : "bg-brand/10 text-brand hover:bg-brand/20"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedBooking._id, "cancelled")}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${
                          selectedBooking.status === "cancelled"
                            ? "bg-foreground/40 text-background"
                            : "bg-foreground/5 text-foreground/40 hover:bg-foreground/10"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                    {updateError && (
                      <p className="text-xs text-foreground/60 mt-2">{updateError}</p>
                    )}
                  </div>

                  {deleteConfirmId === selectedBooking._id ? (
                    <div className="border border-border p-4 bg-muted/30">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle size={16} className="text-foreground/60 mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground/70">Delete this booking permanently? This cannot be undone.</p>
                      </div>
                      {deleteError && <p className="text-xs text-foreground/60 mb-3">{deleteError}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteConfirm(selectedBooking._id)}
                          className="flex-1 py-2 bg-foreground text-background text-xs font-medium hover:bg-foreground/85 transition-colors"
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={() => { setDeleteConfirmId(null); setDeleteError("") }}
                          className="flex-1 py-2 bg-background border border-border text-foreground/70 text-xs font-medium hover:bg-muted/50 transition-colors"
                        >
                          Keep booking
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteRequest(selectedBooking._id)}
                      className="w-full py-3 border border-border text-foreground/40 text-xs font-medium hover:border-foreground/30 hover:text-foreground/60 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete Booking
                    </button>
                  )}
                </div>
              </div>
            ) : selectedBookings.length === 0 && (
              <div className="bg-background border border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-medium">Upcoming</p>
                  {upcomingBookings.length > 0 && (
                    <button
                      onClick={() => { setView("list"); setListFilter("all") }}
                      className="text-[10px] uppercase tracking-[0.2em] text-foreground/35 hover:text-foreground/60 transition-colors"
                    >
                      View all
                    </button>
                  )}
                </div>
                <div className="divide-y divide-border">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-4 space-y-2">
                        <div className="h-3 w-28 bg-muted/40 rounded animate-pulse" />
                        <div className="h-3 w-40 bg-muted/40 rounded animate-pulse" />
                      </div>
                    ))
                  ) : upcomingBookings.length === 0 ? (
                    <div className="p-8 text-center">
                      <Calendar size={24} className="mx-auto text-foreground/20 mb-3" />
                      <p className="text-foreground/40 text-sm">No upcoming bookings</p>
                    </div>
                  ) : (
                    upcomingBookings.map((booking) => (
                      <button
                        key={booking._id}
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-sm truncate">{booking.name}</p>
                          <span className={`shrink-0 text-[10px] px-1.5 py-0.5 ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/50 mt-1">
                          {new Date(booking.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · {booking.time}
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
