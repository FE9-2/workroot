import React from "react";
import Button from "@/app/components/button/default/Button";
import { FcEmptyTrash, FcEditImage, FcFile, FcSearch } from "react-icons/fc";
import Link from "next/link";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { FormDetailResponse } from "@/types/response/form";

interface FormActionsProps {
  formId: string | number;
  albaFormDetailData: FormDetailResponse;
}

export default function FormActions({ formId, albaFormDetailData }: FormActionsProps) {
  const { user } = useUser();
  const isMyAlbaForm = user?.id === albaFormDetailData.ownerId;
  const isOwnerRole = user?.role === "OWNER";

  const buttonStyle = "h-10 lg:h-16";
  if (!user) return null;
  // 사장님이 아니면 지원하기/내 지원내역 보기 버튼
  if (!isOwnerRole) {
    return (
      <div className="space-y-4 text-2xl">
        <Button className={buttonStyle} width="lg" icon={<FcFile />}>
          지원하기
        </Button>
        <Button className={buttonStyle} width="lg" icon={<FcSearch />} variant="outlined">
          내 지원내역 보기
        </Button>
      </div>
    );
  }

  // 사장님이면 수정하기/삭제하기 버튼
  if (isOwnerRole) {
    if (!isMyAlbaForm) return null;
    return (
      <div className="space-y-4 text-2xl">
        <Link href={`/alba/${formId}/edit`}>
          <Button className={buttonStyle} width="lg" icon={<FcEditImage />}>
            수정하기
          </Button>
        </Link>
        <Button className={buttonStyle} width="lg" icon={<FcEmptyTrash />} variant="outlined">
          삭제하기
        </Button>
      </div>
    );
  }
}
