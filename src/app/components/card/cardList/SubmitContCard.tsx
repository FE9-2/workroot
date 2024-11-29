"use client";
import { ApplicationResponse } from "@/types/response/application";
import React from "react";

interface SubmitContCardProps {
  submitContData: ApplicationResponse;
}

// 지원내용 카드 컴포넌트
const SubmitContCard = ({ submitContData }: SubmitContCardProps) => {
  return (
    <div className="rounded border p-4 shadow">
      <h2 className="text-lg font-bold">지원자 정보</h2>
      <p>
        <strong>이름:</strong> {submitContData.name}
      </p>
      <p>
        <strong>연락처:</strong> {submitContData.phoneNumber}
      </p>
      <p>
        <strong>경력:</strong> {submitContData.experienceMonths} 개월
      </p>
    </div>
  );
};

export default SubmitContCard;
