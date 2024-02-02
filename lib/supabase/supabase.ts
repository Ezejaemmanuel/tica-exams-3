import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//console.log("SUPABASE_PROJECT_URL is: ", SUPABASE_PROJECT_URL);
//console.log("SUPABASE_ANON_KEY is: ", SUPABASE_ANON_KEY);
if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Environment variables SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY must be set');
}


export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
