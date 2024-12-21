import { supabaseClient } from "@/lib/supabaseClient";
import { useSocialLoginStore } from "@/store/socialLoginStore";

// 소셜 로그인
export const signInWithProvider = async (provider: "google" | "kakao") => {
  const { error, data } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/signup`,
    },
  });

  if (error) {
    console.error("Social login failed:", error.message);
    return null;
  }

  // 로그인 성공 시 JWT 디코딩
  if (data?.url) {
    try {
      const payload = JSON.parse(atob(data.url.split(".")[1]));
      const { email, user_metadata } = payload;
      const nickname = user_metadata.name || user_metadata.full_name || user_metadata.preferred_username;

      // store에 정보 저장
      useSocialLoginStore.getState().setLoginInfo(email, nickname, provider);
    } catch (e) {
      console.error("Failed to parse token:", e);
    }
  }

  return data;
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
