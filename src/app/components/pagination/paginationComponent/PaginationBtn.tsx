import { cn } from "@/lib/tailwindUtil";

const PaginationBtn = ({ children }: { children: React.ReactNode }) => {
  const wrapperStyle =
    "size-[34px] lg:radius-lg flex items-center justify-center rounded-md lg:size-[48px] bg-background-200";
  const textStyle = "leading-[24px] lg:text-lg text-sm lg:leading-[26px]";
  return <div className={cn(wrapperStyle, textStyle)}>{children}</div>;
};

export default PaginationBtn;
