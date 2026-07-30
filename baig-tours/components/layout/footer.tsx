"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { MountainDivider } from "@/components/shared/mountain-divider";
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { useSiteSettings } from "@/components/providers/site-settings-provider";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "All Tours", href: "/tours" },
      { label: "Destinations", href: "/destinations" },
      { label: "Gallery", href: "/gallery" },
      { label: "Travel Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Tour", href: "/booking" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    title: "Popular Trips",
    links: [
      { label: "Hunza Valley", href: "/tours/hunza-valley-luxury-escape" },
      { label: "Skardu Adventure", href: "/tours/skardu-adventure-expedition" },
      { label: "K2 Base Camp", href: "/tours/k2-basecamp-concordia-trek" },
      { label: "Swat Family Tour", href: "/tours/swat-kalam-malam-jabba-family-tour" },
    ],
  },
];

const SOCIAL_ICON_MAP: Record<string, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
};

export function Footer() {
  const { companyName, logoUrl, footerDescription, contact, socialMedia, privacyPolicySlug, termsSlug } = useSiteSettings();

  const socialEntries = [
    { key: "facebook", href: socialMedia.facebook, label: "Facebook" },
    { key: "instagram", href: socialMedia.instagram, label: "Instagram" },
    { key: "youtube", href: socialMedia.youtube, label: "YouTube" },
    { key: "tiktok", href: socialMedia.tiktok, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer className="relative bg-charcoal-950 text-cream">
      <MountainDivider className="-mt-px text-cream" />
      <div className="container-app pb-10 pt-4">
        <div className="grid gap-12 border-b border-cream/10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${companyName} logo`}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              ) : (
                <Image
                  src="/logo/baig-tours-logo.jpg"
                  alt="Pakistan Baig Tours logo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              )}
              <span className="font-display text-xl">
                BAIG TOURS
                <span className="block text-[10px] font-sans font-semibold uppercase tracking-widest2 text-gold-400">
                  PAKISTAN
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {footerDescription}
            </p>
            {socialEntries.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialEntries.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold-500 hover:text-gold-500 hover:scale-110"
                    >
                      <Icon width={16} height={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest2 text-gold-500">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 text-sm text-cream/60 sm:flex-row sm:gap-6">
            {contact.address && (
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-gold-500" /> {contact.address}
              </span>
            )}
            {contact.phone && (
              <a href={`tel:+${contact.phone}`} className="flex items-center gap-2">
                <Phone size={15} className="text-gold-500" /> {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
                <Mail size={15} className="text-gold-500" />
                {contact.email}
              </a>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <span>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </span>
            {privacyPolicySlug && (
              <Link href={`/${privacyPolicySlug}`} className="hover:text-cream/60 transition-colors">
                Privacy Policy
              </Link>
            )}
            {termsSlug && (
              <Link href={`/${termsSlug}`} className="hover:text-cream/60 transition-colors">
                Terms
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
