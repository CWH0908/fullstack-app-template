# @template/shared

纯 TypeScript 公共包。这里不允许依赖 React、Taro、Expo、Nest 或浏览器 API。

适合放：

- 枚举和常量。
- 与平台无关的类型。
- 字符串、日期、数字等纯函数工具。
- 业务规则中不会触碰 IO 的部分。

不适合放：

- UI 组件。
- 请求代码。
- 本地存储代码。
- 数据库访问代码。
