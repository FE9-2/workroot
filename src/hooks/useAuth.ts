import { LoginSchema, SignupSchema } from "@/schemas/authSchema";
import { useUserStore } from "@/store/userStore";
import { AuthResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  // 회원가입 mutation
  const signupMutation = useMutation<AuthResponse, Error, SignupSchema>({
    mutationFn: async (data: SignupSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/signup", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Signup error:", error);
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
    onError: (error) => {
      console.error("Signup mutation error:", error);
      toast.error(error.message || "회원가입 중 오류가 발생했습니다.");
    },
  });

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await axios.post<AuthResponse>("/api/auth/login", data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("로그인되었습니다!");
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그인 중 오류가 발생했습니다.");
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post<AuthResponse>(
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
      toast.success("로그아웃되었습니다!");
      router.push("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그아웃 중 오류가 발생했습니다.");
    },
  });

  const signup = (data: SignupSchema) => {
    signupMutation.mutate(data);
  };

  const login = (data: LoginSchema) => {
    loginMutation.mutate(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    signup,
    login,
    logout,
    isSignupPending: signupMutation.isPending,
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  };
};
