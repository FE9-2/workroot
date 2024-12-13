"use client";
import React, { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";
import { useApplyStatus } from "@/hooks/queries/form/detail/useApplyStatus";
import translateStatus from "@/utils/translateStatus";
import { SkeletonRow } from "./SkeletonRow";

interface ApplyStatusCardProps {
  formId: number;
}

// 지원현황 카드 컴포넌트
const ApplyStatusCard = ({ formId }: ApplyStatusCardProps) => {
  const [experienceSort, setExperienceSort] = useState<"asc" | "desc">("asc");
  const [statusSort, setStatusSort] = useState<"asc" | "desc">("desc");

  const { applyStatusData, isLoading } = useApplyStatus({
    formId,
    limit: 30,
    cursor: 0,
    orderByExperience: experienceSort,
    orderByStatus: statusSort,
  });

  const theadStyle = " font-semibold text-grayscale-700";
  const sortIconStyle = "text-primary-orange-300 transition-transform hover:scale-110";

  // 정렬 상태 토글 함수
  const toggleExperienceSort = () => {
    setExperienceSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleStatusSort = () => {
    setStatusSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="w-[375px] text-xs md:w-[770px] md:text-base">
      <div className="flex flex-col">
        {/* Thead */}
        <div className="sticky grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-line-100 px-6 py-4">
          <span className={`${theadStyle} w-2/5`}>이름</span>
          <span className={`${theadStyle} w-1/4`}>전화번호</span>
          <div className="flex w-2/5 items-center gap-2">
            <span className={theadStyle}>경력</span>
            <button onClick={toggleExperienceSort}>
              <FaSortAmountDown className={cn(sortIconStyle, experienceSort === "desc" && "rotate-180")} />
            </button>
          </div>
          <div className="flex w-1/4 items-center gap-2">
            <span className={theadStyle} style={{ whiteSpace: "nowrap" }}>
              상태
            </span>
            <button onClick={toggleStatusSort}>
              <FaSortAmountDown className={cn(sortIconStyle, statusSort === "desc" && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Tbody */}
        <div>
          <div className="scrollbar-custom h-[360px] overflow-y-auto md:h-[400px]">
            {isLoading
              ? // 로딩 중 스켈레톤 UI 표시
                Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
              : // 데이터 로드 완료 후 실제 데이터 표시
                applyStatusData?.data?.map((application) => (
                  <div
                    key={application.id}
                    className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-line-100 px-6 py-4"
                  >
                    <span className="w-2/5">{application.name}</span>
                    <span className="w-1/4">{application.phoneNumber}</span>
                    <span className="w-2/5">{application.experienceMonths}개월</span>
                    <span className="w-1/4" style={{ whiteSpace: "nowrap" }}>
                      {translateStatus(application.status)}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyStatusCard;
