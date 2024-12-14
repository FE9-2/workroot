"use client";

import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { ConfirmFormModalProps } from "@/types/modal";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";

const DeleteFormModal = ({ id, isOpen, onClose, onConfirm, className }: ConfirmFormModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await axios.delete(`/api/forms/${id}`);
      toast.success("알바폼이 삭제되었습니다.");
      onConfirm?.();
      onClose?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errormessage = error.response?.data?.message || "알바폼 삭제에 실패했습니다.";
        toast.error(errormessage);
      } else {
        toast.error("알바폼 삭제 중 오류가 발생했습니다.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative left-1/2 w-[375px] -translate-x-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
        className
      )}
    >
      <div className="relative h-full">
        <form onSubmit={handleSubmit} className="flex h-full flex-col items-center text-center lg:pt-8">
          <div className="relative mb-6 h-20 w-20 items-center justify-center lg:h-[120px] lg:w-[120px]">
            <Image
              src="/images/modal/warning-orange-sm.svg"
              alt="warning"
              width={80}
              height={80}
              className="block sm:hidden"
            />
            <Image
              src="/images/modal/warning-orange-md.svg"
              alt="warning"
              width={120}
              height={120}
              className="hidden sm:block"
            />
          </div>
          <h2 className="mb-2 text-lg font-bold lg:text-xl">알바폼을 삭제할까요?</h2>
          <p className="text-grayscale-600 mb-6 text-sm lg:text-base">삭제 후 정보를 복구할 수 없어요.</p>

          <div className="mt-auto flex w-full flex-col items-center gap-3">
            <Button
              type="submit"
              disabled={isDeleting}
              className="h-[48px] w-[300px] text-base font-medium lg:h-[62px] lg:w-[360px] lg:text-lg"
            >
              {isDeleting ? <DotLoadingSpinner /> : "삭제하기"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              disabled={isDeleting}
              className="h-[48px] w-[300px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white lg:h-[62px] lg:w-[360px] lg:text-lg"
            >
              다음에 할게요
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteFormModal;
