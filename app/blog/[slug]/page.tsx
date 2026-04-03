import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | SureEdge Tax & Accounting`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = posts.filter(p => p.slug !== post.slug).slice(0, 3);

  // Convert markdown-style bold and paragraphs to JSX
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**") && block.indexOf("**", 2) === block.length - 2) {
        // Pure bold heading line
        const text = block.slice(2, -2);
        return (
          <h2 key={i} style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a", marginBottom: "12px", marginTop: "32px" }}>
            {text}
          </h2>
        );
      }
      // Regular paragraph — handle inline bold
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ fontSize: "15px", color: "#444", lineHeight: 1.85, marginBottom: "20px" }}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} style={{ color: "#1a2e4a", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Header bar */}
      <div style={{ background: "#1a2e4a", padding: "48px 44px 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "13px", textDecoration: "none", marginBottom: "24px" }}>
            ← Back to Blog
          </Link>
          <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px", background: "#b8962e", color: "#fff" }}>
            {post.category}
          </div>
          <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: "16px", maxWidth: "760px" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", paddingBottom: "40px" }}>
            {post.date} · SureEdge Tax & Accounting
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#faf9f6", padding: "56px 44px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "64px", alignItems: "start" }}>

          {/* Article body */}
          <article>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.85, marginBottom: "28px", fontStyle: "italic", borderLeft: "3px solid #b8962e", paddingLeft: "16px" }}>
              {post.excerpt}
            </p>
            {renderContent(post.content)}
          </article>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "80px" }}>
            {/* CTA box */}
            <div style={{ background: "#1a2e4a", borderRadius: "12px", padding: "28px", marginBottom: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Ready to get started?</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "20px" }}>
                Book a free 30-minute consultation with a licensed CPA or EA. No commitment required.
              </p>
              <Link href="/booking" style={{ display: "block", textAlign: "center", background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 700, padding: "12px 20px", borderRadius: "7px", textDecoration: "none" }}>
                Book a Free Call
              </Link>
              <Link href="/tax-intake" style={{ display: "block", textAlign: "center", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 500, padding: "10px 20px", borderRadius: "7px", textDecoration: "none", marginTop: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>
                Get a Quote
              </Link>
            </div>

            {/* Other posts */}
            <div style={{ background: "white", borderRadius: "12px", padding: "24px", border: "1px solid #f0ede6" }}>
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                More Articles
              </div>
              {otherPosts.map(p => (
                <div key={p.slug} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "10px", color: "#b8962e", fontWeight: 500, marginBottom: "4px" }}>{p.category}</div>
                  <Link href={`/blog/${p.slug}`} style={{ fontSize: "13px", fontWeight: 500, color: "#1a2e4a", textDecoration: "none", lineHeight: 1.4, display: "block" }}>
                    {p.title}
                  </Link>
                </div>
              ))}
              <Link href="/blog" style={{ fontSize: "12px", fontWeight: 600, color: "#b8962e", textDecoration: "none" }}>
                View all articles →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
