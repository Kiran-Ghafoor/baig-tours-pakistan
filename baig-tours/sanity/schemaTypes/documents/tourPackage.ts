import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",
  icon: () => "🏔️",
  fields: [
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Badge Tag",
      type: "string",
      description: 'Short label shown on the tour card (e.g. "Most Loved", "Best Value")',
      options: {
        list: [
          { title: "Most Loved", value: "Most Loved" },
          { title: "Best Value", value: "Best Value" },
          { title: "Adventure", value: "Adventure" },
          { title: "Family Favorite", value: "Family Favorite" },
          { title: "Expedition", value: "Expedition" },
          { title: "City Break", value: "City Break" },
          { title: "Romantic", value: "Romantic" },
          { title: "Trekking", value: "Trekking" },
        ],
      },
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Gilgit-Baltistan", value: "Gilgit-Baltistan" },
          { title: "Khyber Pakhtunkhwa", value: "Khyber Pakhtunkhwa" },
          { title: "Punjab", value: "Punjab" },
          { title: "Sindh", value: "Sindh" },
          { title: "Balochistan", value: "Balochistan" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: "highlights",
      title: "Trip Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "price",
      title: "Price (PKR)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (PKR)",
      type: "number",
      description: "Show crossed-out price if there's a discount",
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "6 Days / 5 Nights"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nights",
      title: "Number of Nights",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "string",
      description: 'e.g. "2–12 people"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Easy", value: "Easy" },
          { title: "Moderate", value: "Moderate" },
          { title: "Challenging", value: "Challenging" },
          { title: "Expert", value: "Expert" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "included",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "excluded",
      title: "What's Not Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "itinerary",
      title: "Day-by-Day Itinerary",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "day", type: "number", title: "Day #", validation: (rule) => rule.required().min(1) }),
            defineField({ name: "title", type: "string", title: "Day Title", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", title: "Description", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { day: "day", title: "title" },
            prepare({ day, title }) {
              return { title: `Day ${day}: ${title}` };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      validation: (rule) => rule.min(0).max(5),
      initialValue: 0,
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "bookedCount",
      title: "Times Booked",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Price: Low to High", name: "priceAsc", by: [{ field: "price", direction: "asc" }] },
    { title: "Price: High to Low", name: "priceDesc", by: [{ field: "price", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "destination.name", media: "image", price: "price", tag: "tag" },
    prepare({ title, subtitle, media, price, tag }) {
      return { title, subtitle: tag ? `[${tag}] ${subtitle ?? ""}` : subtitle ?? "", media };
    },
  },
});
