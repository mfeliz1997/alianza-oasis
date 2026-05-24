import { defineField, defineType } from "sanity";

export const leader = defineType({
  name: "leader",
  title: "Líder",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / Cargo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Bio corta",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "order",
      title: "Orden de visualización",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "socialLinks",
      title: "Redes sociales",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "twitter", title: "X / Twitter", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({
          name: "whatsapp",
          title: "WhatsApp (wa.me)",
          type: "url",
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Orden",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
