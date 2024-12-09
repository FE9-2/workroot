import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { PostDetailResponse } from "@/types/response/post";

interface PostCreateRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export const usePost = (): UseMutationResult<PostDetailResponse, Error, PostCreateRequest> => {
  return useMutation<PostDetailResponse, Error, PostCreateRequest>({
    mutationFn: async (data: PostCreateRequest) => {
      const apiUrl = `/api/posts`; // Next.js API 라우트로 요청

      try {
        const response = await axios.post<PostDetailResponse>(apiUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });
        return response.data;
      } catch (error: any) {
        console.error("Error during post request:", error);

        if (error.response) {
          console.error("Server response:", error.response.data);
          throw new Error(error.response.data.message || "게시글 등록에 실패했습니다.");
        }

        throw new Error("네트워크 오류가 발생했습니다.");
      }
    },
  });
};
