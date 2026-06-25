<h1 align="center">Fullstack App Template</h1>

<div align="center">

一个面向多端产品的实用 TypeScript 全栈 monorepo 模板。

简体中文 | [English](./README.en.md)

</div>

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18%20%2F%2019-61dafb?style=flat-square&logo=react&logoColor=20232a)
![NestJS](https://img.shields.io/badge/NestJS-11-e0234e?style=flat-square&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479a1?style=flat-square&logo=mysql&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-8-f69220?style=flat-square&logo=pnpm&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-2-ef4444?style=flat-square&logo=turborepo&logoColor=white)
![License](https://img.shields.io/badge/license-TBD-lightgrey?style=flat-square)

</div>

<div align="center">

[✨ 项目亮点](#-项目亮点) · [🧱 技术栈](#-技术栈) · [🚀 快速开始](#-快速开始) · [🧭 架构链路](#-架构链路) · [🗺️ Roadmap](#-roadmap)

</div>

## ✨ 项目亮点

- 🧩 **多端 workspace**：WeApp、Mobile、Web、Admin、API 放在同一个仓库。
- 🔐 **类型安全契约**：使用共享 Zod schemas 维护接口入参和响应模型。
- 🔌 **共享 API client**：所有客户端通过同一套 SDK 请求后端。
- 🗄️ **MySQL 优先后端**：Kysely + mysql2，保留清晰、类型化的 SQL 访问方式。
- 🧰 **本地不强依赖 Docker**：更适合前端同学快速启动和验证。
- ⚡ **Monorepo 工程化**：pnpm workspace + Turborepo pipeline。
- 🧠 **AI 友好结构**：schema、API、client、UI 的全链路更新路径清晰。

## 🧱 技术栈

| 层级 | 技术 |
| --- | --- |
| 🟢 Runtime | Node.js 22 |
| 📦 包管理 | pnpm 8 |
| ⚙️ Monorepo | Turborepo |
| 🧑‍💻 语言 | TypeScript 5.9 |
| 💬 小程序 | Taro + React |
| 📱 移动端 | Expo + React Native |
| 🌐 Web | Vite + React |
| 🛠️ 管理后台 | Vite + React |
| ⚡ API | NestJS |
| 🗄️ 数据访问 | Kysely + mysql2 |
| 🐬 数据库 | MySQL |
| 🧬 校验 | Zod |
| 🧠 状态 | Valtio + TanStack Query |

## 📦 目录结构

```txt
apps/
  api/       # ⚡ NestJS API
  web/       # 🌐 Vite Web 应用
  admin/     # 🛠️ Vite 管理后台
  mobile/    # 📱 Expo / React Native 应用
  weapp/     # 💬 Taro 微信小程序

packages/
  api-client/  # 🔌 共享请求 SDK
  schemas/     # 🧬 Zod schemas 和推导类型
  shared/      # 🧰 纯 TypeScript 工具、常量和类型
  store/       # 🧠 共享 Valtio 状态模型
  config/      # ⚙️ 共享工程配置

scripts/
  mysql/        # 🗄️ MySQL 初始化 SQL

docs/
  architecture/ # 🧭 架构和开发说明
```

## 🚀 快速开始

### ✅ 环境要求

- 🟢 Node.js 22+
- 📦 pnpm 8.x
- 🐬 MySQL 8.x 或兼容 MySQL 的服务

### 📥 安装依赖

```bash
pnpm install
```

### 🔧 配置环境变量

```bash
cp .env.example .env
```

修改 `.env` 中的 MySQL 连接信息：

```env
DATABASE_URL=mysql://root:password@localhost:3306/fullstack_app
JWT_SECRET=replace-with-a-long-random-secret
```

把 `root` 和 `password` 替换成你本机 MySQL 的账号密码。

### 🗄️ 初始化数据库

确认 MySQL 已经启动，然后执行：

```bash
pnpm db:init
```

这个命令会按需创建数据库，并执行 `scripts/mysql/schema.sql` 初始化表结构。

### 🧪 启动应用

按需启动单个应用：

```bash
pnpm dev:api      # ⚡ NestJS API, http://localhost:3000
pnpm dev:web      # 🌐 Vite Web, http://localhost:8081
pnpm dev:admin    # 🛠️ Vite Admin, http://localhost:8082
pnpm dev:mobile   # 📱 Expo / React Native
pnpm dev:weapp    # 💬 Taro 微信小程序
```

也可以启动全部开发 pipeline：

```bash
pnpm dev
```

## 🧾 环境变量

| 变量 | 使用方 | 说明 |
| --- | --- | --- |
| `TARO_APP_API_BASE_URL` | 💬 WeApp | Taro API 地址 |
| `EXPO_PUBLIC_API_BASE_URL` | 📱 Mobile | Expo API 地址 |
| `VITE_API_BASE_URL` | 🌐 Web/Admin | Vite 应用 API 地址 |
| `API_PORT` | ⚡ API | NestJS 服务端口 |
| `DATABASE_URL` | 🗄️ API | MySQL 连接串 |
| `JWT_SECRET` | 🔐 API | JWT 签名密钥 |
| `WECHAT_APP_ID` | 💬 API | 微信 app id |
| `WECHAT_APP_SECRET` | 💬 API | 微信 app secret |

## 🧰 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm db:init` | 🗄️ 初始化 MySQL 数据库和表 |
| `pnpm dev` | 🚀 启动全部开发 pipeline |
| `pnpm dev:api` | ⚡ 启动 NestJS API |
| `pnpm dev:web` | 🌐 启动 Web 应用 |
| `pnpm dev:admin` | 🛠️ 启动管理后台 |
| `pnpm dev:mobile` | 📱 启动 Expo 移动端 |
| `pnpm dev:weapp` | 💬 启动 Taro 微信小程序 |
| `pnpm typecheck` | 🧑‍💻 执行 TypeScript 检查 |
| `pnpm lint` | 🔎 执行 ESLint |
| `pnpm build` | 📦 构建所有 workspace |
| `pnpm format` | 🎨 使用 Prettier 格式化 |
| `pnpm clean` | 🧹 清理构建产物和依赖 |

## 🧭 架构链路

```txt
apps/* UI
  -> packages/store
  -> TanStack Query
  -> packages/api-client
  -> packages/schemas
  -> apps/api controller/service
  -> Kysely
  -> MySQL
```

新增字段或接口时，建议按下面顺序更新：

```txt
scripts/mysql/schema.sql
  -> packages/schemas
  -> apps/api
  -> packages/api-client
  -> 受影响的 app 页面/store
  -> docs
```

## 🗄️ 数据库策略

云端 API 侧使用：

```txt
MySQL + Kysely + mysql2
```

本地或 Electron 验证侧后续可以单独增加：

```txt
SQLite + better-sqlite3 + Kysely
```

当前模板暂不内置 SQLite，等出现明确的 Electron App 或本地验证工作流后再接入，避免增加启动负担。

## 🧑‍💻 开发约定

- 🎯 UI 默认按平台分别实现，不跨 Taro、Expo、Web、Admin 共享 UI 组件。
- 🔁 共享类型、schema、请求 SDK、业务规则和纯 TypeScript 工具。
- 🧠 `packages/store` 保持平台无关。
- 🧬 `packages/schemas` 是 API 入参和响应类型的事实来源。
- 🔌 页面通过 `packages/api-client` 请求后端，不直接拼接 API。

## 🗺️ Roadmap

- 🧱 增加基于 MySQL/Kysely 的 CRUD 示例模块。
- 🛤️ 增加生产数据库变更所需的 migration 工具。
- 🖥️ 增加 Electron + SQLite 验证存储模板。
- ✅ 增加 typecheck、lint、build 的 CI 示例。
- 🚢 增加 API 和 Web/Admin 的部署示例。

## 🤝 Contributing

欢迎提交 issue 和 pull request。

提交 PR 前建议运行：

```bash
pnpm typecheck
pnpm lint
pnpm build
```

请尽量保持小步提交，并说明影响到的 workspace。

## 📄 License

当前模板还没有内置许可证。正式开源发布前，请添加 `LICENSE` 文件。
