import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthResponse } from "@/types/response/auth";

interface JwtPayload {
  sub: string;
  user_metadata: {
    email: string;
    name: string;
    provider_id: string;
  };
}

interface OAuthData {
  email: string;
  password: string;
  isNewUser: boolean;
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  role?: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

export const useOAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const oauthMutation = useMutation({
    mutationFn: async (data: OAuthData) => {
      const response = await axios.post<AuthResponse>("/api/auth/oauthlogin", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(["user"], { user: data.user });
        toast.success(data.user.id ? "로그인되었습니다!" : "회원가입이 완료되었습니다!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      console.error("OAuth auth error:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "인증에 실패했습니다.");
      } else {
        setError("인증 처리 중 문제가 발생했습니다.");
      }
    },
  });

  const handleOAuthCallback = async (token: string) => {
    try {
      // JWT 디코딩 (한글 처리)
      const [, payloadBase64] = token.split(".");
      const decodedPayload = Buffer.from(payloadBase64, "base64").toString("utf-8");
      const payload: JwtPayload = JSON.parse(decodedPayload);
      const oauthPassword = payload.sub.replace(/-/g, "");

      const userData = {
        email: payload.user_metadata.email,
        password: oauthPassword,
        name: payload.user_metadata.name,
        nickname: payload.user_metadata.name,
        phoneNumber: "",
        role: "APPLICANT",
        storeName: "",
        storePhoneNumber: "",
        location: "",
      };

      try {
        // 먼저 로그인 시도
        await oauthMutation.mutateAsync({
          email: userData.email,
          password: oauthPassword,
          isNewUser: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // 로그인 실패 시 회원가입 시도
          await oauthMutation.mutateAsync({
            ...userData,
            isNewUser: true,
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("OAuth callback error:", error);
      setError("인증 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    handleOAuthCallback,
    error,
    setError,
    isPending: oauthMutation.isPending,
  };
};
