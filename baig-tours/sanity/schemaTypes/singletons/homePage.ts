import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: () => "🏠",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      initialValue: "Pakistan Baig Tours",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "Trips that turn into the stories you tell.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroButtons",
      title: "Hero Buttons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Button Label", validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "string", title: "URL", validation: (rule) => rule.required() }),
            defineField({
              name: "variant",
              type: "string",
              title: "Style",
              options: {
                list: [
                  { title: "Primary (Gold)", value: "primary" },
                  { title: "Outline Light", value: "outline-light" },
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "variant" },
          },
        }),
      ],
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Background Slides",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "searchSection",
      title: "Search Bar Section",
      type: "object",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Show Search Bar", initialValue: true }),
      ],
    }),
    defineField({
      name: "featuredToursHeading",
      title: "Featured Tours Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Handpicked Journeys" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Featured tours our travelers keep booking" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
      ],
    }),
    defineField({
      name: "destinationsHeading",
      title: "Destinations Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Where To Next" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Popular destinations across the north" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats Band",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "number", title: "Value", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "categoriesHeading",
      title: "Categories Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Travel Your Way" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Six ways to experience Pakistan" }),
      ],
    }),
    defineField({
      name: "reviewsHeading",
      title: "Reviews Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Traveler Stories" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Loved by thousands of Pakistani travelers" }),
      ],
    }),
    defineField({
      name: "reelsHeading",
      title: "Reels Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Watch Before You Book" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Travel reels from the trail" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
      ],
    }),
    defineField({
      name: "reels",
      title: "Travel Reels",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title", validation: (rule) => rule.required() }),
            defineField({ name: "thumbnail", type: "image", title: "Thumbnail", options: { hotspot: true } }),
            defineField({ name: "videoUrl", type: "url", title: "Video URL" }),
          ],
          preview: { select: { title: "title", media: "thumbnail" } },
        }),
      ],
    }),
    defineField({
      name: "blogsHeading",
      title: "Blogs Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "From The Journal" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Stories, guides & field notes" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
      ],
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter Section Heading",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Stay Inspired" }),
        defineField({ name: "title", type: "string", title: "Title", initialValue: "Get first access to new routes & seasonal offers" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
