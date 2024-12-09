import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import ChipWithIcon from "@/app/components/chip/ChipWithIcon";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const meta = {
  title: "Design System/Components/Chip",
  component: ChipWithIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isBookmarked: {
      control: "boolean",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof ChipWithIcon>;

export default meta;

type Story = StoryObj<typeof ChipWithIcon>;

export const ScrapChip: Story = {
  args: {
    label: "스크랩",
  },
  Render: (args: any) => <ChipWithIcon {...args} icon={args.isBookmarked ? <FaBookmark /> : <FaRegBookmark />} />,
};
