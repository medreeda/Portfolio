import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing database...")

    // Create default admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || "MohamedReda@2024!", 12)

    const admin = await prisma.admin.upsert({
      where: { email: process.env.ADMIN_DEFAULT_EMAIL || "admin@mohamedreda.dev" },
      update: {},
      create: {
        email: process.env.ADMIN_DEFAULT_EMAIL || "admin@mohamedreda.dev",
        password: hashedPassword,
        name: "Mohamed Reda",
      },
    })
    console.log("✅ Admin user created:", admin.email)

    // Create default personal info
    const personalInfo = await prisma.personalInfo.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        nameEn: "Mohamed Reda",
        nameFr: "Mohamed Reda",
        nameAr: "محمد رضا",
        titleEn: "Junior Web Developer passionate about building user-friendly web applications",
        titleFr: "Développeur Web Junior passionné par la création d'applications web conviviales",
        titleAr: "مطور ويب مبتدئ شغوف ببناء تطبيقات ويب سهلة الاستخدام",
        bioEn:
          "My web development journey began during university, where I discovered my passion for creating digital experiences.",
        bioFr:
          "Mon parcours en développement web a commencé à l'université, où j'ai découvert ma passion pour créer des expériences numériques.",
        bioAr: "بدأت رحلتي في تطوير الويب أثناء الجامعة، حيث اكتشفت شغفي بإنشاء التجارب الرقمية.",
        email: "mohamed.reda@email.com",
        locationEn: "Algeria",
        locationFr: "Algérie",
        locationAr: "الجزائر",
      },
    })
    console.log("✅ Personal info created")

    // Create default site settings
    const siteSettings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        profileImage: "/placeholder.svg?height=300&width=300",
        logoImage: "",
        logoText: "MR",
      },
    })
    console.log("✅ Site settings created")

    // Create skill categories
    const frontendCategory = await prisma.skillCategory.create({
      data: {
        nameEn: "Frontend Development",
        nameFr: "Développement Frontend",
        nameAr: "تطوير الواجهة الأمامية",
        order: 1,
      },
    })

    const backendCategory = await prisma.skillCategory.create({
      data: {
        nameEn: "Backend Development",
        nameFr: "Développement Backend",
        nameAr: "تطوير الواجهة الخلفية",
        order: 2,
      },
    })

    const toolsCategory = await prisma.skillCategory.create({
      data: {
        nameEn: "Tools & Others",
        nameFr: "Outils et Autres",
        nameAr: "الأدوات وأخرى",
        order: 3,
      },
    })
    console.log("✅ Skill categories created")

    // Create default skills
    const skills = [
      {
        name: "HTML",
        descriptionEn: "Markup language for creating web pages and web applications",
        descriptionFr: "Langage de balisage pour créer des pages web et des applications web",
        descriptionAr: "لغة ترميز لإنشاء صفحات الويب وتطبيقات الويب",
        level: 90,
        color: "bg-orange-500",
        categoryId: frontendCategory.id,
      },
      {
        name: "CSS",
        descriptionEn: "Style sheet language for describing the presentation of web documents",
        descriptionFr: "Langage de feuille de style pour décrire la présentation des documents web",
        descriptionAr: "لغة أوراق الأنماط لوصف عرض مستندات الويب",
        level: 85,
        color: "bg-blue-500",
        categoryId: frontendCategory.id,
      },
      {
        name: "JavaScript",
        descriptionEn: "Programming language for creating dynamic and interactive web content",
        descriptionFr: "Langage de programmation pour créer du contenu web dynamique et interactif",
        descriptionAr: "لغة برمجة لإنشاء محتوى ويب ديناميكي وتفاعلي",
        level: 80,
        color: "bg-yellow-500",
        categoryId: frontendCategory.id,
      },
      {
        name: "React",
        descriptionEn: "JavaScript library for building user interfaces and single-page applications",
        descriptionFr:
          "Bibliothèque JavaScript pour construire des interfaces utilisateur et des applications à page unique",
        descriptionAr: "مكتبة جافا سكريبت لبناء واجهات المستخدم وتطبيقات الصفحة الواحدة",
        level: 75,
        color: "bg-cyan-500",
        categoryId: frontendCategory.id,
      },
      {
        name: "Node.js",
        descriptionEn: "JavaScript runtime for building scalable server-side applications",
        descriptionFr: "Runtime JavaScript pour construire des applications côté serveur évolutives",
        descriptionAr: "بيئة تشغيل جافا سكريبت لبناء تطبيقات قابلة للتوسع من جانب الخادم",
        level: 65,
        color: "bg-green-500",
        categoryId: backendCategory.id,
      },
      {
        name: "Git",
        descriptionEn: "Distributed version control system for tracking changes in source code",
        descriptionFr: "Système de contrôle de version distribué pour suivre les changements dans le code source",
        descriptionAr: "نظام تحكم في الإصدارات الموزع لتتبع التغييرات في الكود المصدري",
        level: 75,
        color: "bg-red-500",
        categoryId: toolsCategory.id,
      },
    ]

    for (const skill of skills) {
      await prisma.skill.create({ data: skill })
    }
    console.log("✅ Default skills created")

    // Create sample projects
    const projects = [
      {
        titleEn: "E-Commerce Dashboard",
        titleFr: "Tableau de Bord E-Commerce",
        titleAr: "لوحة تحكم التجارة الإلكترونية",
        descriptionEn:
          "A modern admin dashboard for managing products, orders, and customers. Built with React, Next.js, and Tailwind CSS.",
        descriptionFr:
          "Un tableau de bord d'administration moderne pour gérer les produits, commandes et clients. Construit avec React, Next.js et Tailwind CSS.",
        descriptionAr:
          "لوحة تحكم إدارية حديثة لإدارة المنتجات والطلبات والعملاء. مبنية باستخدام React و Next.js و Tailwind CSS.",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
        githubUrl: "#",
        demoUrl: "#",
      },
      {
        titleEn: "Task Management App",
        titleFr: "App de Gestion de Tâches",
        titleAr: "تطبيق إدارة المهام",
        descriptionEn:
          "A collaborative task management application with real-time updates. Features drag-and-drop functionality and team collaboration.",
        descriptionFr:
          "Une application collaborative de gestion de tâches avec mises à jour en temps réel. Fonctionnalités de glisser-déposer et collaboration d'équipe.",
        descriptionAr: "تطبيق تعاوني لإدارة المهام مع تحديثات فورية. يتضمن وظائف السحب والإفلات والتعاون الجماعي.",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        githubUrl: "#",
        demoUrl: "#",
      },
    ]

    for (const project of projects) {
      await prisma.project.create({ data: project })
    }
    console.log("✅ Sample projects created")

    console.log("🎉 Database initialization completed successfully!")
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the initialization
initializeDatabase().catch((error) => {
  console.error(error)
  process.exit(1)
})
