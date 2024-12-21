import { OAuthSignupSchema } from "@/schemas/oauthSchema";
import { AuthResponse } from "@/types/response/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { OAuthProvider } from "@/constants/oauthProviders";

export const useOAuthSignup = (provider: OAuthProvider) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: OAuthSignupSchema) => {
      const response = await axios.post<AuthResponse>(`/api/oauth/signup/${provider}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(["user"], { user: data.user });
        toast.success("회원가입이 완료되었습니다!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("회원가입 중 오류가 발생했습니다.");
      }
      console.error("OAuth signup failed:", error);
    },
  });

  return {
    oauthSignup: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
