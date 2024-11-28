import ImageInput from "@/app/components/input/file/ImageInput";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/FileInput/ImageInput",
  component: ImageInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageInput>;

export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Image: Story = {
  args: {
    variant: "upload",
  },
};
