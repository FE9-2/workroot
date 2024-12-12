import React from "react";
import RecruitDetail from "@/app/components/card/cardList/RecruitDetail";
import RecruitIcon from "@/app/components/card/cardList/RecruitIcon";
import RecruitCondition from "@/app/components/card/cardList/RecruitCondition";
import { FormDetailResponse } from "@/types/response/form";
import FormActions from "./FormActions";

interface RecruitInformationProps {
  albaFormDetailData: FormDetailResponse;
  formId: number;
}

export default function RecruitInformation({ albaFormDetailData, formId }: RecruitInformationProps) {
  const recruitmentDetails = {
    hourlyWage: albaFormDetailData.hourlyWage,
    recruitmentStartDate: new Date(albaFormDetailData.recruitmentStartDate),
    recruitmentEndDate: new Date(albaFormDetailData.recruitmentEndDate),
    isNegotiableWorkDays: albaFormDetailData.isNegotiableWorkDays,
    workDays: albaFormDetailData.workDays,
    workStartTime: albaFormDetailData.workStartTime,
    workEndTime: albaFormDetailData.workEndTime,
  };

  return (
    <>
      <RecruitIcon {...recruitmentDetails} />
      <RecruitDetail recruitData={albaFormDetailData} />
      <FormActions formId={formId} albaFormDetailData={albaFormDetailData} />
      <p className="text-3xl font-bold">모집 조건</p>
      <RecruitCondition recruitData={albaFormDetailData} />
    </>
  );
}
