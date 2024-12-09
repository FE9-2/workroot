import React, { useState } from "react";
import DayPickerList from "@/app/components/input/dateTimeDaypicker/DayPickerList";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/Date-Time-Day Picker/DayPicker",
  component: DayPickerList,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DayPickerList>;

export default meta;

type Story = StoryObj<typeof DayPickerList>;

export const DayPicker: Story = {
  args: {},
  Render: () => {
    const StoryComponent = () => {
      const [selectedDays, setSelectedDays] = useState<string[]>(["월", "화"]);

      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const day = e.currentTarget.textContent || "";
        setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
      };

      return (
        <>
          <div className="text-grayscale-600 my-4">요일 선택 (토글)</div>
          <DayPickerList workDays={selectedDays} onClick={handleClick} />
          <div className="mt-4">
            <strong>Selected Days:</strong> {selectedDays.join(", ") || "None"}
          </div>
        </>
      );
    };

    return <StoryComponent />;
  },
};
