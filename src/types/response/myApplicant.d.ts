// 회원의 내 지원내역 조회
export interface MyApplicationResponse {
  id: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}

// 비회원의 내 지원내역 조회
export interface MyApplicationVerifyResponse {
  applicantId: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}
