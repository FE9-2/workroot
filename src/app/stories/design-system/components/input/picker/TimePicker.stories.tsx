import TimePickerInput from "@/app/components/input/dateTimeDaypicker/TimePickerInput";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

const meta = {
  title: "Design System/Components/Date-Time-Day Picker/TimePicker",
  component: TimePickerInput,
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
} satisfies Meta<typeof TimePickerInput>;

export default meta;

type Story = StoryObj<typeof TimePickerInput>;

export const TimePicker: Story = {
  args: {},
};
