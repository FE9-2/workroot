import { FormDetailResponse } from "@/types/response/form";
import React from "react";
import toast from "react-hot-toast";

interface FormDetailsProps {
  albaFormDetailData: FormDetailResponse;
}

export default function FormDetails({ albaFormDetailData }: FormDetailsProps) {
  const handleCopyLocation = () => {
    navigator.clipboard.writeText(albaFormDetailData.location);
    toast.success("근무지역이 복사되었습니다.");
  };

  return (
    <>
      <div className="mb-4 flex items-end gap-4">
        <span className="min-w-[120px] text-lg text-black-400 underline lg:text-2xl">
          {albaFormDetailData.storeName || "가게명"}
        </span>
        <span className="text-md text-grayscale-500 lg:text-lg">{albaFormDetailData.location || "위치"}</span>
      </div>
      <p className="text-2xl font-bold">{albaFormDetailData.title}</p>
      <div className="space-y-10">
        <div className="whitespace-pre-wrap text-lg lg:text-xl">{albaFormDetailData.description}</div>
        <p className="text-2xl font-bold">근무 지역</p>
      </div>
      <div className="flex space-x-5 text-xl">
        <p>{albaFormDetailData.location}</p>
        <button type="button" className="w-[60px] text-xl text-primary-orange-300" onClick={handleCopyLocation}>
          복사
        </button>
      </div>
    </>
  );
}
