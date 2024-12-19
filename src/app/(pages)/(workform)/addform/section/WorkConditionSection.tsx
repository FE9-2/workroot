"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useState, ChangeEvent, MouseEvent, useCallback } from "react";
import { cn } from "@/lib/tailwindUtil";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import TimePickerInput from "@/app/components/input/dateTimeDaypicker/TimePickerInput";
import DayPickerList from "@/app/components/input/dateTimeDaypicker/DayPickerList";
import BaseInput from "@/app/components/input/text/BaseInput";
import CheckBtn from "@/app/components/button/default/CheckBtn";
import Label from "../../component/Label";
import Script from "next/script";
import LocationInput from "@/app/components/input/text/LocationInput";
import { formatToLocaleDate } from "@/utils/formatters";

const MINIMUM_WAGE = 10_030;

// 워크폼 만들기 - 사장님 - 3-근무조건
export default function WorkConditionSection() {
  const {
    register,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  // 근무 기간 데이터 반영하기
  const workStartDate: string = watch("workStartDate");
  const workEndDate: string = watch("workEndDate");

  const startDate = workStartDate ? new Date(workStartDate) : undefined;
  const endDate = workEndDate ? new Date(workEndDate) : undefined;

  // displayRange를 상위에서 관리
  const displayDate =
    workStartDate && !formatToLocaleDate(workEndDate).includes("NaN")
      ? `${formatToLocaleDate(workStartDate)} ~ ${formatToLocaleDate(workEndDate)}`
      : "";

  const handleWorkDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setValue("workStartDate", start ? start.toISOString() : null);
    setValue("workEndDate", end ? end.toISOString() : null, { shouldDirty: true });
  };

  //근무 시간 지정
  const workStartTime = watch("workStartTime");
  const workEndTime = watch("workEndTime");

  //근무 요일 지정

  const workdaysData = watch("workDays") || [];
  const isNegotiable = watch("isNegotiableWorkDays") || false;

  const handleClickDay = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const day = e.currentTarget.textContent;

    if (day) {
      if (workdaysData.includes(day)) {
        // 이미 선택한 요일을 클릭했을때
        setValue("workDays", [...workdaysData.filter((d: string) => d !== day)]);
      } else {
        setValue("workDays", [...workdaysData, day]);
      }
    }
    if (isNegotiable) {
      setValue("workDays", []);
    }
  };

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  // 주소 변경 핸들러만 유지
  const handleAddressChange = useCallback(
    (fullAddress: string) => {
      setValue("location", fullAddress);
      trigger("location");
    },
    [setValue]
  );

  return (
    <div className="relative">
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />

      <form className="my-8 flex flex-col gap-8">
        <Label>근무 위치</Label>
        <div className="relative">
          <LocationInput
            onAddressChange={handleAddressChange}
            errormessage={errors.location?.message as string}
            variant="white"
            value={watch("location")}
          />
        </div>

        <div className="relative flex flex-col gap-2">
          <Label>근무 기간</Label>
          <DatePickerInput
            startDate={startDate}
            endDate={endDate}
            onChange={handleWorkDateChange}
            required={true}
            errormessage={!startDate || !endDate}
            displayValue={displayDate}
          />
          {(!startDate || !endDate) && <p className={cn(errorTextStyle, "")}> 근무 기간은 필수입니다.</p>}
        </div>

        <Label>근무 시간</Label>
        <div className="relative flex gap-7 lg:gap-9">
          <TimePickerInput
            variant="white"
            value={workStartTime}
            {...register("workStartTime", { required: "근무 시작 시간을 선택해주세요" })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("workStartTime", e.target.value, { shouldDirty: true });
            }}
          />
          <TimePickerInput
            variant="white"
            value={workEndTime}
            {...register("workEndTime", { required: "근무 시작 시간을 선택해주세요." })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("workEndTime", e.target.value, { shouldDirty: true });
            }}
          />
          {!errors.workStartDate ||
            (!errors.workEndDate && !workStartTime && !workEndTime && (
              <p className={cn(errorTextStyle, "")}>근무 시간을 선택해주세요.</p>
            ))}
        </div>

        {/* 요일 협의 가능하다면 근무요일은 선택하지 않아도 됨 */}
        <div className="flex flex-col gap-4">
          <Label>근무 요일</Label>
          <DayPickerList workDays={workdaysData} onClick={handleClickDay} disabled={isNegotiable} />

          <div className="relative flex flex-col pl-[14px]">
            <CheckBtn
              label="요일 협의 가능"
              checked={watch("isNegotiableWorkDays")}
              {...register("isNegotiableWorkDays")}
            />
            {workdaysData.length === 0 && !isNegotiable && (
              <p className={cn(errorTextStyle, "")}>근무 요일을 선택해주세요.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label>시급</Label>
          <Controller
            name="hourlyWage"
            control={control}
            rules={{
              min: {
                value: MINIMUM_WAGE,
                message: `최저시급(${MINIMUM_WAGE.toLocaleString()}원) 이상을 입력해주세요.`,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <BaseInput
                value={value.toLocaleString()}
                onChange={(e) => onChange(Number(e.target.value.replaceAll(",", "")))}
                onBlur={onBlur}
                variant="white"
                afterString="원"
                errormessage={errors.hourlyWage?.message as string}
              />
            )}
          />
        </div>

        <div className="relative flex flex-col gap-4">
          <Label>공개 설정</Label>
          <CheckBtn label="공개 설정" checked={watch("isPublic")} {...register("isPublic")} className="pl-[14px]" />
        </div>
      </form>
    </div>
  );
}
