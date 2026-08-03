import { sanityClient } from "./sanity-client";
import {
  sanityBlogToBlog,
  sanityCategoryToCategory,
  sanityDestinationToDestination,
  sanityGalleryToGalleryItems,
  sanityHomePageToData,
  sanitySiteNotificationsToSiteNotifications,
  sanitySiteSettingsToSiteSettings,
  sanityTestimonialToReview,
  sanityTourToTour,
  sanityToursToTours,
} from "./adapters";
import type {
  Tour,
  GalleryItem,
  HomePageData,
  SiteNotification,
  SiteSettings,
  Destination,
  Category,
  Review,
  BlogPost,
} from "@/types";

type RawDestination = Parameters<typeof sanityDestinationToDestination>[0];
type RawCategory = Parameters<typeof sanityCategoryToCategory>[0];

const TOUR_FIELDS = `{
  _id,
  title,
  slug,
  tag,
  destination->{name},
  category->{name},
  region,
  description,
  highlights,
  price,
  originalPrice,
  duration,
  nights,
  groupSize,
  difficulty,
  included,
  excluded,
  itinerary,
  rating,
  reviewCount,
  bookedCount,
  featured,
  bestSeller,
  image,
  gallery
}`;

const TOURS_QUERY = `*[_type == "tourPackage"] | order(order asc)${TOUR_FIELDS}`;
const FEATURED_TOURS_QUERY = `*[_type == "tourPackage" && featured == true] | order(order asc)${TOUR_FIELDS}`;
const TOUR_BY_SLUG_QUERY = `*[_type == "tourPackage" && slug.current == $slug][0]${TOUR_FIELDS}`;

export async function getTours(): Promise<Tour[]> {
  const { tours } = await import("@/data/tours");
  if (!sanityClient) return tours;
  try {
    const raw = await sanityClient.fetch(TOURS_QUERY);
    const mapped = sanityToursToTours(raw ?? []);
    return mapped.length > 0 ? mapped : tours;
  } catch {
    return tours;
  }
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const { featuredTours } = await import("@/data/tours");
  if (!sanityClient) return featuredTours;
  try {
    const raw = await sanityClient.fetch(FEATURED_TOURS_QUERY);
    const mapped = sanityToursToTours(raw ?? []);
    return mapped.length > 0 ? mapped : featuredTours;
  } catch {
    return featuredTours;
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const { tours } = await import("@/data/tours");
  if (!sanityClient) return tours.find((t) => t.slug === slug);
  try {
    const raw = await sanityClient.fetch(TOUR_BY_SLUG_QUERY, { slug });
    if (raw && raw._id) return sanityTourToTour(raw);
    return tours.find((t) => t.slug === slug);
  } catch {
    return tours.find((t) => t.slug === slug);
  }
}

export async function getTourSlugs(): Promise<string[]> {
  return (await getTours()).map((t) => t.slug);
}

const DESTINATION_FIELDS = `{
  _id,
  name,
  slug,
  region,
  province,
  description,
  bestTime,
  coordinates,
  image
}`;

const DESTINATIONS_QUERY = `*[_type == "destination"] | order(order asc)${DESTINATION_FIELDS}`;
const DESTINATION_BY_SLUG_QUERY = `*[_type == "destination" && slug.current == $slug][0]${DESTINATION_FIELDS}`;

function countToursForDestination(tours: Tour[], name: string): number {
  const key = name.split(" ")[0].toLowerCase();
  return tours.filter((t) => t.destination.toLowerCase().includes(key)).length;
}

export async function getDestinations(): Promise<Destination[]> {
  const { destinations } = await import("@/data/content");
  if (!sanityClient) return destinations;
  try {
    const raw = await sanityClient.fetch(DESTINATIONS_QUERY);
    if (!raw || raw.length === 0) return destinations;
    const tours = await getTours();
    const mapped = (raw as RawDestination[]).map((d) =>
      sanityDestinationToDestination(d, countToursForDestination(tours, d.name ?? ""))
    );
    return mapped.length > 0 ? mapped : destinations;
  } catch {
    return destinations;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  const { destinations } = await import("@/data/content");
  if (!sanityClient) return destinations.find((d) => d.slug === slug);
  try {
    const raw = await sanityClient.fetch(DESTINATION_BY_SLUG_QUERY, { slug });
    if (raw && raw._id) {
      const tours = await getTours();
      return sanityDestinationToDestination(raw, countToursForDestination(tours, raw.name ?? ""));
    }
    return destinations.find((d) => d.slug === slug);
  } catch {
    return destinations.find((d) => d.slug === slug);
  }
}

const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc){
  _id,
  name,
  slug,
  icon,
  description
}`;

export async function getCategories(): Promise<Category[]> {
  const { categories } = await import("@/data/content");
  if (!sanityClient) return categories;
  try {
    const raw = await sanityClient.fetch(CATEGORIES_QUERY);
    if (!raw || raw.length === 0) return categories;
    const tours = await getTours();
    const mapped = (raw as RawCategory[]).map((c) =>
      sanityCategoryToCategory(
        c,
        tours.filter((t) => t.category === c.name).length
      )
    );
    return mapped.length > 0 ? mapped : categories;
  } catch {
    return categories;
  }
}

const GALLERY_QUERY = `*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  caption,
  location,
  likes
}`;

export async function getGalleryImages(): Promise<GalleryItem[]> {
  const { galleryItems } = await import("@/data/content");
  if (!sanityClient) return galleryItems;
  try {
    const raw = await sanityClient.fetch(GALLERY_QUERY);
    const mapped = sanityGalleryToGalleryItems(raw ?? []);
    return mapped.length > 0 ? mapped : galleryItems;
  } catch {
    return galleryItems;
  }
}

const REVIEWS_QUERY = `*[_type == "testimonial"] | order(featured desc, publishedAt desc){
  _id,
  name,
  location,
  avatar,
  rating,
  tour->{title},
  comment,
  publishedAt
}`;

export async function getCustomerReviews(): Promise<Review[]> {
  const { reviews } = await import("@/data/content");
  if (!sanityClient) return reviews;
  try {
    const raw = await sanityClient.fetch(REVIEWS_QUERY);
    const mapped = (raw ?? []).map(sanityTestimonialToReview);
    return mapped.length > 0 ? mapped : reviews;
  } catch {
    return reviews;
  }
}

const BLOG_FIELDS = `{
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  author,
  authorAvatar,
  category,
  tags,
  readTime,
  publishedAt
}`;

const BLOGS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc)${BLOG_FIELDS}`;
const BLOG_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]${BLOG_FIELDS}`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { blogPosts } = await import("@/data/content");
  if (!sanityClient) return blogPosts;
  try {
    const raw = await sanityClient.fetch(BLOGS_QUERY);
    const mapped = (raw ?? []).map(sanityBlogToBlog);
    return mapped.length > 0 ? mapped : blogPosts;
  } catch {
    return blogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { blogPosts } = await import("@/data/content");
  if (!sanityClient) return blogPosts.find((p) => p.slug === slug);
  try {
    const raw = await sanityClient.fetch(BLOG_BY_SLUG_QUERY, { slug });
    if (raw && raw._id) return sanityBlogToBlog(raw);
    return blogPosts.find((p) => p.slug === slug);
  } catch {
    return blogPosts.find((p) => p.slug === slug);
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  return (await getBlogPosts()).map((p) => p.slug);
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
  if (!sanityClient) return DEFAULT_HOME_PAGE;
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
  if (!sanityClient) return [];
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
  if (!sanityClient) return DEFAULT_SITE_SETTINGS;
  try {
    const raw = await sanityClient.fetch(SITE_SETTINGS_QUERY);
    if (!raw || !raw.contact) return DEFAULT_SITE_SETTINGS;
    return sanitySiteSettingsToSiteSettings(raw, DEFAULT_SITE_SETTINGS);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
