import Image from "next/image"

export function GroupExperience() {
  return (
    <section className="py-40 lg:py-56 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/group-pilates.jpg"
              alt="Group Pilates session at Nirvana"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/50 mb-10">
              The Experience
            </p>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-[-0.02em] mb-12 font-light">
              Stronger together
            </h2>
            
            <p className="text-lg text-foreground/60 leading-[1.8] max-w-md">
              A refined group experience designed for connection, control, and consistency.
            </p>

            {/* Stats */}
            <div className="mt-20 flex gap-20">
              {[
                { number: "6", label: "Max size" },
                { number: "50", label: "Minutes" },
                { number: "5+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-5xl text-foreground tracking-[-0.02em] font-light">
                    {stat.number}
                  </div>
                  <div className="text-[11px] text-foreground/50 uppercase tracking-[0.3em] mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
