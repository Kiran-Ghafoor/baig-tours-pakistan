"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { reviews } from "@/data/content";
import { SectionHeading } from "@/components/shared/section-heading";
import { Rating } from "@/components/ui/rating";
import { Reveal } from "@/components/shared/reveal";

export function CustomerReviews() {
  return (
    <section className="bg-cream py-24">
      <div className="container-app">
        <SectionHeading
          eyebrow="Traveler Stories"
          title="Loved by thousands of Pakistani travelers"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-xl2 border border-gold-500/10 bg-white p-7 shadow-card">
                <Quote className="text-gold-400/50" size={28} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                  &ldquo;{r.comment}&rdquo;
                </blockquote>
                <Rating value={r.rating} className="mt-5" />
                <figcaption className="mt-4 flex items-center gap-3 border-t border-charcoal-900/5 pt-4">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {r.name}
                    </div>
                    <div className="text-xs text-ink-muted">
                      {r.location} · {r.tour}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
