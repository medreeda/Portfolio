"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore, type ProjectData } from "@/lib/admin-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Github, ExternalLink, X } from "lucide-react"
import Image from "next/image"

// Projects manager translations
const projectsTranslations = {
  en: {
    title: "Projects Management",
    subtitle: "Add, edit, or remove your portfolio projects",
    addProject: "Add Project",
    editProject: "Edit Project",
    addNewProject: "Add New Project",
    titleLabel: "Title",
    descriptionLabel: "Description",
    imageUrl: "Image URL",
    githubUrl: "GitHub URL",
    demoUrl: "Demo URL",
    technologies: "Technologies",
    addTechnology: "Add technology",
    add: "Add",
    cancel: "Cancel",
    update: "Update",
    code: "Code",
    demo: "Demo",
    deleteConfirm: "Are you sure you want to delete this project?",
    projectTitlePlaceholder: "Project title in",
    projectDescriptionPlaceholder: "Project description in",
    english: "English",
    french: "French",
    arabic: "Arabic",
  },
  fr: {
    title: "Gestion des Projets",
    subtitle: "Ajouter, modifier ou supprimer vos projets de portfolio",
    addProject: "Ajouter un Projet",
    editProject: "Modifier le Projet",
    addNewProject: "Ajouter un Nouveau Projet",
    titleLabel: "Titre",
    descriptionLabel: "Description",
    imageUrl: "URL de l'image",
    githubUrl: "URL GitHub",
    demoUrl: "URL de la démo",
    technologies: "Technologies",
    addTechnology: "Ajouter une technologie",
    add: "Ajouter",
    cancel: "Annuler",
    update: "Mettre à jour",
    code: "Code",
    demo: "Démo",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce projet?",
    projectTitlePlaceholder: "Titre du projet en",
    projectDescriptionPlaceholder: "Description du projet en",
    english: "Anglais",
    french: "Français",
    arabic: "Arabe",
  },
  ar: {
    title: "إدارة المشاريع",
    subtitle: "إضافة أو تعديل أو حذف مشاريع الموقع الشخصي",
    addProject: "إضافة مشروع",
    editProject: "تعديل المشروع",
    addNewProject: "إضافة مشروع جديد",
    titleLabel: "العنوان",
    descriptionLabel: "الوصف",
    imageUrl: "رابط الصورة",
    githubUrl: "رابط GitHub",
    demoUrl: "رابط العرض",
    technologies: "التقنيات",
    addTechnology: "إضافة تقنية",
    add: "إضافة",
    cancel: "إلغاء",
    update: "تحديث",
    code: "الكود",
    demo: "العرض",
    deleteConfirm: "هل أنت متأكد من حذف هذا المشروع؟",
    projectTitlePlaceholder: "عنوان المشروع باللغة",
    projectDescriptionPlaceholder: "وصف المشروع باللغة",
    english: "الإنجليزية",
    french: "الفرنسية",
    arabic: "العربية",
  },
}

export function ProjectsManager() {
  const { language, isRTL } = useLanguage()
  const { projects, addProject, updateProject, deleteProject } = useAdminStore()
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const t = projectsTranslations[language]

  const emptyProject = {
    title: { en: "", fr: "", ar: "" },
    description: { en: "", fr: "", ar: "" },
    image: "/placeholder.svg?height=200&width=300",
    technologies: [],
    github: "",
    demo: "",
  }

  const [formData, setFormData] = useState(emptyProject)
  const [newTech, setNewTech] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      updateProject(editingProject.id, formData)
    } else {
      addProject(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData(emptyProject)
    setEditingProject(null)
    setIsDialogOpen(false)
    setNewTech("")
  }

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      github: project.github,
      demo: project.demo,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm(t.deleteConfirm)) {
      deleteProject(id)
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case "en":
        return t.english
      case "fr":
        return t.french
      case "ar":
        return t.arabic
      default:
        return lang.toUpperCase()
    }
  }

  return (
    <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className={isRTL ? "text-right" : "text-left"}>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.addProject}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? t.editProject : t.addNewProject}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Language Tabs for Title and Description */}
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                {["en", "fr", "ar"].map((lang) => (
                  <TabsContent key={lang} value={lang} className={lang === "ar" ? "rtl" : "ltr"}>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">
                          {t.titleLabel} ({getLanguageName(lang)})
                        </label>
                        <Input
                          value={formData.title[lang as keyof typeof formData.title]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: { ...formData.title, [lang]: e.target.value },
                            })
                          }
                          placeholder={`${t.projectTitlePlaceholder} ${getLanguageName(lang)}`}
                          className={lang === "ar" ? "text-right" : ""}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          {t.descriptionLabel} ({getLanguageName(lang)})
                        </label>
                        <Textarea
                          value={formData.description[lang as keyof typeof formData.description]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: { ...formData.description, [lang]: e.target.value },
                            })
                          }
                          placeholder={`${t.projectDescriptionPlaceholder} ${getLanguageName(lang)}`}
                          className={lang === "ar" ? "text-right" : ""}
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Other Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.imageUrl}</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t.githubUrl}</label>
                  <Input
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t.demoUrl}</label>
                <Input
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  placeholder="https://demo.example.com"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="text-sm font-medium">{t.technologies}</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder={t.addTechnology}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology}>
                    {t.add}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t.cancel}
                </Button>
                <Button type="submit">{editingProject ? t.update : t.add}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={project.image || "/placeholder.svg"} alt={project.title.en} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title[language] || project.title.en}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description[language] || project.description.en}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {project.github && (
                    <Button size="sm" variant="outline">
                      <Github className="h-3 w-3" />
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
