import ApplyStatusCard from "@/app/components/card/cardList/ApplyStatusCard";
import { useApplyStatus } from "@/hooks/queries/form/detail/useApplyStatus";
import React, { useState } from "react";

interface ApplyStatusProps {
  formId: number;
}

export default function ApplyStatus({ formId }: ApplyStatusProps) {
  const [experienceSort, setExperienceSort] = useState<boolean>(false);
  const [statusSort, setStatusSort] = useState<boolean>(false);

  const { applyStatusData, refetch } = useApplyStatus({
    formId,
    limit: 5, // 요청당 데이터 수 제한
    cursor: 0, // 페이지네이션 커서
    orderByExperience: experienceSort ? "desc" : "asc", // 경력순 정렬
    orderByStatus: statusSort ? "asc" : "desc", // 상태순 정렬
  });

  const toggleExperienceSort = () => {
    setExperienceSort((prev) => !prev);
    refetch(); // 정렬 상태가 변경될 때 데이터 다시 요청
  };

  const toggleStatusSort = () => {
    setStatusSort((prev) => !prev);
    refetch(); // 정렬 상태가 변경될 때 데이터 다시 요청
  };

  if (!applyStatusData || applyStatusData.data.length === 0) {
    return null;
  }

  return (
    <>
      {applyStatusData && (
        <div className="mt-20 space-y-6 border-t-2 pt-20 text-2xl">
          <p className="text-3xl font-bold">지원 현황</p>
          <div className="flex gap-4">
            <button onClick={toggleExperienceSort}>경력 정렬: {experienceSort ? "내림차순" : "오름차순"}</button>
            <button onClick={toggleStatusSort}>상태 정렬: {statusSort ? "오름차순" : "내림차순"}</button>
          </div>
          <ApplyStatusCard applyStatusData={applyStatusData.data} />
        </div>
      )}
    </>
  );
}
