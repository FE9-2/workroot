import { useState } from "react";
import { cn } from "@/lib/tailwindUtil";
import RadioBtn from "@/app/components/button/default/RadioBtn";
import RadioGroup from "@/app/components/button/default/RadioGroup";
import Button from "@/app/components/button/default/Button";
import { positionOptions } from "@/constants/positionOptions";
import axios from "axios";
import toast from "react-hot-toast";
import type { ConfirmFormModalProps } from "@/types/modal";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { APPLICATION_STATUS, ApplicationStatusType } from "@/types/applicationStatus";

const SelectProgressModal = ({ id, isOpen, onClose, className }: ConfirmFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ApplicationStatusType>(APPLICATION_STATUS.INTERVIEW_PENDING);

  if (!isOpen) return null;

  const radioOptions = [
    { id: "rejected", value: APPLICATION_STATUS.REJECTED, label: "거절" },
    { id: "interviewPending", value: APPLICATION_STATUS.INTERVIEW_PENDING, label: "면접대기" },
    { id: "interviewCompleted", value: APPLICATION_STATUS.INTERVIEW_COMPLETED, label: "면접 완료" },
    { id: "hired", value: APPLICATION_STATUS.HIRED, label: "채용 완료" },
  ] as const;

  const handleValueChange = (value: ApplicationStatusType) => {
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
      <div className={cn("w-[375px] rounded-3xl bg-white p-6 shadow-lg lg:w-[440px] lg:p-10", className)}>
        <form onSubmit={handleSubmit} className="flex h-full flex-col items-center">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-bold lg:mb-3 lg:text-2xl">진행상태 선택</h2>
            <p className="text-muted-foreground mb-6 text-sm lg:mb-8 lg:text-base">현재 진행상태를 알려주세요.</p>
          </div>
          <div className="h-auto w-full">
            <RadioGroup value={selectedValue} onValueChange={handleValueChange} className="space-y-3">
              {radioOptions.map((option) => (
                <RadioBtn
                  key={option.id}
                  label={option.label}
                  name="progress-status"
                  value={option.value}
                  id={option.id}
                  position={positionOptions.POSITION_RIGHT}
                  className="text-sm lg:text-base"
                  disabled={isSubmitting}
                />
              ))}
            </RadioGroup>
          </div>
          <div className="mt-[30px] flex w-full justify-between lg:w-[360px]">
            <Button
              type="button"
              onClick={handleCancel}
              color="gray"
              disabled={isSubmitting}
              className="h-[58px] w-[158px] text-base font-medium text-white lg:h-[72px] lg:w-[176px] lg:text-lg"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-[58px] w-[158px] text-base font-medium lg:h-[72px] lg:w-[176px] lg:text-lg"
            >
              {isSubmitting ? <DotLoadingSpinner /> : "선택하기"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectProgressModal;
