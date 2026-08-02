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
    <section className="bg-cream py-24">
      <div className="container-app">
        <SectionHeading
          eyebrow="Plan By Region"
          title="Find your route across Pakistan"
          description="Tap a marker to preview the region — every pin links through to its full destination guide."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Stylized map canvas */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md rounded-xl2 bg-gradient-to-b from-charcoal-900 to-charcoal-950 p-6 shadow-card">
            <div className="absolute inset-6 rounded-[2rem] border border-gold-500/20" />
            <span className="eyebrow absolute left-6 top-6 text-gold-400">
              Northern Belt → South
            </span>
            {destinations.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${d.coordinates.x}%`, top: `${d.coordinates.y * 0.85 + 8}%` }}
                aria-label={`Show ${d.name} on map`}
              >
                <span
                  className={`block h-3.5 w-3.5 rounded-full ring-4 transition-all ${
                    active === d.id
                      ? "scale-125 bg-gold-500 ring-gold-500/30"
                      : "bg-cream/60 ring-cream/10 group-hover:bg-gold-400"
                  }`}
                />
                {active === d.id && (
                  <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-500 px-3 py-1 text-[10px] font-semibold text-charcoal-950">
                    {d.name}
                  </span>
                )}
              </button>
            ))}
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
