import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations } from "@/data/content";
import { tours } from "@/data/tours";
import { PageHeader } from "@/components/shared/page-header";
import { TourCard } from "@/components/tours/tour-card";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  return { title: dest.name, description: dest.description };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  const relatedTours = tours.filter(
    (t) => t.destination.toLowerCase().includes(dest.name.split(" ")[0].toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow={dest.province}
        title={dest.name}
        description={dest.description}
        image={dest.image}
      />
      <section className="container-app py-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-gold-600">Home</Link>
          <span>/</span>
          <Link href="/destinations" className="hover:text-gold-600">Destinations</Link>
          <span>/</span>
          <span className="text-ink">{dest.name}</span>
        </nav>

        <div className="grid gap-4 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-6 sm:grid-cols-3">
          <div>
            <span className="text-xs uppercase tracking-wide text-ink-muted">Best Time to Visit</span>
            <p className="mt-1 font-semibold text-charcoal-950">{dest.bestTime}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-ink-muted">Region</span>
            <p className="mt-1 font-semibold text-charcoal-950">{dest.region}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-ink-muted">Tours Available</span>
            <p className="mt-1 font-semibold text-charcoal-950">{dest.tourCount}</p>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl text-charcoal-950">
          Tours in {dest.name}
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTours.length > 0 ? (
            relatedTours.map((t, i) => <TourCard key={t.id} tour={t} index={i} />)
          ) : (
            <p className="text-ink-muted">
              New itineraries for {dest.name} are being finalized — browse{" "}
              <Link href="/tours" className="font-semibold text-gold-600">all tours</Link> in the meantime.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
