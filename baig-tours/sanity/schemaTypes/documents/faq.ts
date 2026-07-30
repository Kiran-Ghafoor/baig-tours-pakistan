import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: () => "❓",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      initialValue: "General",
      options: {
        list: [
          { title: "General", value: "General" },
          { title: "Booking", value: "Booking" },
          { title: "Safety", value: "Safety" },
          { title: "Payment", value: "Payment" },
          { title: "Packing & Gear", value: "Packing & Gear" },
          { title: "Visa & Permits", value: "Visa & Permits" },
        ],
      },
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
    select: { title: "question", subtitle: "category" },
  },
});
