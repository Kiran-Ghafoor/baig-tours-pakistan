import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  Gauge,
  MapPin,
  Check,
  X,
  CalendarDays,
} from "lucide-react";
import { getTours, getTourBySlug, getTourSlugs } from "@/lib/queries";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import { formatPKR } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.highlights[0],
    openGraph: { images: [tour.image] },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const tours = await getTours();
  const related = tours.filter((t) => t.id !== tour.id && t.category === tour.category).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="container-app flex items-center gap-2 pt-28 text-xs text-ink-muted"
      >
        <Link href="/" className="hover:text-gold-600">Home</Link>
        <span>/</span>
        <Link href="/tours" className="hover:text-gold-600">Tours</Link>
        <span>/</span>
        <span className="text-ink">{tour.title}</span>
      </nav>

      {/* Hero gallery */}
      <section className="container-app mt-6 grid gap-3 lg:grid-cols-4 lg:grid-rows-2">
        <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-xl2 lg:aspect-auto">
          <Image src={tour.image} alt={tour.title} fill className="object-cover" priority />
        </div>
        {tour.gallery.slice(0, 2).map((img, i) => (
          <div key={i} className="relative hidden aspect-[4/3] overflow-hidden rounded-xl2 lg:block">
            <Image src={img} alt={`${tour.title} photo ${i + 2}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      <section className="container-app mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        {/* Main content */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {tour.tag && <Badge tone="gold">{tour.tag}</Badge>}
            <Rating value={tour.rating} count={tour.reviewCount} />
          </div>
          <h1 className="mt-4 font-display text-3xl text-charcoal-950 md:text-4xl">
            {tour.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin size={14} className="text-gold-600" />
            {tour.destination}, {tour.region}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 sm:grid-cols-4">
            {[
              { icon: Clock, label: "Duration", value: tour.duration },
              { icon: Users, label: "Group Size", value: tour.groupSize },
              { icon: Gauge, label: "Difficulty", value: tour.difficulty },
              { icon: CalendarDays, label: "Booked", value: `${tour.bookedCount}+ times` },
            ].map((item) => (
              <div key={item.label}>
                <item.icon size={18} className="text-gold-600" />
                <div className="mt-2 text-xs text-ink-muted">{item.label}</div>
                <div className="text-sm font-semibold text-charcoal-950">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-charcoal-950">Trip Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-charcoal-950">Day-by-Day Itinerary</h2>
            <ol className="mt-6 space-y-6 border-l border-charcoal-900/10 pl-6">
              {tour.itinerary.map((day) => (
                <li key={day.day} className="relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-charcoal-950">
                    {day.day}
                  </span>
                  <h3 className="font-semibold text-charcoal-950">{day.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{day.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl text-charcoal-950">What&apos;s Included</h2>
              <ul className="mt-4 space-y-2.5">
                {tour.included.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald" /> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl text-charcoal-950">Not Included</h2>
              <ul className="mt-4 space-y-2.5">
                {tour.excluded.map((exc) => (
                  <li key={exc} className="flex items-start gap-2 text-sm text-ink-muted">
                    <X size={15} className="mt-0.5 shrink-0 text-danger" /> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky booking card */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-7 shadow-card">
            <span className="text-xs uppercase tracking-wide text-ink-muted">Starting from</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-3xl text-charcoal-950">
                {formatPKR(tour.price)}
              </span>
              {tour.originalPrice && (
                <span className="text-sm text-ink-muted line-through">
                  {formatPKR(tour.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-ink-muted">per person, twin-sharing</span>

            <Button href={`/booking?tour=${tour.slug}`} size="lg" className="mt-6 w-full">
              Book This Tour
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="mt-3 w-full">
              Ask a Question
            </Button>

            <div className="mt-6 space-y-3 border-t border-charcoal-900/10 pt-6 text-sm text-ink-muted">
              <div className="flex justify-between"><span>Duration</span><span className="font-medium text-charcoal-950">{tour.duration}</span></div>
              <div className="flex justify-between"><span>Group size</span><span className="font-medium text-charcoal-950">{tour.groupSize}</span></div>
              <div className="flex justify-between"><span>Difficulty</span><span className="font-medium text-charcoal-950">{tour.difficulty}</span></div>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-app mt-20 border-t border-charcoal-900/8 pt-16">
          <h2 className="font-display text-2xl text-charcoal-950">You Might Also Like</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t, i) => (
              <TourCard key={t.id} tour={t} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
