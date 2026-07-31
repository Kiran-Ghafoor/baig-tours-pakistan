export interface FallbackTour {
  slug: string;
  title: string;
  price: number;
}

export const fallbackTours: FallbackTour[] = [
  { slug: "hunza-valley-luxury-escape", title: "Hunza Valley Luxury Escape", price: 19500 },
  { slug: "skardu-adventure-expedition", title: "Skardu Adventure Expedition", price: 17500 },
  { slug: "fairy-meadows-nanga-parbat-trek", title: "Fairy Meadows & Nanga Parbat Base Camp Trek", price: 16000 },
  { slug: "swat-kalam-malam-jabba-family-tour", title: "Swat, Kalam & Malam Jabba Family Tour", price: 17000 },
  { slug: "naran-kaghan-saif-ul-malook-tour", title: "Naran, Kaghan & Saif-ul-Malook Tour", price: 16000 },
  { slug: "lahore-heritage-culinary-city-tour", title: "Lahore Heritage & Culinary City Tour", price: 16000 },
  { slug: "k2-basecamp-concordia-trek", title: "K2 Base Camp & Concordia Trek", price: 20000 },
  { slug: "islamabad-murree-honeymoon-getaway", title: "Islamabad & Murree Honeymoon Getaway", price: 18000 },
];

export function findFallbackTour(slug: string): FallbackTour | undefined {
  return fallbackTours.find((t) => t.slug === slug);
}
