"use client";

import { useFormContext } from "react-hook-form";
import { useState, ChangeEvent, MouseEvent, useCallback, useEffect } from "react";
import { cn } from "@/lib/tailwindUtil";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import TimePickerInput from "@/app/components/input/dateTimeDaypicker/TimePickerInput";
import DayPickerList from "@/app/components/input/dateTimeDaypicker/DayPickerList";
import BaseInput from "@/app/components/input/text/BaseInput";
import CheckBtn from "@/app/components/button/default/CheckBtn";
import formatMoney from "@/utils/formatMoney";
import Label from "../../component/Label";
import Script from "next/script";
import LocationInput from "@/app/components/input/text/LocationInput";
import { toast } from "react-hot-toast";

// 알바폼 만들기 - 사장님 - 3-근무조건
export default function WorkConditionSection() {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

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
  const negotiable = watch("isNegotiableWorkDays");

  const handleClickDay = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const day = e.currentTarget.textContent;
    if (day) {
      if (selectedWorkDays.includes(day)) {
        // 이미 선택한 요일을 클릭했을때
        setSelectedWorkDays((prev) => prev.filter((d: string) => d !== day));
      } else {
        setSelectedWorkDays([...selectedWorkDays, day]);
      }
      setValue("workDays", [...selectedWorkDays, day]);
      trigger("workDays");
    }
    if (negotiable) {
      setSelectedWorkDays([]);
    }
  };

  // 최저시급 상수 수정 (2025년 기준)
  const MINIMUM_WAGE = 10030;

  // 시급 상태 추가
  const [displayWage, setDisplayWage] = useState<string>(formatMoney(MINIMUM_WAGE.toString()));

  // 컴포넌트 마운트 시 최저시급으로 초기화
  useEffect(() => {
    setValue("hourlyWage", MINIMUM_WAGE);
  }, [setValue]);

  // 시급 변경 핸들러 수정
  const handleWageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const numericValue = Number(value);

    // 최저시급 미만으로 설정 시도할 경우
    if (numericValue < MINIMUM_WAGE) {
      toast.error(`최저시급(${formatMoney(MINIMUM_WAGE.toString())}원) 이상을 입력해주세요.`);
      setDisplayWage(formatMoney(MINIMUM_WAGE.toString()));
      setValue("hourlyWage", MINIMUM_WAGE);
      return;
    }

    setValue("hourlyWage", numericValue);
    setDisplayWage(formatMoney(value));
  };

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  // 주소 변경 핸들러만 유지
  const handleAddressChange = useCallback(
    (fullAddress: string) => {
      setValue("location", fullAddress);
      trigger("location");
    },
    [setValue, trigger]
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
            startDateName="workStartDate"
            endDateName="workEndDate"
            startDate={workDateRange[0] || undefined}
            endDate={workDateRange[1] || undefined}
            onChange={handleWorkDateChange}
            required={true}
            errormessage={!workDateRange[0] || !workDateRange[1]}
            displayValue="workDateRange"
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
              setValue("workStartTime", e.target.value, { shouldDirty: true });
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
            (!errors.workEndDate && !workStartTime && !workEndTime && (
              <p className={cn(errorTextStyle, "")}>근무 시간을 선택해주세요.</p>
            ))}
        </div>

        {/* 요일 협의 가능하다면 근무요일은 선택하지 않아도 됨 */}
        <div className="flex flex-col gap-4">
          <Label>근무 요일</Label>
          <DayPickerList workDays={selectedWorkDays} onClick={handleClickDay} disabled={negotiable} />

          <div className="relative flex flex-col pl-[14px]">
            <CheckBtn
              label="요일 협의 가능"
              checked={watch("isNegotiableWorkDays")}
              {...register("isNegotiableWorkDays")}
            />
            {selectedWorkDays.length === 0 && !negotiable && (
              <p className={cn(errorTextStyle, "")}>근무 요일을 선택해주세요.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label>시급</Label>
          <BaseInput
            {...register("hourlyWage", {
              required: "시급을 작성해주세요.",
              min: {
                value: MINIMUM_WAGE,
                message: `최저시급(${formatMoney(MINIMUM_WAGE.toString())}원) 이상을 입력해주세요.`,
              },
            })}
            value={displayWage}
            onChange={handleWageChange}
            variant="white"
            afterString="원"
            errormessage={errors.hourlyWage?.message as string}
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
