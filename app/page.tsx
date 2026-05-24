import { LiveStreamHeroSection } from "@/components/live-stream/LiveStreamHeroSection";
import { EventsCarousel } from "@/components/events/EventsCarousel";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { ServiceScheduleSection } from "@/components/home/ServiceScheduleSection";
import { ServiciosSection } from "@/components/home/ServiciosSection";
import { VisitSection } from "@/components/home/VisitSection";

export default function HomePage() {
  return (
    <>
      <LiveStreamHeroSection />
      <WelcomeSection />
      <ServiceScheduleSection />
      <ServiciosSection />
      <EventsCarousel />
      <VisitSection />
    </>
  );
}
