import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 40 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (Mountain, Footprints, Gem, Users, Landmark, Heart)",
      options: {
        list: [
          { title: "Mountain", value: "Mountain" },
          { title: "Footprints", value: "Footprints" },
          { title: "Gem", value: "Gem" },
          { title: "Users", value: "Users" },
          { title: "Landmark", value: "Landmark" },
          { title: "Heart", value: "Heart" },
          { title: "Compass", value: "Compass" },
          { title: "Sun", value: "Sun" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.max(120),
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
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
  },
});
