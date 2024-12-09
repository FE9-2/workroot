import UploadInput from "@/app/components/input/file/UploadInput";
import { Meta, StoryObj } from "@storybook/react";

// 파일 객체 생성
const file = new File(["content"], "example.pdf", { type: "application/pdf" });

const meta = {
  title: "Design System/Components/FileInput/Upload",
  component: UploadInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof UploadInput>;

export default meta;

type Story = StoryObj<typeof UploadInput>;

export const Upload: Story = {
  args: {
    name: "upload",
    variant: "upload",
    accept: ".pdf,.doc,.docx",
    placeholder: "파일 업로드하기",
    file, // File 객체 전달
  },
};
