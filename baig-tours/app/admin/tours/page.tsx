import type { Metadata } from "next";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { tours } from "@/data/tours";
import { formatPKR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Manage Tours" };

export default function AdminToursPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal-950">Manage Tours</h1>
          <p className="text-sm text-ink-muted">{tours.length} tours published across 6 categories</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-charcoal-950 hover:bg-gold-600">
          <Plus size={16} /> Add New Tour
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div key={tour.id} className="overflow-hidden rounded-xl2 border border-charcoal-900/8 bg-cream-100 shadow-card">
            <div className="relative h-36 w-full">
              <Image src={tour.image} alt={tour.title} fill className="object-cover" />
              {tour.featured && <Badge className="absolute left-3 top-3" tone="gold">Featured</Badge>}
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">{tour.category}</span>
              <h3 className="mt-1 font-display text-base leading-snug text-charcoal-950">{tour.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-semibold text-charcoal-950">{formatPKR(tour.price)}</span>
                <span className="text-ink-muted">{tour.bookedCount} booked</span>
              </div>
              <div className="mt-4 flex gap-2 border-t border-charcoal-900/5 pt-4">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-charcoal-900/10 py-2 text-xs font-semibold text-charcoal-900 hover:border-gold-500">
                  <Pencil size={13} /> Edit
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-danger/20 py-2 text-xs font-semibold text-danger hover:bg-danger/5">
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
