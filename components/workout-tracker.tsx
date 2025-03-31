"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { supabase } from "@/lib/supabase"
import { translations, type Language } from "@/lib/translations"

const formSchema = z.object({
  exerciseName: z.string().min(2, {
    message: "Exercise name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  subcategory: z.string({
    required_error: "Please select a subcategory.",
  }),
  sets: z.coerce.number().min(1, {
    message: "At least 1 set is required.",
  }),
  reps: z.coerce.number().min(1, {
    message: "At least 1 rep is required.",
  }),
  weight: z.coerce.number().optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
  notes: z.string().optional(),
})

type Exercise = z.infer<typeof formSchema>

export default function WorkoutTracker() {
  const { language } = useLanguage()
  const { session, isGuest } = useAuth()
  const t = translations[language]

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Define categories with translations
  const getCategories = (lang: Language) => [
    {
      value: "strength",
      label: translations[lang].strength,
      subcategories: [
        {
          value: "squats",
          label: translations[lang].squats,
          description: translations[lang].squatsDesc,
        },
        {
          value: "deadlifts",
          label: translations[lang].deadlifts,
          description: translations[lang].deadliftsDesc,
        },
        {
          value: "bench-press",
          label: translations[lang].benchPress,
          description: translations[lang].benchPressDesc,
        },
        {
          value: "push-ups",
          label: translations[lang].pushUps,
          description: translations[lang].pushUpsDesc,
        },
      ],
    },
    {
      value: "cardio",
      label: translations[lang].cardio,
      subcategories: [
        {
          value: "running",
          label: translations[lang].running,
          description: translations[lang].runningDesc,
        },
        {
          value: "cycling",
          label: translations[lang].cycling,
          description: translations[lang].cyclingDesc,
        },
        {
          value: "aerobic-classes",
          label: translations[lang].aerobicClasses,
          description: translations[lang].aerobicClassesDesc,
        },
      ],
    },
    {
      value: "flexibility",
      label: translations[lang].flexibility,
      subcategories: [
        {
          value: "stretching",
          label: translations[lang].stretching,
          description: translations[lang].stretchingDesc,
        },
        {
          value: "bosu-ball",
          label: translations[lang].bosuBall,
          description: translations[lang].bosuBallDesc,
        },
      ],
    },
    {
      value: "balance",
      label: translations[lang].balance,
      subcategories: [
        {
          value: "farmers-walk",
          label: translations[lang].farmersWalk,
          description: translations[lang].farmersWalkDesc,
        },
        {
          value: "calf-raise",
          label: translations[lang].calfRaise,
          description: translations[lang].calfRaiseDesc,
        },
      ],
    },
  ]

  const categories = getCategories(language)

  // Load exercises from localStorage or Supabase
  useEffect(() => {
    async function loadExercises() {
      setIsLoading(true)
      try {
        if (session) {
          // Load from Supabase if logged in
          const { data, error } = await supabase
            .from("exercises")
            .select("*")
            .eq("user_id", session.id)
            .order("date", { ascending: false })

          if (error) throw error

          if (data) {
            // Convert date strings to Date objects
            const formattedData = data.map((exercise) => ({
              ...exercise,
              date: new Date(exercise.date),
            }))
            setExercises(formattedData)

            // Sync localStorage with Supabase data
            localStorage.setItem("exercises", JSON.stringify(formattedData))

            toast({
              title: t.dataLoaded,
              description: t.dataLoadedDesc,
            })
          }
        } else {
          // Load from localStorage if guest
          const storedExercises = localStorage.getItem("exercises")
          if (storedExercises) {
            const parsedExercises = JSON.parse(storedExercises)
            // Convert date strings to Date objects
            const formattedData = parsedExercises.map((exercise: any) => ({
              ...exercise,
              date: new Date(exercise.date),
            }))
            setExercises(formattedData)

            toast({
              title: t.dataLoaded,
              description: t.dataLoadedDesc,
            })
          }
        }
      } catch (error) {
        console.error("Error loading exercises:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExercises()
  }, [session, t])

  // Save exercises to localStorage and/or Supabase
  useEffect(() => {
    if (exercises.length > 0 && !isLoading) {
      // Always save to localStorage
      localStorage.setItem("exercises", JSON.stringify(exercises))

      // If logged in, also save to Supabase
      async function saveToSupabase() {
        if (session) {
          try {
            // First delete all existing exercises for this user
            await supabase.from("exercises").delete().eq("user_id", session.id)

            // Then insert all current exercises
            const exercisesWithUserId = exercises.map((exercise) => ({
              ...exercise,
              user_id: session.id,
            }))

            const { error } = await supabase.from("exercises").insert(exercisesWithUserId)

            if (error) throw error

            toast({
              title: t.dataSyncSuccess,
              description: t.dataSyncSuccessDesc,
            })
          } catch (error) {
            console.error("Error saving to Supabase:", error)
            toast({
              title: t.dataSyncError,
              description: String(error),
              variant: "destructive",
            })
          }
        }
      }

      // Debounce the save to avoid too many Supabase calls
      const timeoutId = setTimeout(() => {
        saveToSupabase()
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [exercises, session, isLoading, t])

  const form = useForm<Exercise>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exerciseName: "",
      sets: 3,
      reps: 10,
      weight: undefined,
      notes: "",
    },
  })

  function onSubmit(values: Exercise) {
    setExercises([...exercises, values])
    toast({
      title: t.exerciseAdded,
      description: t.exerciseAddedDesc.replace("{name}", values.exerciseName),
    })
    form.reset({
      exerciseName: "",
      category: values.category,
      subcategory: "",
      sets: 3,
      reps: 10,
      weight: undefined,
      date: values.date,
      notes: "",
    })
    setShowForm(false)
  }

  function deleteExercise(index: number) {
    const newExercises = [...exercises]
    newExercises.splice(index, 1)
    setExercises(newExercises)
    toast({
      title: t.exerciseRemoved,
      description: t.exerciseRemovedDesc,
    })
  }

  const filteredExercises =
    activeTab === "all" ? exercises : exercises.filter((exercise) => exercise.category === activeTab)

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t.workoutLog}</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <span className="mr-2">{t.cancel}</span>
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> {t.addExercise}
              </>
            )}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-bold mb-4">{t.newExercise}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="exerciseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.exerciseName}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.exerciseNamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.category}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedCategory(value)
                          form.setValue("subcategory", "")
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectCategory} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.subcategory}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCategory}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectSubcategory} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedCategory &&
                            categories
                              .find((cat) => cat.value === selectedCategory)
                              ?.subcategories.map((subcategory) => (
                                <SelectItem key={subcategory.value} value={subcategory.value}>
                                  {subcategory.label}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {selectedCategory &&
                          field.value &&
                          categories
                            .find((cat) => cat.value === selectedCategory)
                            ?.subcategories.find((sub) => sub.value === field.value)?.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="sets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.sets}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.reps}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.weight}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t.date}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>{t.pickDate}</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.notes}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t.notesPlaceholder} className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>{t.notesDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    {t.cancel}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (form.formState.isValid) {
                        setShowForm(false)
                      }
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> {t.addExercise}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">{t.all}</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : filteredExercises.length === 0 ? (
              <div className="text-center p-12 border rounded-lg bg-muted/50">
                <p className="text-muted-foreground mb-4">{t.noExercises}</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> {t.addFirstExercise}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExercises.map((exercise, index) => {
                  // Get the current categories based on the current language
                  const currentCategories = getCategories(language)

                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{exercise.exerciseName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {currentCategories.find((c) => c.value === exercise.category)?.label}
                              </Badge>
                              <Badge variant="secondary">
                                {
                                  currentCategories
                                    .find((c) => c.value === exercise.category)
                                    ?.subcategories.find((s) => s.value === exercise.subcategory)?.label
                                }
                              </Badge>
                              <span className="text-sm text-muted-foreground">{format(exercise.date, "PPP")}</span>
                            </div>
                            <div className="mt-2 flex gap-4">
                              <div>
                                <span className="text-sm font-medium">{t.sets}:</span> {exercise.sets}
                              </div>
                              <div>
                                <span className="text-sm font-medium">{t.reps}:</span> {exercise.reps}
                              </div>
                              {exercise.weight && (
                                <div>
                                  <span className="text-sm font-medium">{t.weight}:</span> {exercise.weight}kg
                                </div>
                              )}
                            </div>
                            {exercise.notes && <p className="mt-2 text-sm text-muted-foreground">{exercise.notes}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteExercise(index)}
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

