import { z } from "zod";
import { nicknameSchema, passwordSchema, mobilePhoneSchema, storePhoneSchema, urlSchema } from "./commonSchema";

// 내 정보 수정 스키마
export const userPatchSchema = z.object({
  location: z.string().optional(),
  phoneNumber: mobilePhoneSchema.optional(),
  storePhoneNumber: storePhoneSchema.optional(),
  storeName: z.string().optional(),
  imageUrl: urlSchema.optional(),
  nickname: nicknameSchema.optional(),
  name: z.string().min(1, "이름을 입력해주세요.").optional(),
});

export type UserPatchSchema = z.infer<typeof userPatchSchema>;

// 비밀번호 변경 스키마
export const userPasswordSchema = z.object({
  newPassword: passwordSchema,
  currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
});

export type UserPasswordSchema = z.infer<typeof userPasswordSchema>;
