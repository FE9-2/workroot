"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import RecruitCondition from "./sections/RecruitCondition";
import WorkCondition from "./sections/WorkCondition";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import { RecruitConditionFormData, RecruitContentFormData, WorkConditionFormData } from "@/types/addform";
import RecruitContent from "./sections/RecruitContent";
import { useMutation } from "@tanstack/react-query";

type FormDataType = {
  recruitContent: RecruitContentFormData;
  recruitCondition: RecruitConditionFormData;
  workCondition: WorkConditionFormData;
};

export default function AddFormPage() {
  const router = useRouter();

  const {
    formState: { isDirty, isValid },
  } = useForm<FormDataType>({
    mode: "onChange",
  });

  const [selectedOption, setSelectedOption] = useState("모집 내용");
  const [imageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<{
    recruitContent: RecruitContentFormData;
    recruitCondition: RecruitConditionFormData;
    workCondition: WorkConditionFormData;
  }>({
    recruitContent: {
      title: "",
      description: "",
      recruitmentStartDate: undefined,
      recruitmentEndDate: undefined,
      imageUrls: [],
    },
    recruitCondition: {
      numberOfPositions: 0,
      gender: "",
      education: "",
      age: "",
      preferred: "",
    },
    workCondition: {
      isPublic: false,
      hourlyWage: 0,
      isNegotiableWorkDays: false,
      workDays: [],
      workEndTime: "",
      workStartTime: "",
      workEndDate: "",
      workStartDate: "",
      location: "",
    },
  });

  // 폼 데이터 업데이트 함수
  const handleFormDataChange = (
    updatedData: RecruitConditionFormData | RecruitContentFormData | WorkConditionFormData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
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
      onTempSave(formData);
    },
  });
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");
  const [prevOption, setPrevOption] = useState<string | null>(null);
  const initialLoad = currentParam === null; // 초기 로딩 여부 확인

  // tab 선택 시 Url params 수정 & 하위 폼 데이터 임시저장
  const handleOptionChange = async (option: string) => {
    setSelectedOption(option);
    if (!initialLoad && option !== currentParam && option !== prevOption && isDirty) {
      await onTempSave(formData);
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
        return <RecruitContent key="recruitContent" formData={formData.recruitContent} />;
      case "모집 조건":
        return <RecruitCondition key="recruitCondition" formData={formData.recruitCondition} />;
      case "근무 조건":
        return <WorkCondition key="workCondition" formData={formData.workCondition} />;
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 이미지 업로드 처리
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages(imageFiles);
        formData.recruitContent.imageUrls = uploadedUrls;
      }
      mutation.mutate(formData);
    } catch (error) {
      console.error("에러가 발생했습니다.", error);
      toast.error("에러가 발생했습니다.");
      onTempSave(formData);
    }
  };

  const onTempSave = async (data: FormDataType) => {
    if ("imageUrls" in data.recruitContent) {
      data.recruitContent.imageUrls = data.recruitContent.imageUrls || [];

      if (imageFiles && imageFiles.length > 0) {
        try {
          const uploadedUrls = await uploadImages(imageFiles);
          if (uploadedUrls.length > 0) {
            data.recruitContent.imageUrls = [...data.recruitContent.imageUrls, ...uploadedUrls];
          } else {
            data.recruitContent.imageUrls = [];
            toast.error("이미지 업로드에 실패했습니다.");
          }
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          toast.error("이미지 업로드 중 오류가 발생했습니다.");
          data.recruitContent.imageUrls = [];
        }
      }
    }

    window.localStorage.setItem("tempAddFormData", JSON.stringify(data));
    toast.success("임시 저장되었습니다.");
    console.log(data);
  };

  return (
    <>
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
          onClick={() => onTempSave(formData)}
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
          onClick={onSubmit}
        >
          작성 완료
        </Button>
      </div>
    </>
  );
}
