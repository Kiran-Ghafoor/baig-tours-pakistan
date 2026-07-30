import { Destination, Category, Review, BlogPost, GalleryItem } from "@/types";

const img = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    province: "Gilgit-Baltistan",
    image: "/images/baig_tours_packages1.jpg",
    tourCount: 12,
    description:
      "Terraced orchards, snow-capped Rakaposhi and the warmth of Hunzai hospitality make this the crown jewel of Northern Pakistan.",
    bestTime: "April – October",
    coordinates: { x: 58, y: 12 },
  },
  {
    id: "d2",
    slug: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    province: "Gilgit-Baltistan",
    image: "/images/baig_tours_packages2.jpg",
    tourCount: 9,
    description:
      "Gateway to the Karakoram giants — cold deserts, turquoise lakes and the road to K2 all begin here.",
    bestTime: "May – September",
    coordinates: { x: 68, y: 18 },
  },
  {
    id: "d3",
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Gilgit-Baltistan",
    province: "Gilgit-Baltistan",
    image: "/images/baig_tours_packages3.jpg",
    tourCount: 6,
    description:
      "A pine-fringed meadow facing Nanga Parbat, reachable only by jeep track and a short forest trek.",
    bestTime: "June – September",
    coordinates: { x: 50, y: 20 },
  },
  {
    id: "d4",
    slug: "swat-valley",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    province: "Khyber Pakhtunkhwa",
    image: "/images/baig_tours_packages4.jpg",
    tourCount: 14,
    description:
      "Known as the Switzerland of Pakistan — green slopes, river valleys and family-friendly resorts.",
    bestTime: "March – November",
    coordinates: { x: 38, y: 24 },
  },
  {
    id: "d5",
    slug: "naran-kaghan",
    name: "Naran & Kaghan",
    region: "Khyber Pakhtunkhwa",
    province: "Khyber Pakhtunkhwa",
    image: "/images/baig_tours_packages5.jpg",
    tourCount: 16,
    description:
      "Home to Lake Saif-ul-Malook and a string of alpine lakes threaded along the Kunhar river.",
    bestTime: "May – September",
    coordinates: { x: 42, y: 28 },
  },
  {
    id: "d6",
    slug: "lahore",
    name: "Lahore",
    region: "Punjab",
    province: "Punjab",
    image: "/images/baig_tours_packages6.jpg",
    tourCount: 8,
    description:
      "Mughal grandeur, walled-city food streets and Pakistan's cultural heartbeat.",
    bestTime: "October – March",
    coordinates: { x: 60, y: 62 },
  },
  {
    id: "d7",
    slug: "murree",
    name: "Murree",
    region: "Punjab",
    province: "Punjab",
    image: "/images/baig_tours_packages8.jpg",
    tourCount: 10,
    description:
      "A colonial hill station an hour from the capital — pine forests, mist and cable cars.",
    bestTime: "March – August, December (snow)",
    coordinates: { x: 46, y: 40 },
  },
  {
    id: "d8",
    slug: "concordia",
    name: "Concordia & K2",
    region: "Gilgit-Baltistan",
    province: "Gilgit-Baltistan",
    image: "/images/baig_tours_packages7.jpg",
    tourCount: 3,
    description:
      "The ultimate trekking prize: four 8,000m giants ringing a single glacial amphitheatre.",
    bestTime: "June – August",
    coordinates: { x: 72, y: 10 },
  },
];

export const categories: Category[] = [
  { id: "c1", name: "Adventure", icon: "Mountain", count: 24, description: "Jeep safaris, glaciers & high passes" },
  { id: "c2", name: "Trekking", icon: "Footprints", count: 18, description: "Base camps & multi-day trails" },
  { id: "c3", name: "Luxury", icon: "Gem", count: 12, description: "Boutique stays & private guides" },
  { id: "c4", name: "Family", icon: "Users", count: 20, description: "Easy-paced, kid-friendly itineraries" },
  { id: "c5", name: "Culture", icon: "Landmark", count: 14, description: "Heritage cities & living history" },
  { id: "c6", name: "Honeymoon", icon: "Heart", count: 9, description: "Romantic escapes for two" },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ayesha Raza",
    location: "Karachi",
    avatar: img("avatar-ayesha", 200, 200),
    rating: 5,
    tour: "Hunza Valley Luxury Escape",
    date: "June 2026",
    comment:
      "Every detail was handled — from the private guide to the surprise apricot breakfast. Baig Tours made Hunza feel like a five-star secret.",
  },
  {
    id: "r2",
    name: "Bilal Ahmed",
    location: "Lahore",
    avatar: img("avatar-bilal", 200, 200),
    rating: 5,
    tour: "Skardu Adventure Expedition",
    date: "May 2026",
    comment:
      "Camping under the Deosai sky is something I'll never forget. The jeep drivers were pros and the whole trip felt completely safe.",
  },
  {
    id: "r3",
    name: "Sara Malik",
    location: "Islamabad",
    avatar: img("avatar-sara", 200, 200),
    rating: 4.8,
    tour: "Swat, Kalam & Malam Jabba Family Tour",
    date: "April 2026",
    comment:
      "Traveling with two kids is never simple, but the itinerary pace was perfect and the hotel had a playground right on the river.",
  },
  {
    id: "r4",
    name: "Hamza Sheikh",
    location: "Multan",
    avatar: img("avatar-hamza", 200, 200),
    rating: 5,
    tour: "K2 Base Camp & Concordia Trek",
    date: "August 2025",
    comment:
      "Fourteen days, four 8,000m peaks, and a support team that never once let logistics get in the way of the experience.",
  },
  {
    id: "r5",
    name: "Zainab Qureshi",
    location: "Faisalabad",
    avatar: img("avatar-zainab", 200, 200),
    rating: 4.9,
    tour: "Islamabad & Murree Honeymoon Getaway",
    date: "March 2026",
    comment:
      "The candlelight dinner overlooking the valley was the highlight of our honeymoon. Booking and payment were effortless too.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "best-time-to-visit-hunza-valley",
    title: "The Best Time to Visit Hunza Valley (Season by Season)",
    excerpt:
      "From cherry blossoms in spring to golden autumn orchards — here's how to pick the right month for your Hunza trip.",
    content: [
      "Hunza changes character completely across the seasons, and choosing the right month shapes the entire trip.",
      "Spring brings blossoming apricot and cherry orchards across Karimabad, with mild days and cool evenings ideal for photography.",
      "Summer opens up the high passes and glacial lakes, making it the best window for jeep excursions to Khunjerab and Attabad Lake.",
      "Autumn is arguably the valley's most photogenic season, when the orchards turn gold against the grey Karakoram peaks.",
      "Winter transforms Hunza into a quiet, snow-dusted retreat — fewer crowds, dramatic skies, and some of the clearest stargazing in Pakistan.",
    ],
    image: img("blog-hunza-season", 1400, 900),
    author: "Abdullah Baig",
    authorAvatar: "/images/ceo-abdullah-baig.jpg",
    date: "July 12, 2026",
    readTime: "6 min read",
    category: "Travel Guides",
    tags: ["Hunza", "Seasons", "Planning"],
  },
  {
    id: "b2",
    slug: "packing-list-northern-pakistan-trek",
    title: "The Complete Packing List for a Northern Pakistan Trek",
    excerpt:
      "What actually earns space in your bag for a multi-day trek through Gilgit-Baltistan — and what to leave behind.",
    content: [
      "Layering is everything in the north, where a single day can swing from bright alpine sun to near-freezing evenings.",
      "A good base layer, insulated mid layer and a windproof shell will outperform one heavy jacket in almost every scenario.",
      "Footwear deserves the biggest budget on this list — broken-in trekking boots with ankle support are non-negotiable above 3,000 metres.",
      "Beyond clothing, a reliable headlamp, water purification tablets and a basic first-aid kit round out the essentials our guides never trek without.",
    ],
    image: img("blog-packing", 1400, 900),
    author: "Fatima Noor",
    authorAvatar: img("avatar-fatima", 200, 200),
    date: "June 28, 2026",
    readTime: "5 min read",
    category: "Trekking",
    tags: ["Packing", "Trekking", "Gear"],
  },
  {
    id: "b3",
    slug: "hidden-lakes-of-gilgit-baltistan",
    title: "5 Hidden Lakes of Gilgit-Baltistan Most Tourists Miss",
    excerpt:
      "Beyond Saif-ul-Malook — the quieter alpine lakes worth the extra hour of driving.",
    content: [
      "Saif-ul-Malook gets the crowds, but a short detour off the main routes reveals lakes that feel entirely undiscovered.",
      "Rush Lake, reachable only by a two-day trek, rewards visitors with 360-degree views of seven peaks above 7,000 metres.",
      "Borith Lake near Passu offers a quiet, saline-blue contrast to the glacier-fed lakes nearby, with excellent budget guesthouses on its shore.",
      "Satpara and Kachura round out the list, both close enough to Skardu for an easy half-day visit.",
    ],
    image: img("blog-lakes", 1400, 900),
    author: "Abdullah Baig",
    authorAvatar: "/images/ceo-abdullah-baig.jpg",
    date: "June 3, 2026",
    readTime: "7 min read",
    category: "Destinations",
    tags: ["Lakes", "Gilgit-Baltistan", "Hidden Gems"],
  },
  {
    id: "b4",
    slug: "responsible-tourism-northern-areas",
    title: "How We Practice Responsible Tourism in the Northern Areas",
    excerpt:
      "Our approach to protecting the trails, villages and glaciers that make Northern Pakistan worth visiting.",
    content: [
      "Every jeep route we run is capped to a group size that the local road and village infrastructure can comfortably support.",
      "We hire trek staff, drivers and guides directly from the valleys we operate in, so tourism income stays with local families.",
      "Waste management is built into every itinerary — trekking groups carry out everything they carry in, no exceptions.",
      "We work with village elders before adding any new route to make sure tourism supports, rather than strains, the communities that host us.",
    ],
    image: img("blog-responsible", 1400, 900),
    author: "Abdullah Baig",
    authorAvatar: "/images/ceo-abdullah-baig.jpg",
    date: "May 20, 2026",
    readTime: "4 min read",
    category: "Sustainability",
    tags: ["Responsible Travel", "Community"],
  },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: "/images/baig_tours_gallery_img.jpg", caption: "Golden hour at Attabad Lake", location: "Hunza", likes: 482 },
  { id: "g2", image: "/images/baig_tours_gallery_img2.jpg", caption: "Camp night in Deosai", location: "Skardu", likes: 391 },
  { id: "g3", image: "/images/baig_tours_gallery_img3.jpg", caption: "Nanga Parbat from Fairy Meadows", location: "Fairy Meadows", likes: 567 },
  { id: "g4", image: "/images/baig_tours_gallery_img4.jpg", caption: "Chairlift over Malam Jabba", location: "Swat", likes: 274 },
  { id: "g5", image: "/images/baig_tours_gallery_img5.jpg", caption: "Saif-ul-Malook at dawn", location: "Naran", likes: 618 },
  { id: "g6", image: "/images/baig_tours_gallery_img6.jpg", caption: "Badshahi Mosque courtyard", location: "Lahore", likes: 340 },
  { id: "g7", image: "/images/baig_tours_gallery_img7.jpg", caption: "Concordia panorama", location: "K2 Base Camp", likes: 705 },
  { id: "g8", image: "/images/baig_tours_gallery_img8.jpg", caption: "Cable car above the pines", location: "Murree", likes: 219 },
  { id: "g9", image: "/images/baig_tours_gallery_img9.jpg", caption: "Snow-capped peaks at sunrise", location: "Gilgit-Baltistan", likes: 512 },
  { id: "g10", image: "/images/baig_tours_gallery10.jpg", caption: "Valley road through the north", location: "Northern Pakistan", likes: 328 },
  { id: "g11", image: "/images/baig_tours_gallery_img11.jpg", caption: "Trekking through the highlands", location: "Karakoram", likes: 445 },
  { id: "g12", image: "/images/baig_tours_gallery_12.jpg", caption: "Crystal clear alpine waters", location: "Skardu", likes: 389 },
  { id: "g13", image: "/images/baig_tours_gallery_img13.jpg", caption: "Local village life in the mountains", location: "Hunza", likes: 276 },
  { id: "g14", image: "/images/baig_tours_gallery_img14.jpg", caption: "Majestic mountain pass", location: "Deosai", likes: 503 },
  { id: "g15", image: "/images/baig_tours_gallery_img15.jpg", caption: "Sunset over the Karakoram", location: "Gilgit-Baltistan", likes: 617 },
];

export const stats = [
  { label: "Happy Travelers", value: 24800 },
  { label: "Curated Tours", value: 96 },
  { label: "Destinations Covered", value: 42 },
  { label: "Years of Trust", value: 9 },
];
