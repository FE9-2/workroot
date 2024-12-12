import { cn } from "@/lib/tailwindUtil";
import { MouseEvent } from "react";
import toast from "react-hot-toast";

const DayPickerBtn = ({
  selected,
  value,
  onClick,
  disabled,
}: {
  selected: boolean;
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      toast.error("요일 협의가 가능한 경우 근무 요일을 선택하실 수 없습니다.");
    }
    onClick(e);
  };
  const defaultStyle = "bg-background-200 text-grayscale-500";
  const activeStyle = "bg-primary-orange-300 text-white";
  const disabledStyle = "bg-grayscale-200 text-grayscale-500";
  const textStyle =
    "placeholder:text-base placeholder:leading-[26px] lg:placeholder:text-xl lg:placeholder:leading-8 lg:text-xl font-normal lg:leading-8 text-base leading-[26px]";

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "h-12 w-[38px] rounded-xl bg-background-200 focus:outline-none lg:h-[64px] lg:w-[50px] lg:rounded-2xl",
          textStyle,
          selected ? activeStyle : defaultStyle,
          disabled ? disabledStyle : ""
        )}
      >
        {value}
      </button>
    </div>
  );
};

export default DayPickerBtn;
