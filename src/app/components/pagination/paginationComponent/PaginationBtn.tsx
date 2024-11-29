import { cn } from "@/lib/tailwindUtil";

const PaginationBtn = ({
  children,
  extraStyle,
  disabled,
}: {
  children: React.ReactNode;
  extraStyle?: string;
  disabled?: boolean;
}) => {
  const wrapperStyle =
    "size-[34px] lg:radius-lg flex items-center justify-center rounded-md lg:size-[48px] bg-background-200";
  const textStyle = "leading-[24px] lg:text-lg text-sm lg:leading-[26px]";
  const defaultStyle = "text-gray-200 font-medium lg:font-normal";

  return (
    <button type="button" disabled={disabled} className={cn(wrapperStyle, textStyle, defaultStyle, extraStyle)}>
      {children}
    </button>
  );
};

export default PaginationBtn;
