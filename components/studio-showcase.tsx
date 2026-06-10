"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CtaLink } from "@/components/ui/cta-link";



export function StudioShowcase() {
  return (
    <section className="bg-background overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-20 px-4 pt-20 lg:pt-28">
            <p className="text-[11px] uppercase tracking-[0.5em] pl-[0.5em] text-foreground/50 mb-6">
              The Studio
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-foreground leading-[1.05]">
              A space built for<br />
              <span className="italic text-foreground/60">deep focus</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/70 max-w-lg mx-auto leading-relaxed">
              Every detail of Nirvana Pilates Studio has been designed to help you
              arrive, breathe, and move. Without distraction.
            </p>
            <CtaLink
              href="/about"
              variant="dark"
              className="mt-10 text-[11px] tracking-[0.35em] px-10 py-3.5"
            >
              Meet Noma →
            </CtaLink>
          </div>
        }
      >
        <Image
          src="/images/studio-showcase.png"
          alt="Nirvana Pilates Studio — luxury reformer Pilates space in Hillside, Bulawayo"
          width={1400}
          height={800}
          className="mx-auto rounded-xl object-cover h-full w-full object-center"
          draggable={false}
          priority={false}
        />
      </ContainerScroll>
    </section>
  );
}
