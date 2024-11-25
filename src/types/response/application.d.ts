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
