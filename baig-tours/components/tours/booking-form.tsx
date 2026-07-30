"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import type { Tour } from "@/types";

const schema = z.object({
  tourSlug: z.string().min(1, "Select a tour"),
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  travelDate: z.string().min(1, "Choose a travel date"),
  travelers: z.coerce.number().min(1).max(30),
  notes: z.string().optional(),
});
type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function BookingForm({ tours, preselectedSlug }: { tours: Tour[]; preselectedSlug?: string }) {
  const [confirmed, setConfirmed] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tourSlug: preselectedSlug ?? "", travelers: 2 },
  });

  const selectedTour = tours.find((t) => t.slug === watch("tourSlug"));

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to submit booking");
      }
      setConfirmed(values);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  if (confirmed) {
    const tour = tours.find((t) => t.slug === confirmed.tourSlug);
    return (
      <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-10 text-center shadow-card">
        <CheckCircle2 size={44} className="mx-auto text-emerald" />
        <h2 className="mt-4 font-display text-2xl text-charcoal-950">
          Booking request received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          Thanks {confirmed.fullName.split(" ")[0]} — a Baig Tours travel
          consultant will confirm availability for{" "}
          <strong className="text-charcoal-950">{tour?.title}</strong> and
          contact you at {confirmed.phone} within a few hours.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-xl bg-cream-200 p-5 text-left text-sm">
          <div className="flex justify-between py-1"><span className="text-ink-muted">Travel date</span><span className="font-medium">{confirmed.travelDate}</span></div>
          <div className="flex justify-between py-1"><span className="text-ink-muted">Travelers</span><span className="font-medium">{confirmed.travelers}</span></div>
          {tour && <div className="flex justify-between py-1"><span className="text-ink-muted">Est. total</span><span className="font-medium">{formatPKR(tour.price * confirmed.travelers)}</span></div>}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-8 shadow-card"
      noValidate
    >
      <div>
        <label htmlFor="tourSlug" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Choose a Tour
        </label>
        <select
          id="tourSlug"
          {...register("tourSlug")}
          className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none"
        >
          <option value="">Select a tour</option>
          {tours.map((t) => (
            <option key={t.id} value={t.slug}>{t.title}</option>
          ))}
        </select>
        {errors.tourSlug && <p className="mt-1 text-xs text-danger">{errors.tourSlug.message}</p>}
      </div>

      {selectedTour && (
        <div className="rounded-xl bg-gold-50 p-4 text-sm text-charcoal-950">
          <strong>{selectedTour.title}</strong> · {selectedTour.duration} ·{" "}
          {formatPKR(selectedTour.price)} per person
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Full Name</label>
          <input id="fullName" {...register("fullName")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" placeholder="Ayesha Raza" />
          {errors.fullName && <p className="mt-1 text-xs text-danger">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Phone Number</label>
          <input id="phone" {...register("phone")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" placeholder="+92 300 1234567" />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Email Address</label>
        <input id="email" type="email" {...register("email")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" placeholder="you@example.com" />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="travelDate" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Preferred Travel Date</label>
          <input id="travelDate" type="date" {...register("travelDate")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
          {errors.travelDate && <p className="mt-1 text-xs text-danger">{errors.travelDate.message}</p>}
        </div>
        <div>
          <label htmlFor="travelers" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Number of Travelers</label>
          <input id="travelers" type="number" min={1} max={30} {...register("travelers")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Special Requests (optional)</label>
        <textarea id="notes" rows={4} {...register("notes")} className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none" placeholder="Dietary needs, accessibility, celebration occasions..." />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Confirm Booking Request"} <ArrowRight size={16} />
      </Button>
    </form>
  );
}
