/*
 * PELICAN SUCCESSION LAW — How It Works Page
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function useInView(threshold = 0.15) {
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
  {
    num: "01",
    title: "Call or Submit Online",
    detail: "Reach out by phone or fill out our 5-minute online intake form. We respond within 2 business hours with a flat-fee quote. No obligation, no pressure.",
    what: "What you provide: Names of heirs, name of deceased, rough estimate of assets, and whether a will exists.",
  },
  {
    num: "02",
    title: "Sign Your Engagement Letter & Pay",
    detail: "We send you a flat-fee engagement letter via DocuSign. Review it, sign electronically, and pay your flat fee online. No retainer, no hourly billing, no surprises.",
    what: "What you provide: Your e-signature and flat-fee payment.",
  },
  {
    num: "03",
    title: "Gather & Upload Documents",
    detail: "We send you a simple checklist of documents to upload to your secure client portal. Typically: certified death certificate, original will (if any), and property records.",
    what: "What you provide: Certified death certificate, will (if applicable), property deed or tax assessment.",
  },
  {
    num: "04",
    title: "We Draft the Pleadings",
    detail: "Our team uses document automation to prepare the Petition for Possession, Detailed Descriptive List of Assets, and proposed Judgment of Possession within 48 hours of receiving your documents.",
    what: "What we do: Draft all court pleadings, review for accuracy, and send you the Verification for signature.",
  },
  {
    num: "05",
    title: "You Sign the Verification",
    detail: "You sign one notarized document called the Verification. We provide instructions for finding a notary near you. Once received, we file the entire packet with the court immediately.",
    what: "What you provide: One notarized signature on the Verification document.",
  },
  {
    num: "06",
    title: "We File & Track",
    detail: "We file the succession packet with the appropriate Louisiana parish court and track the judge's signature daily. Most uncontested successions are signed within 5–10 business days of filing.",
    what: "What we do: File, track, follow up with the clerk, and notify you the moment the Judgment is signed.",
  },
  {
    num: "07",
    title: "Receive Your Judgment of Possession",
    detail: "We deliver certified copies of the signed Judgment of Possession directly to you, your bank, your title company, or any other party that needs it. Your succession is complete.",
    what: "What you receive: Certified copies of the Judgment of Possession — the legal order transferring ownership to the heirs.",
  },
];

const HOW_HERO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663214443274/zEPaxNhYwUanLaEx.jpg";

export default function HowItWorks() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      {/* Page Header */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: `url(${HOW_HERO})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div className="container">
          <div className="section-label mb-4">The Process</div>
          <h1
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}
          >
            How a Louisiana Succession Works
          </h1>
          <p
            className="text-lg max-w-2xl leading-relaxed"
            style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
          >
            From your first call to the delivery of the Judgment of Possession — here is exactly what happens, step by step.
          </p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 60}>
                <div
                  className="grid grid-cols-12 gap-8 py-12"
                  style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
                >
                  <div className="col-span-2 md:col-span-1">
                    <div
                      className="font-mono-brand text-3xl font-medium"
                      style={{ color: "oklch(0.72 0.12 75 / 0.5)" }}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3
                      className="font-display font-semibold text-2xl mb-3"
                      style={{ color: "oklch(0.97 0.01 80)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-4"
                      style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {step.detail}
                    </p>
                    <div
                      className="text-sm p-4"
                      style={{
                        background: "oklch(0.22 0.04 240)",
                        borderLeft: "2px solid oklch(0.72 0.12 75)",
                        color: "oklch(0.72 0.12 75)",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.75rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {step.what}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={200}>
            <div className="mt-16 max-w-2xl">
              <h2
                className="font-display font-semibold text-3xl mb-4"
                style={{ color: "oklch(0.97 0.01 80)" }}
              >
                Ready to Get Started?
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Get a free, no-obligation consultation and a flat-fee quote within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-gold rounded-none">
                  Get a Free Quote
                </Link>
                <Link href="/pricing" className="btn-outline-gold rounded-none">
                  See Pricing
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
