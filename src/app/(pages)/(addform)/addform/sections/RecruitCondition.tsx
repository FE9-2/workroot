"use client";
import { RecruitConditionFormData } from "@/types/addform";
import { useFormContext } from "react-hook-form";
import Label from "../../component/Label";
import InputDropdown from "@/app/components/button/dropdown/InputDropdown";
import { useEffect, useState } from "react";

interface RecruitConditionProps {
  formData: RecruitConditionFormData;
}

// 알바폼 만들기 - 사장님- 2-모집조건
export default function RecruitCondition({ formData }: RecruitConditionProps) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  // const currentData = getValues();
  // const [displayData, setDisplayData] = useState({
  //   numberOfPositions: currentData.numberOfPositions,
  //   gender: currentData.gender,
  //   education: currentData.education,
  //   age: currentData.age,
  //   preferred: currentData.preferred,
  // });

  // useEffect(() => {
  //   setDisplayData({
  //     numberOfPositions: currentData.numberOfPositions,
  //     gender: currentData.gender,
  //     education: currentData.education,
  //     age: currentData.age,
  //     preferred: currentData.preferred,
  //   });
  //   console.log("currentData", currentData);
  //   console.log("displayData", displayData);
  // }, [getValues]);

  return (
    <div className="relative">
      <form className="my-8 flex flex-col gap-4">
        <Label>모집인원</Label>
        <InputDropdown
          {...register("numberOfPositions", { required: "모집 인원을 선택해주세요" })}
          // value={displayData.numberOfPositions}
          options={["00명(인원 미정)", "직접 입력"]}
          errormessage={errors.numberOfPositions?.message as string}
        />

        <Label>성별</Label>
        <InputDropdown
          {...register("gender", { required: "성별을 선택해주세요" })}
          // value={displayData.gender}
          options={["성별 무관", "남성", "여성", "직접 입력"]}
          errormessage={errors.gender?.message as string}
        />

        <Label>학력</Label>
        <InputDropdown
          {...register("education", { required: "학력을 선택해주세요" })}
          // value={displayData.education}
          options={["고등학교 졸업", "대학교 졸업", "대학교 졸업 예정", "대학원 졸업", "학력 무관", "직접 입력"]}
          errormessage={errors.education?.message as string}
        />

        <Label>연령</Label>
        <InputDropdown
          {...register("age", { required: "연령을 선택해주세요" })}
          // value={displayData.age}
          options={["10대", "20대", "30대", "40대", "50대", "60대", "연령 무관", "직접 입력"]}
          errormessage={errors.age?.message as string}
        />

        <Label>우대사항</Label>
        <InputDropdown
          {...register("preferred", { required: "우대사항을 선택해주세요" })}
          // value={displayData.preferred}
          options={["유사 업무 경험 우대", "운전 가능", "직접 입력"]}
          errormessage={errors.preferred?.message as string}
        />
      </form>
    </div>
  );
}
