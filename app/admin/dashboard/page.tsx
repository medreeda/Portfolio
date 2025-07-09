"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminStore, validateAuthToken, restoreAuthState } from "@/lib/admin-store"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAdminStore()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // استعادة حالة المصادقة من localStorage
    restoreAuthState()

    // التحقق من صحة المصادقة
    const hasValidAuth = validateAuthToken() || isAuthenticated

    console.log("🔍 Dashboard: Auth check result:", hasValidAuth)

    if (!hasValidAuth) {
      console.log("❌ Dashboard: Not authenticated, redirecting to login...")
      router.replace("/admin/login")
    } else {
      console.log("✅ Dashboard: Authenticated, loading dashboard...")
      setIsLoading(false)
    }
  }, [isAuthenticated, router])

  if (!mounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !validateAuthToken()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">جاري التوجيه إلى صفحة تسجيل الدخول...</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
