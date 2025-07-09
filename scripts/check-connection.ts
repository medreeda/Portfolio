import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://arnswngvkolockhibrcv.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybnN3bmd2a29sb2NraGlicmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjYyMDMsImV4cCI6MjA2NTY0MjIwM30.VG2CYyNkk50w2cR3v1VJaGBDE9BbhK2cmzojPEyQDII"

async function checkConnection() {
  console.log("🔍 Checking Supabase connection...")

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test basic connection
    const { data, error } = await supabase.from("_test").select("*").limit(1)

    if (error && error.code === "PGRST116") {
      console.log("✅ Connection successful! (Table not found is expected)")
    } else if (error) {
      console.error("❌ Connection failed:", error.message)
      return false
    } else {
      console.log("✅ Connection successful!")
    }

    // Check if tables exist
    console.log("\n📋 Checking database tables...")

    const tables = [
      "admins",
      "personal_info",
      "site_settings",
      "skill_categories",
      "skills",
      "projects",
      "contact_messages",
      "admin_sessions",
    ]

    for (const table of tables) {
      try {
        const { error: tableError } = await supabase.from(table).select("*").limit(1)

        if (tableError) {
          console.log(`❌ Table '${table}' not found`)
        } else {
          console.log(`✅ Table '${table}' exists`)
        }
      } catch (err) {
        console.log(`❌ Table '${table}' not accessible`)
      }
    }

    console.log("\n🎯 Next steps:")
    console.log("1. Update DATABASE_URL in .env.local with your Supabase connection string")
    console.log("2. Run: npx prisma db push")
    console.log("3. Run: npm run db:seed")
    console.log("4. Start development: npm run dev")

    return true
  } catch (error) {
    console.error("❌ Connection test failed:", error)
    return false
  }
}

checkConnection()
