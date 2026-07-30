import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Compass, HeartHandshake, Award } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatsBand } from "@/components/home/stats-band";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story, values and team behind Pakistan Baig Tours.",
};

const values = [
  { icon: Shield, title: "Trusted & Safe", text: "Licensed drivers, vetted guides and 24/7 on-trip support for every group." },
  { icon: Compass, title: "Local Expertise", text: "Every itinerary is built by guides who grew up in the valleys they lead you through." },
  { icon: HeartHandshake, title: "Community First", text: "We hire and source locally so tourism income stays in the communities we visit." },
  { icon: Award, title: "Premium Service", text: "From airport pickup to the final photo stop, every detail is planned in advance." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Baig Tours Pakistan"
        description="Nine years of turning Northern Pakistan's most remote roads into the safest, most memorable trips our travelers take."
        image="https://picsum.photos/seed/about-header/1800/700"
      />

      <section className="bg-cream py-20">
        <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How We Started"
              title="Trips that make stories, since day one"
              description="Baig Tours Pakistan began with a simple frustration: too many travelers were seeing the north through rushed, one-size-fits-all group tours. We started with a single jeep and a route through Hunza — today we run curated journeys across Gilgit-Baltistan, Khyber Pakhtunkhwa and Punjab, still with the same promise: every trip is planned like it's for our own family."
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://picsum.photos/seed/about-team/1000/800"
              alt="Baig Tours guide team in Northern Pakistan"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-app grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="/images/ceo-abdullah-baig.jpg"
              alt="Abdullah Baig, CEO of Baig Tours Pakistan"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <span className="eyebrow text-gold-600">
              <span className="h-px w-8 bg-gold-600" /> A Word From Our Founder
            </span>
            <blockquote className="mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
              &ldquo;We built Baig Tours around one idea — trusted, comfortable
              travel that treats every guest like a returning friend, not a
              booking number.&rdquo;
            </blockquote>
            <p className="mt-6 font-semibold text-ink">Abdullah Baig</p>
            <p className="text-sm text-ink-muted">CEO, Baig Tours Pakistan</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-200 py-20">
        <div className="container-app">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Values that shape every itinerary"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl2 bg-cream-100 p-7 shadow-card">
                <v.icon size={26} className="text-gold-600" />
                <h3 className="mt-4 font-display text-lg text-charcoal-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
    </>
  );
}
