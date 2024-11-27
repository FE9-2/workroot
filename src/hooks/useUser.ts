import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import { UserResponse } from "@/types/response/user";
import { useEffect } from "react";

async function fetchUser() {
  try {
    const response = await axios.get("/api/users/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { user: null };
      }
      throw new Error(error.response?.data?.message || "사용자 정보를 가져오는데 실패했습니다.");
    }
    throw error;
  }
}

export function useUser() {
  const setUser = useUserStore((state) => state.setUser);
  const storeUser = useUserStore((state) => state.user);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  useEffect(() => {
    if (data?.user) {
      const userResponse = data.user as unknown as UserResponse;
      setUser(userResponse);
    } else if (!isLoading) {
      setUser(null);
    }
  }, [data, isLoading, setUser]);

  useEffect(() => {
    if (error instanceof Error && error.message !== "Unauthorized") {
      toast.error(error.message || "사용자 정보를 가져오는데 실패했습니다.");
      setUser(null);
    }
  }, [error, setUser]);

  const isAuthenticated = !!storeUser;

  return {
    user: storeUser,
    isLoading,
    error,
    isAuthenticated,
    refetch,
  };
}
