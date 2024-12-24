import React from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";

interface TableHeaderProps {
  experienceSort: "asc" | "desc";
  statusSort: "asc" | "desc";
  toggleExperienceSort: () => void;
  toggleStatusSort: () => void;
}

const TableHeader = ({ experienceSort, statusSort, toggleExperienceSort, toggleStatusSort }: TableHeaderProps) => {
  const theadStyle = "font-semibold text-grayscale-700";
  const sortIconStyle = "text-primary-orange-300 transition-transform hover:scale-110";

  return (
    <div className="sticky grid grid-cols-[1fr_2fr_1.4fr_0.8fr] border-b border-line-100 px-6 py-4">
      <span className={`${theadStyle} w-2/5`}>이름</span>
      <span className={`${theadStyle} w-1/4`}>전화번호</span>
      <div className="flex w-2/5 items-center gap-2">
        <span className={theadStyle}>경력</span>
        <button onClick={toggleExperienceSort}>
          <FaSortAmountDown className={cn(sortIconStyle, experienceSort === "desc" && "rotate-180")} />
        </button>
      </div>
      <div className="flex w-1/4 items-center gap-2">
        <span className={theadStyle} style={{ whiteSpace: "nowrap" }}>
          상태
        </span>
        <button onClick={toggleStatusSort}>
          <FaSortAmountDown className={cn(sortIconStyle, statusSort === "desc" && "rotate-180")} />
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
