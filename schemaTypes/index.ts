import type { SchemaTypeDefinition } from "sanity";
import { homeType } from "./home";
import { servicioType } from "./servicio";
import { event } from "../sanity/schemas/event";
import { leader } from "../sanity/schemas/leader";
import { ministry } from "../sanity/schemas/ministry";
import { siteSettings } from "../sanity/schemas/siteSettings";
import { liveStream } from "../sanity/schemas/liveStream";

export const schemaTypes: SchemaTypeDefinition[] = [
  homeType,
  servicioType,
  event,
  leader,
  ministry,
  siteSettings,
  liveStream,
];
