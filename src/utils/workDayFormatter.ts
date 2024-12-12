import { workDayOptions } from "@/constants/workDayOptions";

export const formatRecruitDate = (date: Date, isMd: boolean = false) => {
  // 유효한 Date 객체인지 확인
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  const year = isMd ? date.getFullYear().toString() : date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const getWorkDaysDisplay = (isNegotiableWorkDays: boolean, workDays: string[] = []) => {
  if (isNegotiableWorkDays) return "요일협의";
  if (!workDays.length) return "-";

  // 요일 순서 정의
  const dayOrder = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  // 한글 요일을 영어 요일로 변환
  const translatedWorkDays = workDays.map((day) => {
    const key = (Object.keys(workDayOptions) as Array<keyof typeof workDayOptions>).find(
      (k) => workDayOptions[k] === day
    );
    return key ? key : day; // 변환된 요일 또는 원래 요일 반환
  });

  // 유효한 요일만 필터링
  const validWorkDays = translatedWorkDays.filter((day) => dayOrder.includes(day));
  const sortedDays = validWorkDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  console.log("getWorkDaysDisplay", sortedDays);

  const result: string[] = [];
  let startDay = sortedDays[0];
  let prevIndex = dayOrder.indexOf(sortedDays[0]);

  for (let i = 1; i <= sortedDays.length; i++) {
    const currentDay = sortedDays[i];
    const currentIndex = currentDay ? dayOrder.indexOf(currentDay) : -1;

    if (i === sortedDays.length || currentIndex !== prevIndex + 1) {
      // 연속되지 않은 경우나 마지막 요일인 경우
      const endDay = sortedDays[i - 1];
      const startDayKor = workDayOptions[startDay as keyof typeof workDayOptions];
      const endDayKor = workDayOptions[endDay as keyof typeof workDayOptions];

      if (startDay === endDay) {
        result.push(startDayKor);
      } else {
        result.push(`${startDayKor}~${endDayKor}`);
      }
      startDay = currentDay;
    }
    prevIndex = currentIndex;
  }

  return result.filter((day) => day).join(", "); // 빈 문자열 필터링 후 join
};
