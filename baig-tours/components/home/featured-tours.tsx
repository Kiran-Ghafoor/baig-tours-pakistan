import { SectionHeading } from "@/components/shared/section-heading";
import { TourCard } from "@/components/tours/tour-card";
import { Button } from "@/components/ui/button";
import type { Tour, SectionHeading as SectionHeadingType } from "@/types";

export function FeaturedTours({
  tours,
  heading,
}: {
  tours: Tour[];
  heading: SectionHeadingType;
}) {
  return (
    <section className="bg-cream py-24" id="featured-tours">
      <div className="container-app">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
          <Button href="/tours" variant="outline" className="shrink-0">
            View All Tours
          </Button>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
