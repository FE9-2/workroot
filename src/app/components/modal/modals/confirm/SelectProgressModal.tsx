import { useState } from "react";
import { cn } from "@/lib/tailwindUtil";
import RadioBtn from "@/app/components/button/default/RadioBtn";
import RadioGroup from "@/app/components/button/default/RadioGroup";
import Button from "@/app/components/button/default/Button";
import { ApplicationStatus, applicationStatus } from "@/types/application";
import { positionOptions } from "@/constants/positionOptions";
import axios from "axios";
import toast from "react-hot-toast";

interface ProgressStatusProps {
  applicationId: string;
  initialStatus?: ApplicationStatus;
  onClose: () => void;
  className?: string;
}

export default function ProgressStatus({ applicationId, initialStatus, onClose, className }: ProgressStatusProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ApplicationStatus>(
    initialStatus || applicationStatus.INTERVIEW_PENDING
  );

  const radioOptions = [
    { id: "rejected", value: applicationStatus.REJECTED, label: "거절" },
    { id: "interviewPending", value: applicationStatus.INTERVIEW_PENDING, label: "면접대기" },
    { id: "interviewCompleted", value: applicationStatus.INTERVIEW_COMPLETED, label: "면접 완료" },
    { id: "hired", value: applicationStatus.HIRED, label: "채용 완료" },
  ] as const;

  const handleValueChange = (value: ApplicationStatus) => {
    setSelectedValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/applications/${applicationId}`, {
        status: selectedValue,
      });

      toast.success("진행상태가 변경되었습니다.");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "진행상태 변경에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("진행상태 변경 중 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("h-[454px] w-[375px] rounded-3xl bg-white p-4 shadow-lg md:h-[566px] md:w-[440px]", className)}>
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
              onClick={onClose}
              color="gray"
              disabled={isSubmitting}
              className="h-[58px] w-full text-sm font-medium hover:bg-gray-200 md:h-[72px] md:text-base"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-[58px] w-full text-sm font-medium md:h-[72px] md:text-base"
            >
              {isSubmitting ? "변경 중..." : "선택하기"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
