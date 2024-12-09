import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import InputDropdown from "@/app/components/button/dropdown/InputDropdown";

const meta = {
  title: "Design System/Components/Dropdown/InputDropdown",
  component: InputDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputDropdown>;

export default meta;
type Story = StoryObj<typeof InputDropdown>;

const Template = (args: any) => {
  const methods = useForm({
    defaultValues: {
      [args.name]: "", // 기본 값 설정
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <InputDropdown {...args} />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  Render: (args) => <Template {...args} />,
  args: {
    options: ["Option 1", "Option 2", "직접입력"],
    className: "",
    name: "dropdown", // `useFormContext`에서 사용할 필드 이름
  },
};

export const Error: Story = {
  Render: (args) => <Template {...args} />,
  args: {
    options: ["Option 1", "Option 2", "직접입력"],
    className: "",
    name: "dropdown", // 동일한 필드 이름
    errormessage: "에러 메시지",
  },
};
