"use client";
import React from "react";
import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import { useMyApplication } from "@/hooks/queries/user/me/useMyApplication";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { formatDateTime } from "@/utils/formatters";

const STATUS_MAP = {
  INTERVIEW_PENDING: "면접 대기중",
  INTERVIEW_CONFIRMED: "면접 확정",
  INTERVIEW_REJECTED: "불합격",
  INTERVIEW_ACCEPTED: "합격",
} as const;

interface MyApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: number | string;
  className?: string;
}

export default function MyApplicationModal({ isOpen, onClose, formId, className }: MyApplicationModalProps) {
  const { data: myApplicationData, isLoading } = useMyApplication(formId);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="bg-black fixed inset-0 z-50 bg-opacity-50" onClick={handleOverlayClick} />

      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[375px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
          className
        )}
      >
        <div className="relative h-full">
          <div className="flex h-full flex-col items-center text-center lg:pt-8">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-block h-20 w-20 rounded-full bg-gray-200" />
              <h2 className="text-lg font-bold lg:text-xl">내 지원내역</h2>
            </div>

            <div className="w-full text-left">
              {isLoading ? (
                <div className="text-center">
                  <DotLoadingSpinner />
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplicationData ? (
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-grayscale-400">지원 상태</span>
                        <span className="text-primary-orange-500 font-medium">
                          {STATUS_MAP[myApplicationData.status as keyof typeof STATUS_MAP]}
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-grayscale-400">이름</span>
                        <span>{myApplicationData.name}</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-grayscale-400">연락처</span>
                        <span>{myApplicationData.phoneNumber}</span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-grayscale-400">경력</span>
                        <span>{myApplicationData.experienceMonths}개월</span>
                      </div>

                      <div className="space-y-2 border-b pb-2">
                        <p className="text-grayscale-400">자기소개</p>
                        <p className="whitespace-pre-wrap text-sm">{myApplicationData.introduction}</p>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-grayscale-400">지원일</span>
                        <span>{formatDateTime(myApplicationData.createdAt)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">지원 내역이 없습니다.</div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex w-full flex-col items-center">
              <Button
                onClick={onClose}
                className="h-[48px] w-[300px] text-base font-medium lg:h-[62px] lg:w-[360px] lg:text-lg"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
