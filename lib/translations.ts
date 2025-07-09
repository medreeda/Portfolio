import { useAdminStore } from "./admin-store"

export type Language = "en" | "fr" | "ar"

// Static translations that don't change
const staticTranslations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    // About Section
    about: {
      title: "About Me",
      subtitle: "Get to know more about my background, education, and passion for web development",
      education: {
        title: "Education",
        description:
          "Bachelor's degree in Computer Science from Ahmed Zabana University, Algeria. Graduated with a strong foundation in programming fundamentals and software development.",
      },
      journey: {
        title: "Journey",
        description:
          "My web development journey began during university, where I discovered my passion for creating digital experiences. I've been continuously learning modern technologies and best practices to build efficient, user-friendly applications.",
      },
      passion: {
        title: "Passion",
        description:
          "I'm passionate about creating clean, efficient code and building applications that solve real-world problems. I enjoy learning new technologies and staying up-to-date with industry trends and best practices.",
      },
      technologies: "Technologies I Work With",
    },
    // Skills Section
    skills: {
      title: "Skills & Technologies",
      subtitle: "Here are the technologies I'm proficient in and continuously improving upon",
    },
    // Contact Section
    contact: {
      title: "Get In Touch",
      subtitle: "I'm always open to discussing new opportunities and interesting projects. Let's connect!",
      form: {
        title: "Send me a message",
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
      },
      info: {
        title: "Contact Information",
        email: "Email",
        location: "Location",
        locationValue: "Algeria",
      },
      social: {
        title: "Follow Me",
      },
      work: {
        title: "Let's Work Together",
        description:
          "I'm currently looking for new opportunities as a junior web developer. If you have a project in mind or want to collaborate, I'd love to hear from you!",
        downloadCV: "Download CV",
      },
    },
    // Projects fallback
    projects: {
      title: "My Projects",
      subtitle: "Here are some of the projects I've worked on. Each project represents a step in my learning journey.",
      items: [],
      buttons: {
        code: "Code",
        demo: "Demo",
      },
    },
    // Hero fallback
    hero: {
      greeting: "Hi, I'm",
      name: "Mohamed Reda",
      title: "Junior Web Developer passionate about building user-friendly web applications",
      contactMe: "Contact Me",
      viewProjects: "View Projects",
    },
  },
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
    },
    // About Section
    about: {
      title: "À Propos de Moi",
      subtitle: "Apprenez-en plus sur mon parcours, mon éducation et ma passion pour le développement web",
      education: {
        title: "Éducation",
        description:
          "Licence en Informatique de l'Université Ahmed Zabana, Algérie. Diplômé avec une base solide en programmation et développement logiciel.",
      },
      journey: {
        title: "Parcours",
        description:
          "Mon parcours en développement web a commencé à l'université, où j'ai découvert ma passion pour créer des expériences numériques. J'apprends continuellement les technologies modernes et les meilleures pratiques.",
      },
      passion: {
        title: "Passion",
        description:
          "Je suis passionné par la création de code propre et efficace et la construction d'applications qui résolvent des problèmes réels. J'aime apprendre de nouvelles technologies.",
      },
      technologies: "Technologies que j'utilise",
    },
    // Skills Section
    skills: {
      title: "Compétences & Technologies",
      subtitle: "Voici les technologies dans lesquelles je suis compétent et que j'améliore continuellement",
    },
    // Contact Section
    contact: {
      title: "Entrons en Contact",
      subtitle:
        "Je suis toujours ouvert à discuter de nouvelles opportunités et projets intéressants. Connectons-nous !",
      form: {
        title: "Envoyez-moi un message",
        name: "Votre Nom",
        email: "Votre Email",
        subject: "Sujet",
        message: "Votre Message",
        send: "Envoyer le Message",
      },
      info: {
        title: "Informations de Contact",
        email: "Email",
        location: "Localisation",
        locationValue: "Algérie",
      },
      social: {
        title: "Suivez-moi",
      },
      work: {
        title: "Travaillons Ensemble",
        description:
          "Je recherche actuellement de nouvelles opportunités en tant que développeur web junior. Si vous avez un projet en tête, j'aimerais vous entendre !",
        downloadCV: "Télécharger CV",
      },
    },
    // Projects fallback
    projects: {
      title: "Mes Projets",
      subtitle:
        "Voici quelques projets sur lesquels j'ai travaillé. Chaque projet représente une étape de mon parcours d'apprentissage.",
      items: [],
      buttons: {
        code: "Code",
        demo: "Démo",
      },
    },
    // Hero fallback
    hero: {
      greeting: "Salut, je suis",
      name: "Mohamed Reda",
      title: "Développeur Web Junior passionné par la création d'applications web conviviales",
      contactMe: "Me Contacter",
      viewProjects: "Voir les Projets",
    },
  },
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      about: "نبذة عني",
      projects: "المشاريع",
      skills: "المهارات",
      contact: "التواصل",
    },
    // About Section
    about: {
      title: "نبذة عني",
      subtitle: "تعرف أكثر على خلفيتي التعليمية وشغفي بتطوير الويب",
      education: {
        title: "التعليم",
        description:
          "بكالوريوس في علوم الحاسوب من جامعة أحمد زبانة، الجزائر. تخرجت بأساس قوي في أساسيات البرمجة وتطوير البرمجيات.",
      },
      journey: {
        title: "الرحلة",
        description:
          "بدأت رحلتي في تطوير الويب أثناء الجامعة، حيث اكتشفت شغفي بإنشاء التجارب الرقمية. أتعلم باستمرار التقنيات الحديثة وأفضل الممارسات.",
      },
      passion: {
        title: "الشغف",
        description:
          "أنا شغوف بإنشاء كود نظيف وفعال وبناء تطبيقات تحل مشاكل حقيقية. أستمتع بتعلم التقنيات الجديدة ومواكبة اتجاهات الصناعة.",
      },
      technologies: "التقنيات التي أعمل بها",
    },
    // Skills Section
    skills: {
      title: "المهارات والتقنيات",
      subtitle: "هنا التقنيات التي أتقنها وأحسنها باستمرار",
    },
    // Contact Section
    contact: {
      title: "تواصل معي",
      subtitle: "أنا منفتح دائماً لمناقشة الفرص الجديدة والمشاريع المثيرة. لنتواصل!",
      form: {
        title: "أرسل لي رسالة",
        name: "اسمك",
        email: "بريدك الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
      },
      info: {
        title: "معلومات التواصل",
        email: "البريد الإلكتروني",
        location: "الموقع",
        locationValue: "الجزائر",
      },
      social: {
        title: "تابعني",
      },
      work: {
        title: "لنعمل معاً",
        description:
          "أبحث حالياً عن فرص جديدة كمطور ويب مبتدئ. إذا كان لديك مشروع في ذهنك أو تريد التعاون، أحب أن أسمع منك!",
        downloadCV: "تحميل السيرة الذاتية",
      },
    },
    // Projects fallback
    projects: {
      title: "مشاريعي",
      subtitle: "هنا بعض المشاريع التي عملت عليها. كل مشروع يمثل خطوة في رحلة تعلمي.",
      items: [],
      buttons: {
        code: "الكود",
        demo: "العرض",
      },
    },
    // Hero fallback
    hero: {
      greeting: "مرحباً، أنا",
      name: "محمد رضا",
      title: "مطور ويب مبتدئ شغوف ببناء تطبيقات ويب سهلة الاستخدام",
      contactMe: "تواصل معي",
      viewProjects: "عرض المشاريع",
    },
  },
}

// Cache for dynamic translations to prevent repeated calls
const dynamicTranslationsCache: Record<Language, any> = {} as Record<Language, any>
let lastCacheUpdate = 0
const CACHE_DURATION = 1000 // 1 second cache

// Helper function to get dynamic translations safely
export const getDynamicTranslations = (lang: Language) => {
  const now = Date.now()

  // Use cache if it's fresh
  if (dynamicTranslationsCache[lang] && now - lastCacheUpdate < CACHE_DURATION) {
    return dynamicTranslationsCache[lang]
  }

  try {
    const store = useAdminStore.getState()
    const { projects, personalInfo } = store

    if (!projects || !personalInfo) {
      return {}
    }

    const result = {
      hero: {
        greeting: staticTranslations[lang].hero.greeting,
        name: personalInfo.name?.[lang] || staticTranslations[lang].hero.name,
        title: personalInfo.title?.[lang] || staticTranslations[lang].hero.title,
        contactMe: staticTranslations[lang].hero.contactMe,
        viewProjects: staticTranslations[lang].hero.viewProjects,
      },
      projects: {
        title: staticTranslations[lang].projects.title,
        subtitle: staticTranslations[lang].projects.subtitle,
        items: projects.map((project) => ({
          title: project.title?.[lang] || project.title?.en || "",
          description: project.description?.[lang] || project.description?.en || "",
          technologies: project.technologies || [],
          github: project.github || "",
          demo: project.demo || "",
          image: project.image || "/placeholder.svg?height=200&width=300",
        })),
        buttons: staticTranslations[lang].projects.buttons,
      },
      contact: {
        ...staticTranslations[lang].contact,
        info: {
          ...staticTranslations[lang].contact.info,
          locationValue: personalInfo.location?.[lang] || staticTranslations[lang].contact.info.locationValue,
        },
      },
    }

    // Update cache
    dynamicTranslationsCache[lang] = result
    lastCacheUpdate = now

    return result
  } catch (error) {
    console.warn("Error getting dynamic translations:", error)
    return {}
  }
}

export const getTranslation = (lang: Language) => {
  const baseTranslations = staticTranslations[lang]
  const dynamicTranslations = getDynamicTranslations(lang)

  // Merge translations with dynamic content taking precedence
  return {
    ...baseTranslations,
    ...dynamicTranslations,
    // Ensure contact section is always complete
    contact: {
      ...baseTranslations.contact,
      ...dynamicTranslations.contact,
    },
  }
}

// Export static translations for fallback
export const translations = staticTranslations
