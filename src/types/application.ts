// 지원 현황
export const applicationStatus = {
  ALL: "",
  REJECTED: "REJECTED",
  INTERVIEW_PENDING: "INTERVIEW_PENDING",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  HIRED: "HIRED",
} as const;

export type ApplyStatus = (typeof applicationStatus)[keyof typeof applicationStatus];

// 회원의 내 지원내역 모달
export interface MyApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: number | string;
  className?: string;
}

// 모달 내 사용 타입
export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  isIntroduction?: boolean;
}
