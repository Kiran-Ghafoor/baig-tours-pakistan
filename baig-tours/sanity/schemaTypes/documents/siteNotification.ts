import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteNotification",
  title: "Site Notification",
  type: "document",
  icon: () => "🔔",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "string",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "promo",
      options: {
        list: [
          { title: "Promo", value: "promo" },
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Announcement", value: "announcement" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Only active notifications are shown on the site.",
    }),
    defineField({
      name: "scheduledAt",
      title: "Start Date",
      type: "datetime",
      description: "When to start showing this notification. Leave empty to show immediately.",
    }),
    defineField({
      name: "expiresAt",
      title: "Expiry Date",
      type: "datetime",
      description: "When to stop showing this notification. Leave empty to never expire.",
    }),
    defineField({
      name: "link",
      title: "CTA Link",
      type: "string",
      description: "Optional URL for a call-to-action button (e.g. /tours).",
    }),
    defineField({
      name: "linkText",
      title: "CTA Button Text",
      type: "string",
      description: 'Text for the call-to-action button (e.g. "View Tours").',
      validation: (rule) => rule.max(40),
    }),
  ],
  orderings: [
    { title: "Newest First", name: "dateDesc", by: [{ field: "scheduledAt", direction: "desc" }] },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "variant",
      active: "isActive",
      scheduledAt: "scheduledAt",
      expiresAt: "expiresAt",
    },
    prepare({ title, subtitle, active, scheduledAt, expiresAt }) {
      const now = new Date();
      const scheduled = scheduledAt ? new Date(scheduledAt) : null;
      const expired = expiresAt ? new Date(expiresAt) : null;
      let status = "";
      if (!active) status = "[Inactive] ";
      else if (scheduled && scheduled > now) status = "[Scheduled] ";
      else if (expired && expired < now) status = "[Expired] ";
      return { title: `${status}${title}`, subtitle: subtitle };
    },
  },
});
