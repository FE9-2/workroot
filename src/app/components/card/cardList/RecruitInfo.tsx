import Image from "next/image";
import { formatRecruitDate, getWorkDaysDisplay } from "@/utils/dateFormatter";

interface RecruitInfoProps {
  hourlyWage: number;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  isNegotiableWorkDays: boolean;
  workDays?: string[];
  workStartTime: string;
  workEndTime: string;
}

export default function RecruitInfo({
  hourlyWage,
  recruitmentStartDate,
  recruitmentEndDate,
  isNegotiableWorkDays,
  workDays = [],
  workStartTime,
  workEndTime,
}: RecruitInfoProps) {
  return (
    <div className="h-auto w-full sm:h-[156px] sm:w-[327px] sm:p-3 md:h-[336px] md:w-[640px]">
      <div className="grid h-full grid-cols-2 gap-2 sm:gap-3">
        {/* 시급 섹션 */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 p-1 sm:p-3 md:gap-6 md:p-6">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-30 sm:h-9 sm:w-9 md:h-16 md:w-16">
            <div className="block md:hidden">
              <Image src="/icons/coin/coin-sm.svg" alt="coin" width={24} height={24} />
            </div>
            <div className="hidden md:block">
              <Image src="/icons/coin/coin-md.svg" alt="coin" width={36} height={36} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-gray-600 sm:text-xs md:text-xl">시급</div>
            <div className="text-xs font-semibold text-primary-orange-300 sm:text-sm md:text-2xl">
              {hourlyWage.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* 기간 섹션 */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 p-1 sm:p-3 md:gap-6 md:p-6">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-30 sm:h-9 sm:w-9 md:h-16 md:w-16">
            <div className="block md:hidden">
              <Image src="/icons/calendar/calendar-clock-sm.svg" alt="calendar" width={24} height={24} />
            </div>
            <div className="hidden md:block">
              <Image src="/icons/calendar/calendar-clock-md.svg" alt="calendar" width={36} height={36} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-gray-600 sm:text-xs md:text-xl">기간</div>
            <div className="break-words text-xs font-semibold text-primary-orange-300 sm:text-sm md:text-2xl">
              <span className="whitespace-normal md:hidden">
                {formatRecruitDate(recruitmentStartDate)}~{formatRecruitDate(recruitmentEndDate)}
              </span>
              <span className="hidden whitespace-normal md:inline">
                {formatRecruitDate(recruitmentStartDate, true)}~
                <br />
                {formatRecruitDate(recruitmentEndDate, true)}
              </span>
            </div>
          </div>
        </div>

        {/* 요일 섹션 */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 p-1 sm:p-3 md:gap-6 md:p-6">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-30 sm:h-9 sm:w-9 md:h-16 md:w-16">
            <div className="block md:hidden">
              <Image src="/icons/calendar/calendar-sm.svg" alt="calendar" width={24} height={24} />
            </div>
            <div className="hidden md:block">
              <Image src="/icons/calendar/calendar-md.svg" alt="calendar" width={36} height={36} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-gray-600 sm:text-xs md:text-xl">요일</div>
            <div className="text-xs font-semibold text-primary-orange-300 sm:text-sm md:text-2xl">
              {getWorkDaysDisplay(isNegotiableWorkDays, workDays)}
            </div>
          </div>
        </div>

        {/* 시간 섹션 */}
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 p-1 sm:p-3 md:gap-6 md:p-6">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-30 sm:h-9 sm:w-9 md:h-16 md:w-16">
            <div className="block md:hidden">
              <Image src="/icons/clock/clock-sm.svg" alt="clock" width={24} height={24} />
            </div>
            <div className="hidden md:block">
              <Image src="/icons/clock/clock-md.svg" alt="clock" width={36} height={36} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium text-gray-600 sm:text-xs md:text-xl">시간</div>
            <div className="text-xs font-semibold text-primary-orange-300 sm:text-sm md:text-2xl">
              {workStartTime}~{workEndTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
