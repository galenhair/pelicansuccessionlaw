/*
 * PELICAN SUCCESSION LAW — Pricing Page
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms` }}>
      {children}
    </div>
  );
}

const tiers = [
  {
    name: "Tier 1",
    label: "Simple Succession",
    price: "$2,500",
    description: "For straightforward, uncontested successions with a single property or small estate.",
    includes: [
      "One immovable property or bank account",
      "Up to 4 heirs",
      "Testate or intestate",
      "Petition for Possession",
      "Detailed Descriptive List",
      "Judgment of Possession",
      "3 certified copies delivered",
      "14-day average close time",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Tier 2",
    label: "Standard Succession",
    price: "$3,500–$4,500",
    description: "For estates with multiple properties, more complex asset structures, or larger heir groups.",
    includes: [
      "Multiple immovable properties",
      "Up to 8 heirs",
      "Mineral interests included",
      "All Tier 1 documents",
      "Usufruct & naked ownership analysis",
      "5 certified copies delivered",
      "Coordination with title companies",
      "16–21 day average close time",
    ],
    cta: "Get a Quote",
    highlight: true,
  },
  {
    name: "Tier 3",
    label: "Complex Succession",
    price: "From $5,000",
    description: "For estates with significant complexity — multiple prior marriages, large asset portfolios, or out-of-state domicile.",
    includes: [
      "Unlimited properties",
      "Multiple marriages / community property analysis",
      "Out-of-state ancillary succession",
      "All Tier 2 documents",
      "Forced heirship analysis",
      "10 certified copies delivered",
      "Dedicated case manager",
      "Custom timeline",
    ],
    cta: "Schedule a Call",
    highlight: false,
  },
];

const notIncluded = [
  "Contested successions or disputes between heirs",
  "Tutorship proceedings for minor heirs",
  "Interdiction proceedings",
  "Tax advice or estate tax filings",
  "Court filing fees (typically $150–$350, billed at cost)",
  "Notary fees for your Verification signature (typically $25–$75)",
];

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      <div className="pt-32 pb-16" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <div className="container">
          <div className="section-label mb-4">Transparent Pricing</div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}>
            Flat-Fee Succession Pricing
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
            No hourly billing. No retainers. No surprises. You know exactly what your succession costs before you sign anything.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {tiers.map((tier, i) => (
              <FadeUp key={tier.name} delay={i * 100}>
                <div
                  className="p-8 h-full flex flex-col"
                  style={{
                    background: tier.highlight ? "oklch(0.22 0.04 240)" : "oklch(0.20 0.04 240)",
                    border: tier.highlight ? "1px solid oklch(0.72 0.12 75 / 0.5)" : "1px solid oklch(1 0 0 / 10%)",
                    borderLeft: i > 0 ? "none" : undefined,
                    position: "relative",
                  }}
                >
                  {tier.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-mono-brand tracking-widest uppercase"
                      style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.18 0.04 240)" }}
                    >
                      Most Common
                    </div>
                  )}
                  <div className={tier.highlight ? "mt-6" : ""}>
                    <div className="section-label mb-2">{tier.name}</div>
                    <h2 className="font-display font-semibold text-2xl mb-2" style={{ color: "oklch(0.97 0.01 80)" }}>
                      {tier.label}
                    </h2>
                    <div className="font-display font-bold mb-4" style={{ fontSize: "2.5rem", color: "oklch(0.72 0.12 75)", lineHeight: 1 }}>
                      {tier.price}
                    </div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                      {tier.description}
                    </p>
                    <div className="gold-rule mb-6" />
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "oklch(0.75 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                          <span style={{ color: "oklch(0.72 0.12 75)", flexShrink: 0, marginTop: "2px" }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={tier.highlight ? "btn-gold rounded-none w-full text-center block" : "btn-outline-gold rounded-none w-full text-center block"}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Not included */}
          <FadeUp delay={200}>
            <div className="mt-16 max-w-3xl">
              <div className="section-label mb-4">What's Not Included</div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                Our flat fees cover the legal work for uncontested successions. The following require separate arrangements or referrals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notIncluded.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm p-3"
                    style={{
                      background: "oklch(0.22 0.04 240)",
                      border: "1px solid oklch(1 0 0 / 8%)",
                      color: "oklch(0.60 0.02 240)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span style={{ color: "oklch(0.50 0.02 240)", flexShrink: 0 }}>—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={300}>
            <div className="mt-16 p-10 max-w-3xl" style={{ background: "oklch(0.14 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}>
              <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                Not Sure Which Tier Applies?
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                Tell us about your situation and we'll give you a flat-fee quote within 24 hours. No obligation, no pressure.
              </p>
              <Link href="/contact" className="btn-gold rounded-none">
                Get a Free Quote
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
