import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Ensure the public/cv directory exists
    const cvDir = path.join(process.cwd(), "public", "cv")
    if (!fs.existsSync(cvDir)) {
      fs.mkdirSync(cvDir, { recursive: true })
    }

    // Sanitize file name: replace spaces with underscores and remove special chars
    const sanitizeFileName = (name: string) => {
      return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "")
    }

    const safeFileName = sanitizeFileName(file.name)

    // Save the file to public/cv with sanitized name
    const filePath = path.join(cvDir, safeFileName)
    fs.writeFileSync(filePath, buffer)

    // Return the public URL of the uploaded file
    const fileUrl = `/cv/${safeFileName}`

    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error("Error uploading CV:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
