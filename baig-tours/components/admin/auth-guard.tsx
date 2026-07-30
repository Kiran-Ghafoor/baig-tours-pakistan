"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });
        if (!res.ok) throw new Error("Not authenticated");
        setChecking(false);
      } catch {
        router.replace("/admin");
      }
    }
    check();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-200">
        <p className="text-sm text-ink-muted">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
