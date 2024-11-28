import ImageInputwithPlaceHolder from "@/app/components/input/file/ImageInput/ImageInputwithPlaceHolder";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/FileInput",
  component: ImageInputwithPlaceHolder,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageInputwithPlaceHolder>;

export default meta;

type Story = StoryObj<typeof ImageInputwithPlaceHolder>;

export const ImageWithPlaceHolder: Story = {
  args: {
    variant: "upload",
  },
};
