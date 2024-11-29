import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import Indicator from "@/app/components/pagination/Indicator";

const meta = {
  title: "Design System/Components/Pagination/IndicatorForCarousel",
  component: Indicator,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Indicator>;

export default meta;

type Story = StoryObj<typeof Indicator>;

export const IndicatorForCarousel: Story = {
  args: {
    imageCount: 3,
  },
};
