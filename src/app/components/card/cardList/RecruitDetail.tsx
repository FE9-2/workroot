import React from "react";
import { FormDetailResponse } from "@/types/response/form";
import { cn } from "@/lib/tailwindUtil";

// 모집상세 카드 컴포넌트
const Devider = () => <div className="border-b-[1px] border-line-200" />;

interface RecruitDetailProps {
  recruitData: FormDetailResponse;
}

const RecruitDetail = ({ recruitData }: RecruitDetailProps) => {
  const titleStyle = "text-black-100";
  const propsStyle = "flex items-center justify-between py-8";

  return (
    <div className="flex w-full flex-col justify-center rounded-lg border border-line-100 bg-background-100 px-6 text-sm lg:text-lg">
      <div className={cn(propsStyle)}>
        <div>
          <span className={cn(titleStyle)}>모집 기간</span>
          <strong className="orange-black-100 ml-4 text-primary-orange-300">D-10</strong>
        </div>
        <strong>
          {new Date(recruitData.recruitmentStartDate).toLocaleDateString()} ~{" "}
          {new Date(recruitData.recruitmentEndDate).toLocaleDateString()}
        </strong>
      </div>
      <Devider />
      {/* 가게 전화번호 */}
      <div className={cn(propsStyle)}>
        <span className={cn(titleStyle)}>가게 전화번호</span>
        <strong>{recruitData.storePhoneNumber}</strong>
      </div>
      <Devider />
      {/* 사장님 전화번호 */}
      <div className={cn(propsStyle)}>
        <span className={cn(titleStyle)}>사장님 전화번호</span>
        <strong>{recruitData.phoneNumber}</strong>
      </div>
    </div>
  );
};

export default RecruitDetail;
