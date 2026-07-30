import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./blockContent";

import tourPackage from "./documents/tourPackage";
import destination from "./documents/destination";
import category from "./documents/category";
import blogPost from "./documents/blogPost";
import galleryImage from "./documents/galleryImage";
import testimonial from "./documents/testimonial";
import faq from "./documents/faq";
import offer from "./documents/offer";
import teamMember from "./documents/teamMember";
import notification from "./documents/notification";
import siteNotification from "./documents/siteNotification";

import homePage from "./singletons/homePage";
import siteSettings from "./singletons/siteSettings";
import seoSettings from "./singletons/seoSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,

  tourPackage,
  destination,
  category,
  blogPost,
  galleryImage,
  testimonial,
  faq,
  offer,
  teamMember,
  notification,
  siteNotification,

  homePage,
  siteSettings,
  seoSettings,
];
