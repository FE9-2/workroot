import ScrapBtn from "@/app/components/button/default/ScrapBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ScrapBtn> = {
  title: "Design System/Components/Button/ScrapBtn",
  component: ScrapBtn,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrapBtn>;

export const Bookmarked: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        <ScrapBtn {...args} />
      </div>
    );
  },
};
