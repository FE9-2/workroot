import type { StorybookConfig as BaseStorybookConfig } from "@storybook/nextjs";

interface StorybookConfig extends BaseStorybookConfig {
  viteFinal?: (config: any) => Promise<any>;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
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
};

export default config;
