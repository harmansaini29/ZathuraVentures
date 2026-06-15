"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about-team" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0.75rem auto",
          padding: "0.875rem 1.75rem",
          borderRadius: "16px",
          background: scrolled
            ? "rgba(6, 20, 35, 0.75)"
            : "rgba(6, 20, 35, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${scrolled ? "rgba(200, 16, 46, 0.12)" : "rgba(212, 175, 55, 0.08)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "none",
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #c8102e, #0088ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#fff",
            }}
          >
            ZV
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "var(--on-surface)",
              letterSpacing: "-0.01em",
            }}
          >
            Zathura<span style={{ color: "var(--ancient-gold)" }}>.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--on-surface-variant)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--electric-blue)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--on-surface-variant)";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hello@zathuraventures.com"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              padding: "0.6rem 1.4rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #c8102e, #0088ff)",
              transition: "all 0.3s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(200, 16, 46, 0.3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Initiate Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--on-surface)",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="mobile-only"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: "1280px",
              margin: "0.5rem auto",
              padding: "1.5rem",
              borderRadius: "16px",
              background: "rgba(6, 20, 35, 0.9)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(200, 16, 46, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--on-surface-variant)",
                  textDecoration: "none",
                  padding: "0.5rem 0",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
