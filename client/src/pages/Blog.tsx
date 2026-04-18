/*
 * PELICAN SUCCESSION LAW — Blog Index Page
 * Southern Gothic Modernism: Deep navy, gold accents, Cormorant + DM Sans
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

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

const categories = ["All", "The Process", "Louisiana Law", "Pricing & Costs", "Real Estate", "Out-of-State Heirs"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featured = blogPosts[0];
  const rest = filtered.slice(activeCategory === "All" ? 1 : 0);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      {/* Page Header */}
      <div className="pt-32 pb-16" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <div className="container">
          <div className="section-label mb-4">Resources & Insights</div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)" }}>
            Louisiana Succession Law Blog
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
            Plain-language guides to Louisiana succession law — written for families, not lawyers.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container">

          {/* Category Filter */}
          <FadeUp>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 text-xs font-mono-brand tracking-widest uppercase transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "oklch(0.72 0.12 75)" : "oklch(0.22 0.04 240)",
                    color: activeCategory === cat ? "oklch(0.18 0.04 240)" : "oklch(0.60 0.02 240)",
                    border: activeCategory === cat ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(1 0 0 / 10%)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Featured Post (only when showing All) */}
          {activeCategory === "All" && (
            <FadeUp>
              <Link href={`/blog/${featured.slug}`}>
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-12 group cursor-pointer"
                  style={{ border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  {/* Featured image placeholder */}
                  <div
                    className="h-64 lg:h-auto min-h-48 flex items-end p-8"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.22 0.04 240) 0%, oklch(0.16 0.05 230) 100%)",
                      borderRight: "1px solid oklch(1 0 0 / 8%)",
                    }}
                  >
                    <div>
                      <div className="section-label mb-2">Featured Article</div>
                      <div
                        className="font-mono-brand text-xs tracking-widest uppercase"
                        style={{ color: "oklch(0.55 0.02 240)" }}
                      >
                        {featured.category} · {featured.readTime}
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-10 flex flex-col justify-between"
                    style={{ background: "oklch(0.20 0.04 240)" }}
                  >
                    <div>
                      <h2
                        className="font-display font-semibold text-2xl mb-4 leading-snug group-hover:text-[oklch(0.72_0.12_75)] transition-colors duration-200"
                        style={{ color: "oklch(0.97 0.01 80)" }}
                      >
                        {featured.title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                        {featured.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-brand text-xs tracking-widest uppercase" style={{ color: "oklch(0.50 0.02 240)" }}>
                        {featured.publishDate}
                      </span>
                      <span
                        className="text-xs font-medium uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-200"
                        style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Mono', monospace" }}
                      >
                        Read Article →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 60}>
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="h-full flex flex-col group cursor-pointer transition-all duration-200"
                    style={{
                      background: "oklch(0.20 0.04 240)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                    }}
                  >
                    {/* Card top accent */}
                    <div style={{ height: "3px", background: "oklch(0.72 0.12 75 / 0.3)" }} />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-mono-brand tracking-widest uppercase px-2 py-1"
                          style={{
                            background: "oklch(0.26 0.04 240)",
                            color: "oklch(0.72 0.12 75)",
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="font-mono-brand text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>
                          {post.readTime}
                        </span>
                      </div>
                      <h3
                        className="font-display font-semibold text-lg leading-snug mb-3 group-hover:text-[oklch(0.72_0.12_75)] transition-colors duration-200 flex-1"
                        style={{ color: "oklch(0.97 0.01 80)" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: "oklch(0.55 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {post.excerpt.substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
                        <span className="font-mono-brand text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>
                          {post.publishDate}
                        </span>
                        <span
                          className="text-xs font-medium group-hover:translate-x-1 transition-transform duration-200"
                          style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Mono', monospace" }}
                        >
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp delay={200}>
            <div className="mt-20 p-10 max-w-2xl" style={{ background: "oklch(0.14 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}>
              <div className="section-label mb-3">Ready to Start?</div>
              <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                Have Questions About Your Specific Situation?
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.65 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                Get a free, no-obligation consultation and a flat-fee quote within 24 hours.
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
