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
  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 p-1 sm:p-3 md:gap-6 md:p-6">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-30 sm:h-9 sm:w-9 md:h-16 md:w-16">
        <div className="block md:hidden">
          <Image src={icon.sm} alt={label} width={24} height={24} />
        </div>
        <div className="hidden md:block">
          <Image src={icon.md} alt={label} width={36} height={36} />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[10px] font-medium text-gray-600 sm:text-xs md:text-xl">{label}</div>
        <div className="text-xs font-semibold text-primary-orange-300 sm:text-sm md:text-2xl">{value}</div>
      </div>
    </div>
  );
};

export default RecruitIconItem;
