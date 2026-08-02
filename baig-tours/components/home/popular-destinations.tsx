import { SectionHeading } from "@/components/shared/section-heading";
import { DestinationCard } from "@/components/tours/destination-card";
import type { Destination } from "@/types";

export function PopularDestinations({ destinations }: { destinations: Destination[] }) {
  return (
    <section className="bg-cream-200 py-24">
      <div className="container-app">
        <SectionHeading
          eyebrow="Where To Next"
          title="Popular destinations across the north"
          description="Every valley has its own season, story and pace — here are the eight our travelers return to most."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 8).map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
