import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/contexts/language-context"
import NavigationWrapperClient from "@/components/NavigationWrapperClient"

const inter = Inter({ subsets: ["latin"] })

// Removed dynamic import of NavigationWrapper

export const metadata: Metadata = {
  title: "Med Reda Portfolio",
  keywords: ["Med Reda", "Portfolio", "Next.js", "React", "Web Development"],  
  description: "A modern Next.js starter with theme support",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div suppressHydrationWarning>
              <NavigationWrapperClient />
            </div>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
