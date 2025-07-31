import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqfugwebejzasosoervd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZnVnd2ViZWp6YXNvc29lcnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTE2OTgsImV4cCI6MjA2OTQ4NzY5OH0.wSEJvhLiJx4a0XfLmFi_x1zgtDFG6jyhQjWjn9FHlcU";

export const supabase = createClient(supabaseUrl, supabaseKey);
