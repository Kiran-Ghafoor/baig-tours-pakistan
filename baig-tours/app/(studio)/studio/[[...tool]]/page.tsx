"use client";

import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import config from "../../../../sanity/sanity.config";

export default function StudioPage({ params }: { params: { tool: string[] } }) {
  const router = useRouter();

  async function lockStudio() {
    await fetch("/api/studio-logout", { method: "POST" });
    router.push("/studio-login");
    router.refresh();
  }

  return (
    <div className="relative">
      <NextStudio config={config} />
      <button
        onClick={lockStudio}
        title="Lock studio"
        aria-label="Lock studio"
        className="absolute bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-900/10 bg-cream-100 text-charcoal-950 shadow-card transition hover:bg-red-50 hover:text-red-600"
      >
        <Lock size={16} />
      </button>
    </div>
  );
}
