import React from "react";
import Chip from "@/app/components/chip/Chip";
import { FormDetailResponse } from "@/types/response/form";

interface FormHeaderProps {
  albaFormDetailData: FormDetailResponse;
}

export default function FormHeader({ albaFormDetailData }: FormHeaderProps) {
  const recruitmentStatus = new Date(albaFormDetailData.recruitmentEndDate) > new Date() ? "모집중" : "모집완료";
  return (
    <div className="flex items-center">
      <Chip
        label={albaFormDetailData.isPublic ? "공개" : "비공개"}
        variant={albaFormDetailData.isPublic ? "positive" : "negative"}
      />
      <Chip label={recruitmentStatus} variant="positive" />
      <p className="ml-2 text-lg text-grayscale-500">{new Date(albaFormDetailData.createdAt).toLocaleString()} 등록</p>
    </div>
  );
}
