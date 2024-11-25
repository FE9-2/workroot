import { z } from "zod";
import { providerSchema } from "./commonSchema";

// 소셜 로그인
export const oauthSchema = z.object({
  appKey: z.string(),
  provider: providerSchema,
});

export type OauthSchema = z.infer<typeof oauthSchema>;
