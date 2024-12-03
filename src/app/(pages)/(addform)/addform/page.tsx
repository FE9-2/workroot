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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
    setValue,
  } = methods;
  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString());
  };

  const onSubmit = (data: AddFormData) => {
    console.log(data);
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
          <Label>모집 내용</Label>
          <BaseInput {...register("title")} type="text" variant="white" />
          <Label>소개글</Label>
          <BaseTextArea
            {...register("description", {
              required: "자기소개를 입력해주세요",
              maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
            })}
            variant="white"
          />
          <Label>모집 기간</Label>
          <DatePickerInput
            name="recruitmentDateDisplay"
            startDate={recruitmentDateRange[0] || undefined}
            endDate={recruitmentDateRange[1] || undefined}
            onChange={handleRecruitmentDateChange}
          />
          <Label required={false}>이미지 첨부</Label>
          <ImageInput />
          <div className="flex flex-col gap-2 lg:absolute">
            <Button
              type="button"
              variant="outlined"
              width="md"
              color="orange"
              className="h-[58px] border lg:h-[72px] lg:text-xl lg:leading-8"
              // onClick={onTempSave}
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
