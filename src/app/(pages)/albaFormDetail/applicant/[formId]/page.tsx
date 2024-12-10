"use client";

import { useParams } from "next/navigation";
import { useUserFormDetail } from "@/hooks/queries/form/userFormDetail";
import React, { useEffect, useState } from "react";
import CardChipIcon from "@/app/components/card/cardList/CardChipIcon";
import Chip from "@/app/components/chip/Chip";

export default function AlbaFormDetailPage() {
  const { formId } = useParams(); // useParams로 formId 추출
  const [formIdState, setFormIdState] = useState<number>(0);

  useEffect(() => {
    // formId가 문자열로 전달되므로 숫자로 변환하여 상태에 저장
    if (formId) {
      setFormIdState(Number(formId)); // formId를 숫자로 변환하여 상태에 저장
    }
  }, [formId]);

  // formId가 설정되면 useUserFormDetail 호출
  const { data, isLoading, error } = useUserFormDetail({ formId: formIdState });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 데이터를 불러오는데 문제가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  // 모집 상태 계산
  const recruitmentStatus = new Date(data.recruitmentEndDate) > new Date() ? "모집중" : "모집완료";

  return (
    <div className="container flex min-h-screen flex-col">
      <div className="h-[562px] bg-black-100">사진영역</div>
      <div>
        <div className="mt-20 w-[770px] space-y-10">
          <div className="flex items-center">
            <Chip label={data.isPublic ? "공개" : "비공개"} variant={data.isPublic ? "positive" : "negative"} />
            <Chip label={recruitmentStatus} variant="positive" />
            <p className="text-sm text-grayscale-500">{new Date(data.createdAt).toLocaleString()} 등록</p>
          </div>
          <div className="mb-4 flex gap-4">
            <span className="text-base text-black-400 underline">{data.storeName || "가게명"}</span>
            <span className="text-grayscale-500">
              {data.location || "위치"} ・ {"경력 정보 없음"}
            </span>
          </div>
          <p className="text-3xl font-bold">{data.title}</p>
          <CardChipIcon
            formData={{
              updatedAt: new Date(data.updatedAt),
              createdAt: new Date(data.createdAt),
              isPublic: data.isPublic,
              scrapCount: data.scrapCount,
              applyCount: data.applyCount,
              imageUrls: data.imageUrls,
              recruitmentEndDate: new Date(data.recruitmentEndDate),
              recruitmentStartDate: new Date(data.recruitmentStartDate),
              title: data.title,
              id: data.id,
            }}
          />
          <div className="text-2xl">{data.description}</div>
        </div>
      </div>
    </div>
  );
}
