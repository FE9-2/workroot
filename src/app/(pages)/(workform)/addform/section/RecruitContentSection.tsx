"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { cn } from "@/lib/tailwindUtil";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Label from "../../component/Label";
import { ImageInputType } from "@/types/addform";
import useUploadImages from "@/hooks/queries/user/me/useImageUpload";
import { formatToLocaleDate } from "@/utils/formatters";

// 워크폼 만들기 - 사장님 - 1-모집내용

export default function RecruitContentSection() {
  // 이미지 파일을 로컬 상태에 저장
  const [initialImageList, setInitialImageList] = useState<ImageInputType[]>([]);

  //훅폼 하위 컴포넌트에서는 useFormcontext에서 메서드 호출
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { uploadImages } = useUploadImages();

  const imageUrlsData: string[] = watch("imageUrls");

  // 이미지 파일 change핸들러
  const handleChangeImages = async (files: File[]) => {
    let uploadedUrls: string[] = [];
    //파일 선택 시 업로드 api 요청
    try {
      uploadedUrls = await uploadImages(files);
      console.log("이미지 파일 change 핸들러 - 이미지 업로드 성공");
    } catch (err) {
      console.log("이미지 파일 체인지 핸들러 - 이미지 업로드 실패");
      console.error(err);
    }
    // 선택한 이미지 업데이트
    const updatedImageList =
      uploadedUrls.map((url) => ({
        url,
        id: crypto.randomUUID(),
      })) || [];

    // 기존 이미지 포함하기
    const originalImageList =
      imageUrlsData.map((url) => ({
        url,
        id: crypto.randomUUID(),
      })) || [];

    const allImageList = [...originalImageList, ...updatedImageList];
    const submitImageList = [...imageUrlsData, ...uploadedUrls];

    // prop으로 전달
    setInitialImageList(allImageList);
    // 훅폼 데이터에 세팅
    setValue("imageUrls", submitImageList, { shouldDirty: true });
  };

  const handleDeleteImage = (url: string) => {
    const newImageList = initialImageList.filter((item) => item.url !== url);
    setInitialImageList(newImageList);
    const urls = newImageList.map((item) => item.url);
    setValue("imageUrls", urls, { shouldDirty: true });
  };
  // 초기 이미지 데이터 로딩
  useEffect(() => {
    if (imageUrlsData?.length > 0) {
      const originalUrls = imageUrlsData.map((url) => ({
        url,
        id: crypto.randomUUID(),
      }));
      setInitialImageList(originalUrls);
    }
  }, [imageUrlsData]);

  // 모집 기간 데이터 반영하기
  const recruitStartDate: string = watch("recruitmentStartDate");
  const recruitEndDate: string = watch("recruitmentEndDate");
  const startDate = recruitStartDate ? new Date(recruitStartDate) : undefined;
  const endDate = recruitEndDate ? new Date(recruitEndDate) : undefined;

  // displayRange를 상위에서 관리
  const displayDate =
    recruitStartDate === "" || recruitStartDate === undefined || recruitStartDate === null
      ? ""
      : `${formatToLocaleDate(recruitStartDate)} ~ ${formatToLocaleDate(recruitEndDate)}`;
  const [displayRange, setDisplayRange] = useState<string>(displayDate || "");

  useEffect(() => {
    setDisplayRange(displayDate);
  }, [recruitStartDate, recruitEndDate, displayDate]);

  // 날짜 선택
  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates); // -> prop으로 내려줌
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString(), { shouldDirty: true });
  };

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <div className="relative">
      <form className="my-8 flex flex-col gap-4">
        <Label>워크폼 제목</Label>
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
            startDate={startDate}
            endDate={endDate}
            onChange={handleRecruitmentDateChange}
            required={true}
            errormessage={!startDate || !endDate}
            displayValue={displayRange}
          />
          {!startDate || (!endDate && <p className={cn(errorTextStyle, "")}> 모집 기간은 필수입니다.</p>)}
        </div>

        <Label>이미지 첨부</Label>
        <div>
          <ImageInput
            {...register("imageUrls")}
            onChange={(files: File[]) => {
              handleChangeImages(files);
            }}
            onDelete={(id) => handleDeleteImage(id)}
            initialImageList={initialImageList}
          />
          {errors.imageUrls && <p className={cn(errorTextStyle, "")}>{errors.imageUrls.message as string}</p>}
        </div>
      </form>
    </div>
  );
}
