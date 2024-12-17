"use client";
import { MouseEvent } from "react";
import DayPickerBtn from "./DayPickerBtn";
interface DayPickerProps {
  workDays: string[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
const DayPickerList = ({ onClick, workDays, disabled }: DayPickerProps) => {
  const daysToRender = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex gap-2">
      {daysToRender.map((day) => (
        <DayPickerBtn key={day} value={day} selected={workDays.includes(day)} onClick={onClick} disabled={disabled} />
      ))}
    </div>
  );
};

export default DayPickerList;
