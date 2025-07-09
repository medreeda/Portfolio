"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore, type Skill, type SkillCategory } from "@/lib/admin-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Plus, Edit, Trash2, GripVertical, Code, Eye, EyeOff, FolderPlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Skills manager translations
const skillsTranslations = {
  en: {
    title: "Skills & Technologies Management",
    subtitle: "Manage your technical skills, proficiency levels, descriptions, and categories",
    skillsTab: "Skills",
    categoriesTab: "Categories",
    addSkill: "Add Skill",
    addCategory: "Add Category",
    editSkill: "Edit Skill",
    editCategory: "Edit Category",
    skillName: "Skill Name",
    skillDescription: "Skill Description",
    skillLevel: "Proficiency Level",
    skillColor: "Color",
    skillCategory: "Category",
    visibility: "Visibility",
    visible: "Visible",
    hidden: "Hidden",
    categoryName: "Category Name",
    categoryOrder: "Display Order",
    save: "Save",
    cancel: "Cancel",
    update: "Update",
    delete: "Delete",
    deleteSkillConfirm: "Are you sure you want to delete this skill?",
    deleteCategoryConfirm:
      "Are you sure you want to delete this category? All skills in this category will also be deleted.",
    noSkills: "No skills added yet",
    noCategories: "No categories added yet",
    skillNamePlaceholder: "e.g., React, Node.js, Python",
    skillDescriptionPlaceholder: "Brief description of your experience with this skill",
    categoryNamePlaceholder: "Category name in",
    english: "English",
    french: "French",
    arabic: "Arabic",
    colors: {
      red: "Red",
      blue: "Blue",
      green: "Green",
      yellow: "Yellow",
      purple: "Purple",
      pink: "Pink",
      indigo: "Indigo",
      gray: "Gray",
      orange: "Orange",
      teal: "Teal",
      cyan: "Cyan",
      emerald: "Emerald",
    },
    totalSkills: "Total Skills",
    visibleSkills: "Visible Skills",
    skillsInCategory: "skills in this category",
  },
  fr: {
    title: "Gestion des Compétences et Technologies",
    subtitle: "Gérer vos compétences techniques, niveaux de maîtrise, descriptions et catégories",
    skillsTab: "Compétences",
    categoriesTab: "Catégories",
    addSkill: "Ajouter Compétence",
    addCategory: "Ajouter Catégorie",
    editSkill: "Modifier Compétence",
    editCategory: "Modifier Catégorie",
    skillName: "Nom de la Compétence",
    skillDescription: "Description de la Compétence",
    skillLevel: "Niveau de Maîtrise",
    skillColor: "Couleur",
    skillCategory: "Catégorie",
    visibility: "Visibilité",
    visible: "Visible",
    hidden: "Masqué",
    categoryName: "Nom de la Catégorie",
    categoryOrder: "Ordre d'Affichage",
    save: "Sauvegarder",
    cancel: "Annuler",
    update: "Mettre à jour",
    delete: "Supprimer",
    deleteSkillConfirm: "Êtes-vous sûr de vouloir supprimer cette compétence?",
    deleteCategoryConfirm:
      "Êtes-vous sûr de vouloir supprimer cette catégorie? Toutes les compétences de cette catégorie seront également supprimées.",
    noSkills: "Aucune compétence ajoutée",
    noCategories: "Aucune catégorie ajoutée",
    skillNamePlaceholder: "ex: React, Node.js, Python",
    skillDescriptionPlaceholder: "Brève description de votre expérience avec cette compétence",
    categoryNamePlaceholder: "Nom de la catégorie en",
    english: "Anglais",
    french: "Français",
    arabic: "Arabe",
    colors: {
      red: "Rouge",
      blue: "Bleu",
      green: "Vert",
      yellow: "Jaune",
      purple: "Violet",
      pink: "Rose",
      indigo: "Indigo",
      gray: "Gris",
      orange: "Orange",
      teal: "Sarcelle",
      cyan: "Cyan",
      emerald: "Émeraude",
    },
    totalSkills: "Total Compétences",
    visibleSkills: "Compétences Visibles",
    skillsInCategory: "compétences dans cette catégorie",
  },
  ar: {
    title: "إدارة المهارات والتقنيات",
    subtitle: "إدارة مهاراتك التقنية ومستويات الإتقان والأوصاف والفئات",
    skillsTab: "المهارات",
    categoriesTab: "الفئات",
    addSkill: "إضافة مهارة",
    addCategory: "إضافة فئة",
    editSkill: "تعديل المهارة",
    editCategory: "تعديل الفئة",
    skillName: "اسم المهارة",
    skillDescription: "وصف المهارة",
    skillLevel: "مستوى الإتقان",
    skillColor: "اللون",
    skillCategory: "الفئة",
    visibility: "الظهور",
    visible: "ظاهر",
    hidden: "مخفي",
    categoryName: "اسم الفئة",
    categoryOrder: "ترتيب العرض",
    save: "حفظ",
    cancel: "إلغاء",
    update: "تحديث",
    delete: "حذف",
    deleteSkillConfirm: "هل أنت متأكد من حذف هذه المهارة؟",
    deleteCategoryConfirm: "هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع المهارات في هذه الفئة أيضاً.",
    noSkills: "لم تتم إضافة مهارات بعد",
    noCategories: "لم تتم إضافة فئات بعد",
    skillNamePlaceholder: "مثال: React, Node.js, Python",
    skillDescriptionPlaceholder: "وصف مختصر لخبرتك مع هذه المهارة",
    categoryNamePlaceholder: "اسم الفئة باللغة",
    english: "الإنجليزية",
    french: "الفرنسية",
    arabic: "العربية",
    colors: {
      red: "أحمر",
      blue: "أزرق",
      green: "أخضر",
      yellow: "أصفر",
      purple: "بنفسجي",
      pink: "وردي",
      indigo: "نيلي",
      gray: "رمادي",
      orange: "برتقالي",
      teal: "أزرق مخضر",
      cyan: "سماوي",
      emerald: "زمردي",
    },
    totalSkills: "إجمالي المهارات",
    visibleSkills: "المهارات الظاهرة",
    skillsInCategory: "مهارة في هذه الفئة",
  },
}

const colorOptions = [
  { value: "bg-red-500", label: "red", preview: "bg-red-500" },
  { value: "bg-blue-500", label: "blue", preview: "bg-blue-500" },
  { value: "bg-green-500", label: "green", preview: "bg-green-500" },
  { value: "bg-yellow-500", label: "yellow", preview: "bg-yellow-500" },
  { value: "bg-purple-500", label: "purple", preview: "bg-purple-500" },
  { value: "bg-pink-500", label: "pink", preview: "bg-pink-500" },
  { value: "bg-indigo-500", label: "indigo", preview: "bg-indigo-500" },
  { value: "bg-gray-500", label: "gray", preview: "bg-gray-500" },
  { value: "bg-orange-500", label: "orange", preview: "bg-orange-500" },
  { value: "bg-teal-500", label: "teal", preview: "bg-teal-500" },
  { value: "bg-cyan-500", label: "cyan", preview: "bg-cyan-500" },
  { value: "bg-emerald-500", label: "emerald", preview: "bg-emerald-500" },
]

export function SkillsManager() {
  const { language, isRTL } = useLanguage()
  const {
    skills,
    skillCategories,
    addSkill,
    updateSkill,
    deleteSkill,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
  } = useAdminStore()

  const [activeTab, setActiveTab] = useState("skills")
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const t = skillsTranslations[language]

  // Skill form state
  const emptySkill = {
    name: "",
    description: { en: "", fr: "", ar: "" },
    level: 50,
    color: "bg-blue-500",
    category: skillCategories[0]?.id || "",
    isVisible: true,
  }
  const [skillFormData, setSkillFormData] = useState(emptySkill)

  // Category form state
  const emptyCategory = {
    name: { en: "", fr: "", ar: "" },
    order: skillCategories.length + 1,
    isVisible: true,
  }
  const [categoryFormData, setCategoryFormData] = useState(emptyCategory)

  const visibleSkills = skills.filter((skill) => skill.isVisible)

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSkill) {
      updateSkill(editingSkill.id, skillFormData)
    } else {
      addSkill(skillFormData)
    }
    resetSkillForm()
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      updateSkillCategory(editingCategory.id, categoryFormData)
    } else {
      addSkillCategory(categoryFormData)
    }
    resetCategoryForm()
  }

  const resetSkillForm = () => {
    setSkillFormData(emptySkill)
    setEditingSkill(null)
    setIsSkillDialogOpen(false)
  }

  const resetCategoryForm = () => {
    setCategoryFormData(emptyCategory)
    setEditingCategory(null)
    setIsCategoryDialogOpen(false)
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setSkillFormData({
      name: skill.name,
      description: skill.description,
      level: skill.level,
      color: skill.color,
      category: skill.category,
      isVisible: skill.isVisible,
    })
    setIsSkillDialogOpen(true)
  }

  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory(category)
    setCategoryFormData({
      name: category.name,
      order: category.order,
      isVisible: category.isVisible,
    })
    setIsCategoryDialogOpen(true)
  }

  const handleDeleteSkill = (id: string) => {
    if (confirm(t.deleteSkillConfirm)) {
      deleteSkill(id)
    }
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm(t.deleteCategoryConfirm)) {
      deleteSkillCategory(id)
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = skillCategories.find((cat) => cat.id === categoryId)
    return category ? category.name[language] || category.name.en : "Unknown"
  }

  const getSkillsInCategory = (categoryId: string) => {
    return skills.filter((skill) => skill.category === categoryId).length
  }

  return (
    <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalSkills}</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skills.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.visibleSkills}</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visibleSkills.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.categoriesTab}</CardTitle>
            <FolderPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillCategories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            {t.skillsTab}
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4" />
            {t.categoriesTab}
          </TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <div className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetSkillForm()}>
                    <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.addSkill}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingSkill ? t.editSkill : t.addSkill}</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSkillSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="skillName">{t.skillName}</Label>
                      <Input
                        id="skillName"
                        value={skillFormData.name}
                        onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                        placeholder={t.skillNamePlaceholder}
                        className={isRTL ? "text-right" : "text-left"}
                        required
                      />
                    </div>

                    {/* إضافة حقل الوصف مع تبويبات اللغات */}
                    <div>
                      <Label>{t.skillDescription}</Label>
                      <Tabs defaultValue="en" className="w-full mt-2">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="en">English</TabsTrigger>
                          <TabsTrigger value="fr">Français</TabsTrigger>
                          <TabsTrigger value="ar">العربية</TabsTrigger>
                        </TabsList>

                        {["en", "fr", "ar"].map((lang) => (
                          <TabsContent key={lang} value={lang} className={lang === "ar" ? "rtl" : "ltr"}>
                            <Textarea
                              value={skillFormData.description[lang as keyof typeof skillFormData.description]}
                              onChange={(e) =>
                                setSkillFormData({
                                  ...skillFormData,
                                  description: { ...skillFormData.description, [lang]: e.target.value },
                                })
                              }
                              placeholder={`${t.skillDescriptionPlaceholder} (${lang === "en" ? t.english : lang === "fr" ? t.french : t.arabic})`}
                              className={lang === "ar" ? "text-right" : ""}
                              rows={3}
                            />
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>

                    <div>
                      <Label htmlFor="skillLevel">
                        {t.skillLevel}: {skillFormData.level}%
                      </Label>
                      <Slider
                        value={[skillFormData.level]}
                        onValueChange={(value) => setSkillFormData({ ...skillFormData, level: value[0] })}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="skillColor">{t.skillColor}</Label>
                      <Select
                        value={skillFormData.color}
                        onValueChange={(value) => setSkillFormData({ ...skillFormData, color: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded ${color.preview}`} />
                                {t.colors[color.label as keyof typeof t.colors]}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skillCategory">{t.skillCategory}</Label>
                      <Select
                        value={skillFormData.category}
                        onValueChange={(value) => setSkillFormData({ ...skillFormData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {skillCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name[language] || category.name.en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="skillVisibility">{t.visibility}</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {skillFormData.isVisible ? t.visible : t.hidden}
                        </span>
                        <Switch
                          id="skillVisibility"
                          checked={skillFormData.isVisible}
                          onCheckedChange={(checked) => setSkillFormData({ ...skillFormData, isVisible: checked })}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetSkillForm}>
                        {t.cancel}
                      </Button>
                      <Button type="submit">{editingSkill ? t.update : t.save}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.noSkills}</p>
                  </CardContent>
                </Card>
              ) : (
                skills.map((skill) => (
                  <Card key={skill.id} className={`${!skill.isVisible ? "opacity-50" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${skill.color}`} />
                          {skill.name}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          {!skill.isVisible && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                          <Button size="sm" variant="ghost" onClick={() => handleEditSkill(skill)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteSkill(skill.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* إضافة عرض الوصف */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {skill.description[language] || skill.description.en || "No description available"}
                      </p>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t.skillLevel}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className={`h-2 rounded-full ${skill.color}`} style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(skill.category)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetCategoryForm()}>
                    <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.addCategory}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? t.editCategory : t.addCategory}</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <Tabs defaultValue="en" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="en">English</TabsTrigger>
                        <TabsTrigger value="fr">Français</TabsTrigger>
                        <TabsTrigger value="ar">العربية</TabsTrigger>
                      </TabsList>

                      {["en", "fr", "ar"].map((lang) => (
                        <TabsContent key={lang} value={lang} className={lang === "ar" ? "rtl" : "ltr"}>
                          <div>
                            <Label htmlFor={`categoryName-${lang}`}>
                              {t.categoryName} ({lang === "en" ? t.english : lang === "fr" ? t.french : t.arabic})
                            </Label>
                            <Input
                              id={`categoryName-${lang}`}
                              value={categoryFormData.name[lang as keyof typeof categoryFormData.name]}
                              onChange={(e) =>
                                setCategoryFormData({
                                  ...categoryFormData,
                                  name: { ...categoryFormData.name, [lang]: e.target.value },
                                })
                              }
                              placeholder={`${t.categoryNamePlaceholder} ${lang === "en" ? t.english : lang === "fr" ? t.french : t.arabic}`}
                              className={lang === "ar" ? "text-right" : ""}
                              required
                            />
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>

                    <div>
                      <Label htmlFor="categoryOrder">{t.categoryOrder}</Label>
                      <Input
                        id="categoryOrder"
                        type="number"
                        value={categoryFormData.order}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, order: Number(e.target.value) })}
                        min={1}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="categoryVisibility">{t.visibility}</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {categoryFormData.isVisible ? t.visible : t.hidden}
                        </span>
                        <Switch
                          id="categoryVisibility"
                          checked={categoryFormData.isVisible}
                          onCheckedChange={(checked) =>
                            setCategoryFormData({ ...categoryFormData, isVisible: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetCategoryForm}>
                        {t.cancel}
                      </Button>
                      <Button type="submit">{editingCategory ? t.update : t.save}</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Categories List */}
            <div className="space-y-4">
              {skillCategories.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t.noCategories}</p>
                  </CardContent>
                </Card>
              ) : (
                skillCategories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <Card key={category.id} className={`${!category.isVisible ? "opacity-50" : ""}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                            <div>
                              <CardTitle className="text-lg">{category.name[language] || category.name.en}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {getSkillsInCategory(category.id)} {t.skillsInCategory}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!category.isVisible && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                            <Badge variant="outline">#{category.order}</Badge>
                            <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
