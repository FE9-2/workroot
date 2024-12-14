import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyCommentListResponse } from "@/types/response/user";
import toast from "react-hot-toast";

interface MyCommentsParams {
  page?: number;
  pageSize?: number;
}

export const useMyComments = (params: MyCommentsParams = { page: 1, pageSize: 10 }) => {
  const query = useQuery({
    queryKey: ["myComments", params.page, params.pageSize],
    queryFn: async () => {
      try {
        const response = await axios.get<MyCommentListResponse>("/api/users/me/comments", {
          params: {
            page: params.page,
            pageSize: params.pageSize,
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "내 댓글을 불러오는데 실패했습니다.";
          toast.error(errorMessage, {
            style: {
              textAlign: "center",
            },
          });
        } else {
          toast.error("내 댓글을 불러오는 중 오류가 발생했습니다.", {
            style: {
              textAlign: "center",
            },
          });
        }
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
