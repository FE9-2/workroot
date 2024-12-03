"use client";
import TopMenuDropdown from "@/app/components/button/dropdown/TopMenuDropdown";
import Label from "../component/Label";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/app/components/button/default/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import router from "next/router";
import axios from "axios";

interface AddFormData {
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
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
}

// 알바폼 만들기 - 사장님
export default function AddForm() {
  const methods = useForm<AddFormData>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    setValue,
  } = methods;

  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString());
  };

  // 이미지 업로드 api
  const uploadImages = async (files: File[]) => {
    try {
      const response = await axios.post(`/api/images/upload`, files);
      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const handleSubmitImages = async () => {
    try {
      const uploadedUrls = await uploadImages(imageFiles);
      setValue("imageUrls", uploadedUrls);
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
    }
  };
  const onSubmit = async (data: AddFormData) => {
    try {
      // 전체 폼 데이터 POST요청
      await axios.post(`/api/forms`, data);
      window.localStorage.removeItem("tempAddFormData");
      toast.success("알바폼을 등록했습니다.");
      router.back();
    } catch (error) {
      toast.error("에러가 발생했습니다. 작성 중인 내용은 임시 저장됩니다.");
      console.error("Error submitting application:", error);
      onTempSave();
    }
  };

  const onTempSave = () => {
    const currentData = getValues();
    window.localStorage.setItem("tempAddFormData", JSON.stringify(currentData));
    toast.success("임시 저장되었습니다.");
    console.log(currentData);
  };

  return (
    <div className="relative">
      <aside className="hidden rounded-[24px] bg-background-200 lg:absolute" />
      <TopMenuDropdown
        options={[
          { label: "모집 내용", value: "1" },
          { label: "모집 조건", value: "2" },
          { label: "근무 조건", value: "3" },
        ]}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-4">
          <Label>알바폼 제목</Label>
          <BaseInput
            {...register("title", { required: "제목을 입력해주세요" })}
            type="text"
            variant="white"
            placeholder="제목을 입력해주세요."
          />

          <Label>소개글</Label>
          <BaseTextArea
            {...register("description", {
              required: "자기소개를 입력해주세요",
              maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
            })}
            variant="white"
            placeholder="최대 200자까지 입력 가능합니다."
          />

          <Label>모집 기간</Label>
          <DatePickerInput
            startDateName="recruitmentStartDate"
            endDateName="recruitmentEndDate"
            startDate={recruitmentDateRange[0] || undefined}
            endDate={recruitmentDateRange[1] || undefined}
            onChange={handleRecruitmentDateChange}
          />
          <Label required={false}>이미지 첨부</Label>
          <ImageInput
            {...register("imageUrls")}
            onChange={(files) => {
              setImageFiles(files);
              console.log(imageFiles);
            }}
          />

          <div className="flex flex-col gap-2 lg:absolute">
            <Button
              type="button"
              variant="outlined"
              width="md"
              color="orange"
              className="h-[58px] border bg-background-200 lg:h-[72px] lg:text-xl lg:leading-8"
              onClick={onTempSave}
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
              disabled={!isValid || !isDirty}
            >
              작성 완료
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
