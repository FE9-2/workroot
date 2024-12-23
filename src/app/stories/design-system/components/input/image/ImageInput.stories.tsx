import * as React from "react";
import ImageInputPlaceHolder from "@/app/components/input/file/ImageInput/ImageInputPlaceHolder";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/FileInput",
  component: ImageInputPlaceHolder,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageInputPlaceHolder>;

export default meta;

type Story = StoryObj<typeof ImageInputPlaceHolder>;

export const Upload_Image: Story = {
  args: {
    size: "large",
    initialImages: [],
    onImageUpload: async (file: File) => {
      // 스토리북용 mock 함수
      return URL.createObjectURL(file);
    },
    onImagesChange: (images) => {
      console.log("Images changed:", images);
    },
  },
};
