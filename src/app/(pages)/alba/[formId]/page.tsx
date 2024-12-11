"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/queries/user/me/useUser";
import FormHeader from "../components/FormHeader";
import FormDetails from "../components/FormDetail";
import RecruitInformation from "../components/RecruitInfomation";
import ApplicationStatus from "../components/ApplicationStatus";
import { useFormDetail } from "@/hooks/queries/form/detail/useFormDetail";

export default function AlbaFormDetailPage() {
  const { formId } = useParams(); // useParams로 formId 추출
  const [formIdState, setFormIdState] = useState<number>(0);
  const { user } = useUser();
  const isOwner = user?.role === "OWNER";

  useEffect(() => {
    // formId가 문자열로 전달되므로 숫자로 변환하여 상태에 저장
    if (formId) {
      setFormIdState(Number(formId)); // formId를 숫자로 변환하여 상태에 저장
    }
  }, [formId]);

  // formId가 설정되면 useFormDetail 호출
  const { albaFormDetailData, isLoading, error } = useFormDetail({ formId: formIdState });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: 데이터를 불러오는데 문제가 발생했습니다.</div>;

  if (!albaFormDetailData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="container flex min-h-screen flex-col">
      <div className="h-[562px] bg-black-100">사진영역</div>
      <div className="mt-20 flex justify-between">
        {/* 왼쪽 영역 */}
        <div className="w-[770px] space-y-10">
          <FormHeader albaFormDetailData={albaFormDetailData} />
          <FormDetails albaFormDetailData={albaFormDetailData} />
          {/* 지도 영역 */}
          <div className="h-[400px] bg-black-100">카카오지도</div>
        </div>
        {/* 오른쪽 영역 */}
        <div className="flex w-[640px] flex-col space-y-12">
          <RecruitInformation albaFormDetailData={albaFormDetailData} />
        </div>
      </div>
      {/* 지원 현황 */}
      {isOwner && <ApplicationStatus formId={formIdState} />}
    </div>
  );
}
