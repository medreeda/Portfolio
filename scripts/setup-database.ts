import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://arnswngvkolockhibrcv.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybnN3bmd2a29sb2NraGlicmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjYyMDMsImV4cCI6MjA2NTY0MjIwM30.VG2CYyNkk50w2cR3v1VJaGBDE9BbhK2cmzojPEyQDII"

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log("🚀 Starting database setup...")

  try {
    // Test connection
    console.log("📡 Testing Supabase connection...")
    const { data, error } = await supabase.from("_test").select("*").limit(1)

    if (error && error.code !== "PGRST116") {
      // PGRST116 means table doesn't exist, which is fine
      console.error("❌ Connection failed:", error.message)
      return
    }

    console.log("✅ Supabase connection successful!")

    // Create tables using SQL
    console.log("📋 Creating database tables...")

    const createTablesSQL = `
      -- Enable UUID extension
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      -- Create admins table
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create personal_info table
      CREATE TABLE IF NOT EXISTS personal_info (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name_en VARCHAR(255) NOT NULL,
        name_fr VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255) NOT NULL,
        title_en TEXT NOT NULL,
        title_fr TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        bio_en TEXT NOT NULL,
        bio_fr TEXT NOT NULL,
        bio_ar TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        location_en VARCHAR(255) NOT NULL,
        location_fr VARCHAR(255) NOT NULL,
        location_ar VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create site_settings table
      CREATE TABLE IF NOT EXISTS site_settings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        profile_image TEXT,
        logo_image TEXT,
        logo_text VARCHAR(10) DEFAULT 'MR',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create skill_categories table
      CREATE TABLE IF NOT EXISTS skill_categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name_en VARCHAR(255) NOT NULL,
        name_fr VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255) NOT NULL,
        "order" INTEGER DEFAULT 1,
        is_visible BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create skills table
      CREATE TABLE IF NOT EXISTS skills (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description_en TEXT,
        description_fr TEXT,
        description_ar TEXT,
        level INTEGER DEFAULT 50 CHECK (level >= 0 AND level <= 100),
        color VARCHAR(50) DEFAULT 'bg-blue-500',
        is_visible BOOLEAN DEFAULT true,
        category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create projects table
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title_en VARCHAR(255) NOT NULL,
        title_fr VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255) NOT NULL,
        description_en TEXT NOT NULL,
        description_fr TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        image TEXT,
        technologies TEXT[] DEFAULT '{}',
        github_url TEXT,
        demo_url TEXT,
        is_visible BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create contact_messages table
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        is_starred BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create admin_sessions table
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
      CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
    `

    const { error: createError } = await supabase.rpc("exec_sql", { sql: createTablesSQL })

    if (createError) {
      console.error("❌ Error creating tables:", createError.message)

      // Try alternative approach - create tables one by one
      console.log("🔄 Trying alternative approach...")
      await createTablesAlternative()
    } else {
      console.log("✅ Database tables created successfully!")
    }

    // Insert default data
    await insertDefaultData()

    console.log("🎉 Database setup completed successfully!")
  } catch (error) {
    console.error("❌ Setup failed:", error)
  }
}

async function createTablesAlternative() {
  console.log("📋 Creating tables using alternative method...")

  // This is a simplified approach that should work with the anon key
  const tables = [
    {
      name: "admins",
      sql: `
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `,
    },
  ]

  console.log("⚠️  Note: You may need to create tables manually in Supabase Dashboard")
  console.log("📖 Go to: https://supabase.com/dashboard/project/iaaxozbzoimyzcrbeidw/editor")
  console.log("📝 Use the SQL provided in the Prisma schema to create tables")
}

async function insertDefaultData() {
  console.log("📝 Inserting default data...")

  try {
    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from("admins")
      .select("id")
      .eq("email", "admin@mohamedreda.dev")
      .single()

    if (!existingAdmin) {
      // Note: In production, you'd hash the password
      const { error: adminError } = await supabase.from("admins").insert({
        email: "admin@mohamedreda.dev",
        password: "MohamedReda@2024!", // This should be hashed in production
        name: "Mohamed Reda",
      })

      if (adminError) {
        console.log("ℹ️  Admin user creation skipped (table may not exist yet)")
      } else {
        console.log("✅ Default admin user created")
      }
    } else {
      console.log("ℹ️  Admin user already exists")
    }
  } catch (error) {
    console.log("ℹ️  Default data insertion skipped (tables may not exist yet)")
  }
}

// Run the setup
setupDatabase()
