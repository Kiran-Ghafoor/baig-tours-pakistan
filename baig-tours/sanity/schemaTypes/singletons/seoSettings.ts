import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  icon: () => "🔍",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Default Meta Title",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "focusKeywords",
      title: "Focus Keywords",
      type: "string",
      description: "Comma-separated keywords for SEO",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Shared image for social media (1200×630 recommended)",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalDomain",
      title: "Canonical Domain",
      type: "url",
      initialValue: "https://www.baigtourspakistan.pk",
    }),
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Baig Tours Pakistan",
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      initialValue: "en_PK",
    }),
  ],
  preview: {
    prepare() {
      return { title: "SEO Settings" };
    },
  },
});
