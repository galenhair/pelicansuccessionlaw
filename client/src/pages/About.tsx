/*
 * PELICAN SUCCESSION LAW — About Page
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

const values = [
  {
    title: "Transparency",
    desc: "You know exactly what your succession costs before you sign anything. No retainers, no hourly billing, no surprises. We believe clarity is a form of respect.",
  },
  {
    title: "Speed",
    desc: "Families shouldn't have to wait six months to access their inheritance. We built our process around document automation and focused expertise to close in 14 days.",
  },
  {
    title: "Louisiana Expertise",
    desc: "Louisiana's civil law system is unique in the United States. Forced heirship, usufruct, community property — we understand these concepts deeply and apply them precisely.",
  },
  {
    title: "Accessibility",
    desc: "We serve all 64 Louisiana parishes and handle successions entirely remotely. Whether you're in Shreveport or Houston, we can help.",
  },
];

const ABOUT_HERO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663214443274/zZlsblqubhUXVghc.jpg";

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${ABOUT_HERO})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div className="container">
          <div className="section-label mb-4">About the Firm</div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}>
            Built for Louisiana Families
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
            Pelican Succession Law was founded on a simple premise: Louisiana families deserve a better experience when navigating the legal process after losing a loved one.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <div>
                <div className="section-label mb-4">Our Mission</div>
                <h2 className="font-display font-semibold text-3xl mb-6" style={{ color: "oklch(0.97 0.01 80)" }}>
                  A Better Succession Experience
                </h2>
                <div className="space-y-5 text-base leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                  <p>
                    Traditional law firms treat Louisiana successions as hourly billing projects. Families are handed a retainer agreement, told to expect six months, and left to wonder what is happening with their case. The result is confusion, delay, and fees that often exceed what families were told to expect.
                  </p>
                  <p>
                    We built Pelican Succession Law to solve this problem. By combining deep expertise in Louisiana's unique civil law system with modern document automation and a flat-fee pricing model, we deliver a succession experience that is fast, transparent, and genuinely client-focused.
                  </p>
                  <p>
                    We serve all 64 Louisiana parishes and handle successions entirely remotely — by phone, email, and e-signature. Whether you are in Baton Rouge or Houston, we can help your family move forward.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <div className="space-y-5">
                {values.map((v, i) => (
                  <div
                    key={v.title}
                    className="p-6"
                    style={{
                      background: "oklch(0.22 0.04 240)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                      borderLeft: "2px solid oklch(0.72 0.12 75)",
                    }}
                  >
                    <h3 className="font-display font-semibold text-lg mb-2" style={{ color: "oklch(0.97 0.01 80)" }}>
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20" style={{ background: "oklch(0.15 0.04 240)" }}>
        <div className="container">
          <FadeUp>
            <div className="section-label mb-4">Our Approach</div>
            <h2 className="font-display font-semibold text-3xl mb-12" style={{ color: "oklch(0.97 0.01 80)" }}>
              Technology-Driven. Human-Centered.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Document Automation",
                desc: "We use legal document automation software to prepare the Petition for Possession and Descriptive List in hours, not days. This reduces errors and dramatically accelerates the process.",
              },
              {
                title: "Secure Client Portal",
                desc: "Every client gets access to a secure online portal where they can upload documents, track their case status, and communicate with our team — 24/7.",
              },
              {
                title: "Dedicated Case Management",
                desc: "Every succession is assigned a dedicated case manager who tracks the file from intake to delivery and proactively communicates status updates.",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 100}>
                <div
                  className="p-8 h-full"
                  style={{
                    background: "oklch(0.20 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  <div className="gold-rule mb-5" />
                  <h3 className="font-display font-semibold text-xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <FadeUp>
            <div className="max-w-2xl">
              <h2 className="font-display font-semibold text-3xl mb-4" style={{ color: "oklch(0.97 0.01 80)" }}>
                Ready to Work With Us?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                Get a free, no-obligation consultation and a flat-fee quote within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-gold rounded-none">Get a Free Quote</Link>
                <Link href="/pricing" className="btn-outline-gold rounded-none">View Pricing</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
