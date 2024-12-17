"use client";
import React from "react";
import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import { useMyApplication } from "@/hooks/queries/user/me/useMyApplication";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { formatDateTime } from "@/utils/formatters";
import { InfoRowProps, MyApplicationModalProps } from "@/types/response/application";
import { getStatusMap } from "@/utils/translateStatus";
import { useResumeDownLoad } from "@/hooks/useResumeDownLoad";

const InfoRow = ({ label, value, isIntroduction }: InfoRowProps) => {
  if (isIntroduction) {
    return (
      <div className="space-y-2 border-b pb-2">
        <p className="text-grayscale-400">{label}</p>
        <div className="h-[100px] overflow-y-auto whitespace-pre-wrap rounded-md border border-orange-400 p-2 text-sm">
          {value}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-grayscale-400">{label}</span>
      <span className={label === "지원 상태" ? "text-primary-orange-500 font-medium" : ""}>{value}</span>
    </div>
  );
};

const ModalHeader = () => {
  return (
    <header className="mb-6 text-center">
      <figure className="mb-4 inline-block h-20 w-20 rounded-full bg-gray-200" />
      <h2 className="text-lg font-bold lg:text-xl">내 지원내역</h2>
    </header>
  );
};

const ApplicationContent = ({ myApplicationData }: { myApplicationData: any }) => {
  return (
    <div className="space-y-4">
      <InfoRow label="지원 상태" value={getStatusMap(myApplicationData.status)} />
      <InfoRow label="이름" value={myApplicationData.name} />
      <InfoRow label="연락처" value={myApplicationData.phoneNumber} />
      <InfoRow label="경력" value={`${myApplicationData.experienceMonths}개월`} />
      <InfoRow label="자기소개" value={myApplicationData.introduction} isIntroduction />
      <InfoRow label="지원일" value={formatDateTime(myApplicationData.createdAt)} />
    </div>
  );
};

export default function MyApplicationModal({ isOpen, onClose, formId, className }: MyApplicationModalProps) {
  const { data: myApplicationData, isLoading } = useMyApplication(formId);
  const { downloadResume } = useResumeDownLoad();

  const handleResumeDownload = () => {
    if (myApplicationData?.resumeId && myApplicationData?.resumeName) {
      downloadResume({
        resumeId: myApplicationData.resumeId,
        resumeName: myApplicationData.resumeName,
      });
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="bg-black fixed inset-0 z-50 bg-opacity-50" onClick={handleOverlayClick} />
      <article
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[375px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
          className
        )}
      >
        <section className="relative h-full">
          <main className="flex h-full flex-col items-center text-center lg:pt-8">
            <ModalHeader />
            <div className="w-full text-left">
              {isLoading ? (
                <div className="text-center">
                  <DotLoadingSpinner />
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplicationData ? (
                    <ApplicationContent myApplicationData={myApplicationData} />
                  ) : (
                    <div className="text-center">지원 내역이 없습니다.</div>
                  )}
                </div>
              )}
            </div>

            <footer className="mt-8 flex w-full flex-col items-center">
              <Button
                onClick={onClose}
                className="h-[48px] w-[300px] text-base font-medium lg:h-[62px] lg:w-[360px] lg:text-lg"
              >
                확인
              </Button>
            </footer>
          </main>
        </section>
      </article>
    </>
  );
}
