export const applicationStatus = {
  ALL: "",
  REJECTED: "REJECTED",
  INTERVIEW_PENDING: "INTERVIEW_PENDING",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  HIRED: "HIRED",
} as const;

export type ApplyStatus = (typeof applicationStatus)[keyof typeof applicationStatus];
