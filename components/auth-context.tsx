"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase, type UserSession } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-context"
import { translations } from "@/lib/translations"

type AuthContextType = {
  session: UserSession | null
  isLoading: boolean
  isGuest: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setGuestMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    // Check for existing session in localStorage
    const storedSession = localStorage.getItem("userSession")
    const storedGuestMode = localStorage.getItem("guestMode")

    if (storedSession) {
      setSession(JSON.parse(storedSession))
    } else if (storedGuestMode === "true") {
      setIsGuest(true)
    }

    // Set up Supabase auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const userSession: UserSession = {
          id: session.user.id,
          email: session.user.email || "",
        }
        setSession(userSession)
        localStorage.setItem("userSession", JSON.stringify(userSession))
        localStorage.removeItem("guestMode")
        setIsGuest(false)
      } else {
        setSession(null)
        localStorage.removeItem("userSession")
        // Don't automatically set guest mode here, as they might be logging out
      }
      setIsLoading(false)
    })

    setIsLoading(false)
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast({
        title: t.loginSuccess,
        description: t.loginSuccessDesc,
      })
    } catch (error: any) {
      toast({
        title: t.loginError,
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      toast({
        title: t.signupSuccess,
        description: t.signupSuccessDesc,
      })
    } catch (error: any) {
      toast({
        title: t.signupError,
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      localStorage.removeItem("userSession")
      setSession(null)
      toast({
        title: t.logoutSuccess,
        description: t.logoutSuccessDesc,
      })
    } catch (error: any) {
      toast({
        title: t.logoutError,
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const setGuestMode = () => {
    setIsGuest(true)
    localStorage.setItem("guestMode", "true")
    toast({
      title: t.guestModeActive,
      description: t.guestModeActiveDesc,
    })
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, isGuest, signIn, signUp, signOut, setGuestMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

