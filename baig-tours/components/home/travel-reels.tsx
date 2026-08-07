"use client";

import Image from "next/image";
import { PlayCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";

export type Reel = {
  id: string;
  src: string;
  poster: string;
  video: string;
  title: string;
};

export const reels: Reel[] = [
  {
    id: "re1",
    src: "/images/baig_tours_packages1.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786005576/baig_tours_video01_jvjq4p.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786005576/baig_tours_video01_jvjq4p.mp4",
    title: "Unforgettable moments on the pipeline Track with our Valued guests ❤️",
  },
  {
    id: "re2",
    src: "/images/baig_tours_gallery_img2.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786007933/baig_tours_video2_cttqec.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786007933/baig_tours_video2_cttqec.mp4",
    title: "Customized 2 Days muree trip 😃",
  },
  {
    id: "re3",
    src: "/images/baig_tours_gallery_img7.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786011857/baig_tours_video3_hr4fmk.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786011857/baig_tours_video3_hr4fmk.mp4",
    title: "When your friends go on a Trip with you 😂",
  },
  {
    id: "re5",
    src: "/images/baig_tours_gallery_img5.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786011939/baig_tours_video5_hzzkyp.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786011939/baig_tours_video5_hzzkyp.mp4",
    title: "Let the Adventure begin with Baig Tours Pakistan.🚌😁",
  },
  {
    id: "re6",
    src: "/images/baig_tours_gallery_img6.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786011979/baig_tours_video6_drcvvx.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786011979/baig_tours_video6_drcvvx.mp4",
    title: "Mushkpuri Top - 1Day Trip🎉",
  },
  {
    id: "re7",
    src: "/images/baig_tours_gallery_img4.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786012105/baig_tours_video7_bqmdil.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786012105/baig_tours_video7_bqmdil.mp4",
    title: "Old Songs & this View🔥😍",
  },
  {
    id: "re8",
    src: "/images/baig_tours_gallery_img5.jpg",
    poster: "https://res.cloudinary.com/x03sixja/video/upload/v1786014720/baig_tours_video_8_sfvpyc.jpg",
    video: "https://res.cloudinary.com/x03sixja/video/upload/v1786014720/baig_tours_video_8_sfvpyc.mp4",
    title: "11 Activities you should Do in Skardo & Hunza",
  },
];

export function ReelCard({ reel, onOpen }: { reel: Reel; onOpen?: (reel: Reel) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onCanPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("canplay", onCanPlay);
    video.play().catch(() => {});
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const handleClick = () => {
    if (onOpen) {
      onOpen(reel);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div className="group relative aspect-[9/16] w-52 shrink-0 overflow-hidden rounded-xl2 shadow-card sm:w-60">
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        data-id={reel.id}
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/10 to-transparent" />
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Play ${reel.title}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        {!playing && (
          <PlayCircle
            size={44}
            className="text-cream/90 transition-transform group-hover:scale-110"
          />
        )}
      </button>
      <span className="pointer-events-none absolute bottom-4 left-4 right-4 text-sm font-semibold text-cream">
        {reel.title}
      </span>
    </div>
  );
}

export function ReelLightbox({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!reel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal-950/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl2 bg-charcoal-950 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-base font-semibold text-cream">
            {reel.title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="rounded-full p-1.5 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <X size={24} />
          </button>
        </div>
        <video
          src={reel.video}
          poster={reel.poster}
          controls
          autoPlay
          loop
          playsInline
          className="block max-h-[75vh] w-full bg-black object-contain"
        />
      </div>
    </div>
  );
}

export function TravelReels() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

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
          <ReelCard key={reel.id} reel={reel} onOpen={setActiveReel} />
        ))}
      </div>

      {activeReel && <ReelLightbox reel={activeReel} onClose={() => setActiveReel(null)} />}
    </section>
  );
}
