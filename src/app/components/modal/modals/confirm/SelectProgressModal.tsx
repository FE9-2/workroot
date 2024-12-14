import { useState } from "react";
import { cn } from "@/lib/tailwindUtil";
import RadioBtn from "@/app/components/button/default/RadioBtn";
import RadioGroup from "@/app/components/button/default/RadioGroup";
import Button from "@/app/components/button/default/Button";
import { ApplyStatus, applicationStatus } from "@/types/application";
import { positionOptions } from "@/constants/positionOptions";
import axios from "axios";
import toast from "react-hot-toast";
import type { ConfirmFormModalProps } from "@/types/modal";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";

const SelectProgressModal = ({ id, isOpen, onClose, className }: ConfirmFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ApplyStatus>(applicationStatus.INTERVIEW_PENDING);

  if (!isOpen) return null;

  const radioOptions = [
    { id: "rejected", value: applicationStatus.REJECTED, label: "거절" },
    { id: "interviewPending", value: applicationStatus.INTERVIEW_PENDING, label: "면접대기" },
    { id: "interviewCompleted", value: applicationStatus.INTERVIEW_COMPLETED, label: "면접 완료" },
    { id: "hired", value: applicationStatus.HIRED, label: "채용 완료" },
  ] as const;

  const handleValueChange = (value: ApplyStatus) => {
    setSelectedValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/applications/${id}`, {
        status: selectedValue,
      });

      toast.success("진행상태가 변경되었습니다.");
      onClose?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errormessage = error.response?.data?.message || "진행상태 변경에 실패했습니다.";
        toast.error(errormessage);
      } else {
        toast.error("진행상태 변경 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="bg-black fixed inset-0 z-50 bg-opacity-50" onClick={onClose} />
      <div
        className={cn("h-[454px] w-[375px] rounded-3xl bg-white p-4 shadow-lg md:h-[566px] md:w-[440px]", className)}
      >
        <form onSubmit={handleSubmit} className="flex h-full flex-col items-center">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-bold md:mb-3 md:text-2xl">진행상태 선택</h2>
            <p className="text-muted-foreground mb-6 text-sm md:mb-8 md:text-base">현재 진행상태를 알려주세요.</p>
          </div>
          <div className="h-auto w-full md:h-[264px] md:w-[360px]">
            <RadioGroup value={selectedValue} onValueChange={handleValueChange} className="space-y-3">
              {radioOptions.map((option) => (
                <RadioBtn
                  key={option.id}
                  label={option.label}
                  name="progress-status"
                  value={option.value}
                  id={option.id}
                  position={positionOptions.POSITION_RIGHT}
                  className="text-sm md:text-base"
                  disabled={isSubmitting}
                />
              ))}
            </RadioGroup>
          </div>
          <div className="mt-auto w-full md:w-[360px]">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                onClick={handleCancel}
                color="gray"
                disabled={isSubmitting}
                width="sm"
                className="h-[48px] text-base font-medium md:h-[62px] md:text-lg"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                width="sm"
                className="h-[48px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white md:h-[62px] md:text-lg"
              >
                {isSubmitting ? <DotLoadingSpinner /> : "선택하기"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectProgressModal;
