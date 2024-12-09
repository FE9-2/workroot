import { Meta, StoryObj } from "@storybook/react";
import Indicator from "@/app/components/pagination/Indicator";
import { useState } from "react";

const meta = {
  title: "Design System/Components/Pagination/Indicator",
  component: Indicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Indicator>;

export default meta;

type Story = StoryObj<typeof Indicator>;

// 상호작용 가능한 Indicator를 위한 래퍼 컴포넌트
const IndicatorWrapper = ({ imageCount }: { imageCount: number }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return <Indicator imageCount={imageCount} currentPage={currentPage} onPageChange={setCurrentPage} />;
};

// 3개 이미지 인디케이터
export const ThreeImages: Story = {
  render: () => <IndicatorWrapper imageCount={3} />,
};

// 5개 이미지 인디케이터
export const FiveImages: Story = {
  render: () => <IndicatorWrapper imageCount={5} />,
};

// 단일 이미지 인디케이터
export const SingleImage: Story = {
  render: () => <IndicatorWrapper imageCount={1} />,
};

// 많은 이미지 인디케이터
export const ManyImages: Story = {
  render: () => <IndicatorWrapper imageCount={8} />,
};

// 기본 Props로 렌더링되는 인디케이터
export const Default: Story = {
  render: () => <IndicatorWrapper imageCount={3} />,
  parameters: {
    docs: {
      description: {
        story: "기본적으로 3개의 인디케이터를 보여주며, 클릭하여 페이지를 변경할 수 있습니다.",
      },
    },
  },
};
