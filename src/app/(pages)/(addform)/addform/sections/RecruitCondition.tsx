"use client";
import { RecruitConditionFormData } from "@/types/addform";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import Label from "../../component/Label";
import InputDropdown from "@/app/components/button/dropdown/InputDropdown";

interface RecruitConditionProps {
  formData: RecruitConditionFormData;
  onUpdate: (data: RecruitConditionFormData) => void;
}

// 알바폼 만들기2 - 사장님
export default function RecruitCondition({ formData, onUpdate }: RecruitConditionProps) {
  const methods = useForm<RecruitConditionFormData>({
    mode: "onChange",
    defaultValues: formData,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = methods;

  useEffect(() => {
    if (formData) {
      methods.reset(formData);
    }
  }, [formData, methods]);
  useEffect(() => {
    const subscription = watch((value) => {
      if (isDirty) {
        onUpdate(value as RecruitConditionFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate, isDirty]);
  const onSubmit = async (data: RecruitConditionFormData) => {
    onUpdate(data);
  };

  return (
    <div className="relative">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-4">
          <Label>모집인원</Label>
          <InputDropdown options={["00명(인원 미정)", "직접 입력"]} />
          <Label>성별</Label>
          <InputDropdown options={["남성", "여성", "성별 무관", "직접 입력"]} />
          <Label>학력</Label>
          <InputDropdown
            options={["고등학교 졸업", "대학교 졸업", "대학교 졸업 예정", "대학원 졸업", "학력 무관", "직접 입력"]}
          />
          <Label>연령</Label>
          <InputDropdown options={["10대", "20대", "30대", "40대", "50대", "60대", "연령 무관", "직접 입력"]} />
          <Label>우대사항</Label>
          <InputDropdown options={["유사 업무 경험 우대", "운전 가능", "직접 입력"]} />
        </form>
      </FormProvider>
    </div>
  );
}
