"use client";

import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import Image from "next/image";
import type { CustomFormModalProps } from "@/types/modal";

const CustomFormModal = ({
  isOpen,
  title,
  content,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  className,
}: CustomFormModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    onConfirm?.();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    onCancel?.();
  };

  return (
    <div
      className={cn(
        "relative left-1/2 h-[330px] w-[375px] -translate-x-1/2 rounded-3xl bg-white pb-8 pt-4 shadow-lg md:h-[440px] md:w-[520px]",
        className
      )}
    >
      <div className="relative h-full">
        <div className="flex h-full flex-col items-center text-center md:pt-8">
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
          <h2 className="mb-2 text-lg font-bold md:text-xl">{title}</h2>
          <p className="text-grayscale-600 mb-6 text-sm md:text-base">{content}</p>

          <div className="mt-auto flex w-full flex-col items-center gap-3">
            <Button
              type="button"
              onClick={handleConfirm}
              className="h-[48px] w-[300px] text-base font-medium md:h-[62px] md:w-[360px] md:text-lg"
            >
              {confirmText}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              className="h-[48px] w-[300px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white md:h-[62px] md:w-[360px] md:text-lg"
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFormModal;
