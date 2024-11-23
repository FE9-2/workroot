import { formSortOptions, formStatusOptions } from "@/constants/formOptions";
import { oauthProviders } from "@/constants/oauthProviders";
import { postSortOptions } from "@/constants/postOptions";
import { userRoles } from "@/constants/userRoles";
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

export const urlSchema = z.string().url("올바른 이미지 URL이 아닙니다.");

export const phoneRegex = /^(02|01[0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

export const phoneSchema = z
  .string()
  .regex(phoneRegex, "올바른 전화번호 형식이 아닙니다")
  .transform((val) => {
    const nums = val.replace(/[^0-9]/g, "");
    if (nums.startsWith("02")) {
      if (nums.length === 9) {
        return `${nums.slice(0, 2)}-${nums.slice(2, 5)}-${nums.slice(5)}`;
      }
      if (nums.length === 10) {
        return `${nums.slice(0, 2)}-${nums.slice(2, 6)}-${nums.slice(6)}`;
      }
    }
    if (nums.length === 10) {
      return `${nums.slice(0, 3)}-${nums.slice(3, 6)}-${nums.slice(6)}`;
    }
    if (nums.length === 11) {
      return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
    }
    return val;
  });

export const roleSchema = z.enum([userRoles.OWNER, userRoles.APPLICANT], {
  errorMap: () => ({ message: "사장님 또는 지원자를 선택해주세요" }),
});

export type Role = z.infer<typeof roleSchema>;

export const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
  .max(10, "닉네임은 최대 10자까지 가능합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.");

export const formSortSchema = z
  .enum([
    formSortOptions.MOST_RECENT,
    formSortOptions.HIGHEST_WAGE,
    formSortOptions.MOST_APPLIED,
    formSortOptions.MOST_SCRAPPED,
  ])
  .optional()
  .default(formSortOptions.MOST_RECENT);

export const formStatusSchema = z
  .enum([
    formStatusOptions.REJECTED,
    formStatusOptions.INTERVIEW_PENDING,
    formStatusOptions.INTERVIEW_COMPLETED,
    formStatusOptions.HIRED,
  ])
  .optional()
  .default(formStatusOptions.REJECTED);

export const postSortSchema = z
  .enum([postSortOptions.MOST_RECENT, postSortOptions.MOST_COMMENTED, postSortOptions.MOST_LIKED])
  .optional()
  .default(postSortOptions.MOST_RECENT);

export const providerSchema = z.enum([oauthProviders.GOOGLE, oauthProviders.KAKAO], {
  errorMap: () => ({ message: "지원하지 않는 소셜 로그인 제공자입니다." }),
});
