import React from "react";
import RecruitDetail from "@/app/components/card/cardList/RecruitDetail";
import RecruitIcon from "@/app/components/card/cardList/RecruitIcon";
import RecruitCondition from "@/app/components/card/cardList/RecruitCondition";
import { FormDetailResponse } from "@/types/response/form";
import FormActions from "./FormActions";
import { useUser } from "@/hooks/queries/user/me/useUser";

interface RecruitInformationProps {
  albaFormDetailData: FormDetailResponse;
  formId: number;
}

export default function RecruitInformation({ albaFormDetailData, formId }: RecruitInformationProps) {
  const { user } = useUser();

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
    <div className="mt-10 flex flex-col gap-10 lg:mt-0 lg:pl-6">
      <RecruitIcon {...recruitmentDetails} />
      <RecruitDetail recruitData={albaFormDetailData} />
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-bold">모집 조건</span>
        <RecruitCondition recruitData={albaFormDetailData} />
      </div>
      {user && (
        <div>
          <div className="hidden lg:block">
            <FormActions formId={formId} albaFormDetailData={albaFormDetailData} />
          </div>
          <div className="block lg:hidden">
            <FormActions formId={formId} albaFormDetailData={albaFormDetailData} />
          </div>
        </div>
      )}
    </div>
  );
}
