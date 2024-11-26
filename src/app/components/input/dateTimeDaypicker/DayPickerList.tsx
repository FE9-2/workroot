import { MouseEvent, useState } from "react";
import DayPickerBtn from "./DayPickerBtn";

const DayPickerList = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const day = e.currentTarget.textContent;
    if (day) {
      if (selectedDays.includes(day)) {
        setSelectedDays((prev) => prev.filter((d: string) => d !== day));
      } else {
        setSelectedDays((prev) => [...prev, day]); // 눌렀을때 추가
      }
    }
  };

  return (
    <div className="flex gap-2">
      {days.map((day) => (
        <DayPickerBtn key={day} value={day} selected={selectedDays.includes(day)} onClick={onClick} />
      ))}
    </div>
  );
};

export default DayPickerList;
