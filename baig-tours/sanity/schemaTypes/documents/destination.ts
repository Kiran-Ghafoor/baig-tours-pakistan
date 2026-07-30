import { defineType, defineField } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  icon: () => "📍",
  fields: [
    defineField({
      name: "name",
      title: "Destination Name",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "province",
      title: "Province",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "bestTime",
      title: "Best Time to Visit",
      type: "string",
      description: 'e.g. "April – October"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates (%)",
      type: "object",
      description: "Percentage position on the Pakistan map component (x: 0–100, y: 0–100)",
      fields: [
        defineField({ name: "x", type: "number", title: "X %", validation: (rule) => rule.min(0).max(100) }),
        defineField({ name: "y", type: "number", title: "Y %", validation: (rule) => rule.min(0).max(100) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "province", media: "image" },
  },
});
