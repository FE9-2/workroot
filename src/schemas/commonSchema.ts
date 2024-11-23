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

export const ROLES = {
  OWNER: "OWNER",
  APPLICANT: "APPLICANT",
} as const;

export const roleSchema = z.enum([ROLES.OWNER, ROLES.APPLICANT], {
  errorMap: () => ({ message: "사장님 또는 지원자를 선택해주세요" }),
});

export type Role = z.infer<typeof roleSchema>;

export const nicknameSchema = z
  .string()
  .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
  .max(10, "닉네임은 최대 10자까지 가능합니다.")
  .regex(/^[가-힣a-zA-Z0-9]+$/, "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.");

export const FORM_SORT_OPTIONS = {
  MOST_RECENT: "mostRecent",
  HIGHEST_WAGE: "highestWage",
  MOST_APPLIED: "mostApplied",
  MOST_SCRAPPED: "mostScrapped",
} as const;

export const formSortSchema = z
  .enum([
    FORM_SORT_OPTIONS.MOST_RECENT,
    FORM_SORT_OPTIONS.HIGHEST_WAGE,
    FORM_SORT_OPTIONS.MOST_APPLIED,
    FORM_SORT_OPTIONS.MOST_SCRAPPED,
  ])
  .optional()
  .default(FORM_SORT_OPTIONS.MOST_RECENT);

export const FORM_STATUS_OPTIONS = {
  REJECTED: "REJECTED",
  INTERVIEW_PENDING: "INTERVIEW_PENDING",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  HIRED: "HIRED",
} as const;

export const formStatusSchema = z
  .enum([
    FORM_STATUS_OPTIONS.REJECTED,
    FORM_STATUS_OPTIONS.INTERVIEW_PENDING,
    FORM_STATUS_OPTIONS.INTERVIEW_COMPLETED,
    FORM_STATUS_OPTIONS.HIRED,
  ])
  .optional()
  .default(FORM_STATUS_OPTIONS.REJECTED);

export const POST_SORT_OPTIONS = {
  MOST_RECENT: "mostRecent",
  MOST_COMMENTED: "mostCommented",
  MOST_LIKED: "mostLiked",
} as const;

export const postSortSchema = z
  .enum([POST_SORT_OPTIONS.MOST_RECENT, POST_SORT_OPTIONS.MOST_COMMENTED, POST_SORT_OPTIONS.MOST_LIKED])
  .optional()
  .default(POST_SORT_OPTIONS.MOST_RECENT);

export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  KAKAO: "kakao",
} as const;

export const providerSchema = z.enum([OAUTH_PROVIDERS.GOOGLE, OAUTH_PROVIDERS.KAKAO], {
  errorMap: () => ({ message: "지원하지 않는 소셜 로그인 제공자입니다." }),
});
