import type { Tour, GalleryItem, HomePageData, HeroSlide, HeroButton, Stat, SectionHeading, SiteNotification, SiteSettings, Destination, Category, Review, BlogPost } from "@/types";
import { urlFor } from "./sanity-image";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SanityImage {
  asset?: { _ref: string };
  hotspot?: number;
}

interface SanityReference {
  _ref: string;
  _type: "reference";
}

interface SanityTour {
  _id: string;
  title: string;
  slug: { current: string };
  tag?: string;
  destination: SanityReference & { name?: string; slug?: { current: string } };
  category: SanityReference & { name?: string; slug?: { current: string } };
  region: string;
  description?: string;
  highlights?: string[];
  price: number;
  originalPrice?: number;
  duration: string;
  nights: number;
  groupSize: string;
  difficulty: string;
  included?: string[];
  excluded?: string[];
  itinerary?: { day: number; title: string; description: string }[];
  rating?: number;
  reviewCount?: number;
  bookedCount?: number;
  featured?: boolean;
  bestSeller?: boolean;
  image?: SanityImage;
  gallery?: SanityImage[];
}

function resolveImage(src: SanityImage | undefined): string {
  if (!src) return "";
  try {
    return urlFor(src).width(1400).height(1000).url();
  } catch {
    return "";
  }
}

function resolveGallery(images: SanityImage[] | undefined): string[] {
  if (!images) return [];
  return images.map((img) => {
    try {
      return urlFor(img).width(1200).height(800).url();
    } catch {
      return "";
    }
  });
}

export function sanityTourToTour(raw: SanityTour): Tour {
  return {
    id: raw._id,
    slug: raw.slug?.current ?? "",
    title: raw.title,
    destination: raw.destination?.name ?? "",
    region: raw.region,
    category: raw.category?.name ?? "",
    price: raw.price,
    originalPrice: raw.originalPrice,
    currency: "PKR",
    duration: raw.duration,
    nights: raw.nights,
    groupSize: raw.groupSize,
    difficulty: raw.difficulty as Tour["difficulty"],
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    bookedCount: raw.bookedCount ?? 0,
    image: resolveImage(raw.image),
    gallery: resolveGallery(raw.gallery),
    highlights: raw.highlights ?? [],
    included: raw.included ?? [],
    excluded: raw.excluded ?? [],
    itinerary: raw.itinerary ?? [],
    featured: raw.featured,
    bestSeller: raw.bestSeller,
    tag: raw.tag,
  };
}

export function sanityToursToTours(raw: SanityTour[]): Tour[] {
  return raw.map(sanityTourToTour);
}

interface SanityGalleryImage {
  _id: string;
  image?: SanityImage;
  caption: string;
  location: string;
  likes?: number;
}

function resolveGalleryImage(src: SanityImage | undefined, width: number, height: number): string {
  if (!src) return "";
  try {
    return urlFor(src).width(width).height(height).fit("crop").auto("format").quality(80).url();
  } catch {
    return "";
  }
}

export function sanityGalleryToGalleryItems(raw: SanityGalleryImage[]): GalleryItem[] {
  return raw.map((item) => ({
    id: item._id,
    image: resolveGalleryImage(item.image, 800, 800),
    caption: item.caption,
    location: item.location,
    likes: item.likes ?? 0,
  }));
}

interface SanityHeroSlide {
  src?: string;
  alt?: string;
}

interface SanityHeroButton {
  label?: string;
  url?: string;
  variant?: string;
}

interface SanityStat {
  label?: string;
  value?: number;
}

interface SanitySectionHeading {
  eyebrow?: string;
  title?: string;
  description?: string;
}

interface SanityHomePage {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroSlides?: SanityHeroSlide[];
  heroButtons?: SanityHeroButton[];
  stats?: SanityStat[];
  featuredToursHeading?: SanitySectionHeading;
}

export function sanityHomePageToData(
  raw: SanityHomePage,
  defaults: HomePageData
): HomePageData {
  const heroSlides: HeroSlide[] =
    raw.heroSlides && raw.heroSlides.length > 0
      ? raw.heroSlides.map((s) => ({
          src: s.src ?? "",
          alt: s.alt ?? "",
        }))
      : defaults.heroSlides;

  const heroButtons: HeroButton[] =
    raw.heroButtons && raw.heroButtons.length > 0
      ? raw.heroButtons.map((b) => ({
          label: b.label ?? "",
          url: b.url ?? "",
          variant: (b.variant as HeroButton["variant"]) ?? "primary",
        }))
      : defaults.heroButtons;

  const stats: Stat[] =
    raw.stats && raw.stats.length > 0
      ? raw.stats.map((s) => ({
          label: s.label ?? "",
          value: s.value ?? 0,
        }))
      : defaults.stats;

  return {
    heroEyebrow: raw.heroEyebrow ?? defaults.heroEyebrow,
    heroHeading: raw.heroHeading ?? defaults.heroHeading,
    heroSubheading: raw.heroSubheading ?? defaults.heroSubheading,
    heroSlides,
    heroButtons,
    stats,
    featuredToursHeading: {
      eyebrow: raw.featuredToursHeading?.eyebrow ?? defaults.featuredToursHeading.eyebrow,
      title: raw.featuredToursHeading?.title ?? defaults.featuredToursHeading.title,
      description: raw.featuredToursHeading?.description ?? defaults.featuredToursHeading.description,
    },
  };
}

interface SanitySiteNotification {
  _id: string;
  title?: string;
  message?: string;
  variant?: string;
  isActive?: boolean;
  scheduledAt?: string;
  expiresAt?: string;
  link?: string;
  linkText?: string;
}

export function sanitySiteNotificationsToSiteNotifications(
  raw: SanitySiteNotification[]
): SiteNotification[] {
  return raw.map((item) => ({
    id: item._id,
    title: item.title ?? "",
    message: item.message ?? "",
    variant: (item.variant as SiteNotification["variant"]) ?? "promo",
    isActive: item.isActive ?? true,
    scheduledAt: item.scheduledAt,
    expiresAt: item.expiresAt,
    link: item.link,
    linkText: item.linkText,
  }));
}

interface SanitySiteSettings {
  companyName?: string;
  logo?: SanityImage;
  footerDescription?: string;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    workingHours?: string;
    departureDays?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  googleMapsEmbed?: string;
  privacyPolicySlug?: { current?: string };
  termsSlug?: { current?: string };
}

export function sanitySiteSettingsToSiteSettings(
  raw: SanitySiteSettings,
  defaults: SiteSettings
): SiteSettings {
  return {
    companyName: raw.companyName ?? defaults.companyName,
    logoUrl: resolveImage(raw.logo) || defaults.logoUrl,
    footerDescription: raw.footerDescription ?? defaults.footerDescription,
    contact: {
      phone: raw.contact?.phone ?? defaults.contact.phone,
      email: raw.contact?.email ?? defaults.contact.email,
      address: raw.contact?.address ?? defaults.contact.address,
      workingHours: raw.contact?.workingHours ?? defaults.contact.workingHours,
      departureDays: raw.contact?.departureDays ?? defaults.contact.departureDays,
    },
    socialMedia: {
      facebook: raw.socialMedia?.facebook ?? defaults.socialMedia.facebook,
      instagram: raw.socialMedia?.instagram ?? defaults.socialMedia.instagram,
      youtube: raw.socialMedia?.youtube ?? defaults.socialMedia.youtube,
      tiktok: raw.socialMedia?.tiktok ?? defaults.socialMedia.tiktok,
      whatsapp: raw.socialMedia?.whatsapp ?? defaults.socialMedia.whatsapp,
    },
    googleMapsEmbed: raw.googleMapsEmbed ?? defaults.googleMapsEmbed,
    privacyPolicySlug: raw.privacyPolicySlug?.current ?? defaults.privacyPolicySlug,
    termsSlug: raw.termsSlug?.current ?? defaults.termsSlug,
  };
}

interface SanityDestination {
  _id: string;
  name?: string;
  slug?: { current?: string };
  region?: string;
  province?: string;
  description?: string;
  bestTime?: string;
  coordinates?: { x?: number; y?: number };
  image?: SanityImage;
}

export function sanityDestinationToDestination(
  raw: SanityDestination,
  tourCount: number
): Destination {
  return {
    id: raw._id,
    slug: raw.slug?.current ?? "",
    name: raw.name ?? "",
    region: raw.region ?? "",
    province: raw.province ?? "",
    description: raw.description ?? "",
    bestTime: raw.bestTime ?? "",
    coordinates: { x: raw.coordinates?.x ?? 0, y: raw.coordinates?.y ?? 0 },
    image: resolveImage(raw.image),
    tourCount,
  };
}

interface SanityCategory {
  _id: string;
  name?: string;
  slug?: { current?: string };
  icon?: string;
  description?: string;
}

export function sanityCategoryToCategory(raw: SanityCategory, count: number): Category {
  return {
    id: raw._id,
    name: raw.name ?? "",
    icon: raw.icon ?? "Mountain",
    count,
    description: raw.description ?? "",
  };
}

function avatarFallback(seed: string | undefined): string {
  const key = (seed ?? "avatar")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `https://picsum.photos/seed/avatar-${key || "avatar"}/200/200`;
}

interface SanityTestimonial {
  _id: string;
  name?: string;
  location?: string;
  avatar?: SanityImage;
  rating?: number;
  tour?: { title?: string };
  comment?: string;
  publishedAt?: string;
}

export function sanityTestimonialToReview(raw: SanityTestimonial): Review {
  return {
    id: raw._id,
    name: raw.name ?? "",
    location: raw.location ?? "",
    avatar: resolveGalleryImage(raw.avatar, 200, 200) || avatarFallback(raw.name),
    rating: raw.rating ?? 5,
    tour: raw.tour?.title ?? "",
    date: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "",
    comment: raw.comment ?? "",
  };
}

type PortableTextBlock = {
  _type?: string;
  children?: { _type?: string; text?: string }[];
};

function portableTextToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join("").trim())
    .filter(Boolean);
}

interface SanityBlogPost {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
  author?: string;
  authorAvatar?: SanityImage;
  category?: string;
  tags?: string[];
  readTime?: string;
  publishedAt?: string;
}

export function sanityBlogToBlog(raw: SanityBlogPost): BlogPost {
  return {
    id: raw._id,
    slug: raw.slug?.current ?? "",
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? "",
    content: portableTextToParagraphs(raw.content),
    image: resolveImage(raw.image),
    author: raw.author ?? "",
    authorAvatar: resolveGalleryImage(raw.authorAvatar, 200, 200) || avatarFallback(raw.author),
    date: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: raw.readTime ?? "",
    category: raw.category ?? "",
    tags: raw.tags ?? [],
  };
}
