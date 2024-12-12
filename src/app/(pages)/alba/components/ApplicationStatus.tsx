import ApplicationStatusCard from "@/app/components/card/cardList/ApplicationStatusCard";
import { useApplicationStatus } from "@/hooks/queries/form/detail/useApplicationStatus";
import React from "react";

interface ApplicationStatusProps {
  formId: number;
}

export default function ApplicationStatus({ formId }: ApplicationStatusProps) {
  const { applicationStatusData } = useApplicationStatus({
    formId,
    limit: 5, // 요청당 데이터 수 제한
  });

  // 개발중일 때는 아래 코드를 사용하여 에러를 확인할 수 있습니다.
  // if (error || !applicationStatusData) {
  //   let errorMessage = "로딩 중입니다...";

  //   if (!error && !applicationStatusData) {
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

  return (
    <>
      {applicationStatusData && (
        <div className="mt-20 space-y-6 border-t-2 pt-20 text-2xl">
          <p className="text-3xl font-bold">지원 현황</p>
          <ApplicationStatusCard applicationStatusData={applicationStatusData.data} />
        </div>
      )}
    </>
  );
}
