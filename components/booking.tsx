"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sessionTypes = [
  { value: "group", label: "Group — $12" },
  { value: "semi", label: "Semi-Private — $25" },
  { value: "private", label: "Private — $40" },
]

const timeSlots = [
  { time: "7:00", spots: 3 },
  { time: "8:00", spots: 1 },
  { time: "9:00", spots: 5 },
  { time: "4:30", spots: 0 },
  { time: "5:30", spots: 2 },
]

export function Booking() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const isFormValid = selectedType && selectedDate && selectedTime && name && phone

  return (
    <section id="booking" className="py-40 lg:py-56 bg-secondary/40">
      <div className="mx-auto max-w-xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
            Booking
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground tracking-[-0.02em] font-light">
            Reserve your spot
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-12">
          {/* Session Type */}
          <div className="space-y-4">
            <Label htmlFor="session-type" className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
              Session
            </Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="session-type" className="w-full bg-background border-border/60 h-16 text-foreground text-[15px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-[15px]">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-4">
            <Label htmlFor="date" className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-background border-border/60 h-16 text-foreground text-[15px]"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Time Slots */}
          <div className="space-y-4">
            <Label className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
              Time
            </Label>
            <div className="grid grid-cols-5 gap-3">
              {timeSlots.map((slot) => {
                const isFull = slot.spots === 0
                const isSelected = selectedTime === slot.time

                return (
                  <button
                    key={slot.time}
                    onClick={() => !isFull && setSelectedTime(slot.time)}
                    disabled={isFull}
                    className={`
                      relative py-5 text-center transition-all duration-300 text-[15px] tracking-wide
                      ${isSelected
                        ? "bg-foreground text-background"
                        : isFull
                          ? "bg-muted text-foreground/30 cursor-not-allowed"
                          : "bg-background text-foreground/70 hover:bg-secondary"
                      }
                    `}
                  >
                    {slot.time}
                    {isSelected && (
                      <Check className="absolute top-2 right-2 w-3 h-3" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-background border-border/60 h-16 text-foreground text-[15px] placeholder:text-foreground/35"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="phone" className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+263 7XX XXX XXX"
                className="w-full bg-background border-border/60 h-16 text-foreground text-[15px] placeholder:text-foreground/35"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            className="w-full h-16 bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 text-[13px] font-medium tracking-[0.1em] uppercase mt-8"
            disabled={!isFormValid}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </section>
  )
}
