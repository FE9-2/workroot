"use client";
import React from "react";
import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import { useMyApplication } from "@/hooks/queries/user/me/useMyApplication";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { formatDateTime } from "@/utils/formatters";
import { InfoRowProps, ResumeDownloadProps, ApplicationResponse } from "@/types/response/application";
import { MyApplicationModalProps } from "@/types/modal";
import { getStatusMap } from "@/utils/translateStatus";
import { useResumeDownLoad } from "@/hooks/useResumeDownLoad";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useGuestApplication } from "@/hooks/queries/user/me/useGuestApplication";
import Chip from "@/app/components/chip/Chip";
import { FaCheckCircle } from "react-icons/fa";

const ModalOverlay = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <div className="bg-black fixed inset-0 z-50 bg-opacity-50" role="presentation">
    <button type="button" onClick={onClick} className="h-full w-full" aria-label="Close modal" />
  </div>
);
const InfoRow = ({ label, value, isIntroduction }: InfoRowProps) => {
  if (isIntroduction) {
    return (
      <div className="space-y-2 border-b pb-2">
        <p className="text-grayscale-400">{label}</p>
        <div className="scrollbar-custom h-[100px] overflow-y-auto whitespace-pre-wrap rounded-md border border-grayscale-400 p-2 text-sm">
          {value}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-grayscale-400">{label}</span>
      <span className={label === "지원 상태" ? "font-medium text-primary-orange-500" : ""}>{value}</span>
    </div>
  );
};

const ModalHeader = () => {
  return (
    <header className="mb-6 text-center">
      <Image
        src="/images/applicant.png"
        width={50}
        height={50}
        className="mb-4 inline-block h-20 w-20 rounded-full bg-gray-200"
        alt="지원자"
      />
      <h2 className="text-lg font-bold lg:text-xl">내 지원내역</h2>
    </header>
  );
};

const ResumeDownloadButton = ({ resumeId, resumeName }: ResumeDownloadProps) => {
  const { downloadResume, downloading } = useResumeDownLoad();

  const handleResumeDownload = () => {
    downloadResume({ resumeId, resumeName });
  };

  return (
    <div className="flex w-full items-center justify-between border-b pb-2">
      <span className="text-grayscale-400">이력서 다운로드</span>
      <button onClick={handleResumeDownload} className="transition-colors hover:text-primary-orange-500">
        {downloading ? <FaCheckCircle className="text-2xl" /> : <FiDownload className="text-2xl" />}
      </button>
    </div>
  );
};

const ApplicationContent = ({
  status,
  name,
  phoneNumber,
  experienceMonths,
  resumeId,
  resumeName,
  introduction,
  createdAt,
}: ApplicationResponse) => {
  return (
    <div className="space-y-4">
      <Chip label={getStatusMap(status)} variant="positive" />
      <InfoRow label="지원 상태" value={getStatusMap(status)} />
      <InfoRow label="이름" value={name} />
      <InfoRow label="연락처" value={phoneNumber} />
      <InfoRow label="경력" value={`${experienceMonths}개월`} />
      {resumeName && (
        <>
          <InfoRow label="이력서" value="제출됨" />
          <ResumeDownloadButton resumeId={resumeId} resumeName={resumeName} />
        </>
      )}
      <InfoRow label="자기소개" value={introduction} isIntroduction />
      <InfoRow label="지원일" value={formatDateTime(createdAt)} />
    </div>
  );
};

export default function MyApplicationModal({
  isOpen,
  onClose,
  formId,
  className,
  verifyData,
  initialData,
}: MyApplicationModalProps) {
  const { user } = useUser();

  // 회원/비회원에 따라 다른 훅 사용
  const { data: memberApplicationData, isLoading: isMemberLoading } = useMyApplication(formId);

  const { data: guestApplicationData, isLoading: isGuestLoading } = useGuestApplication(
    formId,
    !user ? verifyData : undefined // user가 없을 때만 실행
  );

  // initialData가 있으면 API 호출 없이 바로 사용
  const myApplicationData = initialData || (user ? memberApplicationData : guestApplicationData);
  const isLoading = !initialData && (user ? isMemberLoading : isGuestLoading);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      <ModalOverlay onClick={handleOverlayClick} />
      <article
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[375px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
          className
        )}
      >
        <section className="scrollbar-custom relative h-full">
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
                    <ApplicationContent {...myApplicationData} />
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
