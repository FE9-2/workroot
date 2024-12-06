"use client";
import { useEffect, useState } from "react";
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
}
export default function AddFormPage() {
  const router = useRouter();

  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
  });

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const [selectedOption, setSelectedOption] = useState("모집 내용");
  const [imageFiles] = useState<File[]>([]);

  const submitFormData: SubmitFormDataType = {
    isPublic: false, // 기본값을 false로 설정
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
  };

  // useEffect(() => {
  //   const initialFormData: SubmitFormDataType = {
  //     isPublic: false,
  //     hourlyWage: 0,
  //     isNegotiableWorkDays: false,
  //     workDays: [],
  //     workEndTime: "",
  //     workStartTime: "",
  //     workEndDate: "",
  //     workStartDate: "",
  //     location: "",
  //     preferred: "",
  //     age: "",
  //     education: "",
  //     gender: "",
  //     numberOfPositions: 0,
  //     imageUrls: [],
  //     recruitmentEndDate: undefined,
  //     recruitmentStartDate: undefined,
  //     description: "",
  //     title: "",
  //   };

  //   reset(initialFormData); // 초기값 설정
  // }, []);

  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async (data: SubmitFormDataType) => {
      const currentData = getValues();
      // getValue에서 displayDate 제외해야함
      const response = await axios.post("/api/forms", data);
      return response.data;
    },
    onSuccess: () => {
      window.localStorage.removeItem("tempAddFormData");
      toast.success("알바폼을 등록했습니다.");
      router.back();
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
      formData.append("image", file, file.name);
      try {
        const response = await axios.post(`/api/images/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [(data) => data],
        });
        console.log("response", response);
        if (response.data.url) {
          uploadedUrls.push(response.data.url);
        }
      } catch (uploadError) {
        console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
        toast.error(`${file.name} 업로드에 실패했습니다.`);
      }
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: SubmitFormDataType) => {
    try {
      // 이미지 업로드 처리
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages(imageFiles);
        data.imageUrls = uploadedUrls;
      }
      mutation.mutate(submitFormData);
    } catch (error) {
      console.error("에러가 발생했습니다.", error);
      toast.error("에러가 발생했습니다.");
      onTempSave();
    }
  };

  const onTempSave = async () => {
    const currentValues = getValues(); // 현재 입력된 값 가져오기

    // 이미지 처리 로직
    if ("imageUrls" in currentValues) {
      currentValues.imageUrls = currentValues.imageUrls || [];

      if (imageFiles && imageFiles.length > 0) {
        try {
          const uploadedUrls = await uploadImages(imageFiles);
          if (uploadedUrls.length > 0) {
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
    }
    // 임시저장
    window.localStorage.setItem("tempAddFormData", JSON.stringify(currentValues));
    toast.success("임시 저장되었습니다.");
    console.log(currentValues);
  };

  // 각각의 탭 작성중 여부
  // formdata field에 value 들어가있는지 확인

  return (
    <FormProvider {...methods}>
      <aside className="left-0 top-0 rounded-[24px] bg-background-200 lg:fixed lg:top-10 lg:p-10"></aside>
      <TabMenuDropdown
        options={[
          { label: "모집 내용", isEditing: isDirty },
          { label: "모집 조건", isEditing: isDirty },
          { label: "근무 조건", isEditing: isDirty },
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
