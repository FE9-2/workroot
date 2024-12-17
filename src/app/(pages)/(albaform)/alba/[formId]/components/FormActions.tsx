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

interface FormActionsProps {
  formId: string | number;
  albaFormDetailData: FormDetailResponse;
}

export default function FormActions({ formId, albaFormDetailData }: FormActionsProps) {
  const { user } = useUser();
  const { data: myApplication, isLoading: isApplicationLoading } = useMyApplication(formId);
  const { openModal } = useModalStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isMyAlbaForm = user?.id === albaFormDetailData.ownerId;
  const isOwnerRole = user?.role === "OWNER";
  const buttonStyle = "h-10 lg:h-16 w-full rounded-lg font-bold mb-4";

  if (!user) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/forms/${formId}`);
      toast.success("성공적으로 삭제되었습니다.");
      router.push(`/alba-list`);
    } catch (error) {
      console.error(error);
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 사장님이면 수정하기/삭제하기 버튼
  if (isOwnerRole) {
    if (!isMyAlbaForm) return null;
    return (
      <div className="space-y-4 text-2xl">
        <Link href={`/alba/${formId}/edit`}>
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
    <div className="space-y-4 text-2xl">
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
            onClick={() => openModal("myApplication", { formId })}
            disabled={!myApplication}
          >
            {myApplication ? "내 지원내역 보기" : "지원 내역 없음"}
          </FloatingBtn>
        </>
      )}
    </div>
  );
}
