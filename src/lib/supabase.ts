import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vlkrtokhkjclcgvbtjdq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3J0b2toa2pjbGNndmJ0amRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMjI1MTAsImV4cCI6MjA5MDU5ODUxMH0.aXMIiSxn6RQUpZYZaN_oYcrpvEqUNn2xD5r5jCEI6nA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
