# 🚀 دليل الإعداد السريع

## 📋 الخطوات المطلوبة:

### 1. احصل على معلومات قاعدة البيانات
\`\`\`bash
npm run get-db-url
\`\`\`

### 2. احصل على كلمة مرور قاعدة البيانات
- اذهب إلى: https://supabase.com/dashboard/project/iaaxozbzoimyzcrbeidw/settings/database
- ابحث عن "Database password"
- إذا نسيت كلمة المرور، يمكنك إعادة تعيينها

### 3. احصل على رابط الاتصال
- في نفس الصفحة، انزل إلى "Connection string"
- انسخ "URI" connection string
- تأكد من تفعيل "Use connection pooling"

### 4. حدث ملف .env.local
\`\`\`env
DATABASE_URL="postgresql://postgres.iaaxozbzoimyzcrbeidw:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
\`\`\`

### 5. أنشئ الجداول
\`\`\`bash
npx prisma db push
\`\`\`

### 6. أدخل البيانات الافتراضية
\`\`\`bash
npm run db:seed
\`\`\`

### 7. تحقق من الإعداد
\`\`\`bash
npm run verify-setup
\`\`\`

### 8. ابدأ التطوير
\`\`\`bash
npm run dev
\`\`\`

## 🔐 بيانات الدخول:
- **البريد**: admin@mohamedreda.dev  
- **كلمة المرور**: MohamedReda@2024!

## 🌐 الروابط:
- **الموقع**: http://localhost:3000
- **لوحة التحكم**: http://localhost:3000/admin
