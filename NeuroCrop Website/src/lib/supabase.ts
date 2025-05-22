
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

// Use the environment variables from the Supabase integration
const supabaseUrl = 'https://jksjmntnybbmqstonxxd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprc2ptbnRueWJibXFzdG9ueHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4ODEyMzgsImV4cCI6MjA1NzQ1NzIzOH0.Q6kNcB4SyMTUd76hbmYiu5w8byyXYkBbqcgdosdtn4w'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
