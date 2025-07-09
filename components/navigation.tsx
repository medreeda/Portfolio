"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAdminStore } from "@/lib/admin-store"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { t, isRTL } = useLanguage()
  const { siteSettings } = useAdminStore()

  const navItems = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className={`container mx-auto px-4 py-4 nav-container ${isRTL ? "rtl" : "ltr"}`}>
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            {siteSettings.logoImage ? (
              <div className="relative w-10 h-10">
                <Image src={siteSettings.logoImage || "/placeholder.svg"} alt="Logo" fill className="object-contain" />
              </div>
            ) : (
              <div className="text-2xl font-bold text-primary">{siteSettings.logoText || "MR"}</div>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center nav-items ${isRTL ? "space-x-reverse space-x-8" : "space-x-8"}`}>
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"}`}>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className={`md:hidden flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 pb-4 mobile-menu ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-muted/50 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
