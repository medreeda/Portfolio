import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://arnswngvkolockhibrcv.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybnN3bmd2a29sb2NraGlicmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjYyMDMsImV4cCI6MjA2NTY0MjIwM30.VG2CYyNkk50w2cR3v1VJaGBDE9BbhK2cmzojPEyQDII"

async function getDatabaseInfo() {
  console.log("🔍 Checking Supabase connection and providing setup instructions...")
  console.log("=".repeat(60))

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test basic connection
    console.log("📡 Testing Supabase connection...")
    const { data, error } = await supabase.from("_test").select("*").limit(1)

    if (error && error.code === "PGRST116") {
      console.log("✅ Supabase connection successful!")
    } else if (error) {
      console.error("❌ Connection failed:", error.message)
      return
    } else {
      console.log("✅ Supabase connection successful!")
    }

    console.log("\n🗄️ DATABASE SETUP INSTRUCTIONS")
    console.log("=".repeat(60))

    console.log("\n📋 Step 1: Get your database password")
    console.log("🔗 Go to: https://supabase.com/dashboard/project/iaaxozbzoimyzcrbeidw/settings/database")
    console.log("📝 Look for 'Database password' section")
    console.log("🔑 If you forgot your password, you can reset it there")

    console.log("\n📋 Step 2: Get your connection string")
    console.log("🔗 On the same page, scroll down to 'Connection string'")
    console.log("📋 Copy the 'URI' connection string")
    console.log("⚠️  Make sure to select 'Use connection pooling' for better performance")

    console.log("\n📋 Step 3: Update your .env.local file")
    console.log("📝 Replace the DATABASE_URL in .env.local with your connection string")
    console.log("🔄 Replace [YOUR-PASSWORD] with your actual database password")

    console.log("\n📋 Example DATABASE_URL format:")
    console.log(
      'DATABASE_URL="postgresql://postgres.iaaxozbzoimyzcrbeidw:YOUR_ACTUAL_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"',
    )

    console.log("\n📋 Step 4: Setup database tables")
    console.log("💻 Run: npx prisma db push")
    console.log("🌱 Run: npm run db:seed")

    console.log("\n📋 Step 5: Start development")
    console.log("🚀 Run: npm run dev")

    console.log("\n🔐 Default admin credentials:")
    console.log("📧 Email: admin@mohamedreda.dev")
    console.log("🔑 Password: MohamedReda@2024!")

    console.log("\n" + "=".repeat(60))
    console.log("✨ Once you complete these steps, your portfolio will be connected to Supabase!")
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

getDatabaseInfo()
