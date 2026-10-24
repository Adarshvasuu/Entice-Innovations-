'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage, only show the floating navbar when scrolled past the top hero
  const shouldShow = !isHome || scrolled;

  return (
    <>
      <header
        className={`w-full bg-transparent fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          shouldShow ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/assets/logo/entice-logo.svg"
              alt="Entice Innovations"
              className="h-8 w-auto"
            />
            <span
              className="text-[#0A0F1E] text-2xl tracking-[-0.02em] leading-none"
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif", fontWeight: 700 }}
            >
              Entice
            </span>
          </a>

          {/* Desktop nav — Frosted Glass pill */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-black/[0.08] rounded-full px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? "bg-[#0F67FF] text-white shadow-sm"
                        : "text-[#4A5568] hover:text-[#0A0F1E] hover:bg-black/[0.03]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Contact CTA Link */}
          <div className="hidden md:block">
            <a
              href="/contact"
              className="px-5 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#0A0F1E] text-white hover:bg-[#0F67FF] transition-colors"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[20px] h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-[20px] h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-[20px] h-[1.5px] bg-[#0A0F1E] rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed top-[64px] left-3 right-3 z-50 md:hidden bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-2xl overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#0F67FF] text-white"
                          : "text-[#4A5568] hover:bg-black/[0.04]"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <a
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-[#0A0F1E] text-white text-sm font-semibold text-center py-3.5 rounded-xl hover:bg-[#0F67FF] transition-colors"
                >
                  Get in Touch
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
