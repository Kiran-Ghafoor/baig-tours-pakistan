import type { Metadata } from "next";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { reviews } from "@/data/content";
import { Rating } from "@/components/ui/rating";

export const metadata: Metadata = { title: "Reviews" };

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-charcoal-950">Reviews</h1>
        <p className="text-sm text-ink-muted">{reviews.length} published reviews · avg. rating 4.9</p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="flex flex-col gap-4 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 shadow-card sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <Image src={r.avatar} alt={r.name} width={44} height={44} className="rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-charcoal-950">{r.name}</span>
                  <Rating value={r.rating} />
                </div>
                <p className="text-xs text-ink-muted">{r.location} · {r.tour} · {r.date}</p>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">{r.comment}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-emerald/30 px-3 py-2 text-xs font-semibold text-emerald hover:bg-emerald/5">
                <Check size={14} /> Approve
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/5">
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
