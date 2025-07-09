import { type NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Hardcoded credentials
    const ADMIN_EMAIL = "mohamedredaahmedbetchim@gmail.com"
    const ADMIN_PASSWORD = "20021108"

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const admin = {
      id: "clx2i1xch000008l2g3z8h4f2",
      email: ADMIN_EMAIL,
      name: "Mohamed Reda",
    }

    const sessionToken = "mock-session-token" // Mock token

    const response = NextResponse.json({
      success: true,
      admin,
    })

    // Set HTTP-only cookie
    response.cookies.set("admin-session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
