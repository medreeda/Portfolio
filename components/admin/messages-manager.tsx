"use client"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAdminStore, type ContactMessage } from "@/lib/admin-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, MailOpen, Star, Trash2, Reply, Clock, User } from "lucide-react"
import { format } from "date-fns"

// Messages manager translations
const messagesTranslations = {
  en: {
    title: "Contact Messages",
    subtitle: "Manage messages from your portfolio visitors",
    noMessages: "No messages yet",
    unreadMessages: "Unread Messages",
    allMessages: "All Messages",
    starredMessages: "Starred Messages",
    markAsRead: "Mark as Read",
    star: "Star",
    unstar: "Unstar",
    delete: "Delete",
    reply: "Reply",
    deleteConfirm: "Are you sure you want to delete this message?",
    from: "From",
    subject: "Subject",
    message: "Message",
    receivedAt: "Received at",
    newMessage: "New",
    starred: "Starred",
  },
  fr: {
    title: "Messages de Contact",
    subtitle: "Gérer les messages des visiteurs de votre portfolio",
    noMessages: "Aucun message pour le moment",
    unreadMessages: "Messages Non Lus",
    allMessages: "Tous les Messages",
    starredMessages: "Messages Favoris",
    markAsRead: "Marquer comme Lu",
    star: "Favori",
    unstar: "Retirer des Favoris",
    delete: "Supprimer",
    reply: "Répondre",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce message?",
    from: "De",
    subject: "Sujet",
    message: "Message",
    receivedAt: "Reçu le",
    newMessage: "Nouveau",
    starred: "Favori",
  },
  ar: {
    title: "رسائل التواصل",
    subtitle: "إدارة رسائل زوار الموقع الشخصي",
    noMessages: "لا توجد رسائل بعد",
    unreadMessages: "الرسائل غير المقروءة",
    allMessages: "جميع الرسائل",
    starredMessages: "الرسائل المميزة",
    markAsRead: "تحديد كمقروءة",
    star: "إضافة للمفضلة",
    unstar: "إزالة من المفضلة",
    delete: "حذف",
    reply: "رد",
    deleteConfirm: "هل أنت متأكد من حذف هذه الرسالة؟",
    from: "من",
    subject: "الموضوع",
    message: "الرسالة",
    receivedAt: "تم الاستلام في",
    newMessage: "جديد",
    starred: "مميز",
  },
}

export function MessagesManager() {
  const { language, isRTL } = useLanguage()
  const { contactMessages, markMessageAsRead, toggleMessageStar, deleteMessage } = useAdminStore()
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")

  const t = messagesTranslations[language]

  const filteredMessages = contactMessages.filter((message) => {
    switch (filter) {
      case "unread":
        return !message.isRead
      case "starred":
        return message.isStarred
      default:
        return true
    }
  })

  const unreadCount = contactMessages.filter((msg) => !msg.isRead).length

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markMessageAsRead(message.id)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm(t.deleteConfirm)) {
      deleteMessage(id)
      setSelectedMessage(null)
    }
  }

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMM dd, yyyy HH:mm")
  }

  return (
    <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          {t.allMessages} ({contactMessages.length})
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
          className="flex items-center gap-2"
        >
          <MailOpen className="h-4 w-4" />
          {t.unreadMessages} ({unreadCount})
        </Button>
        <Button
          variant={filter === "starred" ? "default" : "outline"}
          onClick={() => setFilter("starred")}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" />
          {t.starredMessages} ({contactMessages.filter((msg) => msg.isStarred).length})
        </Button>
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t.noMessages}</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !message.isRead ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <CardHeader className="pb-2">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="p-2 bg-muted rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <CardTitle className="text-base">{message.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {!message.isRead && (
                      <Badge variant="default" className="text-xs">
                        {t.newMessage}
                      </Badge>
                    )}
                    {message.isStarred && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {t.starred}
                      </Badge>
                    )}
                    <div
                      className={`flex items-center gap-1 text-xs text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Clock className="h-3 w-3" />
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">{message.subject}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <span>{selectedMessage.subject}</span>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleMessageStar(selectedMessage.id)}
                    className="flex items-center gap-1"
                  >
                    <Star className={`h-3 w-3 ${selectedMessage.isStarred ? "fill-current" : ""}`} />
                    {selectedMessage.isStarred ? t.unstar : t.star}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="flex items-center gap-1 text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    {t.delete}
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className={`grid grid-cols-2 gap-4 ${isRTL ? "text-right" : "text-left"}`}>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t.from}</label>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t.receivedAt}</label>
                  <p className="font-medium">{formatDate(selectedMessage.timestamp)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">{t.subject}</label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">{t.message}</label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Reply className="h-4 w-4" />
                  {t.reply}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
