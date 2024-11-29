import { cn } from "@/lib/tailwindUtil";

const PaginationBtn = ({ children, extraStyle }: { children: React.ReactNode; extraStyle?: string }) => {
  const wrapperStyle =
    "size-[34px] lg:radius-lg flex items-center justify-center rounded-md lg:size-[48px] bg-background-200";
  const textStyle = "leading-[24px] lg:text-lg text-sm lg:leading-[26px]";

  return (
    <button type="button" className={cn(wrapperStyle, textStyle, extraStyle)}>
      {children}
    </button>
  );
};

export default PaginationBtn;
