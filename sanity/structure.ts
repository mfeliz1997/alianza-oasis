import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "siteSettings", schema: "siteSettings", title: "Configuración global" },
  { id: "home", schema: "home", title: "Página de inicio" },
] as const;

export const structure: StructureResolver = (S) => {
  const singletonItems = SINGLETONS.map(({ id, schema, title }) =>
    S.listItem()
      .title(title)
      .id(id)
      .child(
        S.document()
          .schemaType(schema)
          .documentId(id)
          .title(title)
      )
  );

  const hidden = new Set([
    ...SINGLETONS.map((s) => s.schema),
    "media.tag",
  ]);

  return S.list()
    .title("Panel del sitio")
    .items([
      ...singletonItems,
      S.divider(),
      S.listItem()
        .title("Servicios (horarios)")
        .schemaType("servicio")
        .child(S.documentTypeList("servicio").title("Servicios")),
      S.listItem()
        .title("Eventos")
        .schemaType("event")
        .child(S.documentTypeList("event").title("Eventos")),
      S.listItem()
        .title("Líderes")
        .schemaType("leader")
        .child(S.documentTypeList("leader").title("Líderes")),
      S.listItem()
        .title("Ministerios")
        .schemaType("ministry")
        .child(S.documentTypeList("ministry").title("Ministerios")),
      S.listItem()
        .title("Transmisiones en vivo")
        .schemaType("liveStream")
        .child(S.documentTypeList("liveStream").title("Live streams")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !hidden.has(item.getId() ?? "")
      ),
    ]);
};
