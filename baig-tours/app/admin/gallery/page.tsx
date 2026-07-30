import type { Metadata } from "next";
import Image from "next/image";
import { UploadCloud, Trash2, Heart } from "lucide-react";
import { galleryItems } from "@/data/content";

export const metadata: Metadata = { title: "Manage Gallery" };

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal-950">Manage Gallery</h1>
          <p className="text-sm text-ink-muted">{galleryItems.length} images live on the public gallery</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-charcoal-950 hover:bg-gold-600">
          <UploadCloud size={16} /> Upload Images
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryItems.map((g) => (
          <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl2">
            <Image src={g.image} alt={g.caption} fill className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-between bg-charcoal-950/0 p-3 opacity-0 transition-all group-hover:bg-charcoal-950/60 group-hover:opacity-100">
              <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-danger" aria-label="Delete image">
                <Trash2 size={13} />
              </button>
              <div className="text-xs text-cream">
                <p className="font-semibold">{g.caption}</p>
                <p className="mt-1 flex items-center gap-1 text-cream/70"><Heart size={11} /> {g.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
