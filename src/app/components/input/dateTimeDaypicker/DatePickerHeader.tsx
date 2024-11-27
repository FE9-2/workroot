import { MouseEvent } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

interface DatePickerHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  handleOpenDropdown: () => void;
}

const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  handleOpenDropdown,
}: DatePickerHeaderProps) => {
  const iconStyle = "size-6 lg:size-9 text-gray-300";
  const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation();
    handleOpenDropdown();
    console.log("close");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="lg:h-15 z-20 flex h-12 items-center justify-center text-sm font-semibold leading-6 lg:text-lg lg:leading-[26px]">
        기간 선택
      </div>
      <div className="lg:h-15 flex h-12 items-center justify-between px-[14px] py-[11px]">
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          <IoIosArrowBack className={iconStyle} />
        </button>
        <span className="text-base font-semibold leading-[26px] text-black-400 lg:text-[20px] lg:leading-8">
          {`${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`}
        </span>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          <IoIosArrowForward className={iconStyle} />
        </button>
        {/* 닫기 버튼 */}
      </div>
      <button
        type="button"
        onClick={handleClickClose}
        className="absolute left-[14px] top-5 cursor-pointer text-[10px] lg:top-6"
      >
        <IoMdClose className="size-6 text-black-400 lg:size-9" />
      </button>
    </div>
  );
};

export default DatePickerHeader;
