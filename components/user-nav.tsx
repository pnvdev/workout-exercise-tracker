"use client"

import { useAuth } from "@/components/auth-context"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Globe, LogOut, User } from "lucide-react"

export function UserNav() {
  const { session, isGuest, signOut } = useAuth()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  function toggleLanguage() {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" onClick={toggleLanguage}>
        <Globe className="h-4 w-4 mr-2" />
        {t.switchLanguage}
      </Button>

      {session ? (
        <div className="flex items-center gap-2">
          <div className="bg-muted px-3 py-1 rounded-md flex items-center">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">{session.email}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            {t.logout}
          </Button>
        </div>
      ) : isGuest ? (
        <div className="flex items-center gap-2">
          <div className="bg-muted px-3 py-1 rounded-md flex items-center">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">{t.guestUser}</span>
          </div>
          <AuthModal />
        </div>
      ) : (
        <AuthModal />
      )}
    </div>
  )
}

