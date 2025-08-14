import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://umjbhkrjnunmwevsxzik.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtamJoa3JqbnVubXdldnN4emlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjAxNzksImV4cCI6MjA2OTc5NjE3OX0.1zmwLzPc7hyivatl0vtHbzgIGE-sbUCbqixNeTVyGZw";

export const supabase = createClient(supabaseUrl, supabaseKey);