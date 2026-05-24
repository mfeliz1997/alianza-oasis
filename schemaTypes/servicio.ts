import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

export const servicioType: SchemaTypeDefinition = defineType({
  name: "servicio",
  title: "Servicios",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
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
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "descripcion",
      media: "imagen",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Servicio",
        subtitle: subtitle ?? "",
        media,
      };
    },
  },
});
