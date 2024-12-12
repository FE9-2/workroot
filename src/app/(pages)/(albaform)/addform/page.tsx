"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import RecruitContentSection from "./section/RecruitContentSection";
import RecruitConditionSection from "./section/RecruitConditionSection";
import WorkConditionSection from "./section/WorkConditionSection";
import useEditing from "@/hooks/useEditing";
import { SubmitFormDataType } from "@/types/addform";
import CustomFormModal from "@/app/components/modal/modals/confirm/CustomFormModal";

export default function AddFormPage() {
  const router = useRouter();
  const formId = useParams().formId;
  // 리액트 훅폼에서 관리할 데이터 타입 지정 및 메서드 호출 (상위 컴���트 = useForm 사용)
  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
    defaultValues: {
      isPublic: false,
      hourlyWage: 0,
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
      imageFiles: [],
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  // 훅폼에서 관리하는 전체 데이터를 가져오는 함수
  const currentValues: SubmitFormDataType = methods.watch();

  // 이미지 업로드 api 처리를 위해 별도 변수에 할당
  const imageFiles = currentValues.imageFiles;
  const [, setSelectedOption] = useState<string>("");

  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      // 이미지 필수 체크
      if (!imageFiles || imageFiles.length === 0) {
        toast.error("이미지를 첨부해주세요.");
        throw new Error("이미지는 필수입니다.");
      }

      // 이미지 업로드 처리
      let uploadedUrls: string[] = [];
      try {
        uploadedUrls = await uploadImages(Array.from(imageFiles));
        if (!uploadedUrls.length) {
          toast.error("이미지 업로드에 실패했습니다.");
          throw new Error("이미지 업로드 실패");
        }
        setValue("imageUrls", uploadedUrls);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
        throw error;
      }

      const excludedKeys = ["displayDate", "workDateRange", "recruitDateRange", "imageFiles"];

      // 원하는 필드만 포함된 새로운 객체 만들기
      const filteredData = Object.entries(currentValues)
        .filter(([key]) => !excludedKeys.includes(key))
        .reduce((acc: Partial<SubmitFormDataType>, [key, value]) => {
          if (key === "numberOfPositions") {
            acc[key] = Number(value);
          } else if (key === "hourlyWage") {
            // 문자열이면 콤마 제거 후 숫자로 변환
            acc[key] = typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);
          } else if (key === "imageUrls") {
            // 업로드된 이미지 URL 사용
            acc[key] = uploadedUrls;
          } else {
            acc[key as keyof SubmitFormDataType] = value;
          }
          return acc;
        }, {});

      await axios.post("/api/forms", filteredData);
    },
    onSuccess: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tempAddFormData");
      }
      toast.success("알바폼을 등록했습니다.");
      router.push(`/alba/${formId}`);
    },
    onError: (error) => {
      console.error("에러가 발생했습니다.", error);
      toast.error("에러가 발생했습니다.");
      onTempSave();
    },
  });

  // tab 선택 시 Url params 수정 & 하위 폼 데이터 임시저장
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");
  const [prevOption, setPrevOption] = useState<string | null>(null);
  const initialLoad = currentParam === null; // 초기 로딩 여부 확인

  const handleOptionChange = async (option: string) => {
    setSelectedOption(option);
    if (!initialLoad && option !== currentParam && option !== prevOption && isDirty) {
      await onTempSave();
      setPrevOption(option);
    }
    const params = {
      "모집 내용": "recruit-content",
      "모집 조건": "recruit-condition",
      "근무 조건": "work-condition",
    }[option];
    router.push(`/addform?tab=${params}`);
  };

  useEffect(() => {
    switch (currentParam) {
      case "recruit-content":
        setSelectedOption("모집 내용");
        break;
      case "recruit-condition":
        setSelectedOption("모집 조건");
        break;
      case "work-condition":
        setSelectedOption("근무 조건");
        break;
      default:
        setSelectedOption("모집 내용");
    }
  }, [currentParam]);

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
  const { uploadImageMutation } = useUpdateProfile();

  // 이미지 업로드 api
  const uploadImages = async (files: File[]) => {
    if (currentValues.imageUrls.length !== currentValues.imageFiles.length) {
      const uploadedUrls: string[] = [];

      // 전체 파일 배열을 순회하면서 업로드 로직 진행
      for (const file of files) {
        // 파일 크기 체크
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          toast.error(`5MB 이상의 파일은 업로드할 수 없습니다.`);
          continue;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
          const uploadResponse = await uploadImageMutation.mutateAsync(file);
          if (uploadResponse?.url) {
            uploadedUrls.push(uploadResponse.url);
          }
        } catch (uploadError) {
          console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
        }
      }
      return uploadedUrls;
    } else {
      return currentValues.imageUrls;
    }
  };

  // 폼데이터 임시 저장 함수
  const onTempSave = async () => {
    // 임시저장
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tempAddFormData", JSON.stringify(currentValues));
    }
    toast.success("임시 저장되었습니다.");
    console.log("임시저장 데이터", currentValues);
  };

  // 각각의 탭 작성중 여부
  const { isEditingRecruitContent, isEditingRecruitCondition, isEditingWorkCondition } = useEditing(currentValues);

  const [showTempDataModal, setShowTempDataModal] = useState(false);

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

      // 날짜 관련 필드들은 Date 객체로 변환
      if (parsedData.recruitmentStartDate && parsedData.recruitmentEndDate) {
        setValue("recruitmentStartDate", parsedData.recruitmentStartDate);
        setValue("recruitmentEndDate", parsedData.recruitmentEndDate);
      }

      if (parsedData.workStartDate && parsedData.workEndDate) {
        setValue("workStartDate", parsedData.workStartDate);
        setValue("workEndDate", parsedData.workEndDate);
      }

      // 이미지 URL 설정
      if (parsedData.imageUrls?.length > 0) {
        setValue("imageUrls", parsedData.imageUrls);
      }
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

  return (
    <FormProvider {...methods}>
      <div className="relative pb-10 lg:pb-0">
        <aside className="flex flex-col items-center justify-between rounded-[24px] bg-background-200 lg:fixed lg:left-[108px] lg:top-[64px] lg:m-10 lg:h-[80vh] lg:p-10">
          <TabMenuDropdown
            options={[
              {
                label: "모집 내용",
                isEditing: isEditingRecruitContent || initialLoad || currentParam === "recruit-content",
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
              onClick={() => onTempSave()}
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
              작성 완료
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
