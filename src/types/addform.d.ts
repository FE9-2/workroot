export interface RecruitContentFormData {
  imageUrls: string[];
  recruitmentEndDate: string | undefined;
  recruitmentStartDate: string | undefined;
  description: string;
  title: string;
}

export interface RecruitConditionFormData {
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
}

export interface WorkConditionFormData {
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: string[];
  workEndTime: string;
  workStartTime: string;
  workEndDate: string;
  workStartDate: string;
  location: string;
  isPublic: boolean;
}
