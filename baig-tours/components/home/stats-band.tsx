"use client";

import { useCounter } from "@/hooks/use-counter";
import type { Stat } from "@/types";

function StatItem({ label, value }: { label: string; value: number }) {
  const { ref, value: animated } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-gold-600 md:text-5xl">
        {animated.toLocaleString()}
        <span className="text-ink/40">+</span>
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-widest2 text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function StatsBand({ stats }: { stats?: Stat[] }) {
  const defaultStats: Stat[] = [
    { label: "Happy Travelers", value: 24800 },
    { label: "Curated Tours", value: 96 },
    { label: "Destinations Covered", value: 42 },
    { label: "Years of Trust", value: 9 },
  ];
  const items = stats ?? defaultStats;

  return (
    <section className="border-y border-gold-500/15 bg-cream-300 py-14">
      <div className="container-app grid grid-cols-2 gap-8 md:grid-cols-4">
        {items.map((s) => (
          <StatItem key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
    </section>
  );
}
