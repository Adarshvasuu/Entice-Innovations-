"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Dynamically load the WebGL R3F canvas (client-side only)
const EnticeScene = dynamic(() => import("@/components/hero3d/EnticeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 select-none">
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <EnticeScene />
      </div>

      {/* TOP LEFT: Hero High-Impact Monument Title */}
      <div className="relative z-10 max-w-2xl mt-6 sm:mt-12 pointer-events-none">
        <h1
          className="text-[clamp(3.8rem,9.5vw,8.5rem)] font-normal text-[#0A0F1E] leading-[0.88] tracking-[-0.035em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          ENTICE
          <br />
          INNOVATIONS
          <span className="inline-block w-16 sm:w-28 h-[3px] bg-[#0F67FF] ml-4 align-middle" />
        </h1>
        <p className="mt-6 text-sm sm:text-base font-medium tracking-[0.2em] text-[#0F67FF] uppercase">
          AI Consulting &amp; Digital Infrastructure —
        </p>
      </div>

      {/* CENTER HINT (Playful interaction cue like the inspiration) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center hidden md:block">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#0A0F1E]/40 font-mono">
          ◄ DRAG OR CLICK TO EXPLORE ►
        </span>
      </div>

      {/* BOTTOM BAR: Agency Philosophy & Service Index (Exact Inspiration Layout) */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12 border-t border-black/[0.08] pointer-events-auto">
        {/* Bottom Left Manifesto & CTA */}
        <div className="max-w-md">
          <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-5">
            A venture-grade digital architecture practice. We build transformative AI integrations,
            bespoke IT systems, and high-performance brand ecosystems for leaders across 12+ industries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#0F67FF] hover:text-[#0A0F1E] transition-colors group"
          >
            <span>Initiate an engagement</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bottom Right Service Index */}
        <div className="text-right flex flex-col gap-1 text-xs sm:text-sm text-[#0A0F1E]/80 tracking-wide font-normal">
          <span className="hover:text-[#0F67FF] transition-colors cursor-default">01. AI &amp; Machine Learning Strategy</span>
          <span className="hover:text-[#0F67FF] transition-colors cursor-default">02. Enterprise IT Architecture</span>
          <span className="hover:text-[#0F67FF] transition-colors cursor-default">03. High-Growth Brand Building</span>
          <span className="hover:text-[#0F67FF] transition-colors cursor-default">04. Performance Digital Infrastructure</span>
          <span className="hover:text-[#0F67FF] transition-colors cursor-default">05. Cloud &amp; Managed Hosting</span>
        </div>
      </div>
    </section>
  );
}
