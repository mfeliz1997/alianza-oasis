import { localMedia } from "@/lib/local-media";

export type MinistryContent = {
  id: string;
  images: readonly string[];
  instagram?: string;
  email?: string;
  es: {
    title: string;
    paragraphs: string[];
    vision?: string;
    mission?: string;
  };
  en: {
    title: string;
    paragraphs: string[];
    vision?: string;
    mission?: string;
  };
};

export const ministriesIntro = {
  es: {
    title: "Ministerios",
    description:
      "Todo lo que hacemos, lo hacemos con pasión. Siempre daremos lo mejor que tenemos. En Oasis, cada líder es un servidor. Le invitamos a unirse a nuestra familia.",
    cta: "¡Ven a servir con nosotros!",
  },
  en: {
    title: "Ministries",
    description:
      "Everything we do, we do with passion. We will always give our very best. At Oasis, every leader is a servant. We invite you to join our family.",
    cta: "Come serve with us!",
  },
} as const;

export const ministriesContent: MinistryContent[] = [
  {
    id: "adoracion",
    images: localMedia.ministries.adoracion,
    es: {
      title: "Ministerio de Adoración",
      paragraphs: [
        "Queremos levantar a una Nueva Generación de Adoradores que atraerán y manifestarán la gloria de Dios. Pero la hora viene, y ahora es, cuando los verdaderos adoradores adorarán al Padre en espíritu y en verdad; porque el Padre también busca adoradores. Dios es Espíritu; y los que lo adoran deben adorar en espíritu y en verdad. Juan 4:23-24.",
        "Existimos para exaltar y glorificar a nuestro Señor Jesucristo. Nuestro trabajo es guiar a la congregación y adorar a Jesucristo a través de la música, con corazones humildes, sinceros y alegres. Reconociendo que Él es el único digno de ser exaltado, adorado y glorificado por los siglos de los siglos.",
        "El propósito principal del Ministerio de Alabanza es servir a Nuestro Señor Jesucristo como músicos y ministros de alabanza y adoración, para inspirar a la congregación al reconocimiento de los atributos divinos y su trabajo, propiciando a través de la música una forma de vínculo entre nuestro espíritu y el Espíritu de Dios.",
      ],
    },
    en: {
      title: "Worship Ministry",
      paragraphs: [
        "We want to raise up a new generation of worshipers who will attract and manifest the glory of God. But the hour is coming, and is now here, when the true worshipers will worship the Father in spirit and truth, for the Father is seeking such people to worship him. God is spirit, and those who worship him must worship in spirit and truth. John 4:23-24.",
        "We exist to exalt and glorify our Lord Jesus Christ. Our work is to lead the congregation in worshiping Jesus Christ through music, with humble, sincere, and joyful hearts, recognizing that He alone is worthy of being exalted, worshiped, and glorified forever and ever.",
        "The main purpose of the Worship Ministry is to serve our Lord Jesus Christ as musicians and ministers of praise and worship, inspiring the congregation to recognize His divine attributes and His work, fostering through music a bond between our spirit and the Spirit of God.",
      ],
    },
  },
  {
    id: "oasis-youth",
    images: localMedia.ministries.oasisYouth,
    instagram: "https://www.instagram.com/oasisyouth.nyc/",
    email: "oasisyouth001@gmail.com",
    es: {
      title: "Oasis Youth",
      paragraphs: [
        "Oasis Youth es un grupo de jóvenes que son apasionados en buscar y hacer la voluntad de Dios.",
        "Tenemos servicios para jóvenes todos los viernes a las 8:00 p.m. como parte de los servicios familiares.",
        "Es bueno saber que hay un Dios al que podemos ir a pesar de nuestros defectos y errores. Él es lento para enojarse y abunda en amor. (Números 14:18). Si tiene alguna pregunta o simplemente necesita a alguien para orar con usted o por usted, puede enviarnos un correo electrónico a oasisyouth001@gmail.com y estaremos encantados de ayudarle. Que tengas un día muy, muy bendito y recuerda que Jesús es la única manera de ver al Padre.",
        "¡Síguenos!",
      ],
    },
    en: {
      title: "Oasis Youth",
      paragraphs: [
        "Oasis Youth is a group of young people who are passionate about seeking and doing the will of God.",
        "We have youth services every Friday at 8:00 PM as part of our family services.",
        "It's good to know that there is a God we can turn to despite our flaws and mistakes. He is slow to anger and abounding in love. (Numbers 14:18). If you have any questions or simply need someone to pray with you or for you, email us at oasisyouth001@gmail.com and we will be happy to help. Have a very blessed day and remember that Jesus is the only way to see the Father.",
        "Follow us!",
      ],
    },
  },
  {
    id: "ninos",
    images: [],
    es: {
      title: "Ministerio de Niños",
      paragraphs: [
        '"Pero en cuanto a ti, continúa con lo que has aprendido y de lo que te has convencido, porque conoces a aquellos de quienes lo aprendiste, y cómo desde la infancia conoces las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación a través de la fe en Cristo Jesús." 2 Timoteo 3:14-15.',
        "La Escritura demuestra claramente que los niños, incluso en la infancia, pueden sentir la presencia del Espíritu Santo y son llamados desde el nacimiento para el propósito de Dios. Nuestro llamado como cristianos es capacitar a nuestros hijos para que conozcan y sigan a Jesús, \"el Camino, la Verdad y la Vida\".",
        "Creemos que nuestros hijos no son solo la iglesia del futuro, sino que son testigos de Dios ahora. Por lo tanto, enséñeles Su Palabra de maneras apropiadas para su edad desde la infancia hasta la escuela primaria usando la construcción de grupos pequeños de la comunidad, lecciones divertidas, adoración y modelaje. Si tiene hijos, lo invitamos a traerlos a nuestros estudios de niños. El ministerio de niños se reúne durante los servicios del domingo.",
      ],
    },
    en: {
      title: "Children's Ministry",
      paragraphs: [
        '"But as for you, continue in what you have learned and have become convinced of, because you know those from whom you learned it, and how from infancy you have known the Holy Scriptures, which are able to make you wise for salvation through faith in Christ Jesus." 2 Timothy 3:14-15.',
        "Scripture clearly demonstrates that children, even in infancy, can sense the presence of the Holy Spirit and are called from birth for God's purpose. Our calling as Christians is to equip our children to know and follow Jesus, \"the Way, the Truth and the Life.\"",
        "We believe our children are not only the church of the future, but witnesses of God now. Therefore, teach them His Word in age-appropriate ways from infancy through elementary school using small community groups, fun lessons, worship, and modeling. If you have children, we invite you to bring them to our children's programs. The children's ministry meets during Sunday services.",
      ],
    },
  },
  {
    id: "danza",
    images: localMedia.ministries.danza,
    es: {
      title: "Ministerio de Danza",
      paragraphs: [],
      vision:
        "Somos un ministerio unido con el deseo de ser un canal de bendiciones para nuestra iglesia. Buscamos entrenar bailarines de adoración y desarrollar líderes que exalten el nombre del Señor a través de la danza y que puedan ministrar la alegría del Señor a nuestra congregación.",
      mission:
        "Como Bailarines de Adoración, buscamos convertirnos en un ministerio que adora a Dios a través de la danza, llevando un mensaje profético a través de la acción. Estamos llamados a ser herramientas que impactan vidas y restauran corazones; con el objetivo de que cuando bailamos, Dios ministre a través de nuestros movimientos. Queremos recuperar lo que originalmente era nuestro y usarlo con un propósito real.",
    },
    en: {
      title: "Dance Ministry",
      paragraphs: [],
      vision:
        "We are a united ministry with the desire to be a channel of blessing for our church. We seek to train worship dancers and develop leaders who exalt the name of the Lord through dance and who can minister the joy of the Lord to our congregation.",
      mission:
        "As Worship Dancers, we seek to become a ministry that worships God through dance, carrying a prophetic message through action. We are called to be instruments that impact lives and restore hearts, with the goal that when we dance, God ministers through our movements. We want to reclaim what was originally ours and use it with a real purpose.",
    },
  },
  {
    id: "fogata",
    images: localMedia.ministries.fogata,
    es: {
      title: "Ministerio de Evangelismo FOGATA",
      paragraphs: [],
      vision:
        "Capacitar a todo cristiano en evangelismo, para que pueda compartir el evangelio de manera efectiva en cualquier momento.",
      mission:
        "Establecer un discipulado constante en evangelismo y un alcance semanal al vecindario.",
    },
    en: {
      title: "FOGATA Evangelism Ministry",
      paragraphs: [],
      vision:
        "Train every Christian in evangelism so they are able to share the gospel effectively at any time.",
      mission:
        "Establish constant evangelism discipleship and weekly outreach to the neighborhood.",
    },
  },
];
