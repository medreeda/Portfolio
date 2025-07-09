"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore } from "@/lib/admin-store"

export function SkillsSection() {
  const { t, isRTL, language } = useLanguage()
  const { skills, skillCategories } = useAdminStore()

  // تصفية المهارات المرئية وترتيبها حسب الفئة
  const visibleSkills = skills.filter((skill) => skill.isVisible)
  const visibleCategories = skillCategories.filter((category) => category.isVisible).sort((a, b) => a.order - b.order)

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.skills.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {visibleCategories.map((category, categoryIndex) => {
            const categorySkills = visibleSkills.filter((skill) => skill.category === category.id)

            if (categorySkills.length === 0) return null

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl mb-4">{category.name[language] || category.name.en}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2">
                              <div className={`w-3 h-3 rounded ${skill.color}`} />
                              {skill.name}
                            </span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>

                          {/* إضافة عرض الوصف */}
                          {skill.description && (skill.description[language] || skill.description.en) && (
                            <p className="text-sm text-muted-foreground">
                              {skill.description[language] || skill.description.en}
                            </p>
                          )}

                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                              viewport={{ once: true }}
                              className={`h-2 rounded-full ${skill.color}`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
