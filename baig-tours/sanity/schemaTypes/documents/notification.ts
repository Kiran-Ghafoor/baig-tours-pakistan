import { defineType, defineField } from "sanity";

export default defineType({
  name: "notification",
  title: "Notification",
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
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Booking", value: "booking" },
          { title: "Review", value: "review" },
          { title: "Contact", value: "contact" },
          { title: "Cancellation", value: "cancellation" },
          { title: "System", value: "system" },
        ],
      },
    }),
    defineField({
      name: "read",
      title: "Read",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: "Newest First", name: "dateDesc", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "type", date: "createdAt" },
  },
});
