import { formatRecruitDate, getWorkDaysDisplay } from "@/utils/workDayFormatter";
import RecruitConditionItem from "./RecruitConditionItem";

interface RecruitConditionProps {
  hourlyWage: number;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  isNegotiableWorkDays: boolean;
  workDays?: string[];
  workStartTime: string;
  workEndTime: string;
}

export const RecruitCondition = ({
  hourlyWage,
  recruitmentStartDate,
  recruitmentEndDate,
  isNegotiableWorkDays,
  workDays = [],
  workStartTime,
  workEndTime,
}: RecruitConditionProps) => {
  const periodValue = (
    <>
      <span className="whitespace-normal md:hidden">
        {formatRecruitDate(recruitmentStartDate)}~{formatRecruitDate(recruitmentEndDate)}
      </span>
      <span className="hidden whitespace-normal md:inline">
        {formatRecruitDate(recruitmentStartDate, true)}~
        <br />
        {formatRecruitDate(recruitmentEndDate, true)}
      </span>
    </>
  );

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
    <div className="h-auto w-full sm:h-[156px] sm:w-[327px] sm:p-3 md:h-[336px] md:w-[640px]">
      <div className="grid h-full grid-cols-2 gap-2 sm:gap-3">
        {conditions.map((condition, index) => (
          <RecruitConditionItem key={index} icon={condition.icon} label={condition.label} value={condition.value} />
        ))}
      </div>
    </div>
  );
};

export default RecruitCondition;
