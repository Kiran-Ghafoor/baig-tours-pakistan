import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BookingForm } from "@/components/tours/booking-form";
import { getTours } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Book a Tour",
  description: "Reserve your Baig Tours Pakistan itinerary in a few simple steps.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const params = await searchParams;
  const tours = await getTours();
  const preselected = tours.find((t) => t.slug === params.tour);

  return (
    <>
      <PageHeader
        eyebrow="Reserve Your Spot"
        title="Book a Tour"
        description="Tell us the trip you have in mind — our team confirms availability and follows up within a few hours."
        image="/images/baig_tours_nature2.jpg"
      />
      <section className="bg-cream py-20">
        <div className="container-app max-w-3xl">
          <BookingForm tours={tours} preselectedSlug={preselected?.slug} />
        </div>
      </section>
    </>
  );
}
