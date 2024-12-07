"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import RecruitCondition from "./sections/RecruitCondition";
import WorkCondition from "./sections/WorkCondition";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import RecruitContent from "./sections/RecruitContent";
import { useMutation } from "@tanstack/react-query";

interface SubmitFormDataType {
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: string[];
  workEndTime: string;
  workStartTime: string;
  workEndDate: string;
  workStartDate: string;
  location: string;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  imageUrls: string[];
  recruitmentEndDate: string | undefined;
  recruitmentStartDate: string | undefined;
  description: string;
  title: string;
  imageFiles: File[];
}
export default function AddFormPage() {
  const router = useRouter();

  // 리액트 훅폼에서 관리할 데이터 타입 지정 및 메서드 호출 (상위 컴포넌트 = useForm 사용)
  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
  });

  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  // 훅폼에서 관리하는 전체 데이터를 가져오는 함수
  const currentValues = getValues();

  // 이미지 업로드 api 처리를 위해 별도 변수에 할당
  const imageFiles = currentValues.imageFiles;
  const [selectedOption, setSelectedOption] = useState("모집 내용");

  // 훅폼 초기 데이터 지정
  const submitFormData: SubmitFormDataType = {
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
    numberOfPositions: 0,
    imageUrls: [],
    recruitmentEndDate: undefined,
    recruitmentStartDate: undefined,
    description: "",
    title: "",
    imageFiles: [],
  };

  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      const submitData = new FormData();
      Object.entries(currentValues).forEach(([key, value]) => {
        if (key === "hourlyWage") {
          //시급을 숫자형으로 제출
          const numericValue = value.replaceAll(/,/g, "");
          submitData.append(key, numericValue);
        } else if (key === "imageUrls" && Array.isArray(value)) {
          // 배열 처리 :각 항목을 개별적으로 추가
          value.forEach((url: string, index: number) => {
            submitData.append(`${key}[${index}]`, url);
          });
        } else if (key !== "displayDate" && key !== "imageFiles" && key !== "recruitDateRange") {
          // SubmitFormData에 해당하지않는 필드는 제외하고 추가
          submitData.append(key, value);
        }
      });
      for (const [key, value] of submitData.entries()) {
        console.log(key, value);
      }
      const response = await axios.post("/api/forms", submitData);
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      window.localStorage.removeItem("tempAddFormData");
      toast.success("알바폼을 등록했습니다.");
      router.back(); // -> 추후 상세 페이지 이동으로 수정할것
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
    router.replace(`/addform?tab=${params}`);
  };

  const renderChildren = () => {
    switch (selectedOption) {
      case "모집 내용":
        return <RecruitContent key="recruitContent" formData={submitFormData} />;
      case "모집 조건":
        return <RecruitCondition key="recruitCondition" formData={submitFormData} />;
      case "근무 조건":
        return <WorkCondition key="workCondition" formData={submitFormData} />;
      default:
        return <></>;
    }
  };

  // 이미지 업로드 api
  const uploadImages = async (files: File[]) => {
    console.log("이미지 업로드 요청");
    if (currentValues.imageUrls.length === 0) {
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
          const response = await axios.post(`/api/images/upload`, formData, {
            withCredentials: true,
          });
          if (response.data.url) {
            uploadedUrls.push(response.data.url);
          }
        } catch (uploadError) {
          console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
          toast.error(`${file.name} 업로드에 실패했습니다.`);
        }
      }
      return uploadedUrls;
    } else {
      return;
    }
  };

  // 폼 데이터 최종 제출 함수
  const onSubmit = async () => {
    // 이미지 처리 로직 - 임시 저장이 되지 않았을때만 제출 단계에서 처리
    // imageFiles는 file[] : 이미지 업로드 api 처리 전단계 데이터임.
    if (imageFiles && imageFiles.length > 0 && currentValues.imageUrls.length === 0) {
      console.log("제출 - 이미지 처리 로직 ");
      try {
        const uploadedUrls = await uploadImages(Array.from(imageFiles));
        if (uploadedUrls && uploadedUrls.length > 0) {
          currentValues.imageUrls = [...currentValues.imageUrls, ...uploadedUrls];
          // 이미지 필드는 필수이므로 이미지 처리가 성공했을때만 submit 실행
          mutation.mutate();
        } else {
          currentValues.imageUrls = [];
          toast.error("이미지 업로드에 실패했습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
        currentValues.imageUrls = [];
      }
    } else if (currentValues.imageUrls.length > 0) {
      mutation.mutate();
    }
  };

  // 폼데이터 임시 저장 함수
  const onTempSave = async () => {
    // 이미지 처리 로직
    if (imageFiles && imageFiles.length > 0) {
      console.log("임시저장 - 이미지 처리 로직 ");
      try {
        const uploadedUrls = await uploadImages(Array.from(imageFiles));
        if (uploadedUrls && uploadedUrls.length > 0) {
          currentValues.imageUrls = [...currentValues.imageUrls, ...uploadedUrls];
        } else {
          currentValues.imageUrls = [];
          toast.error("이미지 업로드에 실패했습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
        currentValues.imageUrls = [];
      }
    }
    // 임시저장
    window.localStorage.setItem("tempAddFormData", JSON.stringify(currentValues));
    toast.success("임시 저장되었습니다.");
    console.log("임시저장 데이터", currentValues);
  };

  // 각각의 탭 작성중 여부
  const isEditingRecruitContent =
    currentValues.title !== "" ||
    currentValues.description !== "" ||
    currentValues.recruitmentStartDate !== "" ||
    currentValues.imageUrls
      ? true
      : false;
  const isEditingRecruitCondition =
    currentValues.gender ||
    currentValues.numberOfPositions ||
    currentValues.education ||
    currentValues.age ||
    currentValues.preferred
      ? true
      : false;
  const isEditingWorkCondition =
    currentValues.location ||
    currentValues.workDays ||
    currentValues.workStartTime ||
    currentValues.workStartDate ||
    currentValues.hourlyWage ||
    currentValues.isNegotiableWorkDays ||
    currentValues.isPublic
      ? true
      : false;

  return (
    <FormProvider {...methods}>
      <aside className="left-0 top-0 rounded-[24px] bg-background-200 lg:fixed lg:top-10 lg:p-10"></aside>
      <TabMenuDropdown
        options={[
          {
            label: "모집 내용",
            isEditing: isEditingRecruitContent || initialLoad || currentParam === "recruit-condition",
          },
          { label: "모집 조건", isEditing: isEditingRecruitCondition || currentParam === "recruit-condition" },
          { label: "근무 조건", isEditing: isEditingWorkCondition || currentParam === "work-condition" },
        ]}
        onChange={handleOptionChange}
      />
      {renderChildren()}
      <div className="flex flex-col gap-2 lg:absolute">
        <Button
          type="button"
          variant="outlined"
          width="md"
          color="orange"
          className="h-[58px] border bg-background-100 lg:h-[72px] lg:text-xl lg:leading-8"
          onClick={() => onTempSave()}
          disabled={!isDirty}
        >
          임시 저장
        </Button>
        <Button
          type="submit"
          variant="solid"
          width="md"
          color="orange"
          className="h-[58px] lg:h-[72px] lg:text-xl lg:leading-8"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          작성 완료
        </Button>
      </div>
    </FormProvider>
  );
}
