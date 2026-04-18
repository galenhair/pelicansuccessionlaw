/*
 * PELICAN SUCCESSION LAW — Contact Page
 */
import { useState, useEffect, useRef } from "react";
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

const inputStyle = {
  background: "oklch(0.22 0.04 240)",
  border: "1px solid oklch(1 0 0 / 15%)",
  color: "oklch(0.97 0.01 80)",
  fontFamily: "'DM Sans', sans-serif",
  padding: "0.75rem 1rem",
  width: "100%",
  outline: "none",
  fontSize: "0.9rem",
  borderRadius: "0",
  transition: "border-color 0.2s ease",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "oklch(0.60 0.02 240)",
  fontFamily: "'DM Mono', monospace",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    parish: "",
    situation: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would connect to a form service (Jotform, Typeform, or backend)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      <div className="pt-32 pb-16" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <div className="container">
          <div className="section-label mb-4">Free Consultation</div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}>
            Get a Free Quote
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
            Tell us about your situation and we'll respond within 2 business hours with a flat-fee quote. No obligation, no pressure.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeUp>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          style={inputStyle}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          style={inputStyle}
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Parish Where Property is Located</label>
                      <select
                        name="parish"
                        value={form.parish}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none" }}
                      >
                        <option value="">Select a parish...</option>
                        {["East Baton Rouge", "Orleans", "Jefferson", "St. Tammany", "Caddo", "Lafayette", "Calcasieu", "Ouachita", "Rapides", "Livingston", "Ascension", "St. Landry", "Other"].map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Situation</label>
                      <select
                        name="situation"
                        value={form.situation}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none" }}
                      >
                        <option value="">Describe your situation...</option>
                        <option value="no-will">Deceased passed without a will</option>
                        <option value="with-will">Deceased left a will</option>
                        <option value="out-of-state">I'm out of state, inherited Louisiana property</option>
                        <option value="stalled-closing">Real estate closing is stalled</option>
                        <option value="not-sure">Not sure — need guidance</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Tell Us More</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical" }}
                        placeholder="Briefly describe the estate — number of heirs, type of assets, any complications you're aware of..."
                      />
                    </div>

                    <button type="submit" className="btn-gold rounded-none w-full py-4 text-base">
                      Submit for a Free Quote
                    </button>

                    <p className="text-xs text-center" style={{ color: "oklch(0.45 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                      By submitting this form, you agree to be contacted by Pelican Succession Law. No attorney-client relationship is formed until a written engagement letter is signed.
                    </p>
                  </form>
                ) : (
                  <div
                    className="p-12 text-center"
                    style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                  >
                    <div className="font-display text-4xl mb-4" style={{ color: "oklch(0.72 0.12 75)" }}>✓</div>
                    <h2 className="font-display font-semibold text-2xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                      We Received Your Request
                    </h2>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                      A member of our team will contact you within 2 business hours with a flat-fee quote.
                    </p>
                    <Link href="/" className="btn-outline-gold rounded-none">
                      Return Home
                    </Link>
                  </div>
                )}
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <FadeUp delay={150}>
                <div className="space-y-6">
                  <div
                    className="p-8"
                    style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}
                  >
                    <div className="section-label mb-5">Contact Information</div>
                    <div className="space-y-4 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <div>
                        <div style={{ color: "oklch(0.50 0.02 240)", marginBottom: "0.25rem" }}>Phone</div>
                        <a href="tel:+15555555555" className="text-base font-medium" style={{ color: "oklch(0.97 0.01 80)" }}>
                          (555) 555-5555
                        </a>
                      </div>
                      <div>
                        <div style={{ color: "oklch(0.50 0.02 240)", marginBottom: "0.25rem" }}>Email</div>
                        <a href="mailto:info@pelicansuccessionslaw.com" className="text-base" style={{ color: "oklch(0.97 0.01 80)" }}>
                          info@pelicansuccessionslaw.com
                        </a>
                      </div>
                      <div>
                        <div style={{ color: "oklch(0.50 0.02 240)", marginBottom: "0.25rem" }}>Service Area</div>
                        <div style={{ color: "oklch(0.97 0.01 80)" }}>All 64 Louisiana Parishes</div>
                        <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.02 240)" }}>Remote service available statewide</div>
                      </div>
                      <div>
                        <div style={{ color: "oklch(0.50 0.02 240)", marginBottom: "0.25rem" }}>Response Time</div>
                        <div style={{ color: "oklch(0.97 0.01 80)" }}>Within 2 business hours</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-8"
                    style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}
                  >
                    <div className="section-label mb-5">What to Expect</div>
                    <div className="space-y-4">
                      {[
                        "We review your situation and provide a flat-fee quote",
                        "No obligation — the consultation is completely free",
                        "We'll tell you exactly what documents you need",
                        "We can start the same day you sign the engagement letter",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                          <span style={{ color: "oklch(0.72 0.12 75)", flexShrink: 0 }}>→</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
