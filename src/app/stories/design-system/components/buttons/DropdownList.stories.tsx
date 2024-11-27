import { Meta, StoryObj } from "@storybook/react";
import DropdownListBtn from "@/app/components/button/dropdown/DropdownListBtn";

const meta: Meta<typeof DropdownListBtn> = {
  title: "Components/DropdownList",
  component: DropdownListBtn,
  argTypes: {
    options: {
      description: "드롭다운에서 선택 가능한 옵션들",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof DropdownListBtn>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  },
};

export const CustomOptions: Story = {
  args: {
    options: ["Custom Option 1", "Custom Option 2", "Custom Option 3"],
  },
};
