import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 URL과 키 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트 생성
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
