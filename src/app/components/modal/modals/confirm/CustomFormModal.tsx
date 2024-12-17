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
  closeOnOverlayClick = true,
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onCancel?.();
    }
  };

  return (
    <>
      <div className="bg-black fixed inset-0 z-50 bg-opacity-50" onClick={handleOverlayClick} />

      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[375px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
          className
        )}
      >
        <div className="relative h-full">
          <div className="flex h-full flex-col items-center text-center lg:pt-8">
            <div className="flex items-center justify-center">
              <div className="relative mb-6 h-20 w-20 lg:h-[120px] lg:w-[120px]">
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
            <h2 className="mb-2 text-lg font-bold lg:text-xl">{title}</h2>
            <p className="text-grayscale-600 mb-6 whitespace-pre-line text-sm lg:text-base">{content}</p>

            <div className="mt-auto flex w-full flex-col items-center gap-3">
              <Button
                onClick={handleConfirm}
                className="h-[48px] w-[300px] text-base font-medium lg:h-[62px] lg:w-[360px] lg:text-lg"
              >
                {confirmText}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                className="h-[48px] w-[300px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white lg:h-[62px] lg:w-[360px] lg:text-lg"
              >
                {cancelText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFormModal;
