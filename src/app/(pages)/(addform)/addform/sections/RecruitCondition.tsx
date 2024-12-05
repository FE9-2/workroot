"use client";
import { RecruitConditionFormData } from "@/types/addform";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";

interface RecruitConditionProps {
  formData: RecruitConditionFormData;
  onUpdate: (data: RecruitConditionFormData) => void;
}

// 알바폼 만들기 - 사장님
export default function RecruitCondition({ formData, onUpdate }: RecruitConditionProps) {
  const methods = useForm<RecruitConditionFormData>({
    mode: "onChange",
    defaultValues: formData,
  });

  const { watch } = methods;
  const watchedValues = watch();

  useEffect(() => {
    onUpdate(watchedValues);
  }, [watchedValues, onUpdate]);

  return <FormProvider {...methods}>...</FormProvider>;
}
