import { sanityClient } from "./sanity-client";
import { sanityHomePageToData, sanitySiteNotificationsToSiteNotifications, sanitySiteSettingsToSiteSettings } from "./adapters";
import type { Tour, GalleryItem, HomePageData, SiteNotification, SiteSettings } from "@/types";

export async function getTours(): Promise<Tour[]> {
  const { tours } = await import("@/data/tours");
  return tours;
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const { tours } = await import("@/data/tours");
  return tours.find((t) => t.slug === slug);
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const { featuredTours } = await import("@/data/tours");
  return featuredTours;
}

export async function getTourSlugs(): Promise<string[]> {
  const { tours } = await import("@/data/tours");
  return tours.map((t) => t.slug);
}

export async function getGalleryImages(): Promise<GalleryItem[]> {
  const { galleryItems } = await import("@/data/content");
  return galleryItems;
}

const HOMEPAGE_QUERY = `*[_type == "homePage"][0]{
  heroEyebrow,
  heroHeading,
  heroSubheading,
  heroSlides[]{ "src": asset->url, alt },
  heroButtons[]{ label, url, variant },
  stats[]{ label, value },
  featuredToursHeading
}`;

const DEFAULT_HOME_PAGE: HomePageData = {
  heroEyebrow: "Pakistan Baig Tours",
  heroHeading: "Trips that turn into the stories you tell.",
  heroSubheading:
    "From Hunza\u2019s golden orchards to the throne room of K2 \u2014 handcrafted Northern Pakistan journeys, guided by locals who call these valleys home.",
  heroSlides: [
    { src: "https://picsum.photos/seed/baig-hero-karakoram/1920/1080", alt: "Karakoram mountain range at golden hour" },
    { src: "/images/baig_tours_nature_img.jpg", alt: "Pristine nature landscape of Northern Pakistan" },
    { src: "/images/baig_tours_nature2.jpg", alt: "Mountain valley with river flowing through" },
    { src: "/images/baig_tours_nature3.jpg", alt: "Snow-capped peaks towering over green meadows" },
    { src: "/images/baig_tours_nature4.jpg", alt: "Scenic mountain road winding through the north" },
    { src: "/images/baig_tours_nature5.jpg", alt: "Golden sunset over the Karakoram range" },
  ],
  heroButtons: [
    { label: "Explore Tours", url: "/tours", variant: "primary" },
    { label: "Watch Showreel", url: "", variant: "outline-light" },
  ],
  stats: [
    { label: "Happy Travelers", value: 24800 },
    { label: "Curated Tours", value: 96 },
    { label: "Destinations Covered", value: 42 },
    { label: "Years of Trust", value: 9 },
  ],
  featuredToursHeading: {
    eyebrow: "Handpicked Journeys",
    title: "Featured tours our travelers keep booking",
    description:
      "A curated shortlist across luxury, adventure and family travel \u2014 refreshed each season by our own guides.",
  },
};

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const raw = await sanityClient.fetch(HOMEPAGE_QUERY);
    if (!raw || !raw.heroHeading) return DEFAULT_HOME_PAGE;
    return sanityHomePageToData(raw, DEFAULT_HOME_PAGE);
  } catch {
    return DEFAULT_HOME_PAGE;
  }
}

const SITE_NOTIFICATIONS_QUERY = `*[_type == "siteNotification" && isActive == true
  && (!defined(scheduledAt) || scheduledAt <= now())
  && (!defined(expiresAt) || expiresAt > now())
] | order(scheduledAt asc) {
  _id,
  title,
  message,
  variant,
  isActive,
  scheduledAt,
  expiresAt,
  link,
  linkText
}`;

export async function getSiteNotifications(): Promise<SiteNotification[]> {
  try {
    const raw = await sanityClient.fetch(SITE_NOTIFICATIONS_QUERY);
    return sanitySiteNotificationsToSiteNotifications(raw);
  } catch {
    return [];
  }
}

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  companyName,
  logo,
  footerDescription,
  contact,
  socialMedia,
  googleMapsEmbed,
  privacyPolicySlug,
  termsSlug
}`;

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "Baig Tours Pakistan",
  logoUrl: "",
  footerDescription:
    "Pakistan's premium travel partner for the Northern Areas — trips that make stories, planned with care from arrival to departure.",
  contact: {
    phone: "03079222271",
    email: "info@baigtourspakistan.pk",
    address: "UGF 21–22, Landmark Plaza, Jail Road, Lahore",
    workingHours: "10 AM – 10 PM",
    departureDays: "Every Monday & Thursday Night",
  },
  socialMedia: {
    facebook: "https://web.facebook.com/p/Baig-tours-Pakistan-61574927528161/",
    instagram: "https://www.instagram.com/baigtour_pakistan_/",
    youtube: "",
    tiktok: "https://www.tiktok.com/@baigtourspakistan1",
    whatsapp: "923079222271",
  },
  googleMapsEmbed: "",
  privacyPolicySlug: "privacy-policy",
  termsSlug: "terms-and-conditions",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const raw = await sanityClient.fetch(SITE_SETTINGS_QUERY);
    if (!raw || !raw.contact) return DEFAULT_SITE_SETTINGS;
    return sanitySiteSettingsToSiteSettings(raw, DEFAULT_SITE_SETTINGS);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
