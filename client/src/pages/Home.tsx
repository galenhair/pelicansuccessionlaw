/*
 * PELICAN SUCCESSION LAW — Home Page
 * Southern Gothic Modernism: Deep navy, gold, Cormorant Garamond + DM Sans
 * Layout: Asymmetric editorial, left-anchored, hero with proof card
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663214443274/6MentMy2qiahWXwqpq7d89/pelican_hero_bg-jJrWcZpLPq8iaMGfy5UUMM.webp";

// Animated counter hook
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
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

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 1600, inView);
  return (
    <div ref={ref} className="stat-card">
      <div className="font-display font-bold" style={{ fontSize: "2.2rem", color: "oklch(0.72 0.12 75)", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 uppercase tracking-widest font-mono-brand" style={{ color: "oklch(0.60 0.02 240)" }}>
        {label}
      </div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const steps = [
  { num: "01", title: "Call or Submit Online", desc: "Reach out by phone or fill out our 5-minute intake form. We respond within 2 business hours with a flat-fee quote." },
  { num: "02", title: "Sign & Pay", desc: "Review your engagement letter, sign electronically, and pay your flat fee. No retainer, no hourly billing surprises." },
  { num: "03", title: "We Draft the Pleadings", desc: "Our team uses document automation to prepare the Petition for Possession and Descriptive List within 48 hours." },
  { num: "04", title: "You Sign the Verification", desc: "You sign one notarized document. We handle everything else — filing, tracking, and following up with the court." },
  { num: "05", title: "Receive Your Judgment", desc: "We deliver certified copies of the Judgment of Possession directly to you, your bank, or your title company." },
];

const testimonials = [
  { quote: "I was dreading the legal process after losing my mother. Pelican Succession Law made it simple, fast, and surprisingly affordable.", name: "Marie T.", location: "Baton Rouge, LA" },
  { quote: "As a real estate attorney, I refer all my stalled closings to Pelican. They've never missed a deadline.", name: "James R.", location: "New Orleans, LA" },
  { quote: "I live in Texas and inherited property in Louisiana. They handled everything remotely. The Judgment was in my hands in 16 days.", name: "Susan M.", location: "Houston, TX" },
];

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_BG;
    img.onload = () => setHeroLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "oklch(0.14 0.04 240)",
        }}
      >
        {/* Hero background image */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: heroLoaded ? 0.25 : 0,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, oklch(0.14 0.04 240) 45%, oklch(0.14 0.04 240 / 0.6) 75%, transparent 100%)",
          }}
        />

        <div className="container relative z-10 pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headline */}
            <div className="lg:col-span-7">
              <div className="section-label mb-6 animate-fade-up animate-fade-up-delay-1">
                Louisiana Succession Law
              </div>
              <h1
                className="font-display font-bold leading-tight mb-6 animate-fade-up animate-fade-up-delay-2"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  color: "oklch(0.97 0.01 80)",
                  letterSpacing: "-0.01em",
                }}
              >
                Your Family Deserves
                <br />
                <span style={{ color: "oklch(0.72 0.12 75)" }}>Clarity.</span> Not Confusion.
              </h1>
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl animate-fade-up animate-fade-up-delay-3"
                style={{ color: "oklch(0.70 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Louisiana's flat-fee succession law firm. We handle uncontested successions in{" "}
                <strong style={{ color: "oklch(0.97 0.01 80)" }}>14 business days</strong> — with transparent pricing, no hourly billing, and a process built for families, not lawyers.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-4">
                <Link href="/contact" className="btn-gold rounded-none">
                  Get a Free Quote
                </Link>
                <Link href="/how-it-works" className="btn-outline-gold rounded-none">
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right: Proof card */}
            <div className="lg:col-span-5 animate-fade-up animate-fade-up-delay-4">
              <div
                className="p-8 rounded-none"
                style={{
                  background: "oklch(0.22 0.04 240 / 0.9)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="section-label mb-6">Why Pelican</div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <StatCard value={14} suffix=" days" label="Avg. Close Time" />
                  <StatCard value={100} suffix="%" label="Flat-Fee Pricing" />
                  <StatCard value={5} suffix="★" label="Google Rating" />
                  <StatCard value={46} suffix="k+" label="LA Successions/Year" />
                </div>
                <div
                  className="p-4 text-sm leading-relaxed"
                  style={{
                    borderLeft: "2px solid oklch(0.72 0.12 75)",
                    color: "oklch(0.70 0.02 240)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <em className="font-display text-base" style={{ color: "oklch(0.97 0.01 80)" }}>
                    "No retainer. No hourly billing. Just a clear process and a flat fee."
                  </em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div
        style={{
          background: "oklch(0.14 0.04 240)",
          borderTop: "1px solid oklch(1 0 0 / 8%)",
          borderBottom: "1px solid oklch(1 0 0 / 8%)",
        }}
      >
        <div className="container py-5">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-mono-brand tracking-widest uppercase" style={{ color: "oklch(0.50 0.02 240)" }}>
            <span>Licensed in Louisiana</span>
            <span style={{ color: "oklch(0.72 0.12 75)" }}>—</span>
            <span>Flat-Fee Pricing</span>
            <span style={{ color: "oklch(0.72 0.12 75)" }}>—</span>
            <span>14-Day Average Close</span>
            <span style={{ color: "oklch(0.72 0.12 75)" }}>—</span>
            <span>Civil Law Specialists</span>
            <span style={{ color: "oklch(0.72 0.12 75)" }}>—</span>
            <span>Statewide Service</span>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS PREVIEW ── */}
      <section className="py-24" style={{ background: "oklch(0.18 0.04 240)" }}>
        <div className="container">
          <FadeUp>
            <div className="section-label mb-4">The Process</div>
            <h2
              className="font-display font-semibold mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "oklch(0.97 0.01 80)" }}
            >
              From Loss to Legal Clarity
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>in Five Steps</span>
            </h2>
            <p className="text-base leading-relaxed max-w-xl mb-12" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
              We built a streamlined process that respects your time and removes the uncertainty from Louisiana succession law.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 80}>
                <div
                  className="p-6 h-full"
                  style={{
                    borderLeft: i === 0 ? "1px solid oklch(1 0 0 / 10%)" : "none",
                    borderRight: "1px solid oklch(1 0 0 / 10%)",
                    borderTop: "1px solid oklch(1 0 0 / 10%)",
                    borderBottom: "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  <div
                    className="font-mono-brand text-4xl font-medium mb-4 block"
                    style={{ color: "oklch(0.72 0.12 75 / 0.3)" }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="font-display font-semibold text-lg mb-3"
                    style={{ color: "oklch(0.97 0.01 80)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={400}>
            <div className="mt-10">
              <Link href="/how-it-works" className="btn-outline-gold rounded-none">
                See the Full Process
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY PELICAN ── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.15 0.04 240)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="section-label mb-4">Why We're Different</div>
                <h2
                  className="font-display font-semibold mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "oklch(0.97 0.01 80)" }}
                >
                  Built for Families,
                  <br />
                  <span style={{ color: "oklch(0.72 0.12 75)" }}>Not Billable Hours</span>
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                  Traditional law firms treat Louisiana successions as hourly billing projects that drag on for six months. We built Pelican Succession Law to solve that problem — with flat fees, document automation, and a process that respects your time.
                </p>
                <div className="space-y-5">
                  {[
                    { title: "Flat-Fee Transparency", desc: "You know exactly what it costs before you sign. No retainers, no hourly surprises." },
                    { title: "Louisiana Civil Law Expertise", desc: "We understand forced heirship, usufruct, and community property — the concepts that trip up general practice firms." },
                    { title: "Statewide Service", desc: "We serve all 64 Louisiana parishes and can handle your succession entirely by phone, email, and e-signature." },
                    { title: "Out-of-State Heirs Welcome", desc: "Inherited Louisiana property from another state? We handle the ancillary succession process remotely." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div
                        className="w-0.5 flex-shrink-0 mt-1"
                        style={{ background: "oklch(0.72 0.12 75)", height: "100%" }}
                      />
                      <div>
                        <div className="font-display font-semibold text-base mb-1" style={{ color: "oklch(0.97 0.01 80)" }}>
                          {item.title}
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <div className="space-y-4">
                {/* Comparison table */}
                <div
                  className="p-6"
                  style={{
                    background: "oklch(0.22 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  <div className="section-label mb-5">Pelican vs. Traditional Firms</div>
                  <table className="w-full text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 10%)" }}>
                        <th className="text-left pb-3" style={{ color: "oklch(0.50 0.02 240)", fontWeight: 400 }}>Factor</th>
                        <th className="text-center pb-3" style={{ color: "oklch(0.72 0.12 75)", fontWeight: 600 }}>Pelican</th>
                        <th className="text-center pb-3" style={{ color: "oklch(0.50 0.02 240)", fontWeight: 400 }}>Traditional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Pricing Model", "Flat Fee", "Hourly"],
                        ["Avg. Timeline", "14 Days", "3–6 Months"],
                        ["Billing Transparency", "✓ Upfront", "✗ Unknown"],
                        ["Remote Service", "✓ Yes", "✗ Often No"],
                        ["Succession-Only Focus", "✓ Yes", "✗ General Practice"],
                      ].map(([factor, pelican, trad]) => (
                        <tr key={factor} style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}>
                          <td className="py-3" style={{ color: "oklch(0.65 0.02 240)" }}>{factor}</td>
                          <td className="py-3 text-center font-medium" style={{ color: "oklch(0.97 0.01 80)" }}>{pelican}</td>
                          <td className="py-3 text-center" style={{ color: "oklch(0.45 0.02 240)" }}>{trad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link href="/pricing" className="btn-gold rounded-none w-full text-center block">
                  See Our Flat-Fee Pricing
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ background: "oklch(0.18 0.04 240)" }}>
        <div className="container">
          <FadeUp>
            <div className="section-label mb-4">Client Testimonials</div>
            <h2
              className="font-display font-semibold mb-12"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "oklch(0.97 0.01 80)" }}
            >
              Families We've Helped
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div
                  className="p-8 h-full flex flex-col justify-between"
                  style={{
                    background: "oklch(0.22 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  <div
                    className="font-display text-xl italic leading-relaxed mb-6"
                    style={{ color: "oklch(0.85 0.01 80)" }}
                  >
                    "{t.quote}"
                  </div>
                  <div>
                    <div className="gold-rule mb-3" />
                    <div className="text-sm font-medium" style={{ color: "oklch(0.97 0.01 80)", fontFamily: "'DM Sans', sans-serif" }}>
                      {t.name}
                    </div>
                    <div className="text-xs mt-0.5 font-mono-brand" style={{ color: "oklch(0.55 0.02 240)" }}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.14 0.04 240)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <FadeUp>
            <div className="section-label mb-4 text-center">Get Started Today</div>
            <h2
              className="font-display font-bold mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}
            >
              Ready to Resolve Your
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>Louisiana Succession?</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Get a free, no-obligation consultation and a flat-fee quote within 24 hours. We serve all 64 Louisiana parishes — entirely remotely if needed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-gold rounded-none text-base px-10 py-4">
                Get a Free Quote
              </Link>
              <Link href="/faq" className="btn-outline-gold rounded-none text-base px-10 py-4">
                Read the FAQ
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
