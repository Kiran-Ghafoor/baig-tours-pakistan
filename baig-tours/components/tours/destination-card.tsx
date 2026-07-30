"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Destination } from "@/types";

export function DestinationCard({
  destination,
  index = 0,
}: {
  destination: Destination;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="group relative block h-80 overflow-hidden rounded-xl2"
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-summit-gradient" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest2 text-gold-400">
            {destination.tourCount} Tours
          </span>
          <div className="mt-1 flex items-center justify-between">
            <h3 className="font-display text-xl text-cream">
              {destination.name}
            </h3>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-all group-hover:bg-gold-500 group-hover:text-charcoal-950">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
