/*
 * PELICAN SUCCESSION LAW — FAQ Page
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

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms` }}>
      {children}
    </div>
  );
}

const faqs = [
  {
    q: "What is a Louisiana succession?",
    a: "A Louisiana succession is the legal process of transferring a deceased person's assets to their heirs. Because Louisiana operates under a civil law system (unique in the United States), the process is different from probate in other states. It involves filing a Petition for Possession with the local parish court, which results in a Judgment of Possession — the legal order that transfers ownership of the assets.",
  },
  {
    q: "Do I need a succession if there is no real estate?",
    a: "Not always. If the estate consists only of bank accounts and the total value is under $125,000, Louisiana law allows for a Small Succession Affidavit — a simplified process that does not require court involvement. We can advise you on whether a formal succession is necessary for your situation at no charge.",
  },
  {
    q: "How long does a Louisiana succession take?",
    a: "For uncontested successions, our average close time is 14 business days from the date we receive all required documents. The timeline depends primarily on how quickly you can provide the certified death certificate and other documents, and how quickly the parish court processes the filing. Some courts are faster than others.",
  },
  {
    q: "What is a Judgment of Possession?",
    a: "The Judgment of Possession is the court order that legally transfers ownership of the deceased's assets to the heirs. It is the document you will need to provide to the bank to unfreeze accounts, to the title company to sell real estate, or to any other institution that holds the decedent's assets.",
  },
  {
    q: "What is forced heirship in Louisiana?",
    a: "Louisiana is the only state in the United States with forced heirship laws. These laws require a parent to leave a portion of their estate (called the 'forced portion') to children who are under 24 years old or who are permanently incapacitated — regardless of what the will says. If a will attempts to disinherit a forced heir, the forced heir can challenge it. We analyze every succession for forced heirship implications.",
  },
  {
    q: "What is usufruct and how does it affect my succession?",
    a: "Usufruct is a Louisiana legal concept that gives a surviving spouse the right to use and enjoy the deceased spouse's half of the community property during the surviving spouse's lifetime. The children receive 'naked ownership' — meaning they own the property but cannot use or sell it until the usufruct ends. This is a default rule under Louisiana intestate succession law and must be addressed in the Judgment of Possession.",
  },
  {
    q: "I live outside Louisiana but inherited property there. Can you help?",
    a: "Yes. We handle ancillary successions for out-of-state heirs regularly. If you live in Texas, Florida, Georgia, or anywhere else and inherited Louisiana real estate or mineral interests, we can handle the entire succession process remotely — by phone, email, and e-signature. You only need to sign one notarized document, which you can do at any notary near you.",
  },
  {
    q: "What documents do I need to start a succession?",
    a: "The core documents are: (1) a certified copy of the death certificate from the Louisiana Vital Records Registry, (2) the original Last Will and Testament if one exists, (3) the deed or tax assessment for any real estate, and (4) basic information about the heirs (names, addresses, and relationship to the deceased). We will send you a complete checklist after your free consultation.",
  },
  {
    q: "Can you handle a succession if the deceased left a will?",
    a: "Yes. We handle both testate successions (with a will) and intestate successions (without a will). If a will exists, we analyze it for validity under Louisiana law, check for forced heirship issues, and incorporate its terms into the Petition for Possession.",
  },
  {
    q: "What if the heirs disagree about the estate?",
    a: "We handle uncontested successions only. If there is a dispute between heirs — about the validity of the will, the value of assets, or the distribution of the estate — the matter becomes contested and requires litigation. We can refer you to qualified litigation counsel if needed.",
  },
  {
    q: "How do you handle court filing fees?",
    a: "Court filing fees are not included in our flat fee. They vary by parish but typically range from $150 to $350. We advance the filing fee on your behalf and bill it to you at cost — no markup.",
  },
  {
    q: "Do I need to come to your office?",
    a: "No. We handle successions entirely remotely for clients throughout Louisiana and across the country. Everything is done by phone, email, and e-signature. The only in-person step is signing the Verification in front of a notary, which you can do at any notary public near you.",
  },
  {
    q: "What is the difference between a succession and a trust?",
    a: "A succession is a court-supervised process that transfers assets after death when no trust exists. A trust is a planning tool that allows assets to pass to beneficiaries without going through court. If the deceased had a properly funded revocable living trust, a succession may not be necessary for those assets. We can help you determine whether a succession is required.",
  },
  {
    q: "How do I get started?",
    a: "Call us, fill out our online intake form, or send us an email. We will respond within 2 business hours with a flat-fee quote and a list of the documents we need to get started. There is no obligation and no charge for the initial consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      <div className="pt-32 pb-16" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <div className="container">
          <div className="section-label mb-4">Frequently Asked Questions</div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}>
            Louisiana Succession FAQ
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
            Answers to the most common questions about Louisiana successions, our process, and our pricing.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 30}>
                <div style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
                  <button
                    className="w-full text-left py-6 flex justify-between items-start gap-6"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span
                      className="font-display font-semibold text-lg leading-snug"
                      style={{ color: "oklch(0.97 0.01 80)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 mt-1 font-mono-brand text-lg transition-transform duration-200"
                      style={{
                        color: "oklch(0.72 0.12 75)",
                        transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openIndex === i && (
                    <div
                      className="pb-6 text-base leading-relaxed"
                      style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-16 max-w-2xl p-10" style={{ background: "oklch(0.14 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}>
              <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                Still Have Questions?
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                Call us or fill out our contact form. We respond within 2 business hours.
              </p>
              <Link href="/contact" className="btn-gold rounded-none">
                Contact Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
