"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white"
      style={{
        background: `
          radial-gradient(ellipse 72% 45% at 18% 12%, rgba(15, 103, 255, 0.12) 0%, rgba(15, 103, 255, 0.04) 45%, transparent 70%),
          radial-gradient(ellipse 55% 40% at 88% 42%, rgba(15, 103, 255, 0.08) 0%, transparent 62%),
          #ffffff
        `,
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-normal text-[#1C1C1C]/[0.03] leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(8rem, 25vw, 18rem)",
        }}
        aria-hidden
      >
        Oops
      </span>

      <div className="relative z-10 max-w-xl w-full text-center">
        <motion.span
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="text-[#0F67FF] text-xs uppercase tracking-[0.22em] mb-6 block font-medium"
        >
          Something Went Wrong
        </motion.span>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-[clamp(2.2rem,5vw,3.8rem)] font-normal text-[#1C1C1C] leading-[1.06] tracking-[-0.02em] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          An unexpected error<br />occurred.
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-[#6B7A8D] text-base leading-relaxed mb-8 max-w-sm mx-auto"
        >
          We've been notified and are looking into it. Try refreshing the page, or head back home.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#0A0F1E] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#0F67FF] transition-colors duration-300 shadow-md"
          >
            Try Again
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6B7A8D] border border-black/10 rounded-full px-8 py-3.5 hover:border-[#0F67FF] hover:text-[#0F67FF] transition-all duration-200 bg-white/60"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
