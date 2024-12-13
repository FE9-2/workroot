const translateStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    ALL: "전체",
    HIRED: "채용 완료",
    REJECTED: "거절",
    INTERVIEW_PENDING: "면접 대기",
    INTERVIEW_COMPLETED: "면접 완료",
  };
  return statusMap[status] || status;
};

export default translateStatus;
