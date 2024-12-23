import { z } from "zod";
import { providerSchema, roleSchema } from "./commonSchema";

// 소셜 로그인 App 등록/수정
export const oauthAppSchema = z.object({
  appKey: z.string(),
  provider: providerSchema,
});

export type OAuthAppSchema = z.infer<typeof oauthAppSchema>;

// 소셜 회원가입
export const oauthSignupSchema = z.object({
  location: z.string(),
  phoneNumber: z.string(),
  storePhoneNumber: z.string(),
  storeName: z.string(),
  role: roleSchema,
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
