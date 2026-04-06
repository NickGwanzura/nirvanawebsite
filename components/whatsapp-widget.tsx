"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay appearance for better UX
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const phoneNumber = "+263719140346"
  const message = encodeURIComponent("Hi, I'd like to learn more about Nirvana Pilates classes.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Bubble */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl rounded-br-sm shadow-xl p-4 mb-2 max-w-[260px]">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Hi there! 👋 How can we help you today?
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </a>

        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </div>

      {/* Toggle button — minimum 44px tap target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -top-3 -left-3 w-11 h-11 flex items-center justify-center transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <span className="w-6 h-6 bg-foreground/10 hover:bg-foreground/20 rounded-full flex items-center justify-center transition-colors">
          <X className="w-3 h-3 text-foreground/60" />
        </span>
      </button>
    </div>
  )
}
