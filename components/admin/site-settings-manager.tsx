"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore } from "@/lib/admin-store"

type ProfileImageType = 
  | { type: "url"; value: string }
  | { type: "file"; value: File }
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Save } from "lucide-react"
import Image from "next/image"

// Site settings translations
const settingsTranslations = {
  en: {
    title: "Site Settings",
    subtitle: "Manage your site's visual elements",
    profileImage: "Profile Image",
    profileImageDesc: "Your main profile photo displayed in the hero section",
    logoSettings: "Logo Settings",
    logoImageDesc: "Custom logo image (leave empty to use text logo)",
    logoTextDesc: "Text logo displayed in the header",
    logoImage: "Logo Image",
    logoText: "Logo Text",
    currentImage: "Current Image",
    imageUrl: "Image URL",
    imageUrlPlaceholder: "https://example.com/image.jpg",
    save: "Save Changes",
    preview: "Preview",
    saving: "Saving...",
    saved: "Settings saved successfully!",
    uploadTip: "Tip: You can upload images to services like Imgur, Cloudinary, or use direct URLs",
    uploadFromComputer: "Upload from Computer",
  },
  fr: {
    title: "Paramètres du Site",
    subtitle: "Gérer les éléments visuels de votre site",
    profileImage: "Image de Profil",
    profileImageDesc: "Votre photo de profil principale affichée dans la section héros",
    logoSettings: "Paramètres du Logo",
    logoImageDesc: "Image de logo personnalisée (laisser vide pour utiliser le logo texte)",
    logoTextDesc: "Logo texte affiché dans l'en-tête",
    logoImage: "Image du Logo",
    logoText: "Texte du Logo",
    currentImage: "Image Actuelle",
    imageUrl: "URL de l'Image",
    imageUrlPlaceholder: "https://exemple.com/image.jpg",
    save: "Sauvegarder",
    preview: "Aperçu",
    saving: "Sauvegarde...",
    saved: "Paramètres sauvegardés avec succès!",
    uploadTip:
      "Astuce: Vous pouvez télécharger des images sur des services comme Imgur, Cloudinary, ou utiliser des URLs directes",
    uploadFromComputer: "Télécharger depuis l'ordinateur",
  },
  ar: {
    title: "إعدادات الموقع",
    subtitle: "إدارة العناصر المرئية للموقع",
    profileImage: "الصورة الشخصية",
    profileImageDesc: "صورتك الشخصية الرئيسية المعروضة في قسم البطل",
    logoSettings: "إعدادات الشعار",
    logoImageDesc: "صورة شعار مخصصة (اتركها فارغة لاستخدام الشعار النصي)",
    logoTextDesc: "الشعار النصي المعروض في الرأس",
    logoImage: "صورة الشعار",
    logoText: "نص الشعار",
    currentImage: "الصورة الحالية",
    imageUrl: "رابط الصورة",
    imageUrlPlaceholder: "https://example.com/image.jpg",
    save: "حفظ التغييرات",
    preview: "معاينة",
    saving: "جاري الحفظ...",
    saved: "تم حفظ الإعدادات بنجاح!",
    uploadTip: "نصيحة: يمكنك رفع الصور على خدمات مثل Imgur أو Cloudinary أو استخدام روابط مباشرة",
    uploadFromComputer: "رفع من الحاسوب",
  },
}

export function SiteSettingsManager() {
  const { language, isRTL } = useLanguage()
  const { siteSettings, updateSiteSettings } = useAdminStore()

  const [profileImage, setProfileImage] = useState<ProfileImageType>(
    siteSettings.profileImage ? { type: "url", value: siteSettings.profileImage } : { type: "url", value: "" }
  )
  const [formData, setFormData] = useState({
    logoImage: siteSettings.logoImage || "",
    logoText: siteSettings.logoText || "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)

  // Sync profileImage and formData with siteSettings when siteSettings changes
  useEffect(() => {
    setProfileImage(siteSettings.profileImage ? { type: "url", value: siteSettings.profileImage } : { type: "url", value: "" })
    setFormData({
      logoImage: siteSettings.logoImage || "",
      logoText: siteSettings.logoText || "",
    })
  }, [siteSettings])
  
  // Update file preview URL when profileImage changes
  useEffect(() => {
    if (profileImage.type === "file") {
      const objectUrl = URL.createObjectURL(profileImage.value)
      setFilePreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setFilePreviewUrl(null)
    }
  }, [profileImage])
  

  const t = settingsTranslations[language]

  // Convert File to base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
        else reject("Failed to convert file to base64")
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSave = async () => {
    setIsSaving(true)

    let profileImageBase64 = ""
    if (profileImage.type === "file") {
      profileImageBase64 = await fileToBase64(profileImage.value)
    } else {
      profileImageBase64 = profileImage.value
    }

    updateSiteSettings({
      profileImage: profileImageBase64,
      logoImage: formData.logoImage,
      logoText: formData.logoText,
    })

    setSaveMessage(t.saved)
    setIsSaving(false)

    // Clear success message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000)
  }

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage({ type: "url", value: e.target.value })
  }

  // Handle file input change to create object URL for preview and store File
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage({ type: "file", value: file })
    }
  }

  return (
    <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Profile Image Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            {t.profileImage}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t.profileImageDesc}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="profileImage">{t.imageUrl}</Label>
                <Input
                  id="profileImage"
                  value={formData.profileImage}
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                  placeholder={t.imageUrlPlaceholder}
                  className={isRTL ? "text-right" : "text-left"}
                />
              </div>
              <div>
                <Label htmlFor="profileImageUpload" className="mt-2 block">
                  {t.uploadFromComputer}
                </Label>
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t.currentImage}</Label>
              <div className="relative w-32 h-32 mx-auto border rounded-full overflow-hidden bg-muted">
                <Image
                  key={profileImage.type === "file" ? filePreviewUrl ?? "" : profileImage.value}
                  src={profileImage.type === "file" ? filePreviewUrl ?? "" : profileImage.value || "/placeholder.svg?height=128&width=128"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {t.logoSettings}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Image */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="logoImage">{t.logoImage}</Label>
                <p className="text-xs text-muted-foreground mb-2">{t.logoImageDesc}</p>
                <Input
                  id="logoImage"
                  value={formData.logoImage}
                  onChange={(e) => setFormData({ ...formData, logoImage: e.target.value })}
                  placeholder={t.imageUrlPlaceholder}
                  className={isRTL ? "text-right" : "text-left"}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t.preview}</Label>
              <div className="relative w-16 h-16 mx-auto border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {formData.logoImage ? (
                  <Image src={formData.logoImage || "/placeholder.svg"} alt="Logo" fill className="object-cover" />
                ) : (
                  <span className="text-lg font-bold text-primary">{formData.logoText}</span>
                )}
              </div>
            </div>
          </div>

          {/* Logo Text */}
          <div>
            <Label htmlFor="logoText">{t.logoText}</Label>
            <p className="text-xs text-muted-foreground mb-2">{t.logoTextDesc}</p>
            <Input
              id="logoText"
              value={formData.logoText}
              onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
              placeholder="MR"
              className={`max-w-xs ${isRTL ? "text-right" : "text-left"}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Tip */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">{t.uploadTip}</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        {saveMessage && (
          <div className="flex items-center gap-2 text-green-600">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            {saveMessage}
          </div>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? t.saving : t.save}
        </Button>
      </div>
    </div>
  )
}
