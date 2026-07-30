import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const reels = [
  { id: "re1", seed: "reel-hunza", title: "60 Seconds in Hunza" },
  { id: "re2", seed: "reel-deosai", title: "Camping in Deosai" },
  { id: "re3", seed: "reel-k2", title: "Approach to Concordia" },
  { id: "re4", seed: "reel-swat", title: "Chairlift at Malam Jabba" },
  { id: "re5", seed: "reel-naran", title: "Saif-ul-Malook at Dawn" },
  { id: "re6", seed: "reel-lahore", title: "A Day in Old Lahore" },
];

export function TravelReels() {
  return (
    <section className="bg-cream-200 py-24">
      <div className="container-app">
        <SectionHeading
          eyebrow="Watch Before You Book"
          title="Travel reels from the trail"
          description="Short-form clips shot by our guides on the exact routes you'll walk."
        />
      </div>
      <div className="container-app mt-10 flex gap-5 overflow-x-auto pb-4 no-scrollbar">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="group relative aspect-[9/16] w-52 shrink-0 overflow-hidden rounded-xl2 shadow-card sm:w-60"
          >
            <Image
              src={`https://picsum.photos/seed/${reel.seed}/500/900`}
              alt={reel.title}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/10 to-transparent" />
            <PlayCircle
              size={44}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/90 transition-transform group-hover:scale-110"
            />
            <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-cream">
              {reel.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
