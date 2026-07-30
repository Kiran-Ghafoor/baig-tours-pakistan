import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/shared/contact-form";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Baig Tours Pakistan to plan your next trip.",
};

export default async function ContactPage() {
  const { contact, googleMapsEmbed } = await getSiteSettings();

  const details = [
    contact.phone && { icon: Phone, label: "Call Us", value: contact.phone, href: `tel:+${contact.phone}` },
    contact.email && { icon: Mail, label: "Email Us", value: contact.email, href: `mailto:${contact.email}` },
    contact.address && { icon: MapPin, label: "Visit Us", value: contact.address },
    contact.workingHours && { icon: Clock, label: "Working Hours", value: `${contact.workingHours}. Departures: ${contact.departureDays}` },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHeader
        eyebrow="We'd Love To Hear From You"
        title="Contact Us"
        description="Questions about a route, a custom itinerary, or an existing booking — our team replies within a few hours."
        image="https://picsum.photos/seed/contact-header/1800/700"
      />
      <section className="bg-cream py-20">
        <div className="container-app grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl text-charcoal-950">Get in Touch</h2>
            <div className="mt-6 space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                    <d.icon size={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-ink-muted">{d.label}</div>
                    {d.href ? (
                      <a href={d.href} className="font-semibold text-charcoal-950 hover:text-gold-600">{d.value}</a>
                    ) : (
                      <p className="font-semibold text-charcoal-950">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {googleMapsEmbed && (
              <div className="mt-8 overflow-hidden rounded-xl2 border border-charcoal-900/8 shadow-card">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location on Google Maps"
                />
              </div>
            )}
          </div>

          <div className="rounded-xl2 border border-charcoal-900/8 bg-cream-100 p-8 shadow-card">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
