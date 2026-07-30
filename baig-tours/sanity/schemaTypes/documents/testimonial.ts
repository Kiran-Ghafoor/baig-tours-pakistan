import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: () => "⭐",
  fields: [
    defineField({
      name: "name",
      title: "Customer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Rating (out of 5)",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "tour",
      title: "Tour Package",
      type: "reference",
      to: [{ type: "tourPackage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comment",
      title: "Review Comment",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Newest First", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Highest Rating", name: "ratingDesc", by: [{ field: "rating", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "tour.title", media: "avatar", rating: "rating" },
    prepare({ title, subtitle, media, rating }) {
      return { title, subtitle: `${"★".repeat(Math.round(rating ?? 5))} · ${subtitle ?? ""}`, media };
    },
  },
});
