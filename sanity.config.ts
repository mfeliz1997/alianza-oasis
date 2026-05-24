import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "alianza-oasis",
  title: "Alianza Oasis Studio",
  projectId: "48pjmhf7",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
