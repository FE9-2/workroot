import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Decorator } from "@storybook/react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

// Next.js Router 모킹
const MockNextRouter = ({ children }: { children: React.ReactNode }) => {
  const mockRouter = {
    push: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
    prefetch: () => Promise.resolve(),
    replace: () => Promise.resolve(),
  };

  // @ts-expect-error - 스토리북 테스트용 모킹
  useRouter.mockImplementation(() => mockRouter);

  return <>{children}</>;
};

const withProviders: Decorator = (Story) => {
  return (
    <MockNextRouter>
      <QueryClientProvider client={queryClient}>
        <div className="h-full w-full">
          <Story />
        </div>
      </QueryClientProvider>
    </MockNextRouter>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      defaultViewport: "desktop",
      viewports: {
        // 모바일 - 아이폰
        iphone12: {
          name: "iPhone 12",
          styles: {
            width: "390px",
            height: "844px",
          },
        },
        iphone12promax: {
          name: "iPhone 12 Pro Max",
          styles: {
            width: "428px",
            height: "926px",
          },
        },
        // 모바일 - 갤럭시
        galaxys8: {
          name: "Galaxy S8",
          styles: {
            width: "360px",
            height: "740px",
          },
        },
        galaxys20: {
          name: "Galaxy S20",
          styles: {
            width: "412px",
            height: "915px",
          },
        },
        // 태블릿 - 아이패드
        ipadMini: {
          name: "iPad Mini",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        ipadAir: {
          name: "iPad Air",
          styles: {
            width: "820px",
            height: "1180px",
          },
        },
        ipadPro: {
          name: "iPad Pro",
          styles: {
            width: "1024px",
            height: "1366px",
          },
        },
        // 데스크톱
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "1024px",
          },
        },
      },
    },
  },
  decorators: [withProviders],
};

export default preview;
