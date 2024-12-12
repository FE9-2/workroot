import React from "react";
import Button from "@/app/components/button/default/Button";
import { FcEmptyTrash } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";

interface FormActionsProps {
  isOwner: boolean;
}

export default function FormActions({ isOwner }: FormActionsProps) {
  return (
    <div className="space-y-4 text-2xl">
      <Button className="h-10 sm:h-12 md:h-16" width="lg" icon={isOwner ? <FcEditImage /> : <FcFile />}>
        {isOwner ? "수정하기" : "지원하기"}
      </Button>
      <Button
        className="h-10 sm:h-12 md:h-16"
        width="lg"
        icon={isOwner ? <FcEmptyTrash /> : <FcSearch />}
        variant="outlined"
      >
        {isOwner ? "삭제하기" : "내 지원내역 보기"}
      </Button>
    </div>
  );
}
