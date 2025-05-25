import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fageqthdwjxlbamerrns.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ2VxdGhkd2p4bGJhbWVycm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNzAyMzksImV4cCI6MjA2Mzc0NjIzOX0.PYqQcSI7eLYuC1Xgfwz-jasvHNSgrGBlNZKbbnT0xyk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
}) 