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
  render: (args) => {
    const StoryComponent = () => <DayPickerList />;

    return (
      <>
        <div className="text-grayscale-600 my-4">요일 선택 (토글)</div>
        <StoryComponent />
      </>
    );
  },
};
