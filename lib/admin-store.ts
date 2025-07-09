import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ProjectData {
  id: string
  title: {
    en: string
    fr: string
    ar: string
  }
  description: {
    en: string
    fr: string
    ar: string
  }
  image: string
  technologies: string[]
  github: string
  demo: string
}

export interface PersonalInfo {
  name: {
    en: string
    fr: string
    ar: string
  }
  title: {
    en: string
    fr: string
    ar: string
  }
  bio: {
    en: string
    fr: string
    ar: string
  }
  email: string
  location: {
    en: string
    fr: string
    ar: string
  }
  cvUrl?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: number
  isRead: boolean
  isStarred: boolean
}

export interface SiteSettings {
  profileImage: string
  logoImage: string
  logoText: string
}

export interface Skill {
  id: string
  name: string
  description: {
    en: string
    fr: string
    ar: string
  }
  level: number
  color: string
  category: string
  isVisible: boolean
}

export interface SkillCategory {
  id: string
  name: {
    en: string
    fr: string
    ar: string
  }
  order: number
  isVisible: boolean
}

interface AdminStore {
  isAuthenticated: boolean
  authToken: string | null
  projects: ProjectData[]
  personalInfo: PersonalInfo
  contactMessages: ContactMessage[]
  siteSettings: SiteSettings
  skills: Skill[]
  skillCategories: SkillCategory[]
  authenticate: (username: string, password: string) => boolean
  logout: () => void
  setAuthToken: (token: string) => void
  clearAuth: () => void
  addProject: (project: Omit<ProjectData, "id">) => void
  updateProject: (id: string, project: Partial<ProjectData>) => void
  deleteProject: (id: string) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addContactMessage: (message: Omit<ContactMessage, "id" | "timestamp" | "isRead" | "isStarred">) => void
  markMessageAsRead: (id: string) => void
  toggleMessageStar: (id: string) => void
  deleteMessage: (id: string) => void
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
  addSkill: (skill: Omit<Skill, "id">) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  addSkillCategory: (category: Omit<SkillCategory, "id">) => void
  updateSkillCategory: (id: string, category: Partial<SkillCategory>) => void
  deleteSkillCategory: (id: string) => void
  reorderSkills: (skills: Skill[]) => void
  reorderCategories: (categories: SkillCategory[]) => void
}

// بيانات اعتماد الإدمين
const ADMIN_CREDENTIALS = [
  { username: "mohamedredaahmedbetchim@gmail.com", password: "20021108" },
]

// البيانات الافتراضية
const defaultProjects: ProjectData[] = [
  {
    id: "1",
    title: {
      en: "E-Commerce Dashboard",
      fr: "Tableau de Bord E-Commerce",
      ar: "لوحة تحكم التجارة الإلكترونية",
    },
    description: {
      en: "A modern admin dashboard for managing products, orders, and customers. Built with React, Next.js, and Tailwind CSS.",
      fr: "Un tableau de bord d'administration moderne pour gérer les produits, commandes et clients. Construit avec React, Next.js et Tailwind CSS.",
      ar: "لوحة تحكم إدارية حديثة لإدارة المنتجات والطلبات والعملاء. مبنية باستخدام React و Next.js و Tailwind CSS.",
    },
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    github: "#",
    demo: "#",
  },
  {
    id: "2",
    title: {
      en: "Task Management App",
      fr: "App de Gestion de Tâches",
      ar: "تطبيق إدارة المهام",
    },
    description: {
      en: "A collaborative task management application with real-time updates. Features drag-and-drop functionality and team collaboration.",
      fr: "Une application collaborative de gestion de tâches avec mises à jour en temps réel. Fonctionnalités de glisser-déposer et collaboration d'équipe.",
      ar: "تطبيق تعاوني لإدارة المهام مع تحديثات فورية. يتضمن وظائف السحب والإفلات والتعاون الجماعي.",
    },
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    id: "3",
    title: {
      en: "Weather Forecast App",
      fr: "App Météo",
      ar: "تطبيق توقعات الطقس",
    },
    description: {
      en: "A responsive weather application that provides current weather and 7-day forecasts. Includes location-based weather detection.",
      fr: "Une application météo responsive qui fournit la météo actuelle et les prévisions sur 7 jours. Inclut la détection météo basée على الموقع.",
      ar: "تطبيق طقس متجاوب يوفر الطقس الحالي وتوقعات 7 أيام. يتضمن كشف الطقس المبني على الموقع.",
    },
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["JavaScript", "HTML", "CSS", "Weather API"],
    github: "#",
    demo: "#",
  },
]

const defaultPersonalInfo: PersonalInfo = {
  name: {
    en: "Mohamed Reda",
    fr: "Mohamed Reda",
    ar: "محمد رضا",
  },
  title: {
    en: "Junior Web Developer passionate about building user-friendly web applications",
    fr: "Développeur Web Junior passionné par la création d'applications web conviviales",
    ar: "مطور ويب مبتدئ شغوف ببناء تطبيقات ويب سهلة الاستخدام",
  },
  bio: {
    en: "My web development journey began during university, where I discovered my passion for creating digital experiences.",
    fr: "Mon parcours en développement web a commencé à l'université, où j'ai découvert ma passion pour créer des expériences numériques.",
    ar: "بدأت رحلتي في تطوير الويب أثناء الجامعة، حيث اكتشفت شغفي بإنشاء التجارب الرقمية.",
  },
  email: "mohamed.reda@email.com",
  location: {
    en: "Algeria",
    fr: "Algérie",
    ar: "الجزائر",
  },
  cvUrl: "",
}

const defaultContactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Web Development Project",
    message:
      "Hi Mohamed, I'm interested in hiring you for a web development project. Could we schedule a call to discuss the details?",
    timestamp: Date.now() - 86400000,
    isRead: false,
    isStarred: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    subject: "Portfolio Feedback",
    message: "Your portfolio looks amazing! I love the clean design and smooth animations. Great work!",
    timestamp: Date.now() - 172800000,
    isRead: true,
    isStarred: false,
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@startup.com",
    subject: "Collaboration Opportunity",
    message: "مرحبا محمد، نحن شركة ناشئة ونبحث عن مطور ويب موهوب للانضمام إلى فريقنا. هل أنت مهتم؟",
    timestamp: Date.now() - 259200000,
    isRead: false,
    isStarred: false,
  },
]

const defaultSiteSettings: SiteSettings = {
  profileImage: "/placeholder.svg?height=300&width=300",
  logoImage: "",
  logoText: "MR",
}

const defaultSkillCategories: SkillCategory[] = [
  {
    id: "1",
    name: {
      en: "Frontend Development",
      fr: "Développement Frontend",
      ar: "تطوير الواجهة الأمامية",
    },
    order: 1,
    isVisible: true,
  },
  {
    id: "2",
    name: {
      en: "Backend Development",
      fr: "Développement Backend",
      ar: "تطوير الواجهة الخلفية",
    },
    order: 2,
    isVisible: true,
  },
  {
    id: "3",
    name: {
      en: "Tools & Others",
      fr: "Outils et Autres",
      ar: "الأدوات وأخرى",
    },
    order: 3,
    isVisible: true,
  },
]

const defaultSkills: Skill[] = [
  {
    id: "1",
    name: "HTML",
    description: {
      en: "Markup language for creating web pages and web applications",
      fr: "Langage de balisage pour créer des pages web et des applications web",
      ar: "لغة ترميز لإنشاء صفحات الويب وتطبيقات الويب",
    },
    level: 90,
    color: "bg-orange-500",
    category: "1",
    isVisible: true,
  },
  {
    id: "2",
    name: "CSS",
    description: {
      en: "Style sheet language for describing the presentation of web documents",
      fr: "Langage de feuille de style pour décrire la présentation des documents web",
      ar: "لغة أوراق الأنماط لوصف عرض مستندات الويب",
    },
    level: 85,
    color: "bg-blue-500",
    category: "1",
    isVisible: true,
  },
  {
    id: "3",
    name: "JavaScript",
    description: {
      en: "Programming language for creating dynamic and interactive web content",
      fr: "Langage de programmation pour créer du contenu web dynamique et interactif",
      ar: "لغة برمجة لإنشاء محتوى ويب ديناميكي وتفاعلي",
    },
    level: 80,
    color: "bg-yellow-500",
    category: "1",
    isVisible: true,
  },
  {
    id: "4",
    name: "React",
    description: {
      en: "JavaScript library for building user interfaces and single-page applications",
      fr: "Bibliothèque JavaScript pour construire des interfaces utilisateur et des applications à page unique",
      ar: "مكتبة جافا سكريبت لبناء واجهات المستخدم وتطبيقات الصفحة الواحدة",
    },
    level: 75,
    color: "bg-cyan-500",
    category: "1",
    isVisible: true,
  },
  {
    id: "5",
    name: "Next.js",
    description: {
      en: "React framework for production-grade applications with server-side rendering",
      fr: "Framework React pour des applications de niveau production avec rendu côté serveur",
      ar: "إطار عمل React لتطبيقات مستوى الإنتاج مع العرض من جانب الخادم",
    },
    level: 70,
    color: "bg-gray-800",
    category: "1",
    isVisible: true,
  },
  {
    id: "6",
    name: "Tailwind CSS",
    description: {
      en: "Utility-first CSS framework for rapidly building custom user interfaces",
      fr: "Framework CSS utilitaire pour construire rapidement des interfaces utilisateur personnalisées",
      ar: "إطار عمل CSS مبني على الأدوات لبناء واجهات مستخدم مخصصة بسرعة",
    },
    level: 85,
    color: "bg-teal-500",
    category: "1",
    isVisible: true,
  },
  {
    id: "7",
    name: "Node.js",
    description: {
      en: "JavaScript runtime for building scalable server-side applications",
      fr: "Runtime JavaScript pour construire des applications côté serveur évolutives",
      ar: "بيئة تشغيل جافا سكريبت لبناء تطبيقات قابلة للتوسع من جانب الخادم",
    },
    level: 65,
    color: "bg-green-500",
    category: "2",
    isVisible: true,
  },
  {
    id: "8",
    name: "Supabase",
    description: {
      en: "Open source Firebase alternative with real-time database and authentication",
      fr: "Alternative open source à Firebase avec base de données en temps réel et authentification",
      ar: "بديل مفتوح المصدر لـ Firebase مع قاعدة بيانات فورية ومصادقة",
    },
    level: 60,
    color: "bg-emerald-500",
    category: "2",
    isVisible: true,
  },
  {
    id: "9",
    name: "Git",
    description: {
      en: "Distributed version control system for tracking changes in source code",
      fr: "Système de contrôle de version distribué pour suivre les changements dans le code source",
      ar: "نظام تحكم في الإصدارات الموزع لتتبع التغييرات في الكود المصدري",
    },
    level: 75,
    color: "bg-red-500",
    category: "3",
    isVisible: true,
  },
  {
    id: "10",
    name: "VS Code",
    description: {
      en: "Lightweight but powerful source code editor with extensive extension support",
      fr: "Éditeur de code source léger mais puissant avec un support d'extension étendu",
      ar: "محرر كود مصدري خفيف لكن قوي مع دعم واسع للإضافات",
    },
    level: 90,
    color: "bg-blue-600",
    category: "3",
    isVisible: true,
  },
]

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      authToken: null,
      projects: defaultProjects,
      personalInfo: defaultPersonalInfo,
      contactMessages: defaultContactMessages,
      siteSettings: defaultSiteSettings,
      skills: defaultSkills,
      skillCategories: defaultSkillCategories,

      authenticate: (username: string, password: string) => {
        console.log("🔐 Authenticate called with:", { username, password: "***" })

        const isValid = ADMIN_CREDENTIALS.some((cred) => cred.username === username && cred.password === password)

        if (isValid) {
          const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          console.log("✅ Authentication successful, setting token:", token)

          set({
            isAuthenticated: true,
            authToken: token,
          })

          // حفظ في localStorage أيضاً
          if (typeof window !== "undefined") {
            localStorage.setItem("admin_auth_token", token)
            localStorage.setItem("admin_auth_time", Date.now().toString())
          }

          return true
        }

        console.log("❌ Authentication failed")
        return false
      },

      setAuthToken: (token: string) => {
        console.log("🔑 Setting auth token:", token)
        set({ isAuthenticated: true, authToken: token })
      },

      clearAuth: () => {
        console.log("🚪 Clearing authentication")
        set({ isAuthenticated: false, authToken: null })
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_auth_token")
          localStorage.removeItem("admin_auth_time")
        }
      },

      logout: () => {
        console.log("🚪 Logout called")
        get().clearAuth()
      },

      addProject: (project) => {
        const newProject: ProjectData = {
          ...project,
          id: Date.now().toString(),
        }
        set((state) => ({
          projects: [...state.projects, newProject],
        }))
      },

      updateProject: (id, updatedProject) => {
        set((state) => ({
          projects: state.projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)),
        }))
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }))
      },

      updatePersonalInfo: (info) => {
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        }))
      },

      addContactMessage: (message) => {
        const newMessage: ContactMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: Date.now(),
          isRead: false,
          isStarred: false,
        }
        set((state) => ({
          contactMessages: [newMessage, ...state.contactMessages],
        }))
      },

      markMessageAsRead: (id) => {
        set((state) => ({
          contactMessages: state.contactMessages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
        }))
      },

      toggleMessageStar: (id) => {
        set((state) => ({
          contactMessages: state.contactMessages.map((msg) =>
            msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg,
          ),
        }))
      },

      deleteMessage: (id) => {
        set((state) => ({
          contactMessages: state.contactMessages.filter((msg) => msg.id !== id),
        }))
      },

      updateSiteSettings: (settings) => {
        set((state) => ({
          siteSettings: { ...state.siteSettings, ...settings },
        }))
      },

      addSkill: (skill) => {
        const newSkill: Skill = {
          ...skill,
          id: Date.now().toString(),
        }
        set((state) => ({
          skills: [...state.skills, newSkill],
        }))
      },

      updateSkill: (id, updatedSkill) => {
        set((state) => ({
          skills: state.skills.map((skill) => (skill.id === id ? { ...skill, ...updatedSkill } : skill)),
        }))
      },

      deleteSkill: (id) => {
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        }))
      },

      addSkillCategory: (category) => {
        const newCategory: SkillCategory = {
          ...category,
          id: Date.now().toString(),
        }
        set((state) => ({
          skillCategories: [...state.skillCategories, newCategory],
        }))
      },

      updateSkillCategory: (id, updatedCategory) => {
        set((state) => ({
          skillCategories: state.skillCategories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category,
          ),
        }))
      },

      deleteSkillCategory: (id) => {
        set((state) => ({
          skillCategories: state.skillCategories.filter((category) => category.id !== id),
          skills: state.skills.filter((skill) => skill.category !== id),
        }))
      },

      reorderSkills: (skills) => {
        set({ skills })
      },

      reorderCategories: (categories) => {
        set({ skillCategories: categories })
      },
    }),
    {
      name: "admin-storage",
      partialize: (state) => ({
        projects: state.projects,
        personalInfo: state.personalInfo,
        contactMessages: state.contactMessages,
        siteSettings: state.siteSettings,
        skills: state.skills,
        skillCategories: state.skillCategories,
        // لا نحفظ isAuthenticated و authToken في persist
      }),
    },
  ),
)

// دالة للتحقق من صحة التوكن
export const validateAuthToken = () => {
  if (typeof window === "undefined") return false

  try {
    const token = localStorage.getItem("admin_auth_token")
    const authTime = localStorage.getItem("admin_auth_time")

    if (!token || !authTime) return false

    const timeElapsed = Date.now() - Number.parseInt(authTime)
    const maxAge = 24 * 60 * 60 * 1000 // 24 ساعة

    if (timeElapsed > maxAge) {
      localStorage.removeItem("admin_auth_token")
      localStorage.removeItem("admin_auth_time")
      return false
    }

    return true
  } catch (error) {
    console.warn("Error validating auth token:", error)
    return false
  }
}

// دالة لاستعادة حالة المصادقة
export const restoreAuthState = () => {
  if (typeof window === "undefined") return

  const isValid = validateAuthToken()
  const token = localStorage.getItem("admin_auth_token")

  if (isValid && token) {
    console.log("🔄 Restoring auth state with token:", token)
    useAdminStore.getState().setAuthToken(token)
  } else {
    console.log("🚫 No valid auth state to restore")
    useAdminStore.getState().clearAuth()
  }
}
