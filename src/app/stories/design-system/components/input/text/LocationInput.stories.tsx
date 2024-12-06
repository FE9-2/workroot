import LocationInput from "@/app/components/input/text/LocationInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/TextInput/LocationInput",
  component: LocationInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { name: "location", type: "text", placeholder: "위치를 입력해주세요." },
  argTypes: {
    errormessage: {
      description: "에러 메시지를 표시합니다",
      control: "text",
    },
    feedbackMessage: {
      description: "피드백 메시지를 표시합니다",
      control: "text",
    },
  },
} satisfies Meta<typeof LocationInput>;

export default meta;

type Story = StoryObj<typeof LocationInput>;

export const Location: Story = {
  args: { name: "location", placeholder: "위치를 입력해주세요." },
  argTypes: {
    errormessage: {
      description: "에러 메시지를 표시합니다",
      control: "text",
    },
    feedbackMessage: {
      description: "피드백 메시지를 표시합니다",
      control: "text",
    },
  },
};

export const error: Story = {
  args: { errormessage: "잘못된 주소입니다." },
};

export const feedback: Story = {
  args: { feedbackMessage: "가게 위치를 필수로 설정해주세요." },
};
