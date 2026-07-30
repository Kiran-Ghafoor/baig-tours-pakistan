import type { Metadata } from "next";
import { destinations } from "@/data/content";
import { PageHeader } from "@/components/shared/page-header";
import { DestinationCard } from "@/components/tours/destination-card";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore Baig Tours Pakistan's covered regions across Gilgit-Baltistan, Khyber Pakhtunkhwa and Punjab.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="42 Regions Covered"
        title="Destinations"
        description="From glacial base camps to Mughal courtyards — pick a region to see everything we run there."
        image="https://picsum.photos/seed/destinations-header/1800/700"
      />
      <section className="bg-cream-200 py-16">
        <div className="container-app grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
