# 🚀 دليل إعداد قاعدة البيانات

## 📋 المتطلبات المسبقة

1. **حساب Supabase**: تأكد من أن لديك مشروع في Supabase
2. **Node.js**: الإصدار 18 أو أحدث
3. **npm أو yarn**: لإدارة الحزم

## 🔧 خطوات الإعداد

### 1. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env.local` وقم بتحديث القيم:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 2. الحصول على رابط قاعدة البيانات

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** > **Database**
4. انسخ **Connection string** من قسم **Connection pooling**
5. استبدل `[YOUR-PASSWORD]` بكلمة مرور قاعدة البيانات

### 3. تثبيت المكتبات

\`\`\`bash
npm install
\`\`\`

### 4. إعداد قاعدة البيانات

#### الطريقة الأولى: استخدام Prisma (مفضلة)

\`\`\`bash
# إنشاء الجداول
npx prisma db push

# تشغيل البيانات الافتراضية
npm run db:seed
\`\`\`

#### الطريقة الثانية: إعداد يدوي

1. شغل سكريبت التحقق:
\`\`\`bash
npm run setup-db
\`\`\`

2. إذا فشل، اذهب إلى Supabase SQL Editor:
   - [SQL Editor](https://supabase.com/dashboard/project/iaaxozbzoimyzcrbeidw/sql)
   - انسخ والصق SQL من `prisma/schema.prisma`

### 5. التحقق من الإعداد

\`\`\`bash
# فتح Prisma Studio
npx prisma studio
\`\`\`

## 🗄️ هيكل قاعدة البيانات

### الجداول الرئيسية:

1. **admins** - بيانات المسؤولين
2. **personal_info** - المعلومات الشخصية
3. **site_settings** - إعدادات الموقع
4. **skill_categories** - فئات المهارات
5. **skills** - المهارات التقنية
6. **projects** - المشاريع
7. **contact_messages** - رسائل التواصل
8. **admin_sessions** - جلسات تسجيل الدخول

## 🔐 بيانات الدخول الافتراضية

- **البريد الإلكتروني**: admin@mohamedreda.dev
- **كلمة المرور**: MohamedReda@2024!

## 🛠️ أوامر مفيدة

\`\`\`bash
# عرض حالة قاعدة البيانات
npx prisma db status

# إعادة تعيين قاعدة البيانات
npx prisma db reset

# إنشاء migration جديد
npx prisma migrate dev --name init

# تحديث Prisma Client
npx prisma generate
\`\`\`

## 🔍 استكشاف الأخطاء

### خطأ في الاتصال
- تأكد من صحة رابط قاعدة البيانات
- تحقق من كلمة مرور قاعدة البيانات
- تأكد من أن IP الخاص بك مسموح في Supabase

### خطأ في الصلاحيات
- تأكد من أن مفتاح API صحيح
- تحقق من إعدادات RLS في Supabase

### خطأ في إنشاء الجداول
- استخدم SQL Editor في Supabase Dashboard
- تأكد من تفعيل UUID extension

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من logs في terminal
2. راجع Supabase Dashboard للأخطاء
3. تأكد من صحة متغيرات البيئة
\`\`\`

الآن دعني أنشئ ملف package.json محدث مع الأوامر الجديدة:
