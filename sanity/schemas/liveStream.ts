import { defineField, defineType } from "sanity";

/**
 * Transmisiones programadas — fuente de verdad para LiveStreamHero.
 * Omnicanal: plainSummary + slug para consultas de bots.
 */
export const liveStream = defineType({
  name: "liveStream",
  title: "Transmisión en vivo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "scheduledStart",
      title: "Inicio programado",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scheduledEnd",
      title: "Fin programado",
      type: "datetime",
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube Video ID",
      type: "string",
      description:
        "ID del video o del live. Si está vacío, se consulta el canal vía API.",
    }),
    defineField({
      name: "youtubeBroadcastId",
      title: "YouTube Broadcast ID",
      type: "string",
      description: "Opcional: ID del evento de live en YouTube Studio.",
    }),
    defineField({
      name: "plainSummary",
      title: "Resumen (bots)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "isActive",
      title: "Marcar como activo manualmente",
      type: "boolean",
      description:
        "Override editorial cuando la API de YouTube aún no refleja el live.",
      initialValue: false,
    }),
    defineField({
      name: "thumbnail",
      title: "Miniatura personalizada",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      start: "scheduledStart",
      active: "isActive",
    },
    prepare({ title, start, active }) {
      return {
        title: active ? `🔴 ${title}` : title,
        subtitle: start
          ? new Date(start).toLocaleString("es-DO", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "",
      };
    },
  },
});
