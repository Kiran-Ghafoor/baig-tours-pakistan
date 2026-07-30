"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to subscribe");
      }
      setSubmitted(true);
      reset();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gold-500 py-20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #1F2937 0, transparent 40%), radial-gradient(circle at 80% 60%, #1F2937 0, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="container-app relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span className="eyebrow text-charcoal-950/70">
            <span className="h-px w-8 bg-charcoal-950/50" /> Stay Inspired
          </span>
          <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight text-charcoal-950 md:text-4xl">
            Get first access to new routes & seasonal offers
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full rounded-full border border-charcoal-950/15 bg-cream-100 px-5 py-3.5 text-sm text-charcoal-950 placeholder:text-ink-muted focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 pl-2 text-xs text-charcoal-950/80">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-charcoal-900 px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal-700 hover:shadow-lg"
          >
            {submitted ? (
              <>
                <CheckCircle2 size={16} /> Subscribed
              </>
            ) : (
              <>
                <Send size={16} /> Subscribe
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
