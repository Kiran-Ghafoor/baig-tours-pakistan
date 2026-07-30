"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";
import { Tour } from "@/types";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { formatPKR } from "@/lib/utils";

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-xl2 bg-cream-100 shadow-card ring-1 ring-charcoal-900/5 transition-shadow hover:shadow-card-hover"
    >
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
        {tour.tag && (
          <Badge className="absolute left-4 top-4" tone="gold">
            {tour.tag}
          </Badge>
        )}
        {tour.originalPrice && (
          <Badge className="absolute right-4 top-4" tone="emerald">
            Save {formatPKR(tour.originalPrice - tour.price)}
          </Badge>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-cream">
          <MapPin size={13} className="text-gold-400" />
          {tour.destination}, {tour.region}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Rating value={tour.rating} count={tour.reviewCount} />
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-display text-lg leading-snug text-charcoal-950 transition-colors group-hover:text-gold-600">
            {tour.title}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {tour.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {tour.groupSize}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-charcoal-900/5 pt-4">
          <div>
            <span className="text-[11px] uppercase tracking-wide text-ink-muted">
              From
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl text-charcoal-950">
                {formatPKR(tour.price)}
              </span>
              {tour.originalPrice && (
                <span className="text-xs text-ink-muted line-through">
                  {formatPKR(tour.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/tours/${tour.slug}`}
            className="rounded-full bg-charcoal-950 px-4 py-2 text-xs font-semibold text-cream transition-colors group-hover:bg-gold-500 group-hover:text-charcoal-950"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
