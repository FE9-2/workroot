import type { Meta, StoryObj } from "@storybook/react";
import AlbaList from "./page";
import AlbaListLayout from "@/app/(pages)/albaList/layout";
import { FormListType } from "@/types/response/form";
import { fetchMockData, getInitialMockData } from "./mock/data";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const meta = {
  title: "Design System/Pages/AlbaList/Page",
  component: AlbaList,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof AlbaList>;

export default meta;
type Story = StoryObj<typeof AlbaList>;

// 무한 스크롤 기능을 가진 컨테이너 컴포넌트
const InfiniteScrollContainer = () => {
  const [items, setItems] = useState<FormListType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const initialData = getInitialMockData();
      setItems(initialData.items);
      setHasMore(initialData.hasMore);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  // 무한 스크롤 기능
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      const loadMoreData = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const nextData = fetchMockData(page + 1);
        setItems((prev) => [...prev, ...nextData.items]);
        setHasMore(nextData.hasMore);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      };
      loadMoreData();
    }
  }, [inView, hasMore, page, isLoading]);

  return <AlbaList mockData={[items]} isLoading={isLoading} onInView={() => {}} scrollRef={ref} />;
};

// 기본 기능 테스트
export const Default: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
};

// 데바일 - 아이폰
export const IPhone12: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};

export const IPhone12Pro: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "iphone12promax",
    },
  },
};

// 데바일 - 갤럭시
export const GalaxyS8: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "galaxys8",
    },
  },
};

export const GalaxyS20: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "galaxys20",
    },
  },
};

// 태블릿 - 아이패드
export const IPadMini: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "ipadMini",
    },
  },
};

export const IPadAir: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "ipadAir",
    },
  },
};

export const IPadPro: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "ipadPro",
    },
  },
};

// 데스크톱 뷰
export const Desktop: Story = {
  render: () => (
    <AlbaListLayout>
      <InfiniteScrollContainer />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
