"use client";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import BaseInput from "../text/BaseInput";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const ApplicantCountInput = () => {
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const iconStyle = "text-black-400 size-9";
  const arrowIcon = isOpen ? <IoMdArrowDropup className={iconStyle} /> : <IoMdArrowDropdown className={iconStyle} />;
  return (
    <div>
      <BaseInput
        name="applicantCount"
        type="text"
        placeholder="00명 (인원미정)"
        variant="white"
        afterIcon={arrowIcon}
        anotherHoverStyle=""
      />
      {/* 드롭다운 추가 */}
    </div>
  );
};

export default ApplicantCountInput;
