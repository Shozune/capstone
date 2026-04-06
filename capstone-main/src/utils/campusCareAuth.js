import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

export async function logoutCampusCare() {
  window.localStorage.removeItem("campuscare_session_v1");
  if (isSupabaseConfigured() && supabase) {
    await supabase.auth.signOut();
  }
}
