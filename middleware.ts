import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    const sessionToken = request.cookies.get("admin-session")?.value

    if (!sessionToken || sessionToken !== "mock-session-token") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
