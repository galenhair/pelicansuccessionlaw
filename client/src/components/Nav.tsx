/*
 * PELICAN SUCCESSION LAW — Nav Component
 * Southern Gothic Modernism: Deep navy, gold accents, Cormorant + DM Sans
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663214443274/6MentMy2qiahWXwqpq7d89/pelican_logo_mark-WoButkGR59A9weLKmTN6zx.webp";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.18 0.04 240 / 0.97)"
          : "oklch(0.18 0.04 240 / 0.0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="Pelican Succession Law"
            className="h-9 w-9 object-contain"
          />
          <div className="leading-tight">
            <div
              className="font-display text-lg font-semibold tracking-wide"
              style={{ color: "oklch(0.97 0.01 80)" }}
            >
              Pelican Succession Law
            </div>
            <div
              className="font-mono-brand text-[0.6rem] tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 75)" }}
            >
              Louisiana Succession Attorneys
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: location === link.href
                  ? "oklch(0.72 0.12 75)"
                  : "oklch(0.75 0.02 240)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold rounded-none">
            Free Consultation
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "oklch(0.72 0.12 75)",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "oklch(0.72 0.12 75)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-200"
            style={{
              background: "oklch(0.72 0.12 75)",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "oklch(0.18 0.04 240)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2 border-b"
              style={{
                color: "oklch(0.97 0.01 80)",
                borderColor: "oklch(1 0 0 / 8%)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold rounded-none text-center mt-2">
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
