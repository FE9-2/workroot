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
    <div className="flex h-[54px] items-center gap-2 overflow-hidden rounded-lg border border-grayscale-200 p-2 lg:h-[167px] lg:gap-6 lg:p-[30px]">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grayscale-100 bg-opacity-30 lg:h-14 lg:w-14">
        <div className="block lg:hidden">
          <Image src={icon.sm} alt={label} width={24} height={24} />
        </div>
        <div className="hidden lg:block">
          <Image src={icon.md} alt={label} width={36} height={36} />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-grayscale-600 text-[10px] font-medium sm:text-xs lg:text-xl">{label}</div>
        <div className="text-xs font-semibold text-primary-orange-300 sm:text-sm lg:text-2xl">{value}</div>
      </div>
    </div>
  );
};
export default RecruitIconItem;
