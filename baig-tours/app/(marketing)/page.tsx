import { Hero } from "@/components/home/hero";
import { SmartSearch } from "@/components/home/smart-search";
import { FeaturedTours } from "@/components/home/featured-tours";
import { PopularDestinations } from "@/components/home/popular-destinations";
import { StatsBand } from "@/components/home/stats-band";
import { TravelCategories } from "@/components/home/travel-categories";
import { PakistanMap } from "@/components/home/pakistan-map";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { TravelReels } from "@/components/home/travel-reels";
import { TravelBlogs } from "@/components/home/travel-blogs";
import { Newsletter } from "@/components/home/newsletter";
import { MountainDivider } from "@/components/shared/mountain-divider";
import { NotificationBar } from "@/components/home/notification-bar";
import { getFeaturedTours, getGalleryImages, getHomePageData, getSiteNotifications } from "@/lib/queries";

export default async function HomePage() {
  const [featuredTours, galleryItems, homePage, siteNotifications] = await Promise.all([
    getFeaturedTours(),
    getGalleryImages(),
    getHomePageData(),
    getSiteNotifications(),
  ]);

  return (
    <>
      {siteNotifications.length > 0 && (
        <NotificationBar notifications={siteNotifications} />
      )}
      <Hero
        eyebrow={homePage.heroEyebrow}
        heading={homePage.heroHeading}
        subheading={homePage.heroSubheading}
        slides={homePage.heroSlides}
        buttons={homePage.heroButtons}
      />
      <SmartSearch />
      <FeaturedTours tours={featuredTours} heading={homePage.featuredToursHeading} />
      <div className="text-charcoal-950">
        <MountainDivider />
      </div>
      <PopularDestinations />
      <StatsBand stats={homePage.stats} />
      <TravelCategories />
      <PakistanMap />
      <div className="text-charcoal-950">
        <MountainDivider />
      </div>
      <CustomerReviews />
      <InstagramGallery galleryItems={galleryItems} />
      <TravelReels />
      <TravelBlogs />
      <Newsletter />
    </>
  );
}
