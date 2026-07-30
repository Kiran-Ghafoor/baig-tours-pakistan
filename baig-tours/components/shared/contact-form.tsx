"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  message: z.string().min(10, "Tell us a little more about your trip"),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to send message");
      }
      setSubmitted(true);
      reset();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 size={40} className="text-emerald" />
        <h3 className="mt-4 font-display text-xl text-charcoal-950">Message sent</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Thanks for reaching out — a Baig Tours travel consultant will contact you shortly.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Full Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none"
            placeholder="Ayesha Raza"
          />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone")}
            className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none"
            placeholder="+92 300 1234567"
          />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Tell us about your trip
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="mt-1.5 w-full rounded-lg border border-charcoal-900/15 bg-cream-100 px-4 py-3 text-sm focus:outline-none"
          placeholder="Dates, group size, destinations you have in mind..."
        />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
