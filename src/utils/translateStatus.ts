import { applicationStatus, ApplyStatus } from "@/types/application";

// 지원 상태에 따른 Chip 컴포넌트의 variant를 반환하는 함수
export const getStatusVariant = (status: ApplyStatus) => {
  switch (status) {
    case applicationStatus.HIRED:
      return "positive";
    case applicationStatus.REJECTED:
      return "negative";
    default:
      return "positive";
  }
};

// 상태를 한글로 변환하는 함수
const statusMap: { [key: string]: string } = {
  ALL: "전체",
  HIRED: "채용 완료",
  REJECTED: "거절",
  INTERVIEW_PENDING: "면접 대기",
  INTERVIEW_COMPLETED: "면접 완료",
};

// 상태를 변환하는 함수
export const getStatusMap = (status: ApplyStatus) => {
  return statusMap[status] || status;
};

// 기본 내보내기
const translateStatus = (status: ApplyStatus) => {
  return getStatusMap(status);
};

export default translateStatus;
