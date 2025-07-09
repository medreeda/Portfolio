"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, Check } from "lucide-react"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷", nativeName: "Français" },
  { code: "ar" as Language, name: "العربية", flag: "🇩🇿", nativeName: "العربية" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()
  const [open, setOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 min-w-[80px] justify-center">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">{currentLanguage?.flag}</span>
          <span className="text-xs font-medium uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48 dropdown-content">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setOpen(false)
            }}
            className={`flex items-center justify-between cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.nativeName}</span>
            </div>
            {language === lang.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
