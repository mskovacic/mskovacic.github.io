import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    const missing = [];
    if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
    if (!supabaseKey) missing.push('VITE_SUPABASE_PUBLISHABLE_KEY');
    throw new Error(`Supabase configuration missing: ${missing.join(', ')}. Please set environment variables in your .env.local file.`);
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}
