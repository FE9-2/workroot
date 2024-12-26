"use client";
import React, { useState } from "react";
import { SkeletonRow } from "./SkeletonRow";
import { Player } from "@lottiefiles/react-lottie-player";
import TableHeader from "./TableHeader";
import useModalStore from "@/store/modalStore";
import { ApplicationResponse } from "@/types/response/application";
import { APPLICATION_STATUS_MAP, ApplicationStatusType } from "@/types/applicationStatus";
import { useApplicationStatus } from "@/hooks/queries/form/detail/useApplicationStatus";
import { useUpdateApplicationStatus } from "@/hooks/queries/form/detail/useUpdateApplicationStatus";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";

interface ApplyStatusCardProps {
  formId: number;
}

// 지원현황 카드 컴포넌트
const ApplyStatusCard = ({ formId }: ApplyStatusCardProps) => {
  const { openModal } = useModalStore();
  const [experienceSort, setExperienceSort] = useState<"asc" | "desc">("asc");
  const [statusSort, setStatusSort] = useState<"asc" | "desc">("desc");

  const { applyStatusData, isLoading } = useApplicationStatus({
    formId,
    limit: 30,
    cursor: 0,
    orderByExperience: experienceSort,
    orderByStatus: statusSort,
  });

  const { mutate: updateStatus } = useUpdateApplicationStatus();

  const toggleExperienceSort = () => setExperienceSort((prev) => (prev === "asc" ? "desc" : "asc"));
  const toggleStatusSort = () => setStatusSort((prev) => (prev === "asc" ? "desc" : "asc"));

  // 지원자 행 클릭 핸들러 추가
  const handleApplicationClick = (application: ApplicationResponse) => {
    openModal("myApplication", {
      formId,
      isOpen: true,
      initialData: application, // 선택된 지원자 데이터 전달
    });
  };

  // 상태 변경 핸들러 추가
  const handleStatusChange = (applicationId: string, newStatus: string) => {
    // APPLICATION_STATUS_MAP의 값과 키를 뒤집어서 매핑
    const reverseStatusMap = Object.entries(APPLICATION_STATUS_MAP).reduce(
      (acc, [key, value]) => {
        acc[value] = key as ApplicationStatusType;
        return acc;
      },
      {} as Record<string, ApplicationStatusType>
    );

    updateStatus({
      applicationId,
      status: reverseStatusMap[newStatus],
    });
  };

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
            <div key={application.id} className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-line-100">
              <button
                type="button"
                onClick={() => handleApplicationClick(application)}
                className="col-span-3 grid grid-cols-[1fr_2fr_1fr] items-center px-6 py-4 text-left transition-colors hover:bg-gray-50"
                aria-label={`${application.name}님의 지원 정보 보기`}
              >
                <span className="w-2/5">{application.name}</span>
                <span className="w-1/4">{application.phoneNumber}</span>
                <span className="w-2/5">{application.experienceMonths}개월</span>
              </button>
              <div className="px-6 py-4">
                <FilterDropdown
                  options={Object.values(APPLICATION_STATUS_MAP)}
                  initialValue={APPLICATION_STATUS_MAP[application.status as ApplicationStatusType]}
                  onChange={(newStatus) => handleStatusChange(application.id.toString(), newStatus)}
                  className="w-24 md:w-28"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyStatusCard;
