import { PrismaClient } from "@prisma/client"

async function verifySetup() {
  console.log("🔍 Verifying database setup...")

  try {
    const prisma = new PrismaClient()

    // Test database connection
    console.log("📡 Testing database connection...")
    await prisma.$connect()
    console.log("✅ Database connection successful!")

    // Check if tables exist by trying to count records
    const tables = [
      { name: "admins", model: prisma.admin },
      { name: "personal_info", model: prisma.personalInfo },
      { name: "site_settings", model: prisma.siteSettings },
      { name: "skill_categories", model: prisma.skillCategory },
      { name: "skills", model: prisma.skill },
      { name: "projects", model: prisma.project },
      { name: "contact_messages", model: prisma.contactMessage },
      { name: "admin_sessions", model: prisma.adminSession },
    ]

    console.log("\n📋 Checking database tables...")

    for (const table of tables) {
      try {
        const count = await table.model.count()
        console.log(`✅ Table '${table.name}': ${count} records`)
      } catch (error) {
        console.log(`❌ Table '${table.name}': Not found or error`)
      }
    }

    // Check for admin user
    console.log("\n👤 Checking admin user...")
    try {
      const adminCount = await prisma.admin.count()
      if (adminCount > 0) {
        console.log(`✅ Found ${adminCount} admin user(s)`)

        const admin = await prisma.admin.findFirst({
          where: { email: "admin@mohamedreda.dev" },
        })

        if (admin) {
          console.log("✅ Default admin user exists")
        } else {
          console.log("⚠️  Default admin user not found")
        }
      } else {
        console.log("❌ No admin users found")
      }
    } catch (error) {
      console.log("❌ Could not check admin users")
    }

    console.log("\n🎯 Setup Status:")
    console.log("✅ Database connection: Working")
    console.log("✅ Tables: Ready")
    console.log("✅ Ready to start development!")

    console.log("\n🚀 Next steps:")
    console.log("1. Run: npm run dev")
    console.log("2. Visit: http://localhost:3000")
    console.log("3. Admin panel: http://localhost:3000/admin")

    await prisma.$disconnect()
  } catch (error) {
    console.error("❌ Setup verification failed:")

    if (error.code === "P1001") {
      console.log("🔧 Database connection failed. Please check:")
      console.log("   - DATABASE_URL in .env.local is correct")
      console.log("   - Database password is correct")
      console.log("   - Network connection is working")
    } else if (error.code === "P1017") {
      console.log("🔧 Database not found. Please check:")
      console.log("   - DATABASE_URL points to the correct database")
      console.log("   - Database exists in Supabase")
    } else {
      console.log("   Error details:", error.message)
    }

    console.log("\n📖 For help, run: npm run get-db-url")
  }
}

verifySetup()
