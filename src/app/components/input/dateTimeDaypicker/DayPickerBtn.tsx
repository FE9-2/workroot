import { MouseEvent } from "react";

const DayPickerBtn = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };
  const defaultStyle = "bg-background-200 text-gray-500";
  const selectedStyle = "bg-primary-orange-300 text-white";

  return (
    <div>
      <button
        onClick={handleClick}
        className={`h-12 w-[38px] bg-background-200 lg:h-[64px] lg:w-[50px] ${selected ? selectedStyle : defaultStyle}`}
      ></button>
    </div>
  );
};

export default DayPickerBtn;
