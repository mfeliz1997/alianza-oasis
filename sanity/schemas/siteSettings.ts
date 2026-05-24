import { defineField, defineType } from "sanity";

/** Singleton: edita logo, colores, redes, contacto y donaciones como WordPress. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración global",
  type: "document",
  groups: [
    { name: "brand", title: "Marca y colores", default: true },
    { name: "social", title: "Redes sociales" },
    { name: "contact", title: "Contacto" },
    { name: "giving", title: "Donaciones" },
    { name: "about", title: "Página Nosotros" },
    { name: "live", title: "YouTube Live" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Nombre del sitio",
      type: "string",
      group: "brand",
      initialValue: "Iglesia Alianza Oasis",
    }),
    defineField({
      name: "siteTitleEn",
      title: "Nombre en inglés",
      type: "string",
      group: "brand",
      initialValue: "Oasis Alliance Church",
    }),
    defineField({
      name: "tagline",
      title: "Eslogan principal",
      type: "text",
      rows: 2,
      group: "brand",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "brand",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt", type: "string" }),
      ],
    }),
    defineField({
      name: "brandColors",
      title: "Colores de marca (hex)",
      type: "object",
      group: "brand",
      description: "Afectan acentos en el sitio. El fondo sigue siendo blanco predominante.",
      fields: [
        defineField({
          name: "navy",
          title: "Azul marino (principal)",
          type: "string",
          initialValue: "#1e3a5f",
        }),
        defineField({
          name: "gold",
          title: "Dorado (acento)",
          type: "string",
          initialValue: "#c9a227",
        }),
        defineField({
          name: "teal",
          title: "Verde azulado",
          type: "string",
          initialValue: "#2a7f8f",
        }),
        defineField({
          name: "sky",
          title: "Celeste suave",
          type: "string",
          initialValue: "#e8f4fc",
        }),
        defineField({
          name: "warm",
          title: "Crema cálido",
          type: "string",
          initialValue: "#faf6ef",
        }),
      ],
    }),
    defineField({
      name: "socialUrls",
      title: "Enlaces de redes",
      type: "object",
      group: "social",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
        defineField({ name: "whatsapp", title: "WhatsApp", type: "url" }),
      ],
    }),
    defineField({
      name: "contactPhone",
      title: "Teléfono",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Correo",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "contactIntro",
      title: "Texto intro formulario de contacto",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Dirección",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "directionsTrain",
      title: "Cómo llegar — tren",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "directionsParking",
      title: "Cómo llegar — estacionamiento",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps (embed URL)",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "giving",
      title: "Donaciones",
      type: "object",
      group: "giving",
      fields: [
        defineField({
          name: "zelleEmailOrPhone",
          title: "Zelle",
          type: "string",
        }),
        defineField({
          name: "bankAccounts",
          title: "Cuentas bancarias",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "bankName",
                  title: "Banco",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "accountNumber",
                  title: "Número",
                  type: "string",
                }),
                defineField({
                  name: "accountHolder",
                  title: "Titular",
                  type: "string",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "onlineGivingUrl",
          title: "URL donar en línea",
          type: "url",
        }),
        defineField({
          name: "givingMessage",
          title: "Mensaje",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "aboutTitle",
      title: "Título — Lo que creemos",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutIntro",
      title: "Introducción de fe",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "aboutNote",
      title: "Nota C&MA",
      type: "text",
      rows: 2,
      group: "about",
    }),
    defineField({
      name: "defaultHero",
      title: "Hero alternativo (sin live)",
      type: "object",
      group: "live",
      fields: [
        defineField({ name: "headline", title: "Titular", type: "string" }),
        defineField({ name: "subheadline", title: "Subtítulo", type: "string" }),
        defineField({
          name: "backgroundVideoUrl",
          title: "Video fondo URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "youtubeChannelId",
      title: "YouTube Channel ID",
      type: "string",
      group: "live",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración global del sitio" };
    },
  },
});
