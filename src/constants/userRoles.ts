export const userRoles = {
  OWNER: "OWNER",
  APPLICANT: "APPLICANT",
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
