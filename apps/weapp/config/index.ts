import { defineConfig } from "@tarojs/cli";

const config = defineConfig({
  projectName: "fullstack-weapp",
  date: "2026-06-25",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  framework: "react",
  compiler: "webpack5",
  mini: {},
  h5: {},
  plugins: ["@tarojs/plugin-platform-weapp"]
});

export default config;
