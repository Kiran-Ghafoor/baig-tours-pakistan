"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Destination } from "@/types";

export function PakistanMap({ destinations }: { destinations: Destination[] }) {
  const [active, setActive] = useState(destinations[0]?.id ?? "");
  const activeDest = destinations.find((d) => d.id === active) ?? destinations[0];

  if (!activeDest || destinations.length === 0) return null;

  return (
    <section className="bg-cream pt-24 pb-8">
      <div className="container-app">
        <SectionHeading
          eyebrow="Plan By Region"
          title="Find your route across Pakistan"
          description="Tap a marker to preview the region — every pin links through to its full destination guide."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Real map */}
          <div>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl2 shadow-card ring-1 ring-charcoal-900/10">
              <iframe
                src="https://www.google.com/maps?q=Gilgit-Baltistan,+Pakistan&z=8&output=embed"
                title="Real map showing Hunza, Skardu and Swat"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-2">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    active === d.id
                      ? "bg-gold-500 text-charcoal-950"
                      : "bg-cream-100 text-ink-muted ring-1 ring-charcoal-900/10 hover:bg-gold-500/20"
                  }`}
                  aria-label={`Show ${d.name} on map`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active destination preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-xl2 bg-cream-100 shadow-card ring-1 ring-charcoal-900/5"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={activeDest.image}
                  alt={activeDest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {activeDest.province}
                </span>
                <h3 className="mt-1 font-display text-2xl text-charcoal-950">
                  {activeDest.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {activeDest.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-charcoal-900/5 pt-4 text-sm">
                  <span className="text-ink-muted">
                    Best time:{" "}
                    <span className="font-medium text-charcoal-950">
                      {activeDest.bestTime}
                    </span>
                  </span>
                  <Link
                    href={`/destinations/${activeDest.slug}`}
                    className="font-semibold text-gold-600 hover:underline"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
