"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function ToursFilterBar({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filter tours by category">
      <Link
        href="/tours"
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !active
            ? "border-gold-500 bg-gold-500 text-charcoal-950"
            : "border-charcoal-900/15 text-charcoal-900 hover:border-gold-500"
        )}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/tours?category=${encodeURIComponent(c)}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === c
              ? "border-gold-500 bg-gold-500 text-charcoal-950"
              : "border-charcoal-900/15 text-charcoal-900 hover:border-gold-500"
          )}
        >
          {c}
        </Link>
      ))}
    </div>
  );
}
