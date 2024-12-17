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

export const UploadImagePlaceHolder: Story = {
  args: {
    onImageUpload: async (file) => {
      // Mock image upload function
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(file)); // Returns a mock URL
        }, 1000);
      });
    },
    onImagesChange: (images) => {
      // Log the image list for demonstration
      console.log("Images changed:", images);
    },
  },
};
