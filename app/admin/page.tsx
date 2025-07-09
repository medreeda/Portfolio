"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { validateAuthToken } from "@/lib/admin-store"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const hasValidAuth = validateAuthToken()

    if (hasValidAuth) {
      router.replace("/admin/dashboard")
    } else {
      router.replace("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
