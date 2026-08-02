import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types";

export function TravelBlogs({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-cream py-24">
      <div className="container-app">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="From The Journal"
            title="Stories, guides & field notes"
            description="Practical advice written by the guides who actually run these trips."
          />
          <Button href="/blogs" variant="outline" className="shrink-0">
            Read All Articles
          </Button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl2 bg-cream-100 shadow-card ring-1 ring-charcoal-900/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                  {post.category} · {post.readTime}
                </span>
                <h3 className="mt-2 font-display text-lg leading-snug text-charcoal-950 transition-colors group-hover:text-gold-600">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-xs font-medium text-ink-muted">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
