export const applicationStatus = {
  REJECTED: "REJECTED",
  INTERVIEW_PENDING: "INTERVIEW_PENDING",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  HIRED: "HIRED",
} as const;

export type ApplicationStatus = (typeof applicationStatus)[keyof typeof applicationStatus];
