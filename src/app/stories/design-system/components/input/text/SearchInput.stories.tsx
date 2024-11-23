import SearchInput from "@/app/components/input/text/SearchInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/TextInput/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    errorMessage: {
      description: "에러 메시지를 표시합니다",
      control: "text",
    },
    feedbackMessage: {
      description: "피드백 메시지를 표시합니다",
      control: "text",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Search: Story = {
  args: { name: "search" },
};
