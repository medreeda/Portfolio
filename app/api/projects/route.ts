import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({ error: "Get projects not implemented" }, { status: 501 })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ error: "Create project not implemented" }, { status: 501 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
