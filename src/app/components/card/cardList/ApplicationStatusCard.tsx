"use client";
import React, { useState } from "react";
import { ApplicationResponse } from "@/types/response/application";
import { FaSortAmountDown } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";
interface ApplicationStatusCardProps {
  applications: ApplicationResponse[];
}

// 지원현황 카드 컴포넌트
const ApplicationStatusCard = ({ applications }: ApplicationStatusCardProps) => {
  const [sortOrder, setSortOrder] = useState<{ experience: boolean; status: boolean }>({
    experience: true, // true: 오름차순, false: 내림차순
    status: true,
  });

  const handleSort = (key: "experience" | "status") => {
    const newOrder = !sortOrder[key];
    setSortOrder((prev) => ({ ...prev, [key]: newOrder }));
  };

  const sortedApplications = [...applications]
    .sort((a, b) => {
      if (sortOrder.experience) {
        return a.experienceMonths - b.experienceMonths; // 경력 오름차순
      } else {
        return b.experienceMonths - a.experienceMonths; // 경력 내림차순
      }
    })
    .sort((a, b) => {
      if (sortOrder.status) {
        return a.status.localeCompare(b.status); // 상태 오름차순
      } else {
        return b.status.localeCompare(a.status); // 상태 내림차순
      }
    });

  const theadStyle = "text-left font-semibold text-grayscale-700";
  const tbodyStyle = "text-left";
  const sortIconStyle = "text-primary-orange-300 transition-transform hover:scale-110";
  return (
    <div className="w-[375px] text-xs md:w-[770px] md:text-base">
      <div className="flex flex-col">
        {/* Thead */}
        <div className="sticky grid grid-cols-[1fr_2fr_0.6fr_0.6fr] px-6 py-4">
          <span className={theadStyle}>이름</span>
          <span className={theadStyle}>전화번호</span>
          <div className="flex items-center gap-2">
            <span className={theadStyle}>경력</span>
            <button onClick={() => handleSort("experience")}>
              <FaSortAmountDown className={cn(sortIconStyle, sortOrder.experience ? "rotate-0" : "rotate-180")} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-grayscale-700 text-left font-semibold">상태</span>
            <button onClick={() => handleSort("status")}>
              <FaSortAmountDown className={cn(sortIconStyle, sortOrder.status ? "rotate-0" : "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Tbody */}
        <div className="scrollbar-custom h-[360px] overflow-y-auto md:h-[400px]">
          {sortedApplications.map((application) => (
            <div
              key={application.id}
              className="grid grid-cols-[1fr_2fr_0.6fr_0.6fr] border-b border-line-100 px-6 py-4"
            >
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

export default ApplicationStatusCard;
