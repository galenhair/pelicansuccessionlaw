/**
 * Pelican Succession Law — After-Death Checklist Lead Magnet Page
 * Design: Southern Gothic Modernism — deep navy, gold, Cormorant Garamond + DM Sans
 * Purpose: Email capture gated PDF download — primary lead magnet for all channels
 */

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CHECKLIST_PDF_URL = "/manus-storage/after_death_checklist_6ea4ee14.pdf";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgvqb";

const navyBg = { background: "oklch(0.18 0.04 240)" };
const cardBg = { background: "oklch(0.22 0.04 240)", border: "1px solid oklch(0.32 0.04 240)" };
const gold = "oklch(0.72 0.12 75)";
const white = "oklch(0.95 0.01 90)";
const muted = "oklch(0.55 0.03 240)";

export default function Checklist() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: `Checklist Download Request from ${name}`,
          _replyto: email,
          source: "After-Death Checklist Lead Magnet",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        // Auto-trigger download
        const link = document.createElement("a");
        link.href = CHECKLIST_PDF_URL;
        link.download = "Louisiana-After-Death-Checklist-Pelican-Succession-Law.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError("Something went wrong. Please try again or call (617) 429-0809.");
      }
    } catch {
      setError("Something went wrong. Please try again or call (617) 429-0809.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={navyBg}>
      <Nav />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4" style={navyBg}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Pelican icon */}
          <div className="flex justify-center mb-6">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <ellipse cx="26" cy="36" rx="10" ry="12" stroke={gold} strokeWidth="1.5" fill="none"/>
              <circle cx="26" cy="16" r="7" stroke={gold} strokeWidth="1.5" fill="none"/>
              <path d="M26 23 Q30 28 26 30 Q22 28 26 23Z" stroke={gold} strokeWidth="1" fill="none"/>
              <path d="M26 9 Q34 6 36 12 Q32 14 26 16" stroke={gold} strokeWidth="1.5" fill="none"/>
            </svg>
          </div>

          <p className="uppercase tracking-[0.25em] text-xs mb-4" style={{ color: gold, fontFamily: "'DM Mono', monospace" }}>
            Free Resource · Pelican Succession Law
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ color: gold, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}
          >
            After a Loved One Passes:<br />
            <span style={{ color: white }}>The Louisiana After-Death Checklist</span>
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            A comprehensive, step-by-step checklist covering everything Louisiana families need to handle in the days, weeks, and months after a loved one passes — including how to open the succession.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "Free Download",
              "Louisiana-Specific",
              "Attorney-Reviewed",
              "Instant Access",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span style={{ color: gold, fontSize: 14 }}>✓</span>
                <span className="text-sm" style={{ color: muted, fontFamily: "'DM Sans', sans-serif" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Preview */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">

          {/* Capture Form */}
          <div className="rounded-none p-8" style={cardBg}>
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold mb-2" style={{ color: white, fontFamily: "'Cormorant Garamond', serif" }}>
                  Get Your Free Copy
                </h2>
                <p className="text-sm mb-6" style={{ color: muted, fontFamily: "'DM Sans', sans-serif" }}>
                  Enter your name and email below. Your checklist will download immediately — no spam, no sales calls.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1" style={{ color: gold, fontFamily: "'DM Mono', monospace" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: "oklch(0.15 0.04 240)",
                        border: "1px solid oklch(0.32 0.04 240)",
                        color: white,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1" style={{ color: gold, fontFamily: "'DM Mono', monospace" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: "oklch(0.15 0.04 240)",
                        border: "1px solid oklch(0.32 0.04 240)",
                        color: white,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 text-sm font-semibold uppercase tracking-widest transition-opacity"
                    style={{
                      background: gold,
                      color: "oklch(0.15 0.04 240)",
                      fontFamily: "'DM Mono', monospace",
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? "wait" : "pointer",
                    }}
                  >
                    {submitting ? "Preparing Download..." : "Download Free Checklist →"}
                  </button>
                  {error && (
                    <p className="text-xs text-center" style={{ color: "oklch(0.75 0.18 25)" }}>{error}</p>
                  )}
                  <p className="text-xs text-center" style={{ color: muted, fontFamily: "'DM Sans', sans-serif" }}>
                    We respect your privacy. Your information is never sold or shared.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: gold, fontFamily: "'Cormorant Garamond', serif" }}>
                  Your Checklist Is Downloading
                </h2>
                <p className="text-sm mb-6" style={{ color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
                  If the download didn't start automatically,{" "}
                  <a
                    href={CHECKLIST_PDF_URL}
                    download="Louisiana-After-Death-Checklist-Pelican-Succession-Law.pdf"
                    style={{ color: gold, textDecoration: "underline" }}
                  >
                    click here
                  </a>
                  .
                </p>
                <div className="p-4 mb-6" style={{ background: "oklch(0.15 0.04 240)", border: `1px solid ${gold}` }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: gold, fontFamily: "'Cormorant Garamond', serif", fontSize: 16 }}>
                    Need Help Opening the Succession?
                  </p>
                  <p className="text-xs mb-3" style={{ color: muted, fontFamily: "'DM Sans', sans-serif" }}>
                    We handle uncontested Louisiana successions in 14 business days — flat fee, all 64 parishes.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block px-6 py-2 text-xs uppercase tracking-widest font-semibold"
                    style={{ background: gold, color: "oklch(0.15 0.04 240)", fontFamily: "'DM Mono', monospace" }}
                  >
                    Get a Free Quote →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* What's Inside Preview */}
          <div>
            <h3 className="text-xl font-bold mb-5" style={{ color: white, fontFamily: "'Cormorant Garamond', serif" }}>
              What's Inside the Checklist
            </h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "01",
                  title: "Week 1 — Immediate Priorities",
                  desc: "Death certificates, Social Security notification, securing property, locating the will, and notifying financial institutions.",
                },
                {
                  icon: "02",
                  title: "Financial Accounts",
                  desc: "Bank accounts, investment accounts, retirement funds, credit cards, and outstanding debts owed to the estate.",
                },
                {
                  icon: "03",
                  title: "Real Property & Vehicles",
                  desc: "How to identify property, what NOT to do before succession is complete, and how to protect the estate from title issues.",
                },
                {
                  icon: "04",
                  title: "Opening the Succession",
                  desc: "Exactly which documents your attorney needs, whether you qualify for a small succession affidavit, and how to get started.",
                },
                {
                  icon: "05",
                  title: "Utilities, Digital & Personal Affairs",
                  desc: "Subscriptions, social media, email accounts, tax returns, DMV notification, and voter registration.",
                },
                {
                  icon: "06",
                  title: "After Succession Is Complete",
                  desc: "Recording the Judgment of Possession, re-titling vehicles, updating your own estate plan, and closing the file.",
                },
              ].map((item) => (
                <div key={item.icon} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xs font-bold"
                    style={{ background: gold, color: "oklch(0.15 0.04 240)", fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: white, fontFamily: "'DM Sans', sans-serif" }}>
                      {item.title}
                    </p>
                    <p className="text-xs" style={{ color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4" style={{ background: "oklch(0.14 0.04 240)", borderTop: `1px solid oklch(0.28 0.04 240)` }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.2em] text-xs mb-3" style={{ color: gold, fontFamily: "'DM Mono', monospace" }}>
            Ready to Move Forward?
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: white, fontFamily: "'Cormorant Garamond', serif" }}>
            We Handle Louisiana Successions<br />From Start to Finish
          </h2>
          <p className="text-sm mb-7" style={{ color: muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            Flat-fee pricing. 14-business-day turnaround. All 64 Louisiana parishes.<br />
            No hourly billing. No surprises. Just results.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 text-sm uppercase tracking-widest font-semibold"
            style={{ background: gold, color: "oklch(0.15 0.04 240)", fontFamily: "'DM Mono', monospace" }}
          >
            Get a Free Quote →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
