import type { Metadata } from "next";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { getGalleryImages } from "@/lib/queries";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photography from Baig Tours Pakistan trips across the Northern Areas.",
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryImages();

  return (
    <>
      <PageHeader
        eyebrow="Visual Journal"
        title="Gallery"
        description="Frames from real trips, shot by our guides and travelers across every region we run."
        image="/images/baig_tours_gallery_img.jpg"
      />
      <section className="bg-cream py-16">
        <div className="container-app columns-2 gap-4 sm:columns-3 lg:columns-4">
          {galleryItems.map((g, i) => (
            <div
              key={`${g.id}-${i}`}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl2"
            >
              <Image
                src={g.image}
                alt={g.caption}
                width={500}
                height={i % 3 === 0 ? 650 : 500}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-semibold text-cream">{g.caption}</span>
                <div className="mt-1 flex items-center justify-between text-xs text-cream/70">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {g.location}</span>
                  <span className="flex items-center gap-1"><Heart size={12} className="fill-gold-500 text-gold-500" /> {g.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
