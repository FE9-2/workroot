import { useState } from "react";
import { cn } from "@/lib/tailwindUtil";
import RadioBtn from "@/app/components/button/RadioBtn";
import RadioGroup from "@/app/components/button/RadioGroup";
import Button from "@/app/components/button/Button";
import { ApplicationStatus, applicationStatus } from "@/types/application";
import { positionOptions } from "@/constants/positionOptions";

interface ProgressStatusProps {
  onSelect: (value: ApplicationStatus) => void;
  onClose: () => void;
  className?: string;
}

export default function ProgressStatus({ onSelect, onClose, className }: ProgressStatusProps) {
  const [selectedValue, setSelectedValue] = useState<ApplicationStatus>(applicationStatus.INTERVIEW_PENDING);

  const radioOptions = [
    { id: "rejected", value: applicationStatus.REJECTED, label: "거절" },
    { id: "interviewPending", value: applicationStatus.INTERVIEW_PENDING, label: "면접대기" },
    { id: "interviewCompleted", value: applicationStatus.INTERVIEW_COMPLETED, label: "면접 완료" },
    { id: "hired", value: applicationStatus.HIRED, label: "채용 완료" },
  ] as const;

  const handleValueChange = (value: ApplicationStatus) => {
    setSelectedValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelect(selectedValue);
    // TODO: 처리 로직 추가
  };

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
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
                className="h-[58px] w-full text-sm font-medium hover:bg-gray-200 md:h-[72px] md:text-base"
              >
                취소
              </Button>
              <Button type="submit" className="h-[58px] w-full text-sm font-medium md:h-[72px] md:text-base">
                선택하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
