"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Lock } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        const from = searchParams.get("from") ?? "/admin"
        router.replace(from)
      } else {
        setError("Incorrect password. Please try again.")
        setPassword("")
      }
    } catch {
      setError("Unable to connect. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / wordmark */}
        <div className="text-center mb-16">
          <Link href="/" className="font-serif text-3xl tracking-[-0.01em] text-foreground font-light">
            Nirvana
          </Link>
        </div>

        {/* Lock icon */}
        <div className="flex justify-center mb-10">
          <div className="w-14 h-14 border border-border flex items-center justify-center">
            <Lock size={20} strokeWidth={1.5} className="text-foreground/50" />
          </div>
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.4em] text-foreground/50 mb-10">
          Admin Access
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter password"
              className="w-full px-5 py-4 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground text-sm placeholder:text-foreground/30"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-500/80 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.25em] font-medium transition-colors hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying…" : "Continue"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[11px] text-foreground/40 hover:text-foreground/70 tracking-wide transition-colors"
          >
            Return to site
          </Link>
        </div>
      </div>
    </main>
  )
}
