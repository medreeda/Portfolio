"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminStore, validateAuthToken } from "@/lib/admin-store"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

// Admin login translations
const adminTranslations = {
  en: {
    title: "Admin Login",
    subtitle: "Access your dashboard",
    username: "Email",
    password: "Password",
    usernamePlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    login: "Login",
    verifying: "Verifying...",
    invalidCredentials: "Invalid email or password",
    fillAllFields: "Please fill in all fields",
    redirecting: "Redirecting to dashboard...",
  },
  fr: {
    title: "Connexion Admin",
    subtitle: "Accédez à votre tableau de bord",
    username: "Email",
    password: "Mot de passe",
    usernamePlaceholder: "Entrez votre email",
    passwordPlaceholder: "Entrez votre mot de passe",
    login: "Se connecter",
    verifying: "Vérification...",
    invalidCredentials: "Email ou mot de passe invalide",
    fillAllFields: "Veuillez remplir tous les champs",
    redirecting: "Redirection vers le tableau de bord...",
  },
  ar: {
    title: "تسجيل دخول المسؤول",
    subtitle: "الوصول إلى لوحة التحكم الخاصة بك",
    username: "البريد الإلكتروني",
    password: "كلمة المرور",
    usernamePlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    login: "تسجيل الدخول",
    verifying: "جاري التحقق...",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    fillAllFields: "يرجى ملء جميع الحقول",
    redirecting: "جاري التوجيه إلى لوحة التحكم...",
  },
}

export default function AdminLoginPage() {
  const router = useRouter()
  const { isAuthenticated, authenticate } = useAdminStore()
  const { language, isRTL } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const t = adminTranslations[language]

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated || validateAuthToken()) {
      router.replace("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      setError(t.fillAllFields)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.username, password: formData.password }),
      })

      if (response.ok) {
        authenticate(formData.username, formData.password)
        router.replace("/admin/dashboard")
      } else {
        setError(t.invalidCredentials)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login.")
    }

    setIsLoading(false)
  }

  if (!mounted) {
    return null
  }

  if (isAuthenticated || validateAuthToken()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">{t.redirecting}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className={`text-center pb-2 ${isRTL ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">{t.subtitle}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className={`block ${isRTL ? "text-right" : "text-left"}`}>
                  {t.username}
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder={t.usernamePlaceholder}
                  className={isRTL ? "text-right" : "text-left"}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={`block ${isRTL ? "text-right" : "text-left"}`}>
                  {t.password}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t.passwordPlaceholder}
                    className={`${isRTL ? "text-right pr-10" : "text-left pr-10"}`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`absolute top-0 h-full px-3 ${isRTL ? "left-0" : "right-0"}`}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-destructive/50 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t.verifying}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    {t.login}
                  </div>
                )}
              </Button>
            </form>
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
