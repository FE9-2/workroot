"use client";
import { ApplicationResponse } from "@/types/response/application";
import React from "react";
import { cn } from "@/lib/tailwindUtil";

interface SubmitContCardProps {
  submitContData: ApplicationResponse;
}

// 제출내용 카드 컴포넌트
const Devider = () => <div className="border-b-[1px] border-line-200" />;

const SubmitContCard = ({ submitContData }: SubmitContCardProps) => {
  const titleStyle = "text-black-100";
  const propsStyle = "flex items-center justify-between py-4";

  return (
    <div className="flex w-[770px] flex-col justify-center gap-4 bg-white px-6 text-base">
      <div className={cn(propsStyle)}>
        <span className={cn(titleStyle)}>이름</span>
        <strong>{submitContData.name}</strong>
      </div>
      <Devider />
      <div className={cn(propsStyle)}>
        <span className={cn(titleStyle)}>연락처</span>
        <strong>{submitContData.phoneNumber}</strong>
      </div>
      <Devider />
      <div className={cn(propsStyle)}>
        <span className={cn(titleStyle)}>경력</span>
        <strong>{submitContData.experienceMonths} 개월</strong>
      </div>
    </div>
  );
};

export default SubmitContCard;
