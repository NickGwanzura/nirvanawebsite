const scheduleData = [
  {
    period: "Morning",
    times: ["7:00", "8:00", "9:00"],
    days: "Mon – Sat",
  },
  {
    period: "Evening",
    times: ["4:30", "5:30"],
    days: "Mon – Fri",
  },
]

export function Schedule() {
  return (
    <section id="schedule" className="py-40 lg:py-56 bg-background">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-32">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
            Schedule
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light">
            Find your time
          </h2>
        </div>

        {/* Schedule */}
        <div className="space-y-px">
          {scheduleData.map((schedule) => (
            <div
              key={schedule.period}
              className="flex flex-col md:flex-row md:items-center justify-between py-12 border-t border-border/60"
            >
              <div className="flex items-baseline gap-6 mb-8 md:mb-0">
                <h3 className="font-serif text-3xl text-foreground tracking-[-0.01em] font-light">
                  {schedule.period}
                </h3>
                <span className="text-[13px] text-foreground/50 tracking-wide">
                  {schedule.days}
                </span>
              </div>

              <div className="flex gap-6">
                {schedule.times.map((time) => (
                  <span
                    key={time}
                    className="text-[15px] text-foreground/50 tabular-nums tracking-wide"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-border/60" />
        </div>

        {/* Note */}
        <p className="text-center text-[13px] text-foreground/50 mt-20 tracking-wide">
          Advance booking essential
        </p>
      </div>
    </section>
  )
}
