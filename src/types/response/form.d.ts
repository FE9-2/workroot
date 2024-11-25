// 알바폼 생성/수정 응답
export interface FormResponse {
  updatedAt: Date;
  createdAt: Date;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: Array<string>;
  workEndTime: string;
  workStartTime: string;
  workEndDate: Date;
  workStartDate: Date;
  location: string;
  recruitmentEndDate: Date;
  recruitmentStartDate: Date;
  description: string;
  title: string;
  ownerId: number;
  id: number;
}

// 알바폼 목록 타입
export interface FormListType {
  updatedAt: Date;
  createdAt: Date;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: Array<string>;
  recruitmentEndDate: Date;
  recruitmentStartDate: Date;
  title: string;
  id: number;
}

// 알바폼 목록 응답
export interface FormListResponse {
  data: Array<FormListType>;
  nextCursor: number | null;
}

// 알바폼 상세 조회/스크랩 응답
export interface FormDetailResponse {
  updatedAt: Date;
  createdAt: Date;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: Array<string>;
  workEndTime: string;
  workStartTime: string;
  workEndDate: Date;
  workStartDate: Date;
  location: string;
  imageUrls: Array<string>;
  recruitmentEndDate: Date;
  recruitmentStartDate: Date;
  description: string;
  title: string;
  ownerId: number;
  id: number;
  scrapCount: number;
  applyCount: number;
  isScrapped: boolean;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
}
