"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic client import for 3D Extruded Three.js Canvas
const EnticeScene = dynamic(() => import("@/components/hero3d/EnticeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[440px] md:h-[520px] lg:h-[560px] flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo/entice-logo.svg"
        alt="Entice Innovations Logo"
        className="w-48 sm:w-60 h-auto opacity-70 animate-pulse"
      />
    </div>
  ),
});

// ─── RAINFALL CUSTOMER LOGOS DATA ────────────────────────────────────────────
const RAINFALL_LANES = [
  {
    left: "6%",
    className: "animate-rainfall-1",
    blur: "0px",
    opacity: 0.09,
    logos: [
      { src: "/assets/logo/urban-tree.svg", alt: "Urban Tree", width: 72 },
      { src: "/assets/logo/pious-logo.svg", alt: "Pious", width: 64 },
      { src: "/assets/logo/vog-enhanced.svg", alt: "VOG", width: 78 },
      { src: "/assets/logo/polymers.svg", alt: "Polymers", width: 68 },
      { src: "/assets/logo/ip-logo.svg", alt: "IP Logo", width: 70 },
    ],
  },
  {
    left: "27%",
    className: "animate-rainfall-2",
    blur: "0.5px",
    opacity: 0.11,
    logos: [
      { src: "/assets/logo/polymers.svg", alt: "Polymers", width: 70 },
      { src: "/assets/logo/ip-logo.svg", alt: "IP Logo", width: 66 },
      { src: "/assets/logo/urban-tree.svg", alt: "Urban Tree", width: 74 },
      { src: "/assets/logo/pious-logo.svg", alt: "Pious", width: 62 },
      { src: "/assets/logo/vog-enhanced.svg", alt: "VOG", width: 76 },
    ],
  },
  {
    left: "49%",
    className: "animate-rainfall-3",
    blur: "0px",
    opacity: 0.08,
    logos: [
      { src: "/assets/logo/vog-enhanced.svg", alt: "VOG", width: 76 },
      { src: "/assets/logo/urban-tree.svg", alt: "Urban Tree", width: 72 },
      { src: "/assets/logo/polymers.svg", alt: "Polymers", width: 68 },
      { src: "/assets/logo/ip-logo.svg", alt: "IP Logo", width: 64 },
      { src: "/assets/logo/pious-logo.svg", alt: "Pious", width: 66 },
    ],
  },
  {
    left: "71%",
    className: "animate-rainfall-4",
    blur: "0.8px",
    opacity: 0.10,
    logos: [
      { src: "/assets/logo/pious-logo.svg", alt: "Pious", width: 64 },
      { src: "/assets/logo/polymers.svg", alt: "Polymers", width: 70 },
      { src: "/assets/logo/urban-tree.svg", alt: "Urban Tree", width: 74 },
      { src: "/assets/logo/vog-enhanced.svg", alt: "VOG", width: 76 },
      { src: "/assets/logo/ip-logo.svg", alt: "IP Logo", width: 68 },
    ],
  },
  {
    left: "90%",
    className: "animate-rainfall-5",
    blur: "0.3px",
    opacity: 0.09,
    logos: [
      { src: "/assets/logo/ip-logo.svg", alt: "IP Logo", width: 68 },
      { src: "/assets/logo/vog-enhanced.svg", alt: "VOG", width: 74 },
      { src: "/assets/logo/pious-logo.svg", alt: "Pious", width: 62 },
      { src: "/assets/logo/polymers.svg", alt: "Polymers", width: 66 },
      { src: "/assets/logo/urban-tree.svg", alt: "Urban Tree", width: 72 },
    ],
  },
];

export default function HomeSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[92vh] sm:min-h-screen flex items-center justify-center">
      {/* ── ATMOSPHERIC HERO GRADIENT (Self-contained, fades to #FFFFFF at bottom) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 74% 48%, rgba(15, 103, 255, 0.11) 0%, rgba(15, 103, 255, 0.03) 42%, transparent 66%),
            radial-gradient(circle at 20% 18%, rgba(15, 103, 255, 0.05) 0%, transparent 40%),
            #ffffff
          `,
        }}
      />

      {/* ── BOTTOM EDGE WHITE BLEND (Guarantees zero gradient bleed into About section) ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)",
        }}
      />

      {/* ── CUSTOMER LOGO RAINFALL BACKGROUND (Infinitely falling stream, 8–12% opacity) ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none hidden md:block"
        aria-hidden="true"
      >
        {RAINFALL_LANES.map((lane, laneIdx) => (
          <div
            key={laneIdx}
            className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col justify-start"
            style={{
              left: lane.left,
              opacity: lane.opacity,
              filter: lane.blur !== "0px" ? `blur(${lane.blur})` : undefined,
            }}
          >
            {/* Seamless 2x loop lane for infinite uninterrupted rainfall */}
            <div className={`flex flex-col gap-16 py-8 ${lane.className}`}>
              {/* Set 1 */}
              {lane.logos.map((logo, logoIdx) => (
                <div key={`set1-${logoIdx}`} className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ width: `${logo.width}px`, height: "auto" }}
                    className="filter grayscale opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Set 2 (Identical for seamless repeat) */}
              {lane.logos.map((logo, logoIdx) => (
                <div key={`set2-${logoIdx}`} className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ width: `${logo.width}px`, height: "auto" }}
                    className="filter grayscale opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── 1200PX MAXIMUM WIDTH HERO CONTAINER ── */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 sm:px-10 pt-28 pb-16 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ── LEFT COLUMN: HEADLINE, BADGE, DESCRIPTION & RESEND CTAS ── */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-[#0F67FF] bg-[#0F67FF]/[0.06] border border-[#0F67FF]/15 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F67FF] animate-pulse" />
              <span>AI · IT · Marketing · Brand</span>
            </div>

            {/* Headline: High-Contrast Condensed Editorial Serif in Bodoni Moda */}
            <h1
              className="text-[clamp(3.0rem,6.0vw,5.2rem)] font-bold text-[#0A0F1E] leading-[0.96] tracking-[-0.03em] uppercase"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontOpticalSizing: "auto",
              }}
            >
              Entice
              <br />
              Innovations
            </h1>

            {/* Description beneath headline */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-[#4A5568] font-normal leading-relaxed max-w-lg tracking-[-0.01em]">
              End-to-end digital solutions
            </p>

            {/* Resend-Style Compact CTA Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8 sm:mt-10">
              {/* Primary: Start your journey */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#0A0F1E] text-white border border-white/15 shadow-[0_2px_10px_rgba(10,15,30,0.14)] hover:bg-[#0F67FF] hover:border-[#0F67FF] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Start your journey</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Secondary: Explore services */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white/70 backdrop-blur-sm text-[#0A0F1E] border border-black/10 hover:border-black/25 hover:bg-white hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <span>Explore services</span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: EXTRUDED THREE.JS 3D ENTICE LOGO ── */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full">
            <EnticeScene />
          </div>
        </div>
      </div>
    </section>
  );
}
