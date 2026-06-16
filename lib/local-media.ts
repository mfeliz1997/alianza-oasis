/** Rutas estáticas servidas desde /public (copiadas desde /assets). */
export const localMedia = {
  heroVideo: "/media/hero.mp4",
  services: {
    sundaySpanish: "/images/services/sunday-spanish.jpg",
    sundayEnglish: "/images/services/sunday-english.jpg",
  },
  community: [
    "/images/community/worship-1.jpg",
    "/images/community/worship-2.jpg",
    "/images/community/worship-3.jpg",
  ],
  logo: {
    avif: "/images/logo.avif",
    png: "/images/logo.png",
  },
  leaders: {
    danielVilla: "/images/leaders/pastorvilla.avif",
    edwardDeLosSantos: "/images/leaders/eduardelossantos.avif",
  },
  ministries: {
    adoracion: [
      "/images/ministries/adoracion/1.avif",
      "/images/ministries/adoracion/2.avif",
      "/images/ministries/adoracion/3.avif",
      "/images/ministries/adoracion/4.avif",
      "/images/ministries/adoracion/5.avif",
    ],
    oasisYouth: [
      "/images/ministries/oasis-youth/1.avif",
      "/images/ministries/oasis-youth/2.avif",
      "/images/ministries/oasis-youth/3.avif",
      "/images/ministries/oasis-youth/4.avif",
      "/images/ministries/oasis-youth/5.avif",
      "/images/ministries/oasis-youth/6.avif",
      "/images/ministries/oasis-youth/7.avif",
      "/images/ministries/oasis-youth/8.avif",
      "/images/ministries/oasis-youth/9.avif",
      "/images/ministries/oasis-youth/10.avif",
      "/images/ministries/oasis-youth/11.avif",
      "/images/ministries/oasis-youth/12.avif",
      "/images/ministries/oasis-youth/13.avif",
      "/images/ministries/oasis-youth/14.avif",
      "/images/ministries/oasis-youth/15.avif",
    ],
    danza: ["/images/ministries/danza/1.avif"],
    fogata: ["/images/ministries/fogata/1.avif"],
  },
} as const;
