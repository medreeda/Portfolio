"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "./navigation"

export function NavigationWrapper() {
  const pathname = usePathname()

  // Hide Navigation on /admin/dashboard and its subpaths
  if (pathname.startsWith("/admin/dashboard")) {
    return null
  }

  return <Navigation />
}
