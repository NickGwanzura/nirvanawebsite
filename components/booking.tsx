import Link from "next/link"

export function Booking() {
  return (
    <section id="booking" className="py-20 md:py-32 lg:py-40 bg-secondary/40 scroll-mt-24">
      <div className="mx-auto max-w-xl px-6 lg:px-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
          Booking
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-foreground tracking-[-0.02em] font-light mb-10">
          Reserve your spot
        </h2>
        <p className="text-foreground/60 text-lg font-light leading-relaxed mb-16 max-w-sm mx-auto">
          Choose your session type, date, and time — the full calendar is one click away.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center px-14 h-14 bg-foreground text-background text-[13px] font-medium tracking-[0.1em] uppercase transition-all duration-300 hover:bg-foreground/90"
        >
          Book a Session
        </Link>
      </div>
    </section>
  )
}
