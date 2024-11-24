import { LoginSchema, SignupSchema } from "@/schemas/authSchema";
import { useUserStore } from "@/store/userStore";
import { AuthResponse } from "@/types/response/auth";
import { UserResponse } from "@/types/response/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const storeUser = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  // 토큰 갱신 mutation
  const refreshMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post<AuthResponse>(
          "/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          // 리프레시 토큰이 없는 경우 조용히 처리
          setUser(null);
          return null;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        const userResponse = data.user as unknown as UserResponse;
        setUser(userResponse);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: Error) => {
      console.error("Token refresh failed:", error);
      setUser(null);
      router.push("/login");
    },
  });

  // 회원가입 mutation
  const signupMutation = useMutation<AuthResponse, Error, SignupSchema>({
    mutationFn: async (data: SignupSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/signup", data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // 서버에서 전달된 에러 메시지 사용
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
      // error.message에는 서버에서 전달된 메시지가 포함됨
      toast.error(error.message);
    },
  });

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/login", data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // 서버에서 전달된 에러 메시지 사용
          throw new Error(error.response?.data?.message || "로그인 중 오류가 발생했습니다.");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        const userResponse = data.user as unknown as UserResponse;
        setUser(userResponse);
        toast.success("로그인되었습니다!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error: Error) => {
      // error.message에는 서버에서 전달된 메시지가 포함됨
      toast.error(error.message);
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setUser(null);
      queryClient.clear(); // 모든 쿼리 캐시 초기화
      toast.success("로그아웃되었습니다!");
      router.push("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그아웃 중 오류가 발생했습니다.");
    },
  });

  const signup = (data: SignupSchema) => signupMutation.mutate(data);
  const login = (data: LoginSchema) => loginMutation.mutate(data);
  const logout = () => logoutMutation.mutate();
  const refresh = () => refreshMutation.mutate();

  return {
    signup,
    login,
    logout,
    refresh,
    user: storeUser,
    isSignupPending: signupMutation.isPending,
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isRefreshPending: refreshMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    isLoading: refreshMutation.isPending,
    refreshError: refreshMutation.error,
  };
};
