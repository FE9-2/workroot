import { APPLICATION_STATUS, ApplicationStatusType } from "@/types/applicationStatus";

// 지원 상태에 따른 Chip 컴포넌트의 variant를 반환하는 함수
export const getStatusVariant = (status: ApplicationStatusType) => {
  switch (status) {
    case APPLICATION_STATUS.HIRED:
      return "positive";
    case APPLICATION_STATUS.REJECTED:
      return "negative";
    default:
      return "positive";
  }
};

// 상태를 한글로 변환하는 함수
const statusMap: { [key: string]: string } = {
  HIRED: "채용 완료",
  REJECTED: "거절",
  INTERVIEW_PENDING: "면접 대기",
  INTERVIEW_COMPLETED: "면접 완료",
};

// 상태를 변환하는 함수
export const getStatusMap = (status: ApplicationStatusType) => {
  return statusMap[status] || status;
};

// 기본 내보내기
const translateStatus = (status: ApplicationStatusType) => {
  return getStatusMap(status);
};

export default translateStatus;
