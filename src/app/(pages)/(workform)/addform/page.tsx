"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import RecruitContentSection from "./section/RecruitContentSection";
import RecruitConditionSection from "./section/RecruitConditionSection";
import WorkConditionSection from "./section/WorkConditionSection";
import useEditing from "@/hooks/useEditing";
import { SubmitFormDataType } from "@/types/addform";
import CustomFormModal from "@/app/components/modal/modals/confirm/CustomFormModal";
import tempSave from "@/utils/tempSave";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { useUser } from "@/hooks/queries/user/me/useUser";

// 불필요한 상태

export default function AddFormPage() {
  const router = useRouter();
  // 리액트 훅폼에서 관리할 데이터 타입 지정 및 메서드 호출 (상위 컴포넌트 = useForm 사용)
  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
    defaultValues: {
      isPublic: true,
      hourlyWage: "10,030",
      isNegotiableWorkDays: false,
      workDays: [],
      workEndTime: "",
      workStartTime: "",
      workEndDate: "",
      workStartDate: "",
      location: "",
      preferred: "",
      age: "",
      education: "",
      gender: "",
      numberOfPositions: undefined,
      recruitmentEndDate: undefined,
      recruitmentStartDate: undefined,
      description: "",
      title: "",
      imageUrls: [],
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;
  const queryClient = useQueryClient();

  // 훅폼에서 관리하는 전체 데이터를 가져오는 함수
  const currentValues: SubmitFormDataType = methods.watch();

  // 이미지 업로드 api 처리를 위해 별도 변수에 할당
  const [showTempDataModal, setShowTempDataModal] = useState(false);

  // 각각의 탭 작성중 여부
  const { isEditingRecruitContent, isEditingRecruitCondition, isEditingWorkCondition } = useEditing(currentValues);

  // 유저 권한 확인
  const { user, isLoading } = useUser();
  // tab 선택 시 Url params 수정 & 하위 폼 데이터 임시저장
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");
  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/forms", currentValues);
      return response.data.id;
    },
    onSuccess: async (formId) => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tempAddFormData");
      }
      await queryClient.invalidateQueries({
        queryKey: ["forms", { limit: 10 }],
      });
      toast.success("워크폼을 등록했습니다.");
      router.push(`/work/${formId}`);
    },
    onError: (error) => {
      toast.error("에러가 발생했습니다.");
      console.error(error);
      onTempSave();
    },
  });

  // 폼데이터 임시 저장 함수
  const onTempSave = () => {
    tempSave("addformData", currentValues);
  };

  const handleOptionChange = (option: string) => {
    if (option !== currentParam && isDirty) {
      onTempSave();
    }
    const params = {
      "모집 내용": "recruit-content",
      "모집 조건": "recruit-condition",
      "근무 조건": "work-condition",
    }[option];
    router.replace(`/addform?tab=${params}`);
  };

  // 임시저장 데이터 로드 함수
  const loadTempData = () => {
    const tempData = localStorage.getItem("tempAddFormData");
    if (tempData) {
      const parsedData: SubmitFormDataType = JSON.parse(tempData);
      // 기본 필드들 설정
      Object.entries(parsedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as keyof SubmitFormDataType, value);
        }
      });
    }
  };

  // 임시저장 데이터 초기화
  const clearTempData = () => {
    localStorage.removeItem("tempAddFormData");
  };

  // 임시저장 데이터 확인 및 모달 표시
  useEffect(() => {
    const tempData = localStorage.getItem("tempAddFormData");
    if (tempData) {
      setShowTempDataModal(true);
    }
  }, []);

  // 모달 확인 버튼 핸들러
  const handleConfirmTemp = () => {
    loadTempData();
    setShowTempDataModal(false);
  };

  // 모달 취소 버튼 핸들러
  const handleCancelTemp = () => {
    clearTempData();
    setShowTempDataModal(false);
  };

  if (isLoading) {
    return <DotLoadingSpinner />;
  }

  if (user?.role !== "OWNER") {
    toast.error("사장님만 워크폼을 작성할 수 있습니다.");
    router.replace("/work-list");
  }

  const renderChildren = () => {
    switch (currentParam) {
      case "recruit-content":
        return <RecruitContentSection key="recruitContent" />;
      case "recruit-condition":
        return <RecruitConditionSection key="recruitCondition" />;
      case "work-condition":
        return <WorkConditionSection key="workCondition" />;
      default:
        return <RecruitContentSection key="recruitContent" />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="relative pb-10 lg:pb-0">
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
          <div className="absolute -bottom-[160px] mb-20 flex w-full flex-col gap-2 lg:relative lg:bottom-0 lg:mb-0">
            <Button
              type="button"
              variant="outlined"
              width="md"
              color="orange"
              className="lg: h-[58px] w-[320px] border bg-background-100 lg:h-[72px] lg:w-full lg:text-xl lg:leading-8"
              onClick={() => tempSave("addformData", currentValues)}
            >
              임시 저장
            </Button>
            <Button
              type="submit"
              variant="solid"
              width="md"
              color="orange"
              className="lg: h-[58px] w-[320px] lg:h-[72px] lg:w-full lg:text-xl lg:leading-8"
              disabled={!isValid}
              onClick={handleSubmit(() => mutation.mutate())}
            >
              {mutation.isPending ? <DotLoadingSpinner /> : "작성 완료"}
            </Button>
          </div>
        </aside>
        {renderChildren()}
        {/* 임시저장 데이터 확인 모달 */}
        <CustomFormModal
          isOpen={showTempDataModal}
          title="임시저장 데이터 확인"
          content="임시저장된 데이터가 있습니다. 이어서 작성하시겠습니까?"
          confirmText="이어서 작성하기"
          cancelText="새로 작성하기"
          onConfirm={handleConfirmTemp}
          onCancel={handleCancelTemp}
          closeOnOverlayClick={false}
        />
      </div>
    </FormProvider>
  );
}
