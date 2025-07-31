import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tsjqxaaicygtdprxljpg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzanF4YWFpY3lndGRwcnhsanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTc3MDEsImV4cCI6MjA2OTQ5MzcwMX0.TvfxrFspVgRISRTMxy3xVV1Nif69CyDBiN2OuXQ8VEc";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // keep user logged in across reloads
    detectSessionInUrl: true, // handle OAuth/magic link redirects automatically
  },
});
