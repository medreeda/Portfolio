"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore } from "@/lib/admin-store"

export function HeroSection() {
  const { t, isRTL } = useLanguage()
  const { siteSettings } = useAdminStore()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-12 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 text-center lg:text-left hero-content ${isRTL ? "lg:text-right" : "lg:text-left"}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t.hero.greeting} <span className="text-primary">{t.hero.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              {t.hero.title}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 hero-buttons ${
                isRTL ? "lg:justify-start" : "lg:justify-start"
              }`}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#contact">{t.hero.contactMe}</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="#projects">{t.hero.viewProjects}</a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`flex gap-4 justify-center lg:justify-start hero-social ${
                isRTL ? "lg:justify-start" : "lg:justify-start"
              }`}
            >
              <a href="https://github.com/medreeda" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/ahmed-betchim-mohamed-réda-51b658255" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:mohamedredaahmedbetchim@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-1">
                  <Image
                    src={siteSettings.profileImage || "/placeholder.svg?height=300&width=300"}
                    alt="Mohamed Reda"
                    width={300}
                    height={300}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
