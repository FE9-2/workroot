import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === "undefined") {
    throw new Error("Supabase 환경 변수가 없습니다.");
  }
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
