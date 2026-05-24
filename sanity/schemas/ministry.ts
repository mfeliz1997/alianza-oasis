import { defineField, defineType } from "sanity";

export const ministry = defineType({
  name: "ministry",
  title: "Ministerio",
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
      name: "leaderInCharge",
      title: "Líder a cargo",
      type: "reference",
      to: [{ type: "leader" }],
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "plainDescription",
      title: "Descripción plana (bots)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "regularSchedule",
      title: "Horario regular",
      type: "string",
      description: 'Ej: "Domingos 10:00 AM" o "Viernes 7:00 PM"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Orden en el grid",
      type: "number",
      initialValue: 0,
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
    select: {
      title: "name",
      subtitle: "regularSchedule",
      media: "coverImage",
      leader: "leaderInCharge.name",
    },
    prepare({ title, subtitle, media, leader }) {
      return {
        title,
        subtitle: leader ? `${subtitle} · ${leader}` : subtitle,
        media,
      };
    },
  },
});
