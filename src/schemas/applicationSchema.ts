import { z } from "zod";
import { passwordSchema, phoneSchema } from "./commonSchema";

// 지원서 등록
export const applicationSchema = z.object({
  password: passwordSchema,
  introduction: z.string(),
  resumeName: z.string(),
  resumeId: z.number(),
  experienceMonths: z.number(),
  phoneNumber: phoneSchema,
  name: z.string(),
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;
