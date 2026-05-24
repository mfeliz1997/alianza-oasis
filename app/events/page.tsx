import type { Metadata } from "next";
import { EventsCarousel } from "@/components/events/EventsCarousel";

export const metadata: Metadata = {
  title: "Eventos",
};

export default function EventsPage() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h1 className="text-4xl font-semibold tracking-tight">Eventos y anuncios</h1>
        <p className="mt-4 text-muted-foreground">
          Calendario de actividades, conferencias y reuniones especiales.
        </p>
      </div>
      <EventsCarousel />
    </div>
  );
}
