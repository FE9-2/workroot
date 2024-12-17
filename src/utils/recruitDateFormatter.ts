export const getRecruitmentStatus = (endDate: Date): "모집 중" | "모집 종료" => {
  const today = new Date();
  const recruitmentEndDate = new Date(endDate);

  // 시간을 00:00:00으로 설정하여 날짜만 비교
  today.setHours(0, 0, 0, 0);
  recruitmentEndDate.setHours(0, 0, 0, 0);

  return today <= recruitmentEndDate ? "모집 중" : "모집 종료";
};

export const getRecruitmentDday = (endDate: Date): string => {
  const today = new Date();
  const recruitmentEndDate = new Date(endDate);

  // 시간을 00:00:00으로 설정하여 날짜만 비교
  today.setHours(0, 0, 0, 0);
  recruitmentEndDate.setHours(0, 0, 0, 0);

  const diffTime = recruitmentEndDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "마감";
  }

  return `마감 D-${diffDays}`;
};
