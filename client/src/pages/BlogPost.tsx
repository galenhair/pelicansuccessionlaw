/*
 * PELICAN SUCCESSION LAW — Individual Blog Post Page
 * Southern Gothic Modernism: Deep navy, gold accents, Cormorant + DM Sans
 */
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getBlogPost, getRelatedPosts } from "@/data/blogPosts";

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

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug);
  const related = post ? getRelatedPosts(params.slug, 3) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.18 0.04 240)" }}>
        <Nav />
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4" style={{ color: "oklch(0.97 0.01 80)" }}>Article Not Found</h1>
          <Link href="/blog" className="btn-gold rounded-none">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.18 0.04 240)" }}>
      <Nav />

      {/* Article Header */}
      <div className="pt-32 pb-12 relative overflow-hidden" style={{ background: "oklch(0.14 0.04 240)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        {post.featuredImage && (
          <div className="absolute inset-0" style={{ backgroundImage: `url(${post.featuredImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        )}
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/blog">
              <span className="font-mono-brand text-xs tracking-widest uppercase hover:text-[oklch(0.72_0.12_75)] transition-colors" style={{ color: "oklch(0.55 0.02 240)" }}>
                ← Blog
              </span>
            </Link>
            <span style={{ color: "oklch(0.35 0.02 240)" }}>·</span>
            <span
              className="text-xs font-mono-brand tracking-widest uppercase px-2 py-1"
              style={{ background: "oklch(0.22 0.04 240)", color: "oklch(0.72 0.12 75)" }}
            >
              {post.category}
            </span>
          </div>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "oklch(0.97 0.01 80)" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-6">
            <span className="font-mono-brand text-xs tracking-widest uppercase" style={{ color: "oklch(0.50 0.02 240)" }}>
              {post.publishDate}
            </span>
            <span style={{ color: "oklch(0.30 0.02 240)" }}>·</span>
            <span className="font-mono-brand text-xs tracking-widest uppercase" style={{ color: "oklch(0.50 0.02 240)" }}>
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeUp>
                {/* Excerpt */}
                <p
                  className="text-lg leading-relaxed mb-10 pb-10 font-medium italic"
                  style={{
                    color: "oklch(0.72 0.12 75)",
                    borderBottom: "1px solid oklch(1 0 0 / 10%)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Markdown Content */}
                <div className="blog-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </FadeUp>

              {/* CTA Box */}
              <FadeUp delay={100}>
                <div
                  className="mt-12 p-8"
                  style={{ background: "oklch(0.14 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                >
                  <div className="section-label mb-3">Free Consultation</div>
                  <h3 className="font-display font-semibold text-xl mb-3" style={{ color: "oklch(0.97 0.01 80)" }}>
                    Ready to Get Started?
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "oklch(0.60 0.02 240)", fontFamily: "'DM Sans', sans-serif" }}>
                    Contact Pelican Succession Law for a free consultation and a flat-fee quote within 24 hours. We serve all 64 Louisiana parishes.
                  </p>
                  <Link href="/contact" className="btn-gold rounded-none text-sm">
                    Get a Free Quote →
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeUp delay={150}>
                {/* Quick Facts */}
                <div
                  className="p-6 mb-8"
                  style={{ background: "oklch(0.20 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}
                >
                  <div className="section-label mb-4">Quick Facts</div>
                  <div className="space-y-4">
                    {[
                      { label: "Avg. Close Time", value: "14 Days" },
                      { label: "Pricing Model", value: "Flat Fee" },
                      { label: "Parishes Served", value: "All 64" },
                      { label: "Consultation", value: "Free" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
                        <span className="font-mono-brand text-xs tracking-widest uppercase" style={{ color: "oklch(0.50 0.02 240)" }}>
                          {item.label}
                        </span>
                        <span className="font-display font-semibold" style={{ color: "oklch(0.72 0.12 75)" }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact">
                    <button className="w-full mt-5 py-3 text-xs font-mono-brand tracking-widest uppercase transition-all duration-200" style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.18 0.04 240)" }}>
                      Start Now
                    </button>
                  </Link>
                </div>

                {/* Related Articles */}
                <div>
                  <div className="section-label mb-4">Related Articles</div>
                  <div className="space-y-4">
                    {related.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                        <div
                          className="p-4 group cursor-pointer transition-all duration-200 hover:border-[oklch(0.72_0.12_75/0.4)]"
                          style={{ background: "oklch(0.20 0.04 240)", border: "1px solid oklch(1 0 0 / 10%)" }}
                        >
                          <span
                            className="text-xs font-mono-brand tracking-widest uppercase block mb-2"
                            style={{ color: "oklch(0.72 0.12 75)" }}
                          >
                            {rp.category}
                          </span>
                          <p
                            className="text-sm font-display font-medium leading-snug group-hover:text-[oklch(0.72_0.12_75)] transition-colors"
                            style={{ color: "oklch(0.85 0.01 80)" }}
                          >
                            {rp.title}
                          </p>
                        </div>
                      </Link>
                    ))}
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
