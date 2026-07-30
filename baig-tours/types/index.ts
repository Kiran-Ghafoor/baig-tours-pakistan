export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Expert";

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  region: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: "PKR";
  duration: string;
  nights: number;
  groupSize: string;
  difficulty: Difficulty;
  rating: number;
  reviewCount: number;
  bookedCount: number;
  image: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: TourItineraryDay[];
  featured?: boolean;
  bestSeller?: boolean;
  tag?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  province: string;
  image: string;
  tourCount: number;
  description: string;
  bestTime: string;
  coordinates: { x: number; y: number };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  tour: string;
  date: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  location: string;
  likes: number;
}

export interface Booking {
  id: string;
  tourTitle: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  travelers: number;
  amount: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalBookings: number;
  totalSpend: number;
  joined: string;
  status: "active" | "inactive";
}

export interface HeroSlide {
  src: string;
  alt: string;
}

export interface HeroButton {
  label: string;
  url: string;
  variant: "primary" | "outline-light";
}

export interface Stat {
  label: string;
  value: number;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface SiteNotification {
  id: string;
  title: string;
  message: string;
  variant: "promo" | "info" | "success" | "warning" | "announcement";
  isActive: boolean;
  scheduledAt?: string;
  expiresAt?: string;
  link?: string;
  linkText?: string;
}

export interface SiteSettings {
  companyName: string;
  logoUrl: string;
  footerDescription: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
    departureDays: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    whatsapp: string;
  };
  googleMapsEmbed: string;
  privacyPolicySlug: string;
  termsSlug: string;
}

export interface HomePageData {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroSlides: HeroSlide[];
  heroButtons: HeroButton[];
  stats: Stat[];
  featuredToursHeading: SectionHeading;
}
