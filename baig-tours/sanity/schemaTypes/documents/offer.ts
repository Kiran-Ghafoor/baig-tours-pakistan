import { defineType, defineField } from "sanity";

export default defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  icon: () => "🎁",
  fields: [
    defineField({
      name: "title",
      title: "Offer Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge Label",
      type: "string",
      description: 'Short badge shown on the card (e.g. "20% OFF", "Early Bird")',
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: "discountPercent",
      title: "Discount %",
      type: "number",
      validation: (rule) => rule.min(1).max(100),
    }),
    defineField({
      name: "promoCode",
      title: "Promo Code",
      type: "string",
      description: "Optional coupon code",
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
    }),
    defineField({
      name: "tours",
      title: "Applicable Tours",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tourPackage" }] }],
      description: "Leave empty to apply to all tours",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "badge", media: "image", active: "isActive" },
    prepare({ title, subtitle, media, active }) {
      return { title: active ? title : `⏸ ${title}`, subtitle, media };
    },
  },
});
