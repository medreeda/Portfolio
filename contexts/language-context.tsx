"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, getTranslation, translations } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof getTranslation>
  isRTL: boolean
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved language from localStorage
    try {
      const savedLanguage = localStorage.getItem("preferred-language") as Language
      if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    } catch (error) {
      console.warn("Failed to load language preference:", error)
    }
    setMounted(true)
    setIsLoading(false)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("preferred-language", lang)
    } catch (error) {
      console.warn("Failed to save language preference:", error)
    }

    // Update document direction and lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Get translations with fallback
  const getTranslationsWithFallback = () => {
    try {
      return getTranslation(language)
    } catch (error) {
      console.warn("Error getting translations, using fallback:", error)
      return translations[language]
    }
  }

  const t = getTranslationsWithFallback()
  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
