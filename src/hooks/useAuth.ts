import { LoginSchema, SignupSchema } from "@/schemas/authSchema";
import { AuthResponse } from "@/types/response/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 회원가입 mutation
  const signupMutation = useMutation<AuthResponse, Error, SignupSchema>({
    mutationFn: async (data: SignupSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/signup", data, {
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/login", data, {
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "로그인 중 오류가 발생했습니다.");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        // React Query 캐시 업데이트
        queryClient.setQueryData(["user"], { user: data.user });

        toast.success("로그인되었습니다!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("user");
      queryClient.clear();

      toast.success("로그아웃되었습니다!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그아웃 중 오류가 발생했습니다.");
    },
  });

  // 토큰 갱신 mutation
  const refreshMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("/api/auth/refresh");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          return null;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        localStorage.removeItem("user");
      }
    },
    onError: (error: Error) => {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("user");
    },
  });

  const signup = (data: SignupSchema) => signupMutation.mutate(data);
  const login = (data: LoginSchema) => loginMutation.mutate(data);
  const logout = () => logoutMutation.mutate();
  const refresh = async () => {
    try {
      await refreshMutation.mutateAsync();
      return true;
    } catch {
      return false;
    }
  };

  return {
    signup,
    login,
    logout,
    refresh,
    isSignupPending: signupMutation.isPending,
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isRefreshPending: refreshMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshMutation.error,
  };
};
