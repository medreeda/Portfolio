import { type NextRequest, NextResponse } from "next/server"
import { getAllProjects, createProject } from "@/lib/database/projects"
import { validateAdminSession } from "@/lib/database/admin"

export async function GET() {
  try {
    const projects = await getAllProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate admin session
    const sessionToken = request.cookies.get("admin-session")?.value
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = await validateAdminSession(sessionToken)
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const project = await createProject(data)

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
