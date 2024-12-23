import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { OAuthProvider } from "@/constants/oauthProviders";

// 소셜 로그인
export const signInWithProvider = async (provider: OAuthProvider) => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("Social login failed:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Social auth error:", error);
    toast.error("소셜 인증 중 오류가 발생했습니다.");
    return null;
  }
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
