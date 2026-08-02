import type { Metadata } from "next";
import Link from "next/link";
import { getTours, getDestinations } from "@/lib/queries";
import { TourCard } from "@/components/tours/tour-card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Search Results",
  robots: { index: false, follow: true },
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; month?: string; travelers?: string }>;
}) {
  const params = await searchParams;
  const [destinations, tours] = await Promise.all([getDestinations(), getTours()]);
  const dest = destinations.find((d) => d.slug === params.destination);

  const results = dest
    ? tours.filter((t) =>
        t.destination.toLowerCase().includes(dest.name.split(" ")[0].toLowerCase())
      )
    : tours;

  return (
    <>
      <PageHeader
        eyebrow="Search Results"
        title={dest ? `Tours in ${dest.name}` : "All Matching Tours"}
        description={
          params.month
            ? `Showing availability for ${params.month}${params.travelers ? ` · ${params.travelers} travelers` : ""}.`
            : "Browse every tour that matches your search."
        }
        image={dest?.image ?? "https://picsum.photos/seed/search-header/1800/700"}
      />
      <section className="bg-cream py-16">
        <div className="container-app">
          <p className="text-sm text-ink-muted">
            {results.length} {results.length === 1 ? "tour" : "tours"} found
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((t, i) => (
              <TourCard key={t.id} tour={t} index={i} />
            ))}
          </div>
          {results.length === 0 && (
            <div className="rounded-xl2 border border-dashed border-charcoal-900/15 p-16 text-center text-ink-muted">
              No exact matches yet.{" "}
              <Link href="/tours" className="font-semibold text-gold-600">
                Browse all tours
              </Link>{" "}
              instead.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
