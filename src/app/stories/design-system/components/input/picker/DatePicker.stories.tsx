import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/Date-Time-Day Picker/DatePicker",
  component: DatePickerInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePickerInput>;

export default meta;

type Story = StoryObj<typeof DatePickerInput>;

export const DatePicker: Story = {
  args: {},
};
