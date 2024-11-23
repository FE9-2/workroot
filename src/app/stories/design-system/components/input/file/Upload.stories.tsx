import UploadInput from "@/app/components/input/UploadInput";
import { Meta, StoryObj } from "@storybook/react";

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
    variant: "upload",
  },
};
