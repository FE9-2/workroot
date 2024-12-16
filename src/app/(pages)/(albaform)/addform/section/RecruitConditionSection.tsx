"use client";
import { useFormContext } from "react-hook-form";
import InputDropdown from "@/app/components/button/dropdown/InputDropdown";
import Label from "../../component/Label";

// 워크폼 만들기 - 사장님- 2-모집조건
export default function RecruitConditionSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <form className="my-8 flex flex-col gap-4">
        <Label>모집인원</Label>
        <InputDropdown
          {...register("numberOfPositions", { required: "모집 인원을 선택해주세요" })}
          options={["1", "2", "3", "4", "5", "직접 입력"]}
          errormessage={errors.numberOfPositions?.message as string}
        />

        <Label>성별</Label>
        <InputDropdown
          {...register("gender", { required: "성별을 선택해주세요" })}
          options={["성별 무관", "남성", "여성", "직접 입력"]}
          errormessage={errors.gender?.message as string}
        />

        <Label>학력</Label>
        <InputDropdown
          {...register("education", { required: "학력을 선택해주세요" })}
          options={["학력 무관", "고등학교 졸업", "대학교 졸업", "대학교 졸업 예정", "대학원 졸업", "직접 입력"]}
          errormessage={errors.education?.message as string}
        />

        <Label>연령</Label>
        <InputDropdown
          {...register("age", { required: "연령을 선택해주세요" })}
          options={["연령 무관", "10대", "20대", "30대", "40대", "50대", "60대", "직접 입력"]}
          errormessage={errors.age?.message as string}
        />

        <Label>우대사항</Label>
        <InputDropdown
          {...register("preferred", { required: "우대사항을 선택해주세요" })}
          options={["유사 업무 경험 우대", "운전 가능", "직접 입력"]}
          errormessage={errors.preferred?.message as string}
        />
      </form>
    </div>
  );
}
