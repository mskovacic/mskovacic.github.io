import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://sakvpzoeopkquwlvoclz.supabase.co', 'sb_publishable_aDLeM8bQLlG8bmzTVWc4Tw_wyqj20DN')

// ---cut---
export async function signInWithAzure() {
  return supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email User.Read',
      redirectTo: window.location.origin,
    },
  })
}

export async function signUpWithAzure(email: string) {
  return supabase.auth.signUp({
    email: email,
    password: 'dummy-password',
    options: {
      emailRedirectTo: window.location.origin,
    },
  })
}
