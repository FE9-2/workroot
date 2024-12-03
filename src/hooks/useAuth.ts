import { LoginSchema, SignupSchema } from "@/schemas/authSchema";
import { AuthResponse } from "@/types/response/auth";
import { UserResponse } from "@/types/response/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type UserQueryResponse = AuthResponse | { user: null };
type CachedUserData = UserResponse | null;

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 사용자 정보 조회
  const { data: userData, isLoading: isUserLoading } = useQuery<UserQueryResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get<AuthResponse>("/api/users/me", {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return { user: null, accessToken: "", refreshToken: "" };
          }
          throw new Error(error.response?.data?.message || "사용자 정보를 가져오는데 실패했습니다.");
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 캐시된 사용자 정보 가져오기
  const cachedData = queryClient.getQueryData<CachedUserData>(["user"]);

  // 사용자 정보 추출 및 변환
  const currentUser =
    cachedData && "id" in cachedData
      ? ({
          id: cachedData.id,
          email: cachedData.email,
          name: cachedData.name,
          nickname: cachedData.nickname,
          imageUrl: cachedData.imageUrl,
          role: cachedData.role,
        } as UserResponse)
      : (userData?.user ?? null);

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
          return null;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: Error) => {
      console.error("Token refresh failed:", error);
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

  // 전체 로딩 상태 계산
  const isLoading = isUserLoading || refreshMutation.isPending;

  return {
    signup,
    login,
    logout,
    refresh,
    user: currentUser,
    isSignupPending: signupMutation.isPending,
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isRefreshPending: refreshMutation.isPending,
    signupError: signupMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    isLoading,
    refreshError: refreshMutation.error,
  };
};
