export const givingConfig = {
  paypalEmail: "admin@alianzaoasis.com",
  paypalItemName: "Iglesia Alianza Oasis",
  zelleEmail: "admin@alianzaoasis.com",
  volunteerHref: "/contact-us",
  paypalUrl:
    "https://www.paypal.com/donate/?business=admin%40alianzaoasis.com&item_name=Iglesia+Alianza+Oasis&currency_code=USD",
} as const;

export const givingContent = {
  es: {
    title: "Dar",
    intro:
      "En Iglesia Alianza Oasis, creemos lo que la Biblia enseña en (Malaquías 3:9-10), y las numerosas enseñanzas de Jesús, incluyendo Mateo 22, sobre el diezmo. Enseñamos el diezmo como un acto de adoración a Dios, quien nos ha provisto con todo lo que tenemos. Damos porque le amamos a Él y amamos a las personas.",
    optionsIntro: "Estas son algunas opciones disponibles para ti:",
    serviceOffering: {
      title: "Ofrenda en el servicio",
      body: "Recibimos una ofrenda como parte de nuestra adoración en todos nuestros servicios. Creemos que adorar a Dios incluye dar de nuestro tiempo, talentos e incluso nuestro tesoro (finanzas).",
    },
    giveOnline: {
      title: "Dar en línea",
      body: "Simple y seguro. Da una oferta única o programa donaciones recurrentes usando tu cuenta de cheques, débito o Zelle.",
      moreInfo: "Haz clic abajo para más información sobre nuestra plataforma de donaciones.",
      paypalCta: "Donar con PayPal",
      zelleLabel: "Zelle",
    },
    volunteer: {
      title: "Sé un voluntario",
      body: "Comienza a servir con nosotros y ve la diferencia inmediata que puedes hacer al formar parte de nuestro amoroso equipo.",
      cta: "Haz clic aquí para comenzar",
    },
  },
  en: {
    title: "Giving",
    intro:
      "At Oasis Alliance Church, we believe what the Bible teaches in (Malachi 3:9-10), and the numerous teachings of Jesus including Matthew 22, about tithing. We teach tithing as an act of worship to God, who has provided us with everything that we have. We give because we love Him and we love people.",
    optionsIntro: "Here are a few options available for you:",
    serviceOffering: {
      title: "Service Offering",
      body: "We receive an offering as a part of our worship in all of our services. We believe that worshiping God includes giving of our time, talents, and even our treasure (finances).",
    },
    giveOnline: {
      title: "Give Online",
      body: "Simple and secure. Give a single gift, or schedule recurring giving using your checking account, debit, or Zelle.",
      moreInfo: "Click below for more information about our giving platform.",
      paypalCta: "Donate with PayPal",
      zelleLabel: "Zelle",
    },
    volunteer: {
      title: "Become a Volunteer",
      body: "Start volunteering with us and see the immediate difference you can make by serving on our loving team.",
      cta: "Click here to get started",
    },
  },
} as const;
