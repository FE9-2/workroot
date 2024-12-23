"use client";
// 워크폼 수정 페이지 (사장님)

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import RecruitContentSection from "../../../addform/section/RecruitContentSection";
import RecruitConditionSection from "../../../addform/section/RecruitConditionSection";
import WorkConditionSection from "../../../addform/section/WorkConditionSection";
import { SubmitFormDataType } from "@/types/addform";
import useEditing from "@/hooks/useEditing";
import useFormDetail from "@/hooks/queries/form/detail/useFormDetail";
import tempSave from "@/utils/tempSave";
import { useUser } from "@/hooks/queries/user/me/useUser";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function EditFormPage() {
  const router = useRouter();
  const formId = Number(useParams().formId);

  const { albaFormDetailData, isLoading, error } = useFormDetail({ formId });

  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const queryClient = useQueryClient();

  // 훅폼에서 관리하는 전체 데이터를 가져오는 함수
  const currentValues: SubmitFormDataType = methods.watch();
  // 탭 선택 옵션 관리
  const [selectedOption, setSelectedOption] = useState("모집 내용");
  // 각각의 탭 작성중 여부
  const { isEditingRecruitContent, isEditingRecruitCondition, isEditingWorkCondition } = useEditing(currentValues);

  // 비동기 데이터로 폼 상태 업데이트
  useEffect(() => {
    if (albaFormDetailData) {
      reset({
        isPublic: albaFormDetailData.isPublic,
        hourlyWage: albaFormDetailData.hourlyWage,
        isNegotiableWorkDays: albaFormDetailData.isNegotiableWorkDays,
        workDays: albaFormDetailData.workDays,
        workEndTime: albaFormDetailData.workEndTime,
        workStartTime: albaFormDetailData.workStartTime,
        workEndDate: albaFormDetailData.workEndDate,
        workStartDate: albaFormDetailData.workStartDate,
        location: albaFormDetailData.location,
        preferred: albaFormDetailData.preferred,
        age: albaFormDetailData.age,
        education: albaFormDetailData.education,
        gender: albaFormDetailData.gender,
        numberOfPositions: albaFormDetailData.numberOfPositions,
        recruitmentEndDate: albaFormDetailData.recruitmentEndDate,
        recruitmentStartDate: albaFormDetailData.recruitmentStartDate,
        description: albaFormDetailData.description,
        title: albaFormDetailData.title,
        imageUrls: albaFormDetailData.imageUrls,
      });
    }
  }, [albaFormDetailData, reset]);

  const isComplete = useMemo(() => {
    // 작성이 완료된 필드들: 기본값에서 변경된 경우를 확인
    return (
      currentValues.title &&
      currentValues.description &&
      currentValues.location &&
      currentValues.workStartDate &&
      currentValues.workEndDate &&
      currentValues.recruitmentStartDate &&
      currentValues.recruitmentEndDate &&
      currentValues.workStartTime &&
      currentValues.workEndTime &&
      currentValues.age &&
      currentValues.preferred &&
      currentValues.education &&
      currentValues.gender &&
      currentValues.numberOfPositions >= 0 &&
      currentValues.imageUrls.length > 0 &&
      currentValues.hourlyWage >= 10_030 &&
      (currentValues.workDays.length > 0 || currentValues.isNegotiableWorkDays)
    );
  }, [currentValues]);

  // 수정된 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(`/api/forms/${formId}`, currentValues);
      return response.data.id;
    },
    onSuccess: async (formId) => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tempAddFormData");
      }
      // 쿼리 무효화가 완료될 때까지 대기
      await queryClient.invalidateQueries({
        queryKey: ["formDetail", formId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["forms", { limit: 10 }],
      });
      await queryClient.invalidateQueries({
        queryKey: ["myForms", { isPublic: true, isRecruiting: true, limit: 10 }],
      });
      toast.success("워크폼을 수정했습니다.");
      router.push(`/work/${formId}`);
    },
    onError: (error) => {
      console.error("에러가 발생했습니다.", error);
      console.log("currentValues", currentValues);
      toast.error("에러가 발생했습니다.");
    },
  });

  // tab 선택 시 Url params 수정 & 하위 폼 데이터 임시저장
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");

  const handleOptionChange = async (option: string) => {
    tempSave("addformData", currentValues);
    setSelectedOption(option);

    const params = {
      "모집 내용": "recruit-content",
      "모집 조건": "recruit-condition",
      "근무 조건": "work-condition",
    }[option];
    router.replace(`/work/${formId}/edit?tab=${params}`);
  };

  const renderChildren = () => {
    switch (selectedOption) {
      case "모집 내용":
        return <RecruitContentSection key="recruitContent" />;
      case "모집 조건":
        return <RecruitConditionSection key="recruitCondition" />;
      case "근무 조건":
        return <WorkConditionSection key="workCondition" />;
      default:
        return <></>;
    }
  };

  // 유저 권한 확인
  const { user } = useUser();

  if (user?.role !== "OWNER") {
    toast.error("사장님만 워크폼 수정이 가능합니다.");
    router.push("/work-list");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: 데이터를 불러오는데 문제가 발생했습니다.</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="relative">
        <aside className="flex flex-col items-center justify-between rounded-[24px] bg-background-200 lg:fixed lg:left-[108px] lg:top-[64px] lg:m-10 lg:h-[80vh] lg:p-10">
          <TabMenuDropdown
            options={[
              {
                label: "모집 내용",
                isEditing: isEditingRecruitContent || currentParam === "recruit-content",
              },
              { label: "모집 조건", isEditing: isEditingRecruitCondition || currentParam === "recruit-condition" },
              { label: "근무 조건", isEditing: isEditingWorkCondition || currentParam === "work-condition" },
            ]}
            onChange={handleOptionChange}
            currentParam={currentParam || ""}
          />
          <div className="absolute -bottom-[120px] flex w-[320px] justify-center lg:relative lg:bottom-0 lg:w-full">
            <Button
              type="submit"
              variant="solid"
              width="md"
              color="orange"
              className="h-[58px] w-full lg:h-[72px] lg:text-xl lg:leading-8"
              disabled={!isDirty || !isComplete}
              onClick={handleSubmit(() => mutation.mutate())}
            >
              {mutation.isPending ? <DotLoadingSpinner /> : "수정하기"}
            </Button>
          </div>
        </aside>
        {renderChildren()}
      </div>
    </FormProvider>
  );
}
