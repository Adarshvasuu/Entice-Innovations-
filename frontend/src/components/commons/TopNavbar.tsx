'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Floating Centered Pill Navbar — Resend Aesthetic */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 sm:pt-6 px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-6 bg-white/85 backdrop-blur-xl border border-black/[0.08] rounded-full px-3.5 sm:px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-300">
            {/* Brand Logo & Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2 py-0.5 pr-1 sm:pr-2 group"
              aria-label="Entice Innovations Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/entice-logo.svg"
                alt="Entice Innovations"
                className="w-5 h-5 object-contain transition-transform group-hover:scale-105"
              />
              <span
                className="text-[15px] font-bold tracking-tight text-[#0A0F1E] leading-none"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Entice
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-0.5 text-xs font-medium text-[#4A5568]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? "text-[#0A0F1E] font-semibold bg-black/[0.05]"
                        : "hover:text-[#0A0F1E] hover:bg-black/[0.03]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Resend-style Compact CTA Pill */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#0A0F1E] text-white text-xs font-medium px-3.5 sm:px-4 py-1.5 rounded-full border border-white/10 shadow-sm hover:bg-[#0F67FF] hover:border-[#0F67FF] transition-all duration-200"
            >
              <span>Get in touch</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-1.5 text-[#0A0F1E] hover:bg-black/5 rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[5.2px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[5.2px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/25 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-2xl p-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#0F67FF] text-white"
                          : "text-[#3D4B5C] hover:bg-black/[0.04]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-[#0A0F1E] text-white text-sm font-medium text-center py-3 rounded-xl hover:bg-[#0F67FF] transition-colors"
                >
                  Get in touch
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
