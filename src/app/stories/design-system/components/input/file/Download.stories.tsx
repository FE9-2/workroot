import DownloadInput from "@/app/components/input/file/DownloadInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/FileInput/Download",
  component: DownloadInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DownloadInput>;

export default meta;

type Story = StoryObj<typeof DownloadInput>;

export const Download: Story = {
  args: {
    variant: "download",
    placeholder: "파일 다운로드하기 (현재는 기능 X)",
  },
};
