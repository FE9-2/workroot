import { cn } from "@/lib/tailwindUtil";
import Image from "next/image";

interface RecruitIconItemProps {
  icon: {
    sm: string;
    md: string;
  };
  label: string;
  value: string | React.ReactNode;
}

// 채용 공고의 근무 조건을 아이콘으로 표시하는 컴포넌트의 아이템 컴포넌트
const RecruitIconItem = ({ icon, label, value }: RecruitIconItemProps) => {
  const isPeriodLabel = label === "기간";

  return (
    <div
      className={cn(
        "flex h-[60px] items-start gap-2 overflow-hidden rounded-lg border border-line-100 bg-background-100 p-2 lg:h-[140px] lg:gap-6 lg:px-6 lg:py-4",
        { "lg:items-center": !isPeriodLabel }
      )}
    >
      <div className="flex h-full items-center">
        <div className="flex size-9 items-center justify-center rounded-full bg-grayscale-100 bg-opacity-30 lg:size-14">
          <Image src={icon.md} alt={label} width={36} height={36} className="size-6 lg:size-9" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-grayscale-600 text-sm font-medium lg:mt-4 lg:text-xl">{label}</div>
        <div
          className={cn("text-sm font-semibold text-primary-orange-300 lg:h-[58px] lg:text-xl", {
            "lg:h-0": isPeriodLabel,
          })}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default RecruitIconItem;
