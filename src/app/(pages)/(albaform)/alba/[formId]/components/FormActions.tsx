import React from "react";
import Link from "next/link";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { FormDetailResponse } from "@/types/response/form";
import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { CiMemoPad } from "react-icons/ci";

interface FormActionsProps {
  formId: string | number;
  albaFormDetailData: FormDetailResponse;
}

export default function FormActions({ formId, albaFormDetailData }: FormActionsProps) {
  const { user } = useUser();
  const isMyAlbaForm = user?.id === albaFormDetailData.ownerId;
  const isOwnerRole = user?.role === "OWNER";

  const buttonStyle = "h-10 lg:h-16 w-full rounded-lg font-bold ";
  if (!user) return null;
  // 사장님이 아니면 지원하기/내 지원내역 보기 버튼
  if (!isOwnerRole) {
    return (
      <div className="space-y-4 text-2xl">
        <FloatingBtn className={buttonStyle} icon={<VscGitStashApply />}>
          지원하기
        </FloatingBtn>
        <FloatingBtn variant="white" className={buttonStyle} icon={<CiMemoPad />}>
          내 지원내역 보기
        </FloatingBtn>
      </div>
    );
  }

  // 사장님이면 수정하기/삭제하기 버튼
  if (isOwnerRole) {
    if (!isMyAlbaForm) return null;
    return (
      <div className="space-y-4 text-2xl">
        <Link href={`/alba/${formId}/edit`}>
          <FloatingBtn className={`${buttonStyle}`} icon={<FaEdit />}>
            수정하기
          </FloatingBtn>
        </Link>
        <FloatingBtn variant="white" className={buttonStyle} icon={<MdDeleteForever />}>
          삭제하기
        </FloatingBtn>
      </div>
    );
  }
}
