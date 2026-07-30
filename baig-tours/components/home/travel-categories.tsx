"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mountain, Footprints, Gem, Users, Landmark, Heart } from "lucide-react";
import { categories } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";

const iconMap = {
  Mountain,
  Footprints,
  Gem,
  Users,
  Landmark,
  Heart,
} as const;

export function TravelCategories() {
  return (
    <section className="bg-cream-200 py-24">
      <div className="container-app">
        <SectionHeading
          eyebrow="Travel Your Way"
          title="Six ways to experience Pakistan"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Mountain;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={`/tours?category=${cat.name}`}
                  className="group flex items-center gap-5 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-card"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-charcoal-950">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-charcoal-950">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      {cat.description}
                    </p>
                    <span className="mt-1 inline-block text-xs font-semibold text-gold-600">
                      {cat.count} tours
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
