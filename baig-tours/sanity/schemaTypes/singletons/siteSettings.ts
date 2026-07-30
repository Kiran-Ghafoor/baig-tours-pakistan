import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    // ─── BRAND ────────────────────────────────────
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      initialValue: "Baig Tours Pakistan",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
      description: "Short paragraph under logo in footer",
    }),

    // ─── CONTACT ──────────────────────────────────
    defineField({
      name: "contact",
      title: "Contact Details",
      type: "object",
      fields: [
        defineField({ name: "phone", type: "string", title: "Phone", validation: (rule) => rule.required() }),
        defineField({ name: "email", type: "string", title: "Email", validation: (rule) => rule.required().email() }),
        defineField({ name: "address", type: "string", title: "Office Address", validation: (rule) => rule.required() }),
        defineField({ name: "workingHours", type: "string", title: "Working Hours" }),
        defineField({ name: "departureDays", type: "string", title: "Departure Days" }),
      ],
    }),

    // ─── SOCIAL MEDIA ─────────────────────────────
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url", title: "Facebook URL" }),
        defineField({ name: "instagram", type: "url", title: "Instagram URL" }),
        defineField({ name: "youtube", type: "url", title: "YouTube URL" }),
        defineField({ name: "tiktok", type: "url", title: "TikTok URL" }),
        defineField({
          name: "whatsapp",
          type: "string",
          title: "WhatsApp Number",
          description: "Include country code without +, e.g. 923079222271",
        }),
      ],
    }),

    // ─── MAPS & POLICIES ──────────────────────────
    defineField({
      name: "googleMapsEmbed",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Paste the Google Maps embed URL (the src from the iframe share link).",
    }),
    defineField({
      name: "privacyPolicySlug",
      title: "Privacy Policy Page",
      type: "slug",
      description: "Slug of the privacy policy page (e.g. privacy-policy).",
    }),
    defineField({
      name: "termsSlug",
      title: "Terms & Conditions Page",
      type: "slug",
      description: "Slug of the terms page (e.g. terms-and-conditions).",
    }),

    // ─── ABOUT (for /about page) ──────────────────
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Our Story" }),
        defineField({ name: "title", type: "string", title: "Section Title" }),
        defineField({ name: "description", type: "text", title: "Description", rows: 6 }),
        defineField({ name: "teamImage", type: "image", title: "Team Image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "founder",
      title: "Founder",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "role", type: "string", title: "Role" }),
        defineField({ name: "photo", type: "image", title: "Photo", options: { hotspot: true } }),
        defineField({ name: "quote", type: "text", title: "Founder Quote", rows: 3 }),
      ],
    }),
    defineField({
      name: "values",
      title: "Company Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", title: "Icon Name" }),
            defineField({ name: "title", type: "string", title: "Title", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
