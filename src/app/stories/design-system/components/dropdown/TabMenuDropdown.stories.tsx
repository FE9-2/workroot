import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TabMenuDropdown> = {
  title: "Design System/Components/Dropdown/TabMenuDropdown",
  component: TabMenuDropdown,
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

type Story = StoryObj<typeof TabMenuDropdown>;

export const Default: Story = {
  args: {
    options: [
      { label: "모집 내용", isEditing: true },
      { label: "모집 조건", isEditing: false },
      { label: "근무 조건", isEditing: false },
    ],
  },
};
