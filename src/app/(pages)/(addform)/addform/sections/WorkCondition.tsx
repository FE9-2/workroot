"use client";

import { useForm, FormProvider } from "react-hook-form";
import { WorkConditionFormData } from "@/types/addform";
import { useEffect } from "react";

interface WorkConditionProps {
  formData: WorkConditionFormData;
  onUpdate: (data: WorkConditionFormData) => void;
}

// 알바폼 만들기 - 사장님
export default function WorkCondition({ formData, onUpdate }: WorkConditionProps) {
  const methods = useForm<WorkConditionFormData>({
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
