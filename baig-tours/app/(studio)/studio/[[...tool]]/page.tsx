"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import config from "../../../../sanity/sanity.config";

export default function StudioPage({ params }: { params: { tool: string[] } }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const res = await fetch("/api/studio/session", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data?.authenticated && (data?.role === "admin" || data?.role === "editor")) {
          setAuthorized(true);
        } else {
          router.replace("/studio-login");
        }
      } catch {
        if (!cancelled) router.replace("/studio-login");
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function lockStudio() {
    await fetch("/api/studio-logout", { method: "POST" });
    router.push("/studio-login");
    router.refresh();
  }

  if (authorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-ink-muted">Checking access...</p>
      </div>
    );
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
