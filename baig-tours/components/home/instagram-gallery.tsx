"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/ui/social-icons";
import { SectionHeading } from "@/components/shared/section-heading";
import { useSiteSettings } from "@/components/providers/site-settings-provider";
import type { GalleryItem } from "@/types";

export function InstagramGallery({ galleryItems }: { galleryItems: GalleryItem[] }) {
  const { socialMedia } = useSiteSettings();
  const instagramUrl = socialMedia.instagram || "#";

  return (
    <section className="bg-cream py-24">
      <div className="container-app">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="@baigtour_pakistan_"
            title="Follow the journey on Instagram"
            description="Real moments from real trips — tag @baigtour_pakistan_ to be featured."
          />
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full border border-charcoal-900/15 px-5 py-2.5 text-sm font-semibold text-charcoal-900 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            <InstagramIcon width={16} height={16} /> Follow Us
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {galleryItems.map((g) => (
            <Link
              href="/gallery"
              key={g.id}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={g.image}
                alt={g.caption}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-charcoal-950/0 p-2 opacity-0 transition-all group-hover:bg-charcoal-950/50 group-hover:opacity-100">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-cream">
                  <Heart size={12} className="fill-gold-500 text-gold-500" />
                  {g.likes}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
