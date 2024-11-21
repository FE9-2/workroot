import { z } from "zod";

import { ROLES, emailSchema, passwordSchema, phoneSchema, roleSchema } from "./commonSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

// 공통 필드 스키마
const baseSignupSchema = {
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  name: z.string().min(1, "이름을 입력해주세요."),
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  role: roleSchema,
};

// 사장님 스키마
const ownerSchema = z.object({
  ...baseSignupSchema,
  storeName: z.string().min(1, "가게 이름을 입력해주세요."),
  storePhoneNumber: phoneSchema,
  location: z.string().min(1, "가게 위치를 입력해주세요."),
  phoneNumber: z.string().optional().nullable(),
});

// 지원자 스키마
const applicantSchema = z.object({
  ...baseSignupSchema,
  phoneNumber: phoneSchema,
  storeName: z.string().optional().nullable(),
  storePhoneNumber: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});

export const signupSchema = z
  .discriminatedUnion("role", [
    ownerSchema.extend({ role: z.literal(ROLES.OWNER) }),
    applicantSchema.extend({ role: z.literal(ROLES.APPLICANT) }),
  ])
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
