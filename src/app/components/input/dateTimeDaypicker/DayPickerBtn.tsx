import { MouseEvent } from "react";

const DayPickerBtn = ({
  selected,
  value,
  onClick,
}: {
  selected: boolean;
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };
  const defaultStyle = "bg-background-200 text-grayscale-500";
  const activeStyle = "bg-primary-orange-300 text-white";

  return (
    <div>
      <button
        onClick={handleClick}
        className={`h-12 w-[38px] rounded-xl bg-background-200 focus:outline-none lg:h-[64px] lg:w-[50px] lg:rounded-2xl ${selected ? activeStyle : defaultStyle}`}
      >
        {value}
      </button>
    </div>
  );
};

export default DayPickerBtn;
