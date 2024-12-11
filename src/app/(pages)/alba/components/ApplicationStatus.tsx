import ApplicationStatusCard from "@/app/components/card/cardList/ApplicationStatusCard";
import { useApplicationStatus } from "@/hooks/queries/form/detail/useApplicationStatus";
import React from "react";

interface ApplicationStatusProps {
  formId: number;
}

export default function ApplicationStatus({ formId }: ApplicationStatusProps) {
  const { applicationStatusData, isLoading, error } = useApplicationStatus({
    formId,
    limit: 5, // 요청당 데이터 수 제한
  });

  if (isLoading) return <div>지원 현황을 불러오는 중입니다...</div>;
  if (error && "status" in error) {
    if (error.status === 403) {
      return (
        <div>
          <p>지원 현황을 볼 권한이 없습니다.</p>
          <p>{error.message}</p>
        </div>
      );
    }
    console.log("지원현황 에러", error);
  }
  if (error || !applicationStatusData) return <div>지원 현황 데이터를 불러오는데 실패했습니다.</div>;
  console.log("applicationStatusData:", applicationStatusData);

  return (
    <div className="space-y-4 text-2xl">
      <p className="text-3xl font-bold">지원 현황</p>

      <ApplicationStatusCard applicationStatusData={applicationStatusData.data} />
    </div>
  );
}
