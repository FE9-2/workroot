import React from "react";
import RecruitDetail from "@/app/components/card/cardList/RecruitDetail";
import RecruitIcon from "@/app/components/card/cardList/RecruitIcon";
import RecruitCondition from "@/app/components/card/cardList/RecruitCondition";
import { FormDetailResponse } from "@/types/response/form";
import FormActions from "./FormActions";
import { useUser } from "@/hooks/queries/user/me/useUser";

interface FormDetailsProps {
  albaFormDetailData: FormDetailResponse;
}

export default function RecruitInformation({ albaFormDetailData }: FormDetailsProps) {
  const { user } = useUser();
  const isOwner = user?.role === "OWNER";

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
      <FormActions isOwner={isOwner} />

      <p className="text-3xl font-bold">모집 조건</p>
      <RecruitCondition recruitData={albaFormDetailData} />
    </>
  );
}
