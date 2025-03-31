import { createClient } from "@supabase/supabase-js"

// These environment variables would need to be set in a production environment
// For this example, we'll use placeholder values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserSession = {
  id: string
  email: string
}

