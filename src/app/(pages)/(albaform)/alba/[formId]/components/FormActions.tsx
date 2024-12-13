"use client";
import React, { useState } from "react"; // useState 추가
import Link from "next/link";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { FormDetailResponse } from "@/types/response/form";
import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { CiMemoPad } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";

interface FormActionsProps {
  formId: string | number;
  albaFormDetailData: FormDetailResponse;
}

export default function FormActions({ formId, albaFormDetailData }: FormActionsProps) {
  const { user } = useUser();
  const router = useRouter();
  const isMyAlbaForm = user?.id === albaFormDetailData.ownerId;
  const isOwnerRole = user?.role === "OWNER";

  const buttonStyle = "h-10 lg:h-16 w-full rounded-lg font-bold ";
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/forms/${formId}`);
      toast.success("성공적으로 삭제되었습니다.");
      router.push(`/albalist`);
    } catch (error) {
      console.error(error);
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 사장님이면 수정하기/삭제하기 버튼
  if (isOwnerRole) {
    if (!isMyAlbaForm) return null;
    return (
      <div className="space-y-4 text-2xl">
        <Link href={`/alba/${formId}/edit`}>
          <FloatingBtn className={`${buttonStyle}`} icon={<FaEdit />} disabled={loading}>
            수정하기
          </FloatingBtn>
        </Link>
        <FloatingBtn
          variant="white"
          className={buttonStyle}
          icon={<MdDeleteForever />}
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <DotLoadingSpinner /> : "삭제하기"}
        </FloatingBtn>
      </div>
    );
  }

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
}
