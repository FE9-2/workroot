import BookmarkBtn from "@/app/components/button/BookmarkBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BookmarkBtn> = {
  title: "Design System/Components/BookmarkBtn",
  component: BookmarkBtn,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkBtn>;

export const Bookmarked: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        <p className="mb-2 text-sm">click !</p>
        <BookmarkBtn {...args} />
      </div>
    );
  },
};
