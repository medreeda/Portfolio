"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { t, isRTL } = useLanguage()
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.about.education.title}</h3>
                </div>
                <p className="text-muted-foreground">{t.about.education.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.about.journey.title}</h3>
                </div>
                <p className="text-muted-foreground">{t.about.journey.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.about.passion.title}</h3>
                </div>
                <p className="text-muted-foreground">{t.about.passion.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">{t.about.technologies}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Supabase"].map(
                  (tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-muted/50 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors duration-200"
                    >
                      <span className="font-medium">{tech}</span>
                    </motion.div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
