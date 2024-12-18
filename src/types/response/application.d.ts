import { ApplicationStatusType } from "@/types/applicationStatus";

// MyApplicationModal 모달 내부 정보 컴포넌트 props
export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  isIntroduction?: boolean;
}

// 이력서 다운로드 버튼 props
export interface ResumeDownloadProps {
  resumeId: number;
  resumeName: string;
}

// 지원 내역 응답
export interface ApplicationResponse {
  id: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: ApplicationStatusType;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}

// 지원 목록 응답
export interface ApplicationListResponse {
  data: Array<ApplicationResponse>;
  nextCursor: number | null;
}
