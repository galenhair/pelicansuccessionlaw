/*
 * PELICAN SUCCESSION LAW — Footer Component
 * Southern Gothic Modernism: Deep navy, gold accents
 */
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663214443274/6MentMy2qiahWXwqpq7d89/pelican_logo_mark-WoButkGR59A9weLKmTN6zx.webp";

export default function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.14 0.04 240)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_URL} alt="Pelican Succession Law" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display text-xl font-semibold" style={{ color: "oklch(0.97 0.01 80)" }}>
                  Pelican Succession Law
                </div>
                <div className="font-mono-brand text-[0.6rem] tracking-widest uppercase" style={{ color: "oklch(0.72 0.12 75)" }}>
                  Louisiana Succession Attorneys
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
              Louisiana's flat-fee succession law firm. We handle uncontested successions with transparency, speed, and expertise in Louisiana's unique civil law system.
            </p>
            <div className="mt-6 text-xs" style={{ color: "oklch(0.50 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
              <p>Pelican Succession Law, LLC</p>
              <p className="mt-1">Licensed in Louisiana</p>
            </div>
          </div>

          {/* Practice */}
          <div>
            <div className="section-label mb-5">Practice</div>
            <ul className="space-y-3">
              {[
                { label: "How It Works", href: "/how-it-works" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "About", href: "/about" },
                { label: "Free Consultation", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
                    style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="section-label mb-5">Contact</div>
            <ul className="space-y-3 text-sm" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
              <li>
                <a href="tel:+15555555555" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">
                  (555) 555-5555
                </a>
              </li>
              <li>
                <a href="mailto:info@pelicansuccessionslaw.com" className="hover:text-[oklch(0.72_0.12_75)] transition-colors">
                  info@pelicansuccessionslaw.com
                </a>
              </li>
              <li className="mt-4">
                <Link href="/contact" className="btn-gold rounded-none text-xs">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 8%)",
            color: "oklch(0.45 0.02 240)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <p>© {new Date().getFullYear()} Pelican Succession Law, LLC. All rights reserved.</p>
          <p className="max-w-lg text-right leading-relaxed">
            Attorney Advertising. This website is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by visiting this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
