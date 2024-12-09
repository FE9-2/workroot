import type { StorybookConfig as BaseStorybookConfig } from "@storybook/nextjs";

interface StorybookConfig extends BaseStorybookConfig {
  viteFinal?: (config: any) => Promise<any>;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    config.css = {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    };
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
