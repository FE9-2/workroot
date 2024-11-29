import React from "react";
import { FormListType } from "@/types/response/form";
import { cn } from "@/lib/tailwindUtil";
import { FaBookmark } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
const ApplicationStatusCard: React.FC<{ formData: FormListType }> = ({ formData }) => {
  const propsStyle = "flex items-center gap-4 md:gap-6";
  const iconStyle = "text-sm md:text-xl";
  const titleStyle = "min-w-[60px] md:min-w-[80px]";
  return (
    <div className="flex w-[327px] flex-col gap-3 rounded-lg border border-line-100 bg-white p-3 text-xs md:w-[770px] md:gap-5 md:px-5 md:py-8 md:text-lg">
      <div className={cn(propsStyle)}>
        <FaBookmark className={cn(iconStyle, "text-primary-orange-300")} />
        <span className={cn(titleStyle)}>스크랩</span>
        <strong>{formData.scrapCount}개</strong>
      </div>

      <div className={cn(propsStyle)}>
        <MdPeopleAlt className={cn(iconStyle)} />
        <span className={cn(titleStyle)}>지원현황</span>
        <strong>현재까지 {formData.applyCount}명이 알바폼에 지원했어요!</strong>
      </div>
    </div>
  );
};

export default ApplicationStatusCard;
