"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

// Fallback projects data with technologies
const fallbackProjects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A modern admin dashboard for managing products, orders, and customers. Built with React, Next.js, and Tailwind CSS.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates. Features drag-and-drop functionality and team collaboration.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
  },
  {
    title: "Weather Forecast App",
    description:
      "A responsive weather application that provides current weather and 7-day forecasts. Includes location-based weather detection.",
    technologies: ["JavaScript", "HTML", "CSS", "Weather API"],
  },
]

type Project = {
  title: string
  description: string
  technologies: string[]
}

export function ProjectsSection() {
  const { t, isRTL } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (t?.projects?.items) {
      setProjects(t.projects.items)
    } else {
      setProjects(fallbackProjects)
    }
  }, [t])

  if (projects.length === 0) {
    return null
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t?.projects?.title || "My Projects"}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t?.projects?.subtitle ||
              "Here are some of the projects I've worked on. Each project represents a step in my learning journey."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-3">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      {t?.projects?.buttons?.code || "Code"}
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t?.projects?.buttons?.demo || "Demo"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
