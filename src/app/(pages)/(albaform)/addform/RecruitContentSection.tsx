"use client";
import Label from "../Label";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { cn } from "@/lib/tailwindUtil";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// 알바폼 만들기 - 사장님 - 1-모집내용

export default function RecruitContentSection() {
  // 이미지 파일을 로컬 상태에 저장
  const [initialImageList, setInitialImageList] = useState<{ file: File; url: string; id: string }[]>([]);

  //훅폼 하위 컴포넌트에서는 useFormcontext에서 메서드 호출
  const {
    register,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useFormContext();

  const currentValue = getValues();

  // 이미지 파일 change핸들러
  const handleChangeImages = (files: File[]) => {
    // 훅폼 데이터에 추가-> 상위 페이지에서 "imageFiles" data를 관리할 수 있음
    setValue("imageFiles", files);

    // 기존 이미지 리스트와 새로운 이미지를 합침
    setInitialImageList((prevList) => [
      ...prevList,
      ...files.map((file: File) => ({
        file,
        url: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      })),
    ]);
  };

  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");
  const initialLoad = currentParam === null; // 초기 로딩 여부 확인
  // 컴포넌트가 마운트될 때 이미지 초기값 설정 (초기로딩 제외)
  useEffect(() => {
    if (!initialLoad && currentValue.imageFiles?.length > 0) {
      handleChangeImages(currentValue.imageFiles);
    }
  }, []);

  // 날짜 선택
  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString());
  };
  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <div className="relative">
      <form className="my-8 flex flex-col gap-4">
        <Label>알바폼 제목</Label>
        <BaseInput
          {...register("title", { required: "제목을 입력해주세요" })}
          type="text"
          variant="white"
          placeholder="제목을 입력해주세요."
          errormessage={errors.title?.message as string}
        />

        <Label>소개글</Label>
        <BaseTextArea
          {...register("description", {
            required: "자기소개를 입력해주세요",
            maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
          })}
          variant="white"
          placeholder="최대 200자까지 입력 가능합니다."
          errormessage={errors.description?.message as string}
        />

        <div className="relative flex flex-col gap-2">
          <Label>모집 기간</Label>
          <DatePickerInput
            startDateName="recruitmentStartDate"
            endDateName="recruitmentEndDate"
            startDate={recruitmentDateRange[0] || undefined}
            endDate={recruitmentDateRange[1] || undefined}
            onChange={handleRecruitmentDateChange}
            required={true}
            errormessage={isDirty && (!recruitmentDateRange[0] || !recruitmentDateRange[1])}
            displayValue="recruitDateRange"
          />
          {!recruitmentDateRange[0] ||
            (!recruitmentDateRange[1] && <p className={cn(errorTextStyle, "")}> 모집 기간은 필수입니다.</p>)}
        </div>

        <Label>이미지 첨부</Label>
        <ImageInput
          {...register("imageUrls", { required: "이미지는 필수입니다." })}
          onChange={(files: File[]) => {
            handleChangeImages(files);
          }}
          initialImageList={initialImageList || []}
        />
        {errors.imageUrls && <p className={cn(errorTextStyle, "")}>{errors.imageUrls.message as string}</p>}
      </form>
    </div>
  );
}
