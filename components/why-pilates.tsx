const reasons = [
  {
    number: "01",
    title: "Builds deep strength",
    body: "Pilates targets the stabilising muscles that conventional training misses — creating functional strength that protects your spine, joints, and posture from the inside out.",
  },
  {
    number: "02",
    title: "Restores your posture",
    body: "Hours at a desk rewire your body into imbalance. Pilates systematically corrects these patterns, realigning your body so you stand, sit, and move with ease.",
  },
  {
    number: "03",
    title: "Clears your mind",
    body: "Every session demands complete presence. The focused, breath-led movement quiets mental noise and leaves you sharper, calmer, and more grounded.",
  },
  {
    number: "04",
    title: "A practice for life",
    body: "Unlike high-impact training, Pilates works with your body — not against it. Adaptable to every age, fitness level, and stage of life, it's a practice you can return to forever.",
  },
]

export function WhyPilates() {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-24 lg:mb-32 max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-8">
            The Practice
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground tracking-[-0.02em] font-light leading-[1.05]">
            Why Pilates
          </h2>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="bg-background p-10 lg:p-12 flex flex-col hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500"
            >
              <span className="block font-serif text-[11px] tracking-[0.3em] text-foreground/25 mb-10">
                {reason.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-[-0.01em] mb-6 leading-[1.2]">
                {reason.title}
              </h3>
              <p className="text-[15px] text-foreground/55 leading-[1.8] mt-auto">
                {reason.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
