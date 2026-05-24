import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

/** Página de inicio — edición tipo WordPress (un solo documento). */
export const homeType: SchemaTypeDefinition = defineType({
  name: "home",
  title: "Página de Inicio",
  type: "document",
  groups: [
    { name: "hero", title: "Hero / Portada", default: true },
    { name: "welcome", title: "Bienvenida" },
    { name: "schedule", title: "Horarios" },
    { name: "cta", title: "Botones" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título principal (Hero)",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo (Hero)",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen de portada",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Video de fondo — URL (MP4)",
      type: "url",
      group: "hero",
      description: "Video de adoración/iglesia. Se ve translúcido detrás del hero.",
    }),
    defineField({
      name: "heroVideo",
      title: "Video de fondo — archivo",
      type: "file",
      group: "hero",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "welcomeEyebrow",
      title: "Etiqueta superior (bienvenida)",
      type: "string",
      group: "welcome",
      initialValue: "Ven tal como eres",
    }),
    defineField({
      name: "welcomeTitle",
      title: "Título de bienvenida",
      type: "text",
      rows: 2,
      group: "welcome",
    }),
    defineField({
      name: "welcomeSubtitleEn",
      title: "Subtítulo en inglés",
      type: "string",
      group: "welcome",
    }),
    defineField({
      name: "scheduleTitle",
      title: "Título sección horarios",
      type: "string",
      group: "schedule",
      initialValue: "Días de servicio",
    }),
    defineField({
      name: "scheduleIntro",
      title: "Texto introductorio horarios",
      type: "text",
      rows: 2,
      group: "schedule",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Botón principal — texto",
      type: "string",
      group: "cta",
      initialValue: "Planifica tu visita",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "Botón principal — enlace",
      type: "string",
      group: "cta",
      initialValue: "/contact-us",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Botón secundario — texto",
      type: "string",
      group: "cta",
      initialValue: "Ver en YouTube",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "Botón secundario — enlace",
      type: "url",
      group: "cta",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "heroImage" },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Página de Inicio",
        subtitle: subtitle ?? "Edita todo el home aquí",
        media,
      };
    },
  },
});
