"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function StudioLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/studio-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Invalid password");
      }

      router.push("/studio");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-8 shadow-card"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15">
          <Lock size={22} className="text-gold-600" />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl text-charcoal-950">
          Studio Access
        </h1>
        <p className="mt-1 text-center text-sm text-ink-muted">
          Enter the password to open the CMS.
        </p>

        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
          className="mt-6 w-full rounded-lg border border-charcoal-900/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-gold-500"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="mt-3 w-full rounded-lg border border-charcoal-900/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-gold-500"
        />

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-gold-500 py-2.5 font-semibold text-charcoal-950 transition hover:bg-gold-400 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Unlock Studio"}
        </button>
      </form>
    </div>
  );
}
