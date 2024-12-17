import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { PostDetailResponse } from "@/types/response/post";

export const usePostDetail = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async (): Promise<PostDetailResponse> => {
      try {
        const { data } = await axios.get(`/api/posts/${postId}`, {
          withCredentials: false,
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "게시글을 불러오는데 실패했습니다.";
          toast.error(errorMessage, {
            style: {
              textAlign: "center",
            },
          });
        } else {
          toast.error("게시글을 불러오는 중 오류가 발생했습니다.", {
            style: {
              textAlign: "center",
            },
          });
        }
        throw error;
      }
    },
    enabled: !!postId,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
