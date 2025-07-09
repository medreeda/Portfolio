import { type NextRequest, NextResponse } from "next/server"
import { validateAdminSession } from "@/lib/database/admin"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin-session")?.value

    if (!sessionToken) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    const admin = await validateAdminSession(sessionToken)

    if (!admin) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    return NextResponse.json({
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
