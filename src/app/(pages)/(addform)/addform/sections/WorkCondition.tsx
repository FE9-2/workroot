"use client";

import { useForm, FormProvider } from "react-hook-form";
import { WorkConditionFormData } from "@/types/addform";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
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
}

// 알바폼 만들기 - 사장님 - 3-근무조건
export default function WorkCondition({ formData }: WorkConditionProps) {
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

  const onSubmit = async (data: WorkConditionFormData) => {
    // onUpdate(data);
  };

  // 근무 날짜 지정
  const [workDateRange, setWorkDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleWorkDateChange = (dates: [Date | null, Date | null]) => {
    setWorkDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("workStartDate", start.toISOString());
    if (end) setValue("workEndDate", end.toISOString());
  };

  //근무 시간 지정
  const workStartTime = watch("workStartTime");
  const workEndTime = watch("workEndTime");

  //근무 요일 지정
  const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([]);

  const handleClickDay = (e: MouseEvent<HTMLButtonElement>) => {
    const day = e.currentTarget.textContent;
    if (day) {
      if (selectedWorkDays.includes(day)) {
        // 이미 선택한 요일을 클릭했을때
        setSelectedWorkDays((prev) => prev.filter((d: string) => d !== day));
      } else {
        setSelectedWorkDays([...selectedWorkDays, day]);
      }
      setValue("workDays", [...selectedWorkDays, day]);
      methods.trigger("workDays");
    }
  };

  // 시급 상태 추가
  const [formattedHourlyWage, setFormattedHourlyWage] = useState<string>();

  const formatNumber = (value: string) => {
    let numericValue = value.replace(/,/g, "");
    if (numericValue.startsWith("0")) {
      numericValue = numericValue.slice(1);
    }
    const formattedNumber = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormattedHourlyWage(formattedNumber);
  };

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
              (!workDateRange[1] && <p className={cn(errorTextStyle, "")}> 근무 기간은 필수입니다.</p>)}
          </div>

          <Label>근무 시간</Label>
          <div className="relative flex gap-7 lg:gap-9">
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
              {...register("workEndTime", { required: "근무 시작 시간을 선택해주세요." })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("workEndTime", e.target.value);
              }}
            />
            {!errors.workStartDate ||
              (!errors.workEndDate && !workStartTime && !workEndTime && isDirty && (
                <p className={cn(errorTextStyle, "")}>근무 시간을 선택해주세요.</p>
              ))}
          </div>

          <div className="flex flex-col gap-4">
            <Label>근무 요일</Label>
            <DayPickerList workDays={selectedWorkDays} onClick={handleClickDay} />

            <div className="relative flex flex-col pl-[14px]">
              <CheckBtn
                label="요일 협의 가능"
                checked={watch("isNegotiableWorkDays")}
                {...register("isNegotiableWorkDays")}
              />
              {selectedWorkDays.length === 0 && isDirty && (
                <p className={cn(errorTextStyle, "")}>근무 요일을 선택해주세요.</p>
              )}
            </div>
          </div>

          <Label>시급</Label>
          <BaseInput
            {...register("hourlyWage", {
              required: "시급을 작성해주세요.",
              validate: (value) => !isNaN(Number(String(value).replace(/,/g, ""))) || "숫자만 입력해주세요.",
            })}
            value={formattedHourlyWage || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => formatNumber(e.target.value)}
            variant="white"
            afterString="원"
            errormessage={errors.hourlyWage?.message}
          />

          <div className="relative flex flex-col gap-4">
            <Label>공개 설정</Label>
            <CheckBtn label="공개 설정" checked={watch("isPublic")} {...register("isPublic")} className="pl-[14px]" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
