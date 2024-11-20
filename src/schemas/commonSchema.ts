import { z } from "zod";

export const emailSchema = z.string().email("올바른 이메일 형식이 아닙니다.");

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    "비밀번호는 영문, 숫자, 특수문자(@$!%*?&#)를 모두 포함해야 합니다"
  );

export const dateSchema = z
  .string()
  .datetime({ message: "유효한 ISO 8601 형식의 날짜여야 합니다" })
  .refine((date) => {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    return isoRegex.test(date);
  }, "UTC 타임존(Z)이 포함된 ISO 8601 형식이어야 합니다");

export const imageUrlSchema = z.string().url("올바른 이미지 URL이 아닙니다.");

export const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

export const phoneSchema = z
  .string()
  .regex(phoneRegex, "올바른 전화번호 형식이 아닙니다")
  .transform((val) => {
    const nums = val.replace(/[^0-9]/g, "");
    if (nums.length === 10) {
      return `${nums.slice(0, 3)}-${nums.slice(3, 6)}-${nums.slice(6)}`;
    }
    return val;
  });

export const ROLES = {
  OWNER: "OWNER",
  APPLICANT: "APPLICANT",
} as const;

export const roleSchema = z.enum([ROLES.OWNER, ROLES.APPLICANT], {
  errorMap: () => ({ message: "사장님 또는 지원자를 선택해주세요" }),
});

export type Role = z.infer<typeof roleSchema>;
