import { z } from "zod";
import { urlSchema } from "./commonSchema";

// 알바폼 생성/수정
export const formSchema = z.object({
  isPublic: z.boolean(),
  hourlyWage: z.number().min(1, "시급을 입력해주세요."),
  isNegotiableWorkDays: z.boolean(),
  workDays: z.array(z.string()),
  workEndTime: z.string(),
  workStartTime: z.string(),
  workEndDate: z.string(),
  workStartDate: z.string(),
  location: z.string(),
  preferred: z.string(),
  age: z.string(),
  education: z.string(),
  gender: z.string(),
  numberOfPositions: z.number().min(1, "모집 인원을 입력해주세요."),
  imageUrls: z.array(urlSchema),
  recruitmentEndDate: z.string(),
  recruitmentStartDate: z.string(),
  description: z.string(),
  title: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
