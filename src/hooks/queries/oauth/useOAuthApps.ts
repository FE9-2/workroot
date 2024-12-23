import { OAuthAppSchema } from "@/schemas/oauthSchema";
import { OauthAppResponse } from "@/types/oauth/oauth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useOAuthApps = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: OAuthAppSchema) => {
      const response = await axios.post<OauthAppResponse>("/api/oauth/apps", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oauthApps"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "OAuth 앱 등록에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("OAuth 앱 등록 중 오류가 발생했습니다.");
      }
      console.error("OAuth app registration failed:", error);
    },
  });

  return {
    registerOAuthApp: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
