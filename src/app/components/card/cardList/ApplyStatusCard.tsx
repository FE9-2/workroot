"use client";
import React from "react";
import { ApplicationResponse } from "@/types/response/application";
import { FaSortAmountDown } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";

interface ApplyStatusCardProps {
  applyStatusData: ApplicationResponse[];
}

// 지원현황 카드 컴포넌트
const ApplyStatusCard = ({ applyStatusData }: ApplyStatusCardProps) => {
  const theadStyle = "text-center font-semibold text-grayscale-700";
  const tbodyStyle = "text-center";
  const sortIconStyle = "text-primary-orange-300 transition-transform hover:scale-110";

  return (
    <div className="w-[375px] text-xs md:w-[770px] md:text-base">
      <div className="flex flex-col">
        {/* Thead */}
        <div className="sticky grid grid-cols-[1fr_2fr_2fr_1fr] border-b border-line-100 px-6 py-4">
          <span className={theadStyle}>이름</span>
          <span className={theadStyle}>전화번호</span>
          <div className="flex items-center gap-2">
            <span className={theadStyle}>경력</span>
            <button>
              <FaSortAmountDown className={cn(sortIconStyle)} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={theadStyle}>상태</span>
            <button>
              <FaSortAmountDown className={cn(sortIconStyle)} />
            </button>
          </div>
        </div>

        {/* Tbody */}
        <div className="scrollbar-custom h-[360px] overflow-y-auto md:h-[400px]">
          {applyStatusData.map((application) => (
            <div key={application.id} className="grid grid-cols-[1fr_2fr_2fr_1fr] border-b border-line-100 px-6 py-4">
              <span className={tbodyStyle}>{application.name}</span>
              <span className={tbodyStyle}>{application.phoneNumber}</span>
              <span className={tbodyStyle}>{application.experienceMonths}개월</span>
              <span className={tbodyStyle}>{application.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyStatusCard;
