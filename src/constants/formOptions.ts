export const formSortOptions = {
  MOST_RECENT: "mostRecent",
  HIGHEST_WAGE: "highestWage",
  MOST_APPLIED: "mostApplied",
  MOST_SCRAPPED: "mostScrapped",
} as const;

export const formStatusOptions = {
  REJECTED: "REJECTED",
  INTERVIEW_PENDING: "INTERVIEW_PENDING",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  HIRED: "HIRED",
} as const;

// 타입 추출
export type FormSortOptionsType = (typeof formSortOptions)[keyof typeof formSortOptions];
export type FormStatusOptionsType = (typeof formStatusOptions)[keyof typeof formStatusOptions];
