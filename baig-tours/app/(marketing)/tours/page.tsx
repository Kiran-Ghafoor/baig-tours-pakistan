import type { Metadata } from "next";
import { categories } from "@/data/content";
import { getTours } from "@/lib/queries";
import { TourCard } from "@/components/tours/tour-card";
import { PageHeader } from "@/components/shared/page-header";
import { ToursFilterBar } from "@/components/tours/tours-filter-bar";

export const metadata: Metadata = {
  title: "All Tours",
  description:
    "Browse every Baig Tours Pakistan itinerary — from Hunza Valley luxury escapes to the K2 Base Camp expedition.",
};

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category;
  const tours = await getTours();
  const filtered = activeCategory
    ? tours.filter((t) => t.category === activeCategory)
    : tours;

  return (
    <>
      <PageHeader
        eyebrow="96 Curated Itineraries"
        title="All Tours"
        description="Every trip is run by Baig Tours' own guides — filter by the kind of journey you're after."
        image="https://picsum.photos/seed/tours-header/1800/700"
      />
      <section className="bg-cream py-16">
        <div className="container-app">
          <ToursFilterBar
            categories={categories.map((c) => c.name)}
            active={activeCategory}
          />
          <p className="mt-8 text-sm text-ink-muted">
            Showing {filtered.length} of {tours.length} tours
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="rounded-xl2 border border-dashed border-charcoal-900/15 p-16 text-center text-ink-muted">
              No tours match this category yet — check back soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
