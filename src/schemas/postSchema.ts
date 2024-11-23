import { z } from "zod";
import { urlSchema } from "./commonSchema";

// 게시글 등록/수정
export const postSchema = z.object({
  imageUrl: urlSchema,
  content: z.string().min(1, "내용을 입력해주세요."),
  title: z.string().min(1, "제목을 입력해주세요."),
});

export type PostSchema = z.infer<typeof postSchema>;
