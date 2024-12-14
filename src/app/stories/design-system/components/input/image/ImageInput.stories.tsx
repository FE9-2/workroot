import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/FileInput",
  component: ImageInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageInput>;

export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Upload_Image: Story = {
  args: {
    name: "uploadImage",
  },
};
