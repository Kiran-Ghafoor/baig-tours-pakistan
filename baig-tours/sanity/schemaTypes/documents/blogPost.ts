import { defineType, defineField } from "sanity";
import blockContent from "../blockContent";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: () => "✍️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
      description: "Short summary shown on blog listing cards",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorAvatar",
      title: "Author Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Travel Guides", value: "Travel Guides" },
          { title: "Trekking", value: "Trekking" },
          { title: "Destinations", value: "Destinations" },
          { title: "Sustainability", value: "Sustainability" },
          { title: "Tips & Packing", value: "Tips & Packing" },
          { title: "Culture", value: "Culture" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "6 min read"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", type: "string", title: "Meta Title", validation: (rule) => rule.max(60) }),
        defineField({ name: "metaDescription", type: "text", title: "Meta Description", rows: 3, validation: (rule) => rule.max(160) }),
      ],
    }),
  ],
  orderings: [
    { title: "Published Date (newest)", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image", date: "publishedAt" },
  },
});
