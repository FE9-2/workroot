import { MouseEvent, useState } from "react";
import DayPickerBtn from "./DayPickerBtn";

const DayPickerList = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const day = e.currentTarget.textContent;
    if (day) {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  return (
    <div>
      {days.map((day) => (
        <DayPickerBtn key={day} selected={selectedDays.includes(day)} onClick={onClick} />
      ))}
    </div>
  );
};

export default DayPickerList;
