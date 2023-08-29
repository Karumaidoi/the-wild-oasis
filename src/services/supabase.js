import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vgqsagnnycaopqhoiupa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncXNhZ25ueWNhb3BxaG9pdXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NzIyNDEsImV4cCI6MjAwNzQ0ODI0MX0.Emf-nLDjEUjMl2YFN7e3h94isrC2HwQcLYAifZa4FDA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
