# Baig Tours Pakistan — Premium Travel Booking Platform

A production-ready **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS** frontend for Pakistan's premium travel booking platform, built around the Baig Tours Pakistan brand ("Trips That Make Stories").

---

## Tech Stack

- **Next.js 15** (App Router, Server Components, `generateStaticParams`, `generateMetadata`)
- **React 19** + **TypeScript**
- **Tailwind CSS 3** with a fully custom design system in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, hover/lift interactions, page-load choreography, Ken Burns hero
- **Lucide React** for iconography (brand/social icons are hand-built SVGs — see note below)
- **React Hook Form + Zod** for the search bar, contact form, newsletter, and multi-field booking form
- **next/image** + **next/link** throughout, mock JSON data in `/data`, fully typed via `/types`

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. For a production build:

```bash
npm run build
npm run start
```

Both `npm run build` and `npx eslint .` pass cleanly on this project as delivered (47 routes, no type or lint errors).

## Project Structure

```
app/
  (marketing)/          # Public-facing site, wrapped in Navbar + Footer
    page.tsx            # Home — all 13 cinematic sections
    tours/               tours/[slug]/
    destinations/         destinations/[slug]/
    blogs/                 blogs/[slug]/
    gallery/  about/  contact/  booking/  search/
  admin/                 # Admin dashboard, own sidebar/topbar shell (no public chrome)
    page.tsx (Dashboard)  bookings/  tours/  customers/  reviews/
    blogs/  gallery/  seo/  analytics/  profile/  notifications/
  layout.tsx             # Minimal root shell (html/body only)
  not-found.tsx          # Global 404
  sitemap.ts / robots.ts # SEO
components/
  ui/        Button, Badge, Rating, social icons
  shared/    SectionHeading, PageHeader, MountainDivider, Reveal, ContactForm
  layout/    Navbar (transparent to solid on scroll), Footer
  home/      All 13 homepage sections as isolated components
  tours/     TourCard, DestinationCard, filters, BookingForm
  admin/     Sidebar, Topbar, StatCard, StatusBadge
data/        tours.ts, content.ts (destinations/categories/reviews/blogs/gallery), admin.ts
types/       Shared TypeScript interfaces
lib/         cn(), currency + date formatters
hooks/       useCounter (scroll-triggered animated stats)
```

## Design System

Colors, type scale, shadows, and animation keyframes are defined once in `tailwind.config.ts`, extracted from the Baig Tours logo mark: deep charcoal, premium gold/amber, emerald accents, on a warm cream base. The logo's triple-peak silhouette is reused as a recurring **signature divider** (`components/shared/mountain-divider.tsx`) between sections instead of a plain line.

Typography uses system font stacks (serif display / sans body) rather than a Google Fonts import, so the project builds and runs with zero external font requests. Swap in real webfonts via `next/font/google` or `next/font/local` in `app/layout.tsx` if you want a different typographic voice.

## Important Notes Before Going Live

1. **Placeholder photography.** Every image (`https://picsum.photos/seed/...`) is a deterministic placeholder so the project renders real imagery out of the box. Before launch, replace these with licensed Northern Pakistan photography — the `Tour`, `Destination`, `BlogPost`, and `GalleryItem` types all just take a `string` URL, so swapping is a find-and-replace in `/data`.
2. **Hero video.** The homepage hero uses a Ken Burns–animated still image as a stand-in for drone/showreel footage. Drop an `.mp4` into `public/videos/hero.mp4` and swap the `<Image>` in `components/home/hero.tsx` for a `<video>` tag when you have real footage.
3. **Pakistan map.** `components/home/pakistan-map.tsx` is a stylized, illustrative map (not geographically precise) with clickable hotspots driven by the `coordinates` field on each `Destination`. Swap in a real GeoJSON/SVG map of Pakistan if you need geographic accuracy.
4. **Forms are front-end only.** The search bar, contact form, newsletter, and booking form all validate with Zod and simulate submission. Wire the `onSubmit` handlers in `components/home/smart-search.tsx`, `components/shared/contact-form.tsx`, `components/home/newsletter.tsx`, and `components/tours/booking-form.tsx` to your Laravel REST API endpoints.
5. **Admin dashboard is UI-only.** All admin pages (Dashboard, Bookings, Tours, Customers, Reviews, Blogs, Gallery, SEO Settings, Analytics, Profile, Notifications) are fully designed and interactive on mock data (`/data/admin.ts`) with no auth layer — add authentication and real data fetching before exposing `/admin` publicly. `app/robots.ts` already disallows `/admin` from search indexing.
6. **Social icons.** The installed `lucide-react` version no longer ships brand/social glyphs (Facebook, Instagram, Twitter/X, YouTube), so these are hand-built SVGs in `components/ui/social-icons.tsx`.

## Accessibility & SEO

- Semantic headings, landmark structure, visible focus rings (`globals.css`), ARIA labels on icon-only buttons, keyboard-operable nav and forms.
- `prefers-reduced-motion` respected globally and in the animated stat counters.
- Per-page `generateMetadata`/`metadata` exports, OpenGraph tags, dynamic `sitemap.xml` and `robots.txt`, breadcrumb navigation on tour/destination/blog detail pages.

## Connecting to a Laravel REST API

Every mock data file in `/data` mirrors a plausible REST resource (`/api/tours`, `/api/destinations`, `/api/bookings`, etc.). Replace the static imports with `fetch()` calls (or a small typed API client in `/lib`) against your Laravel endpoints, keeping the same TypeScript interfaces in `/types` as your contract.
