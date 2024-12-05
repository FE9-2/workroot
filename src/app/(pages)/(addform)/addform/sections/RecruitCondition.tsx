"use client";
import { RecruitConditionFormData } from "@/types/addform";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import Label from "../../component/Label";

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

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <div className="relative">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-4">
          <Label>근무 위치</Label>
          <Label>근무 기간</Label>
          <Label>근무 시간</Label>
          <Label>근무 요일</Label>
          <Label>시급</Label>
          <Label>공개 설정</Label>
        </form>
      </FormProvider>
    </div>
  );
}
