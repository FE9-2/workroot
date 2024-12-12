"use client";

import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { ConfirmFormModalProps } from "@/types/modal";
import DotLodingSpinner from "@/app/components/loading-spinner/DotLodingSpinner";

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
        "relative left-1/2 h-[330px] w-[375px] -translate-x-1/2 rounded-3xl bg-white pb-8 pt-4 shadow-lg md:h-[440px] md:w-[520px]",
        className
      )}
    >
      <div className="relative h-full">
        <form onSubmit={handleSubmit} className="flex h-full flex-col items-center text-center md:pt-8">
          <div className="flex items-center justify-center">
            <div className="relative h-20 w-20 md:h-[120px] md:w-[120px]">
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
          </div>
          <h2 className="mb-2 text-lg font-bold md:text-xl">알바폼을 삭제할까요?</h2>
          <p className="text-grayscale-600 mb-6 text-sm md:text-base">삭제 후 정보를 복구할 수 없어요.</p>

          <div className="mt-auto flex w-full flex-col items-center gap-3">
            <Button
              type="submit"
              disabled={isDeleting}
              className="h-[48px] w-[300px] text-base font-medium md:h-[62px] md:w-[360px] md:text-lg"
            >
              {isDeleting ? <DotLodingSpinner /> : "삭제하기"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              disabled={isDeleting}
              className="h-[48px] w-[300px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white md:h-[62px] md:w-[360px] md:text-lg"
            >
              다음에 할께요
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteFormModal;
