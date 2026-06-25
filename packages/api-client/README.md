# @template/api-client

平台无关的请求 SDK。小程序、Expo、Web、Admin 都通过这里访问后端。

设计目标：

- 页面不直接拼 URL。
- 所有请求集中处理 token、错误和 Zod 响应校验。
- 只依赖标准 `fetch`，不绑定浏览器或某个平台运行时。
