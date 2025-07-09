"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore } from "@/lib/admin-store"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsManager } from "./projects-manager"
import { PersonalInfoManager } from "./personal-info-manager"
import { MessagesManager } from "./messages-manager"
import { SiteSettingsManager } from "./site-settings-manager"
import { SkillsManager } from "./skills-manager"
import { LogOut, FolderOpen, User, Shield, Mail, Settings, MailOpen, Code } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Dashboard translations
const dashboardTranslations = {
  en: {
    title: "Admin Dashboard",
    subtitle: "Manage your portfolio content",
    viewPortfolio: "View Portfolio",
    logout: "Logout",
    logoutConfirm: "Are you sure you want to logout?",
    securityNotice: "You are securely logged in as administrator. All changes are saved automatically.",
    totalProjects: "Total Projects",
    unreadMessages: "Unread Messages",
    systemStatus: "System Status",
    active: "Active",
    projectsTab: "Projects",
    personalTab: "Personal Info",
    skillsTab: "Skills",
    messagesTab: "Messages",
    settingsTab: "Site Settings",
  },
  fr: {
    title: "Tableau de Bord Admin",
    subtitle: "Gérer le contenu de votre portfolio",
    viewPortfolio: "Voir le Portfolio",
    logout: "Se déconnecter",
    logoutConfirm: "Êtes-vous sûr de vouloir vous déconnecter?",
    securityNotice:
      "Vous êtes connecté en toute sécurité en tant qu'administrateur. Tous les changements sont sauvegardés automatiquement.",
    totalProjects: "Total des Projets",
    unreadMessages: "Messages Non Lus",
    systemStatus: "État du Système",
    active: "Actif",
    projectsTab: "Projets",
    personalTab: "Info Personnelle",
    skillsTab: "Compétences",
    messagesTab: "Messages",
    settingsTab: "Paramètres",
  },
  ar: {
    title: "لوحة تحكم الإدمين",
    subtitle: "إدارة محتوى الموقع الشخصي",
    viewPortfolio: "عرض الموقع",
    logout: "تسجيل الخروج",
    logoutConfirm: "هل أنت متأكد من تسجيل الخروج؟",
    securityNotice: "أنت متصل بأمان كمسؤول. جميع التغييرات محفوظة تلقائياً.",
    totalProjects: "إجمالي المشاريع",
    unreadMessages: "الرسائل غير المقروءة",
    systemStatus: "حالة النظام",
    active: "نشط",
    projectsTab: "المشاريع",
    personalTab: "المعلومات الشخصية",
    skillsTab: "المهارات",
    messagesTab: "الرسائل",
    settingsTab: "إعدادات الموقع",
  },
}

export function AdminDashboard() {
  const { language, isRTL } = useLanguage()
  const { logout, projects, contactMessages, skills } = useAdminStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("projects")

  const t = dashboardTranslations[language]
  const unreadCount = contactMessages.filter((msg) => !msg.isRead).length

  const handleLogout = () => {
    if (confirm(t.logoutConfirm)) {
      logout()
      router.push("/admin/login")
    }
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h1 className="text-2xl font-bold">{t.title}</h1>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <LanguageSwitcher />
              <Button variant="outline" onClick={() => router.push("/")}>
                {t.viewPortfolio}
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.logout}
              </Button>
            </div>
          </div>
          {/* Profile Image Section */}
          {/* Removed from header as per user request */}
        </div>
      </div>
      {/* Add Profile Image Card */}

      {/* Security Notice */}
      <div className="container mx-auto px-4 py-4">
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <Shield className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">{t.securityNotice}</AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.totalProjects}</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.unreadMessages}</CardTitle>
              <div className="relative">
                <MailOpen className="h-4 w-4 text-muted-foreground" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{unreadCount > 9 ? "9+" : unreadCount}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">{contactMessages.length} total messages</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t.systemStatus}</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t.active}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              {t.projectsTab}
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t.personalTab}
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {t.skillsTab}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <div className="relative">
                <Mail className="h-4 w-4" />
                {unreadCount > 0 && <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>}
              </div>
              {t.messagesTab}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t.settingsTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="personal">
            <PersonalInfoManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
