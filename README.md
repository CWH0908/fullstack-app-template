<h1 align="center">Fullstack App Template</h1>

<div align="center">

A pragmatic TypeScript fullstack monorepo template for multi-platform products.

English | [简体中文](./README.zh-CN.md)

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

[✨ Features](#-features) · [🧱 Tech Stack](#-tech-stack) · [🚀 Quick Start](#-quick-start) · [🧭 Architecture](#-architecture-flow) · [🗺️ Roadmap](#-roadmap)

</div>

## ✨ Features

- 🧩 **Multi-platform workspace**: WeApp, mobile, web, admin, and API in one repo.
- 🔐 **Type-safe contracts**: shared Zod schemas for request and response models.
- 🔌 **Shared API client**: all apps call backend APIs through the same SDK.
- 🗄️ **MySQL-first backend**: Kysely + mysql2 for clear, typed SQL access.
- 🧰 **No Docker required locally**: designed for frontend-friendly local setup.
- ⚡ **Monorepo pipeline**: pnpm workspace and Turborepo tasks.
- 🧠 **AI-friendly structure**: clear full-stack update path for schema, API, client, and UI.

## 🧱 Tech Stack

| Layer | Technology |
| --- | --- |
| 🟢 Runtime | Node.js 22 |
| 📦 Package manager | pnpm 8 |
| ⚙️ Monorepo | Turborepo |
| 🧑‍💻 Language | TypeScript 5.9 |
| 💬 Mini program | Taro + React |
| 📱 Mobile | Expo + React Native |
| 🌐 Web | Vite + React |
| 🛠️ Admin | Vite + React |
| ⚡ API | NestJS |
| 🗄️ Database access | Kysely + mysql2 |
| 🐬 Database | MySQL |
| 🧬 Validation | Zod |
| 🧠 State | Valtio + TanStack Query |

## 📦 Project Structure

```txt
apps/
  api/       # ⚡ NestJS API
  web/       # 🌐 Vite web app
  admin/     # 🛠️ Vite admin app
  mobile/    # 📱 Expo / React Native app
  weapp/     # 💬 Taro WeChat mini program

packages/
  api-client/  # 🔌 Shared request SDK
  schemas/     # 🧬 Zod schemas and inferred types
  shared/      # 🧰 Pure TypeScript utilities, constants, and types
  store/       # 🧠 Shared Valtio state models
  config/      # ⚙️ Shared tooling config

scripts/
  mysql/        # 🗄️ MySQL schema bootstrap SQL

docs/
  architecture/ # 🧭 Architecture and development notes
```

## 🚀 Quick Start

### ✅ Prerequisites

- 🟢 Node.js 22+
- 📦 pnpm 8.x
- 🐬 MySQL 8.x or compatible MySQL service

### 📥 Install Dependencies

```bash
pnpm install
```

### 🔧 Configure Environment

```bash
cp .env.example .env
```

Update the MySQL connection in `.env`:

```env
DATABASE_URL=mysql://root:password@localhost:3306/fullstack_app
JWT_SECRET=replace-with-a-long-random-secret
```

Replace `root` and `password` with your local MySQL credentials.

### 🗄️ Initialize Database

Make sure MySQL is running, then execute:

```bash
pnpm db:init
```

This command creates the configured database if needed and applies `scripts/mysql/schema.sql`.

### 🧪 Start Apps

Run one app at a time:

```bash
pnpm dev:api      # ⚡ NestJS API, http://localhost:3000
pnpm dev:web      # 🌐 Vite web app, http://localhost:8081
pnpm dev:admin    # 🛠️ Vite admin app, http://localhost:8082
pnpm dev:mobile   # 📱 Expo / React Native
pnpm dev:weapp    # 💬 Taro WeChat mini program
```

Or start the full development pipeline:

```bash
pnpm dev
```

## 🧾 Environment Variables

| Variable | Used by | Description |
| --- | --- | --- |
| `TARO_APP_API_BASE_URL` | 💬 WeApp | API base URL for Taro |
| `EXPO_PUBLIC_API_BASE_URL` | 📱 Mobile | API base URL for Expo |
| `VITE_API_BASE_URL` | 🌐 Web/Admin | API base URL for Vite apps |
| `API_PORT` | ⚡ API | NestJS server port |
| `DATABASE_URL` | 🗄️ API | MySQL connection string |
| `JWT_SECRET` | 🔐 API | JWT signing secret |
| `WECHAT_APP_ID` | 💬 API | WeChat app id |
| `WECHAT_APP_SECRET` | 💬 API | WeChat app secret |

## 🧰 Available Scripts

| Command | Description |
| --- | --- |
| `pnpm db:init` | 🗄️ Initialize the MySQL database and tables |
| `pnpm dev` | 🚀 Start all development pipelines |
| `pnpm dev:api` | ⚡ Start the NestJS API |
| `pnpm dev:web` | 🌐 Start the web app |
| `pnpm dev:admin` | 🛠️ Start the admin app |
| `pnpm dev:mobile` | 📱 Start the Expo mobile app |
| `pnpm dev:weapp` | 💬 Start the Taro WeChat mini program |
| `pnpm typecheck` | 🧑‍💻 Run TypeScript checks |
| `pnpm lint` | 🔎 Run ESLint |
| `pnpm build` | 📦 Build all workspaces |
| `pnpm format` | 🎨 Format files with Prettier |
| `pnpm clean` | 🧹 Clean build artifacts and dependencies |

## 🧭 Architecture Flow

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

When adding a new field or endpoint, update the chain in this order:

```txt
scripts/mysql/schema.sql
  -> packages/schemas
  -> apps/api
  -> packages/api-client
  -> affected app pages/store
  -> docs
```

## 🗄️ Database Strategy

The cloud API side uses:

```txt
MySQL + Kysely + mysql2
```

For local or Electron-only validation, a separate local database layer can be added later:

```txt
SQLite + better-sqlite3 + Kysely
```

SQLite is intentionally not included in the current template until there is a concrete Electron app or local validation workflow.

## 🧑‍💻 Development Notes

- 🎯 Keep UI platform-specific. Do not share UI components across Taro, Expo, web, and admin by default.
- 🔁 Share contracts, schemas, request clients, business rules, and pure TypeScript utilities.
- 🧠 Keep `packages/store` platform-neutral.
- 🧬 Use `packages/schemas` as the source of truth for API request and response types.
- 🔌 Use `packages/api-client` instead of calling API endpoints directly from pages.

## 🗺️ Roadmap

- 🧱 Add example CRUD module using the MySQL/Kysely stack.
- 🛤️ Add optional migration tooling for production database changes.
- 🖥️ Add Electron app template with SQLite validation storage.
- ✅ Add CI examples for typecheck, lint, and build.
- 🚢 Add deployment examples for API and web/admin apps.

## 🤝 Contributing

Issues and pull requests are welcome.

Before opening a pull request, run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Please keep changes small and document which workspace is affected.

## 📄 License

This template does not include a license yet. Add a `LICENSE` file before publishing it as an open-source project.
