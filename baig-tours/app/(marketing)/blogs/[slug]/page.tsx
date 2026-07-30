import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="pt-28">
      <div className="container-app">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-gold-600">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-gold-600">Blogs</Link>
          <span>/</span>
          <span className="text-ink">{post.title}</span>
        </nav>

        <span className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-wide text-gold-600">
          {post.category}
        </span>
        <h1 className="mt-3 max-w-3xl font-display text-3xl text-charcoal-950 md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <Image
            src={post.authorAvatar}
            alt={post.author}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div className="text-sm">
            <div className="font-semibold text-charcoal-950">{post.author}</div>
            <div className="text-ink-muted">{post.date} · {post.readTime}</div>
          </div>
        </div>
      </div>

      <div className="container-app relative mt-10 aspect-[16/8] overflow-hidden rounded-xl2">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="container-app mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
        <div className="prose-none max-w-2xl space-y-6 text-[15px] leading-relaxed text-ink">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <aside className="h-fit rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6">
          <h2 className="font-display text-lg text-charcoal-950">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-muted">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <div className="container-app mt-16 border-t border-charcoal-900/8 py-16">
          <h2 className="font-display text-2xl text-charcoal-950">More From The Journal</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {more.map((p) => (
              <Link key={p.id} href={`/blogs/${p.slug}`} className="group flex gap-4 rounded-xl2 bg-cream-100 p-3 shadow-card">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-base leading-snug text-charcoal-950 group-hover:text-gold-600">
                    {p.title}
                  </h3>
                  <span className="mt-1 block text-xs text-ink-muted">{p.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
