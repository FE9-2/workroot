import { MouseEvent } from "react";
import { IoIosClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
  const iconStyle = "size-6 lg:size-9 text-gray-200";
  const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation();
    handleOpenDropdown();
    console.log("close");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="lg:h-15 z-20 flex h-12 items-center justify-center text-sm font-semibold leading-6 lg:text-lg lg:font-normal lg:leading-[26px]">
        기간 선택
      </div>
      <div className="lg:h-15 mb-2 flex h-12 items-center justify-between px-[14px] py-3">
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          <MdKeyboardArrowLeft className={iconStyle} />
        </button>
        <span className="text-base font-semibold leading-[26px] text-black-400 lg:text-[20px] lg:leading-8">
          {`${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`}
        </span>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          <MdKeyboardArrowRight className={iconStyle} />
        </button>
        {/* 닫기 버튼 */}
      </div>
      <button type="button" onClick={handleClickClose} className="absolute left-[14px] top-5 cursor-pointer lg:top-6">
        <IoIosClose className="size-6 text-black-100 lg:size-9" />
      </button>
    </div>
  );
};

export default DatePickerHeader;
