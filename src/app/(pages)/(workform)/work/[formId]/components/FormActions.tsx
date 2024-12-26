"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { FormDetailResponse } from "@/types/response/form";
import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { HiMail, HiDocumentText } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import useModalStore from "@/store/modalStore";
import { useMyApplication } from "@/hooks/queries/user/me/useMyApplication";
import { useQueryClient } from "@tanstack/react-query";
interface FormActionsProps {
  formId: string | number;
  albaFormDetailData: FormDetailResponse;
}

export default function FormActions({ formId, albaFormDetailData }: FormActionsProps) {
  const { user } = useUser();
  // user가 있을 때만 useMyApplication 실행
  const { data: myApplication, isLoading: isApplicationLoading } = useMyApplication(formId);
  const { openModal } = useModalStore();
  const router = useRouter();

  const isMyAlbaForm = user?.id === albaFormDetailData.ownerId;
  const isOwnerRole = user?.role === "OWNER";
  const buttonStyle = "h-10 lg:h-16 w-full rounded-lg font-bold lg:mb-4";
  const buttonWrapStyle = "flex flex-col gap-2 text-2xl lg:gap-0";

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/forms/${formId}`);
      toast.success("성공적으로 삭제되었습니다.");
      router.push(`/work-list`);
      await queryClient.invalidateQueries({ queryKey: ["forms", { limit: 10 }] });
      await queryClient.invalidateQueries({
        queryKey: ["myForms", { isPublic: true, isRecruiting: true, limit: 10 }],
      });
    } catch (error) {
      console.error(error);
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 비회원 지원내역 조회 제출 핸들러
  const handleVerifySuccess = async (data: { password: string; phoneNumber: string; name: string }) => {
    try {
      const { closeModal, openModal } = useModalStore.getState();

      setTimeout(() => {
        openModal("myApplication", {
          formId,
          isOpen: true,
          verifyData: data,
        });
      }, 100);

      // 이전 모달이 완전히 닫힌 후 새 모달 열기
      openModal("myApplication", {
        formId,
        isOpen: true,
        verifyData: data,
      });
    } catch (error) {
      toast.error("지원 내역을 찾을 수 없습니다.");
    }
  };

  // 비회원일 때
  if (!user) {
    return (
      <div className={buttonWrapStyle}>
        <div>
          <Link href={`/apply/${formId}`}>
            <FloatingBtn className={`${buttonStyle}`} icon={<HiMail />}>
              지원하기
            </FloatingBtn>
          </Link>
          <FloatingBtn
            variant="white"
            className={buttonStyle}
            icon={<HiDocumentText />}
            onClick={() =>
              openModal("verifyMyApplication", {
                formId,
                isOpen: true,
                onVerify: handleVerifySuccess,
              })
            }
          >
            내 지원내역 조회
          </FloatingBtn>
        </div>
      </div>
    );
  }

  // 사장님이면 수정하기/삭제하기 버튼
  if (isOwnerRole) {
    if (!isMyAlbaForm) return null;
    return (
      <div className={buttonWrapStyle}>
        <Link href={`/work/${formId}/edit`}>
          <FloatingBtn className={buttonStyle} icon={<FaEdit />} disabled={isLoading}>
            {isLoading ? <DotLoadingSpinner /> : "수정하기"}
          </FloatingBtn>
        </Link>
        <FloatingBtn
          variant="white"
          className={buttonStyle}
          icon={<MdDeleteForever />}
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? <DotLoadingSpinner /> : "삭제하기"}
        </FloatingBtn>
      </div>
    );
  }

  // 사장님이 아니면 지원하기/내 지원내역 보기 버튼
  return (
    <div className={buttonWrapStyle}>
      {isApplicationLoading ? (
        <>
          <FloatingBtn className={`${buttonStyle}`} variant="white">
            <DotLoadingSpinner />
          </FloatingBtn>
          <FloatingBtn className={`${buttonStyle} `} variant="white">
            <DotLoadingSpinner />
          </FloatingBtn>
        </>
      ) : (
        <>
          {myApplication ? (
            <FloatingBtn className={`${buttonStyle}`} icon={<HiMail />} disabled>
              이미 지원한 공고
            </FloatingBtn>
          ) : (
            <Link href={`/apply/${formId}`}>
              <FloatingBtn className={`${buttonStyle}`} icon={<HiMail />}>
                지원하기
              </FloatingBtn>
            </Link>
          )}
          <FloatingBtn
            variant="white"
            className={buttonStyle}
            icon={<HiDocumentText />}
            onClick={() =>
              openModal("myApplication", {
                formId,
                isOpen: true,
              })
            }
            disabled={!myApplication}
          >
            {myApplication ? "내 지원내역 보기" : "지원 내역 없음"}
          </FloatingBtn>
        </>
      )}
    </div>
  );
}
