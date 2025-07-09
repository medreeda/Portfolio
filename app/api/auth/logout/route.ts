import { type NextRequest, NextResponse } from "next/server"
import { deleteAdminSession } from "@/lib/database/admin"

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin-session")?.value

    if (sessionToken) {
      await deleteAdminSession(sessionToken)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete("admin-session")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
