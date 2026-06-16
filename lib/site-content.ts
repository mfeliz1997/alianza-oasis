/**
 * Contenido migrado desde https://www.alianzaoasis.com/
 * Fuente de verdad hasta completar Sanity CMS.
 */

export const siteContent = {
  name: "Iglesia Alianza Oasis",
  nameEn: "Oasis Alliance Church",
  location: "New York, NY",
  tagline:
    "Somos una iglesia en el corazón de la comunidad, con la comunidad en el corazón.",
  taglineEn:
    "We are a church in the heart of the community, with the community in our heart.",
  welcomeCta: "Ven tal como eres",
  welcomeSub: "Una familia en Cristo",
  hero: {
    headline: "Iglesia Alianza Oasis",
    subheadline:
      "Adoración, comunidad y esperanza en Washington Heights, NYC. Únete a nosotros en persona o en vivo.",
    ctaLabel: "Planifica tu visita",
    ctaHref: "/contact-us",
    secondaryCtaLabel: "Ver en YouTube",
    secondaryCtaHref: "https://www.youtube.com/@IglesiaAlianzaOasisNY",
  },
  address: {
    line1: "141 Audubon Ave",
    city: "New York",
    state: "NY",
    zip: "10032",
    full: "141 Audubon Ave, New York, NY 10032",
  },
  directions: {
    train: "Toma el tren A o C hasta la calle 168.",
    drivers:
      "Ofrecemos etiquetas de doble estacionamiento durante el horario de los servicios dominicales.",
  },
  contact: {
    phone: "212-928-3404",
    phoneHref: "tel:+12129283404",
    email: "info@alianzaoasis.com",
    contactIntro:
      "Ya sea tu primera vez conectando con una iglesia o la primera en mucho tiempo, perteneces aquí. Completa el formulario y te contactaremos lo antes posible.",
  },
  social: {
    youtube: "https://www.youtube.com/@IglesiaAlianzaOasisNY",
    youtubeLabel: "Iglesia Alianza Oasis NY",
    facebook: "https://www.facebook.com/AlianzaOasisNY",
    facebookLabel: "Alianza Oasis NY",
    instagram: "https://www.instagram.com/iglesiaalianzaoasis/",
    instagramHandle: "@iglesiaalianzaoasis",
  },
  youtube: {
    channelHandle: "IglesiaAlianzaOasisNY",
    channelUrl: "https://www.youtube.com/@IglesiaAlianzaOasisNY",
    liveTitle: "Transmisión en vivo — Alianza Oasis",
    countdownTitle: "Próximo servicio en vivo",
  },
  logo: {
    src: "/images/logo.avif",
    alt: "Logo Iglesia Alianza Oasis",
  },
  /** Fallback si no hay video en Sanity (home). Sustituir por tu MP4 en producción. */
  heroVideoUrl: "/media/hero.mp4",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=141+Audubon+Ave,+New+York,+NY+10032&hl=es&z=15&output=embed",
  serviceSchedule: [
    {
      id: "sunday-first",
      day: 0,
      hour: 9,
      minute: 45,
      title: "Primer servicio dominical",
      timeLabel: "Domingo · 9:45 AM",
      languages: "Español",
      note: "",
      inPerson: true,
      streamed: true,
    },
    {
      id: "sunday-second",
      day: 0,
      hour: 12,
      minute: 0,
      title: "Segundo servicio dominical",
      timeLabel: "Domingo · 12:00 PM",
      languages: "Inglés",
      note: "",
      inPerson: true,
      streamed: true,
    },
    {
      id: "friday",
      day: 5,
      hour: 20,
      minute: 0,
      title: "Servicio de viernes",
      timeLabel: "Viernes · 8:00 PM",
      languages: "Español",
      note: "Presencial en el templo",
      inPerson: true,
      streamed: false,
    },
    {
      id: "saturday",
      day: 6,
      hour: 18,
      minute: 0,
      title: "Servicio de sábado",
      timeLabel: "Sábado · 6:00 PM",
      languages: "Español",
      note: "",
      inPerson: true,
      streamed: false,
    },
  ],
  ministries: [
    {
      name: "Oasis Youth",
      description:
        "Jóvenes apasionados por buscar y hacer la voluntad de Dios. Servicios los viernes por la noche como parte de la familia de la iglesia.",
      schedule: "Viernes 8:00 PM · Sábados 6:00 PM",
      email: "oasisyouth001@gmail.com",
    },
    {
      name: "Oasis Groups",
      description:
        "Grupos pequeños para crecer en comunidad, oración y la Palabra.",
      schedule: "Consulta horarios en la iglesia",
    },
    {
      name: "Adoración",
      description:
        "Equipo de alabanza que sirve con excelencia en cada reunión.",
      schedule: "Domingos y eventos especiales",
    },
    {
      name: "Niños",
      description: "Ministerio infantil seguro y lleno del amor de Cristo.",
      schedule: "Durante los servicios dominicales",
    },
  ],
  leaders: [
    {
      name: "Dr. Daniel Villa",
      role: "Lead Pastor",
      bio: "Pastor principal de Oasis, conferencista y autor. Maestría en Consejería (Alliance Theological Seminary, Nyack, NY) y Doctorado en Ministerio (McCormick Theological Seminary, Chicago). Dios lo llamó a liderar Oasis en 2010. Junto a su esposa Naime, sirven con pasión a quienes necesitan el mensaje transformador de Jesús.",
      photo: "/images/leaders/pastorvilla.avif",
    },
    {
      name: "Edward de los Santos",
      role: "Pastor",
      bio: "Sirve a la congregación con dedicación y corazón pastoral.",
      photo: "/images/leaders/eduardelossantos.avif",
    },
  ],
  beliefsIntro:
    "Creemos que Jesús es el Cristo, Dios encarnado, quien vino en forma humana para sacrificarse una vez por todas, para que no perezcamos sino tengamos vida eterna.",
  beliefsNote:
    "Iglesia Alianza Oasis es miembro de la Christian & Missionary Alliance (C&MA).",
  fourfoldGospel: [
    { title: "Nuestro Salvador", ref: "Juan 3:16" },
    { title: "Nuestro Santificador", ref: "1 Tesalonicenses 5:23-24" },
    { title: "Nuestro Sanador", ref: "Isaías 53:4-5" },
    { title: "Nuestro Rey que viene", ref: "Hechos 1:11" },
  ],
} as const;

export type ServiceSlot = (typeof siteContent.serviceSchedule)[number];
