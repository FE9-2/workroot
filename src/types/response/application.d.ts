// 지원 등록/상세/수정 응답
export interface ApplicationResponse {
  applicantId: number;
  updatedAt: Date;
  createdAt: Date;
  status: string;
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
}

// 지원 목록 응답
export interface ApplicationListResponse {
  data: Array<ApplicationResponse>;
  nextCursor: number | null;
}

// 회원의 내 지원내역 조회 모달 타입
export interface MyApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: number | string;
  className?: string;
}

// MyApplicationModal 모달 내부 내에서 사용하는 타입
export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  isIntroduction?: boolean;
}
