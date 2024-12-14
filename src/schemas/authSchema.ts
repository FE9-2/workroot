import { z } from "zod";

import { emailSchema, nicknameSchema, passwordSchema, roleSchema } from "./commonSchema";
import { userRoles } from "@/constants/userRoles";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    name: z.string().min(1, "이름을 입력해주세요"),
    nickname: nicknameSchema,
    role: roleSchema,

    // 지원자 전용 필드
    phoneNumber: z.string().optional(),

    // 사장님 전용 필드
    storeName: z.string().optional(),
    storePhoneNumber: z.string().optional(),
    location: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === userRoles.APPLICANT) {
        return data.phoneNumber?.match(/^(010)-\d{4}-\d{4}$/);
      }
      return true;
    },
    {
      message: "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)",
      path: ["phoneNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.role === userRoles.OWNER) {
        return data.storeName?.trim() !== "";
      }
      return true;
    },
    {
      message: "가게 이름을 입력해주세요",
      path: ["storeName"],
    }
  )
  .refine(
    (data) => {
      if (data.role === userRoles.OWNER) {
        return data.storePhoneNumber?.match(/^(02|0[0-9]{2})-\d{3,4}-\d{4}$/);
      }
      return true;
    },
    {
      message: "올바른 전화번호 형식이 아닙니다 (예: 02-123-4567)",
      path: ["storePhoneNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.role === userRoles.OWNER) {
        return data.location?.trim() !== "";
      }
      return true;
    },
    {
      message: "가게 위치를 입력해주세요",
      path: ["location"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
