# Architecture Decisions

## ADR 001: Use pnpm workspace instead of separate repositories

个人或小团队全栈项目更需要上下文连续性，而不是仓库隔离。monorepo 让类型、schema 和接口 SDK 可以直接复用，也更适合 AI 一次性修改完整链路。

## ADR 002: Do not share UI across mini program and React Native

微信小程序和 React Native 的 UI 运行时差异很大。模板只共享类型、schema、api-client、store 模型和业务工具，不强行共享组件。

## ADR 003: Keep shared packages platform-neutral

共享包不调用 Taro、Expo、DOM 或 Nest API。平台能力由 `apps/*` 适配，这样共享包可以被所有端安全引用。

## ADR 004: Use NestJS for the API

NestJS 的模块、依赖注入、guard、pipe 和 testing 体系更适合长期维护。虽然 Hono 更轻，但这个模板目标是“可扩展的全栈种子项目”。

## ADR 005: Use Vite for web and admin

Web 和 Admin 主要是客户端应用，默认不需要 SSR。Vite 启动快、配置少，适合作为后续 Web 页面的默认构建工具。
