"use client";
import React from "react";
import { FormDetailResponse } from "@/types/response/form";
import { cn } from "@/lib/tailwindUtil";

interface RecruitConditionProps {
  recruitData: FormDetailResponse;
}

// 모집조건 카드 컴포넌트
const RecruitCondition = ({ recruitData }: RecruitConditionProps) => {
  const titleStyle = "text-black-200 min-w-28 lg:min-w-[120px]";
  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border border-line-100 bg-white p-4 text-sm lg:w-[640px] lg:p-6 lg:text-lg">
      <div className="flex">
        <span className={cn(titleStyle)}>모집 인원</span>
        <div>
          <strong>{recruitData.numberOfPositions}명</strong>
          <span className="text-grayscale-500 lg:text-base">(인원미정)</span>
        </div>
      </div>

      <div className="flex">
        <span className={cn(titleStyle)}>성별</span>
        <strong>{recruitData.gender}</strong>
      </div>

      <div className="flex">
        <span className={cn(titleStyle)}>학력</span>
        <strong>{recruitData.education}</strong>
      </div>

      <div className="flex">
        <span className={cn(titleStyle)}>연령</span>
        <strong>{recruitData.age}</strong>
      </div>

      <div className="flex">
        <span className={cn(titleStyle)}>우대사항</span>
        <strong>{recruitData.preferred}</strong>
      </div>
    </div>
  );
};

export default RecruitCondition;
