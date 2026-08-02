"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import type { Destination } from "@/types";

const searchSchema = z.object({
  destination: z.string().min(1, "Choose a destination"),
  month: z.string().min(1, "Pick a month"),
  travelers: z.string().min(1),
});

type SearchValues = z.infer<typeof searchSchema>;

const months = [
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
];

export function SmartSearch({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { destination: "", month: "", travelers: "2" },
  });

  const onSubmit = (values: SearchValues) => {
    const params = new URLSearchParams(values as Record<string, string>);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-20 -mt-20 px-5 md:-mt-16">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit(onSubmit)}
        className="container-app grid gap-4 rounded-xl2 border border-gold-500/15 bg-white/90 p-6 shadow-lg backdrop-blur-xl md:grid-cols-[1.2fr_1fr_0.8fr_auto] md:p-4"
        aria-label="Search for a tour"
      >
        <label className="flex flex-col gap-1 rounded-xl bg-cream-100 px-4 py-2 md:border-r md:border-charcoal-900/10">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            <MapPin size={13} className="text-gold-600" /> Destination
          </span>
          <select
            {...register("destination")}
            className="bg-transparent text-sm font-medium text-charcoal-950 focus:outline-none"
          >
            <option value="">Where to?</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.destination && (
            <span className="text-xs text-danger">
              {errors.destination.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 rounded-xl bg-cream-100 px-4 py-2 md:border-r md:border-charcoal-900/10">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            <CalendarDays size={13} className="text-gold-600" /> Travel Month
          </span>
          <select
            {...register("month")}
            className="bg-transparent text-sm font-medium text-charcoal-950 focus:outline-none"
          >
            <option value="">Any month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 rounded-xl bg-cream-100 px-4 py-2">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            <Users size={13} className="text-gold-600" /> Travelers
          </span>
          <select
            {...register("travelers")}
            className="bg-transparent text-sm font-medium text-charcoal-950 focus:outline-none"
          >
            {["1", "2", "3", "4", "5+"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "Traveler" : "Travelers"}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-charcoal-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-lg md:px-8"
        >
          <Search size={16} /> Search
        </button>
      </motion.form>
    </div>
  );
}
