"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore } from "@/lib/admin-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, User, Download } from "lucide-react"

export function PersonalInfoManager() {
  const { isRTL } = useLanguage()
  const { personalInfo, updatePersonalInfo } = useAdminStore()
  const [formData, setFormData] = useState(personalInfo)
  const [isSaving, setIsSaving] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)

  useEffect(() => {
    setFormData(personalInfo)
  }, [personalInfo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Upload CV file if selected
    let cvUrl = formData.cvUrl || ""
    if (cvFile) {
      try {
        const formDataToSend = new FormData()
        formDataToSend.append("file", cvFile)

        const response = await fetch("/api/upload-cv", {
          method: "POST",
          body: formDataToSend,
        })

        const data = await response.json()
        if (response.ok && data.url) {
          cvUrl = data.url
        } else {
          alert("Failed to upload CV file.")
        }
      } catch (error) {
        alert("Error uploading CV file.")
      }
    }

    updatePersonalInfo({ ...formData, cvUrl })

    setIsSaving(false)
    setCvFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <p className="text-muted-foreground">Update your personal details and bio</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Tabs */}
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
              </TabsList>

              {["en", "fr", "ar"].map((lang) => (
                <TabsContent key={lang} value={lang} className={lang === "ar" ? "rtl" : "ltr"}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name ({lang.toUpperCase()})</label>
                      <Input
                        value={formData.name[lang as keyof typeof formData.name]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [lang]: e.target.value },
                          })
                        }
                        placeholder={`Your name in ${lang === "ar" ? "Arabic" : lang === "fr" ? "French" : "English"}`}
                        className={lang === "ar" ? "text-right" : ""}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Professional Title ({lang.toUpperCase()})</label>
                      <Input
                        value={formData.title[lang as keyof typeof formData.title]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: { ...formData.title, [lang]: e.target.value },
                          })
                        }
                        placeholder={`Your professional title in ${lang === "ar" ? "Arabic" : lang === "fr" ? "French" : "English"}`}
                        className={lang === "ar" ? "text-right" : ""}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Bio ({lang.toUpperCase()})</label>
                      <Textarea
                        value={formData.bio[lang as keyof typeof formData.bio]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bio: { ...formData.bio, [lang]: e.target.value },
                          })
                        }
                        placeholder={`Your bio in ${lang === "ar" ? "Arabic" : lang === "fr" ? "French" : "English"}`}
                        className={lang === "ar" ? "text-right" : ""}
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Location ({lang.toUpperCase()})</label>
                      <Input
                        value={formData.location[lang as keyof typeof formData.location]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, [lang]: e.target.value },
                          })
                        }
                        placeholder={`Your location in ${lang === "ar" ? "Arabic" : lang === "fr" ? "French" : "English"}`}
                        className={lang === "ar" ? "text-right" : ""}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Email (common for all languages) */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* CV Upload */}
            <div>
              
              <label htmlFor="cv-upload" className="inline-block cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                {cvFile ? cvFile.name : "Upload CV (PDF)"}
              </label>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {cvFile && (
                <p className="mt-2 text-green-600">File ready to upload: {cvFile.name}</p>
              )}
            </div>

            {/* Download Current CV Button */}
            {formData.cvUrl && (
              <div className="mt-4">
                <a
                  href={formData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
                >
                  <Download className="h-4 w-4" />
                  Download Current CV
                </a>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">English</h3>
              <p className="text-lg font-medium">{formData.name.en}</p>
              <p className="text-muted-foreground">{formData.title.en}</p>
              <p className="text-sm mt-2">{formData.bio.en}</p>
              <p className="text-sm text-muted-foreground">📍 {formData.location.en}</p>
            </div>

            <div className="rtl">
              <h3 className="font-semibold">العربية</h3>
              <p className="text-lg font-medium text-right">{formData.name.ar}</p>
              <p className="text-muted-foreground text-right">{formData.title.ar}</p>
              <p className="text-sm mt-2 text-right">{formData.bio.ar}</p>
              <p className="text-sm text-muted-foreground text-right">📍 {formData.location.ar}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
