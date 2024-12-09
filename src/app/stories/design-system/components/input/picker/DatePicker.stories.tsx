import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "Design System/Components/Date-Time-Day Picker/DatePicker",
  component: DatePickerInput,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof DatePickerInput>;

export default meta;

type Story = StoryObj<typeof DatePickerInput>;

export const DatePicker: Story = {
  render: () => (
    <DatePickerInput
      startDateName="startDate"
      endDateName="endDate"
      displayValue="2024.01.02 ~ 2024.03.03"
      onChange={() => {}}
    />
  ),
};
