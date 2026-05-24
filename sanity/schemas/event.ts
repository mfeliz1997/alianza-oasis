import { defineField, defineType } from "sanity";

/**
 * Eventos omnicanal: campos planos y slug para bots (WhatsApp, etc.)
 */
export const event = defineType({
  name: "event",
  title: "Evento",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "schedule", title: "Programación" },
    { name: "meta", title: "Meta / Omnicanal" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Fecha de inicio",
      type: "datetime",
      group: "schedule",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Fecha de fin",
      type: "datetime",
      group: "schedule",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      group: "content",
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
      name: "description",
      title: "Descripción",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "plainDescription",
      title: "Descripción plana (bots)",
      type: "text",
      group: "meta",
      description:
        "Resumen en texto plano para WhatsApp, SMS y APIs sin Portable Text.",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "location",
      title: "Ubicación",
      type: "string",
      group: "schedule",
    }),
    defineField({
      name: "isFeatured",
      title: "Destacado",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "externalId",
      title: "ID externo",
      type: "string",
      group: "meta",
      description: "Identificador para sincronización con otros canales.",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Fecha (próximos primero)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      date: "startDate",
      featured: "isFeatured",
    },
    prepare({ title, media, date, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: date
          ? new Date(date).toLocaleString("es-DO", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "Sin fecha",
        media,
      };
    },
  },
});
