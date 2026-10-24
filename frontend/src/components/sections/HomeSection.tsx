"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// Dynamic client import for WebGL Three.js Canvas
const EnticeScene = dynamic(() => import("@/components/hero3d/EnticeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

const serviceTopics = [
  "Inspiration and vision",
  "AI architecture & models",
  "Enterprise IT infrastructure",
  "Brand systems & visual identity",
  "High-performance engineering",
  "Growth & performance marketing",
  "Cloud & managed hosting",
  "Scale and time to market",
];

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function HomeSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPercent(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInteract = () => {
    setInteractionCount((c) => c + 1);
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none bg-white">
      {/* ── AMBIENT ENTICE BLUE & WHITE GRADIENT ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 18% 15%, rgba(15, 103, 255, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(15, 103, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 85%, rgba(15, 103, 255, 0.07) 0%, transparent 50%),
            #ffffff
          `,
        }}
      />

      {/* ── 3D THREE.JS WEBGL CANVAS (FLOATING LOGOS & EMBLEM) ── */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <EnticeScene onInteract={handleInteract} />
      </div>

      {/* ── TOP BAR: MONUMENT TITLE (LEFT) & MINIMAL HAMBURGER (RIGHT) ── */}
      <div className="relative z-20 flex items-start justify-between w-full pointer-events-none">
        {/* Top-Left: Iconic Monumental Compressed Editorial Typography */}
        <div className="flex flex-col">
          <h1
            className="text-[clamp(3.8rem,11.5vw,9.5rem)] font-bold text-[#0A0F1E] leading-[0.84] tracking-[-0.03em] uppercase transition-all"
            style={{
              fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Didot, 'Bodoni MT', serif",
              fontOpticalSizing: "auto",
            }}
          >
            ENTICE
            <br />
            INNOVATIONS —
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base font-normal tracking-[-0.01em] text-[#0A0F1E]/80">
            In AI &amp; Digital Strategy —
          </p>
        </div>

        {/* Top-Right: Minimal 3-Line Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto p-2 group flex flex-col gap-[5px] items-end justify-center hover:opacity-75 transition-opacity"
          aria-label="Open Navigation"
        >
          <span className="block w-6 sm:w-8 h-[2px] bg-[#0A0F1E] transition-all group-hover:w-8" />
          <span className="block w-6 sm:w-8 h-[2px] bg-[#0A0F1E] transition-all group-hover:w-6" />
          <span className="block w-6 sm:w-8 h-[2px] bg-[#0A0F1E] transition-all group-hover:w-8" />
        </button>
      </div>

      {/* ── CENTER CUE: "CLICK SLOWLY AND SEE" WITH ARROW ── */}
      <div
        className="absolute top-[48%] left-[54%] sm:left-[56%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex items-center gap-2"
        style={{
          transform: "translate(-20%, -140%)",
        }}
      >
        <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-[#0A0F1E]/80 text-left leading-tight">
          CLICK SLOWLY
          <br />
          AND SEE
        </span>
        <svg
          className="w-4 h-4 text-[#0A0F1E]/70 -rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>

      {/* ── RIGHT EDGE: SCROLL TRACK INDICATOR ── */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center">
        <div className="relative w-[1.5px] h-32 bg-black/[0.15]">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0A0F1E] transition-transform duration-100 ease-out"
            style={{
              top: `${scrollPercent * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>

      {/* ── BOTTOM BAR: MANIFESTO (LEFT) & NUMBERED TOPICS (RIGHT) ── */}
      <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full pointer-events-none">
        {/* Bottom-Left: Subtitle Line */}
        <div className="pointer-events-auto">
          <Link
            href="/about"
            className="text-xs sm:text-sm text-[#0A0F1E]/85 hover:text-[#0F67FF] transition-colors underline underline-offset-4 decoration-black/20 hover:decoration-[#0F67FF]"
          >
            A runtime deconstruction of enticeinnovations.com
          </Link>
        </div>

        {/* Bottom-Right: Right-Aligned Topics List (Exact 8 items matching inspiration) */}
        <div className="text-right flex flex-col gap-0.5 text-[11px] sm:text-xs text-[#0A0F1E]/80 font-normal leading-[1.35] pointer-events-auto">
          {serviceTopics.map((topic, i) => (
            <span
              key={i}
              className="hover:text-[#0F67FF] hover:translate-x-[-2px] transition-all cursor-default block"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* ── FULLSCREEN NAVIGATION OVERLAY (WHEN HAMBURGER CLICKED) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0A0F1E]/95 backdrop-blur-xl flex flex-col justify-between p-8 sm:p-14 text-white pointer-events-auto"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between w-full">
              <span
                className="text-2xl font-serif tracking-tight"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                ENTICE INNOVATIONS
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-sm uppercase tracking-widest text-white/70 hover:text-white"
                aria-label="Close menu"
              >
                ✕ Close
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-4 sm:gap-6 my-auto max-w-xl">
              {navigationLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between text-3xl sm:text-5xl font-light hover:text-[#0F67FF] transition-colors"
                >
                  <span className="font-serif tracking-tight">{link.name}</span>
                  <span className="text-sm font-mono text-white/40 group-hover:text-[#0F67FF]">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </div>

            {/* Overlay Footer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
              <p>Nagercoil · Trivandrum · Chennai · Bangalore</p>
              <p>info@enticeinnovations.com · +91-9994860392</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
