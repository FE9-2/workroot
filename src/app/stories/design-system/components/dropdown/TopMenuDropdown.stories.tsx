import { Meta, StoryObj } from "@storybook/react";
import TopMenuDropdown from "@/app/components/button/dropdown/TopMenuDropdown";

const meta: Meta<typeof TopMenuDropdown> = {
  title: "Design System/Components/Dropdown/TopMenuDropdown",
  component: TopMenuDropdown,
  argTypes: {
    options: {
      description: "드롭다운에서 선택 가능한 옵션들",
      control: {
        type: "object",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TopMenuDropdown>;

export const Default: Story = {
  args: {
    options: [
      { label: "모집 내용", value: "1" },
      { label: "모집 조건", value: "2" },
      { label: "근무 조건", value: "3" },
    ],
  },
};
