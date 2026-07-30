"use client";

import { WhatsAppIcon } from "@/components/ui/social-icons";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

export function WhatsAppButton() {
  const { socialMedia } = useSiteSettings();
  const phone = socialMedia.whatsapp;

  if (!phone) return null;

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
    >
      <WhatsAppIcon width={26} height={26} className="transition-transform duration-300 group-hover:scale-110" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-charcoal-900 px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
