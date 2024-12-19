"use client";
import { cn } from "@/lib/tailwindUtil";
import BaseInput from "@/app/components/input/text/BaseInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import Button from "@/app/components/button/default/Button";
import { VerifyApplicationModalProps } from "@/types/modal";
import { useState } from "react";
import toast from "react-hot-toast";

const verifyApplicationSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(/^[0-9]{10,11}$/, "올바른 전화번호 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type VerifyFormData = z.infer<typeof verifyApplicationSchema>;

const defaultFields = [
  {
    name: "name" as const,
    label: "이름",
    placeholder: "지원 시 입력한 이름을 입력해주세요.",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "phoneNumber" as const,
    label: "전화번호",
    placeholder: "- 없이 입력해주세요.",
    type: "text",
    autoComplete: "tel",
  },
  {
    name: "password" as const,
    label: "비밀번호",
    placeholder: "지원 시 입력한 비밀번호를 입력해주세요.",
    type: "password",
    autoComplete: "current-password",
  },
] as const;

const VerifyApplicationModal = ({ isOpen, onClose, onVerify, className }: VerifyApplicationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifyApplicationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
    },
  });

  if (!isOpen) return null;

  const onSubmitHandler = async (data: VerifyFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onVerify(data);
      reset();
      onClose?.(); // optional chaining 사용
    } catch (error) {
      toast.error("지원내역 조회에 실패했습니다.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose?.(); // optional chaining 사용
  };

  return (
    <div
      className={cn(
        "relative left-1/2 w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-6 shadow-lg lg:w-[720px] lg:p-10",
        className
      )}
    >
      <div className="mb-8 h-[46px] text-center text-xl font-semibold lg:mb-12 lg:text-2xl">지원내역 조회</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 lg:space-y-6">
        {defaultFields.map((field) => (
          <div key={field.name} className="h-[88px] space-y-1.5 lg:h-[114px] lg:space-y-2">
            <label className="text-grayscale-700 block text-sm font-semibold lg:px-2 lg:text-base">{field.label}</label>
            <div className="flex w-full flex-col items-center">
              <BaseInput
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                variant="white"
                disabled={isSubmitting}
                size="w-[327px] h-[54px] lg:w-[640px] lg:h-[64px]"
                errormessage={errors[field.name]?.message}
                innerClassName="placeholder:text-sm placeholder:leading-[26px] font-normal text-sm leading-[26px]"
                autoComplete={field.autoComplete}
              />
            </div>
          </div>
        ))}

        <div className="mt-4 flex h-[58px] gap-3 lg:mt-6 lg:h-[72px]">
          <Button
            type="button"
            color="lime"
            variant="outlined"
            onClick={handleClose}
            disabled={isSubmitting}
            className="h-full text-base font-medium lg:text-lg"
          >
            취소
          </Button>
          <Button
            type="submit"
            color="lime"
            variant="solid"
            disabled={isSubmitting}
            className="h-full text-base font-medium lg:text-lg"
          >
            {isSubmitting ? <DotLoadingSpinner /> : "확인"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyApplicationModal;
