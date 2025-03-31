"use client"

import { useLanguage } from "@/components/language-context"
import WorkoutTracker from "@/components/workout-tracker"
import { UserNav } from "@/components/user-nav"
import { translations } from "@/lib/translations"

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">{t.pageTitle}</h1>
        <UserNav />
      </div>
      <WorkoutTracker />
    </main>
  )
}

