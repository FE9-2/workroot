"use client";
import React, { useState } from "react";
import { useApplyStatus } from "@/hooks/queries/form/detail/useApplyStatus";
import translateStatus from "@/utils/translateStatus";
import { SkeletonRow } from "./SkeletonRow";
import { Player } from "@lottiefiles/react-lottie-player";
import TableHeader from "./TableHeader";
import { ApplicationStatusType } from "@/types/applicationStatus";

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

  const toggleExperienceSort = () => setExperienceSort((prev) => (prev === "asc" ? "desc" : "asc"));
  const toggleStatusSort = () => setStatusSort((prev) => (prev === "asc" ? "desc" : "asc"));

  // 지원 현황 로딩 중
  if (isLoading) {
    return (
      <div className="w-[375px] text-xs md:w-[770px] md:text-base">
        <div className="scrollbar-custom h-[360px] overflow-y-auto md:h-[400px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </div>
      </div>
    );
  }

  // 지원자가 없을 때
  if (!applyStatusData?.data || applyStatusData.data.length === 0) {
    return (
      <div className="mb-4 h-auto w-[375px] text-xs md:w-[770px] md:text-base">
        <div className="flex flex-col items-center justify-center text-grayscale-500">
          <Player autoplay loop src="/noapply.json" className="w-1/2" />
          <p>지원자가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 지원자가 있을 때
  return (
    <div className="w-[375px] text-xs md:w-[770px] md:text-base">
      <div className="flex flex-col">
        {/* Thead */}
        <TableHeader
          experienceSort={experienceSort}
          statusSort={statusSort}
          toggleExperienceSort={toggleExperienceSort}
          toggleStatusSort={toggleStatusSort}
        />

        {/* Tbody */}
        <div className="scrollbar-custom h-[360px] overflow-y-auto md:h-[400px]">
          {applyStatusData.data.map((application) => (
            <div key={application.id} className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-line-100 px-6 py-4">
              <span className="w-2/5">{application.name}</span>
              <span className="w-1/4">{application.phoneNumber}</span>
              <span className="w-2/5">{application.experienceMonths}개월</span>
              <span className="w-1/4" style={{ whiteSpace: "nowrap" }}>
                {translateStatus(application.status as ApplicationStatusType)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyStatusCard;
