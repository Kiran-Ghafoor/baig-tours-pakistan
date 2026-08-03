import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/queries";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Travel Blogs",
  description: "Guides, packing lists and field notes from the Baig Tours Pakistan team.",
};

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();
  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title="Travel Blogs"
        description="Everything we've learned running trips across Northern Pakistan, written by the guides who run them."
        image="/images/baig_tours_nature4.jpg"
      />
      <section className="bg-cream py-16">
        <div className="container-app grid gap-8 lg:grid-cols-3">
          {blogPosts.map((post) => (
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
                <h2 className="mt-2 font-display text-lg leading-snug text-charcoal-950 transition-colors group-hover:text-gold-600">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-charcoal-900/5 pt-4 text-xs text-ink-muted">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
