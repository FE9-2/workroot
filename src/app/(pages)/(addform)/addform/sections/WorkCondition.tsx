"use client";

import { useForm, FormProvider } from "react-hook-form";
import { WorkConditionFormData } from "@/types/addform";
import { useEffect, useState, ChangeEvent } from "react";
import Label from "../../component/Label";
import { cn } from "@/lib/tailwindUtil";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import LocationInput from "@/app/components/input/text/LocationInput";
import TimePickerInput from "@/app/components/input/dateTimeDaypicker/TimePickerInput";
import DayPickerList from "@/app/components/input/dateTimeDaypicker/DayPickerList";
import BaseInput from "@/app/components/input/text/BaseInput";
import CheckBtn from "@/app/components/button/default/CheckBtn";

interface WorkConditionProps {
  formData: WorkConditionFormData;
  onUpdate: (data: WorkConditionFormData) => void;
}

// 알바폼 만들기 - 사장님 - 3-근무조건
export default function WorkCondition({ formData, onUpdate }: WorkConditionProps) {
  const methods = useForm<WorkConditionFormData>({
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
        onUpdate(value as WorkConditionFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate, isDirty]);
  const onSubmit = async (data: WorkConditionFormData) => {
    onUpdate(data);
  };

  const [workDateRange, setWorkDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleWorkDateChange = (dates: [Date | null, Date | null]) => {
    setWorkDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("workStartDate", start.toISOString());
    if (end) setValue("workEndDate", end.toISOString());
  };

  const workStartTime = watch("workStartTime");
  const workEndTime = watch("workEndTime");
  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <div className="relative">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-4">
          {/* 지도 API 연동 */}
          <Label>근무 위치</Label>
          <LocationInput variant="white" {...register("location", { required: "근무 위치를 작성해주세요." })} />

          <div className="relative flex flex-col gap-2">
            <Label>근무 기간</Label>
            <DatePickerInput
              startDateName="workStartDate"
              endDateName="workEndDate"
              startDate={workDateRange[0] || undefined}
              endDate={workDateRange[1] || undefined}
              onChange={handleWorkDateChange}
              required={true}
              errormessage={isDirty && (!workDateRange[0] || !workDateRange[1])}
            />
            {!workDateRange[0] ||
              (!workDateRange[1] && <p className={cn(errorTextStyle, "")}> 모집 기간은 필수입니다.</p>)}
          </div>

          <Label>근무 시간</Label>
          <div className="flex gap-7 lg:gap-9">
            <TimePickerInput
              variant="white"
              value={workStartTime}
              {...register("workStartTime", { required: "근무 시작 시간을 선택해주세요" })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("workStartTime", e.target.value);
              }}
            />
            <TimePickerInput
              variant="white"
              value={workEndTime}
              {...register("workEndTime", { required: "근무 시작 시간을 선택해주세요" })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("workEndTime", e.target.value);
              }}
            />
          </div>

          <Label>근무 요일</Label>
          <DayPickerList />
          <div className="flex px-[14px]">
            <CheckBtn label="요일 협의 가능" name="day" value="boolean" />
          </div>

          <Label>시급</Label>
          <BaseInput
            {...register("hourlyWage", { required: "시급을 작성해주세요." })}
            variant="white"
            afterString="원"
            errormessage={errors.hourlyWage?.message}
          />

          <Label>공개 설정</Label>
          <div className="flex px-[14px]">
            <CheckBtn label="공개 설정" name="puble" value="boolean" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
