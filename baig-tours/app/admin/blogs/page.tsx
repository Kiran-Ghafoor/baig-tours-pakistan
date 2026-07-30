import type { Metadata } from "next";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = { title: "Manage Blogs" };

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal-950">Manage Blogs</h1>
          <p className="text-sm text-ink-muted">{blogPosts.length} articles published</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-charcoal-950 hover:bg-gold-600">
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-charcoal-900/8 bg-cream-100 shadow-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-charcoal-900/8 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Article</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Published</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((p) => (
              <tr key={p.id} className="border-b border-charcoal-900/5 last:border-0 hover:bg-cream-200/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-charcoal-950 line-clamp-2 max-w-xs">{p.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-ink-muted">{p.category}</td>
                <td className="px-6 py-4 text-ink-muted">{p.author}</td>
                <td className="px-6 py-4 text-ink-muted">{p.date}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-900/10 text-charcoal-900 hover:border-gold-500" aria-label="Edit article">
                      <Pencil size={13} />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-danger/20 text-danger hover:bg-danger/5" aria-label="Delete article">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
