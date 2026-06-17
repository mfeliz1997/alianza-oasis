import type { Locale } from "./locale";

const messages = {
  es: {
    nav: {
      home: "Inicio",
      leaders: "Liderazgo",
      ministries: "Ministerios",
      giving: "Dar",
      about: "Nosotros",
      events: "Eventos",
      contact: "Contacto",
      live: "En vivo",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
    },
    hero: {
      location: "Washington Heights, NYC",
      welcomeLine1: "Una iglesia en el corazón de la ciudad",
      welcomeLine2: "Con la ciudad en el corazón",
      planVisit: "Planifica tu visita",
      watchYoutube: "Ver en YouTube",
      scrollHint: "Desplazar",
    },
    live: {
      eyebrow: "Próxima transmisión",
      liveBadge: "En vivo",
      days: "Días",
      hours: "Horas",
      minutes: "Min",
      seconds: "Seg",
    },
    schedule: {
      eyebrow: "Horario",
      title: "Días de servicio",
      intro:
        "Únete a nosotros en persona en Washington Heights. También transmitimos en YouTube los domingos.",
      liveBadge: "En vivo",
      spanishService: "Primer servicio dominical",
      englishService: "Segundo servicio dominical",
      fridayService: "Servicio de viernes",
      saturdayService: "Servicio de sábado",
      languageSpanish: "Español",
      languageEnglish: "Inglés",
      languageBoth: "Español e Inglés",
      shortAddress: "141 Audubon Ave, Washington Heights",
      timeSundayFirst: "Domingo · 9:45 AM",
      timeSundaySecond: "Domingo · 12:00 PM",
      timeFriday: "Viernes · 8:00 PM",
      timeSaturday: "Sábado · 6:00 PM",
      noteFriday: "Presencial en el templo",
      directionsTrain: "Toma el tren A o C hasta la calle 168.",
    },
    services: {
      eyebrow: "Servicios",
      title: "Nuestras reuniones",
    },
    visit: {
      eyebrow: "Visítanos",
      title: "Washington Heights, NYC",
      contact: "Contacto",
      directionsParking:
        "Ofrecemos etiquetas de doble estacionamiento durante el horario de los servicios dominicales.",
    },
    events: {
      eyebrow: "Eventos",
      title: "Próximos eventos",
      viewAll: "Ver todos",
      empty: "No hay eventos programados por el momento",
    },
    loader: {
      ariaLabel: "Cargando sitio",
      loading: "Dios te bendiga",
    },
    community: {
      eyebrow: "Comunidad",
      title: "Una familia en Cristo",
    },
    ministriesPage: {
      eyebrow: "Ministerios",
      vision: "Visión",
      mission: "Misión",
      followUs: "¡Síguenos!",
    },
    contactPage: {
      title: "Contacto",
      intro:
        "Ya sea tu primera vez conectando con una iglesia o la primera en mucho tiempo, perteneces aquí. Completa el formulario y te contactaremos lo antes posible.",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo",
      directions: "Cómo llegar",
      name: "Nombre",
      message: "Mensaje",
      submit: "Enviar mensaje",
    },
  },
  en: {
    nav: {
      home: "Home",
      leaders: "Leadership",
      ministries: "Ministries",
      giving: "Give",
      about: "About",
      events: "Events",
      contact: "Contact",
      live: "Live",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    hero: {
      location: "Washington Heights, NYC",
      welcomeLine1: "A church in the heart of the city",
      welcomeLine2: "With the city in the heart",
      planVisit: "Plan your visit",
      watchYoutube: "Watch on YouTube",
      scrollHint: "Scroll",
    },
    live: {
      eyebrow: "Next broadcast",
      liveBadge: "Live now",
      days: "Days",
      hours: "Hours",
      minutes: "Min",
      seconds: "Sec",
    },
    schedule: {
      eyebrow: "Schedule",
      title: "Service times",
      intro:
        "Join us in person in Washington Heights. We also stream on YouTube on Sundays.",
      liveBadge: "Live",
      spanishService: "First Sunday service",
      englishService: "Second Sunday service",
      fridayService: "Friday service",
      saturdayService: "Saturday service",
      languageSpanish: "Spanish",
      languageEnglish: "English",
      languageBoth: "Spanish & English",
      shortAddress: "141 Audubon Ave, Washington Heights",
      timeSundayFirst: "Sunday · 9:45 AM",
      timeSundaySecond: "Sunday · 12:00 PM",
      timeFriday: "Friday · 8:00 PM",
      timeSaturday: "Saturday · 6:00 PM",
      noteFriday: "In person at the church",
      directionsTrain: "Take the A or C train to 168th Street.",
    },
    services: {
      eyebrow: "Services",
      title: "Our gatherings",
    },
    visit: {
      eyebrow: "Visit us",
      title: "Washington Heights, NYC",
      contact: "Contact",
      directionsParking:
        "Double parking tags are available during Sunday service hours.",
    },
    events: {
      eyebrow: "Events",
      title: "Upcoming events",
      viewAll: "View all",
      empty: "No upcoming events at this time",
    },
    loader: {
      ariaLabel: "Loading site",
      loading: "Loading",
    },
    community: {
      eyebrow: "Community",
      title: "A family in Christ",
    },
    ministriesPage: {
      eyebrow: "Ministries",
      vision: "Vision",
      mission: "Mission",
      followUs: "Follow us!",
    },
    contactPage: {
      title: "Contact",
      intro:
        "Whether this is your first time connecting with a church or your first time in a long time, you belong here. Fill out the form and we will get back to you as soon as possible.",
      address: "Address",
      phone: "Phone",
      email: "Email",
      directions: "Directions",
      name: "Name",
      message: "Message",
      submit: "Send message",
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
