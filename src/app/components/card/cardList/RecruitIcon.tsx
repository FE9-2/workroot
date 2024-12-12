import { formatRecruitDate, getWorkDaysDisplay } from "@/utils/workDayFormatter";
import RecruitIconItem from "./RecruitIconItem";

// 채용 공고 아이콘 컴포넌트의 Props 인터페이스
interface RecruitIconProps {
  hourlyWage: number;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  isNegotiableWorkDays: boolean;
  workDays?: string[];
  workStartTime: string;
  workEndTime: string;
}

// 채용 공고의 근무 조건을 아이콘으로 표시하는 컴포넌트
export const RecruitIcon = ({
  hourlyWage,
  recruitmentStartDate,
  recruitmentEndDate,
  isNegotiableWorkDays,
  workDays = [],
  workStartTime,
  workEndTime,
}: RecruitIconProps) => {
  // 모집 기간을 반응형으로 표시하는 컴포넌트
  const periodValue = (
    <>
      {/* 모바일에서 표시되는 기간 형식 */}
      <span className="whitespace-normal lg:hidden">
        {formatRecruitDate(recruitmentStartDate)}~{formatRecruitDate(recruitmentEndDate)}
      </span>
      {/* 데스크탑에서 표시되는 기간 형식 */}
      <span className="hidden whitespace-normal lg:inline">
        {formatRecruitDate(recruitmentStartDate, true)}~
        <br />
        {formatRecruitDate(recruitmentEndDate, true)}
      </span>
    </>
  );

  // 근무 조건 데이터 배열
  const conditions = [
    {
      icon: {
        sm: "/icons/coin/coin-sm.svg",
        md: "/icons/coin/coin-md.svg",
      },
      label: "시급",
      value: `${hourlyWage.toLocaleString()}원`,
    },
    {
      icon: {
        sm: "/icons/calendar/calendar-clock-sm.svg",
        md: "/icons/calendar/calendar-clock-md.svg",
      },
      label: "기간",
      value: periodValue,
    },
    {
      icon: {
        sm: "/icons/calendar/calendar-sm.svg",
        md: "/icons/calendar/calendar-md.svg",
      },
      label: "요일",
      value: getWorkDaysDisplay(isNegotiableWorkDays, workDays),
    },
    {
      icon: {
        sm: "/icons/clock/clock-sm.svg",
        md: "/icons/clock/clock-md.svg",
      },
      label: "시간",
      value: `${workStartTime}~${workEndTime}`,
    },
  ];

  return (
    // 반응형 컨테이너
    <div className="h-auto w-auto p-3 lg:w-[640px]">
      {/* 2x2 그리드 레이아웃 */}
      <div className="grid h-full grid-cols-2 gap-2">
        {conditions.map((condition, index) => (
          <RecruitIconItem key={index} icon={condition.icon} label={condition.label} value={condition.value} />
        ))}
      </div>
    </div>
  );
};

export default RecruitIcon;
