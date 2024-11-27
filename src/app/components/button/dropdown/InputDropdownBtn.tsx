import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface InputDropdownBtnProps {
  options: string[];
  className?: string;
}

const InputDropdownBtn: React.FC<InputDropdownBtnProps> = ({ options, className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    if (option === "직접입력") {
      setIsCustomInput(true);
      setSelectedValue("");
    } else {
      setSelectedValue(option);
      setIsCustomInput(false);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block w-80 text-left text-base md:w-[640px] ${className}`}>
      <div
        className={`rounded-md border border-transparent bg-gray-50 p-2 hover:border-gray-200 ${isOpen ? "ring-1 ring-gray-300" : ""}`}
      >
        <input
          type="text"
          value={isCustomInput ? selectedValue : selectedValue}
          onChange={(e) => isCustomInput && setSelectedValue(e.target.value)}
          className="items-centerbg-gray-50 flex w-full justify-between bg-gray-50 px-4 py-2 font-medium text-gray-700 focus:outline-none"
          placeholder={isCustomInput ? "직접 입력하세요" : "선택하세요"}
        />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-3 top-1.5 mr-2 mt-2 text-3xl">
          <IoMdArrowDropdown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white p-2 shadow-md">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer rounded-md px-6 py-4 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdownBtn;
