"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const phoneNumber = "+263719140346"
  const message = encodeURIComponent("Hi, I'd like to learn more about Nirvana Pilates classes.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Chat bubble */}
      <div
        className={`transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white shadow-lg p-4 mb-1 max-w-[220px] rounded-lg rounded-br-none">
          <p className="text-[13px] text-foreground/70 leading-relaxed">
            Hi there — how can we help?
          </p>
        </div>
      </div>

      {/* Main button — smaller on mobile, standard on desktop */}
      <div className="relative">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-out"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
        </a>

        {/* Dismiss button */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-foreground/15 hover:bg-foreground/25 rounded-full flex items-center justify-center transition-colors duration-150"
            aria-label="Close"
          >
            <X className="w-2.5 h-2.5 text-foreground/60" />
          </button>
        )}

        {/* Toggle — tap the button to open bubble, tap link to go to WA */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="absolute inset-0 rounded-full"
          aria-label={isOpen ? "Close chat preview" : "Preview chat"}
          tabIndex={-1}
        />
      </div>
    </div>
  )
}
