import { userRoles } from "@/constants/userRoles";
import { z } from "zod";

// 소셜 회원가입
export const oauthSignupSchema = z.object({
  location: z.string(),
  phoneNumber: z.string(),
  storePhoneNumber: z.string(),
  storeName: z.string(),
  role: z.enum([userRoles.APPLICANT, userRoles.OWNER]),
  nickname: z.string(),
  name: z.string(),
  redirectUri: z.string(),
  token: z.string(),
});

export type OAuthSignupSchema = z.infer<typeof oauthSignupSchema>;

// 소셜 로그인
export const oauthLoginSchema = z.object({
  redirectUri: z.string(),
  token: z.string(),
});

export type OAuthLoginSchema = z.infer<typeof oauthLoginSchema>;
