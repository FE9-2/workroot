import ApplyStatusCard from "@/app/components/card/cardList/ApplyStatusCard";
import { useApplyStatus } from "@/hooks/queries/form/detail/useApplyStatus";
import React from "react";

interface ApplyStatusProps {
  formId: number;
}

export default function ApplyStatus({ formId }: ApplyStatusProps) {
  const { applyStatusData } = useApplyStatus({
    formId,
    limit: 5, // 요청당 데이터 수 제한
  });

  // 개발중일 때는 아래 코드를 사용하여 에러를 확인할 수 있습니다.
  // if (error || !applyStatusData) {
  //   let errorMessage = "로딩 중입니다...";

  //   if (!error && !applyStatusData) {
  //     // 로딩 중 메시지 설정
  //     errorMessage = "데이터를 불러오는 중입니다...";
  //   } else if (axios.isAxiosError(error)) {
  //     const axiosError = error as AxiosError;
  //     errorMessage = (axiosError.response?.data as { message?: string })?.message || axiosError.message;
  //   } else if (error instanceof Error) {
  //     errorMessage = error.message;
  //   }

  //   console.log("지원 현황 불러오기 에러: ", errorMessage);
  // }

  if (!applyStatusData || applyStatusData.data.length === 0) {
    return null;
  }

  return (
    <>
      {applyStatusData && (
        <div className="mt-20 space-y-6 border-t-2 pt-20 text-2xl">
          <p className="text-3xl font-bold">지원 현황</p>
          <ApplyStatusCard applyStatusData={applyStatusData.data} />
        </div>
      )}
    </>
  );
}
