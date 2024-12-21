import { supabaseClient } from "@/lib/supabaseClient";

// 소셜 로그인
export const signInWithProvider = async (provider: "google" | "kakao") => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    console.error("Social login failed:", error.message);
    return null;
  }

  return null;
};

// 소셜 유저 정보 가져오기
export const getSocialUser = async () => {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error fetching social user:", error.message);
    return null;
  }

  return data?.user;
};
