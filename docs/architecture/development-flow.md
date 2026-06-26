# 各端启动调试指南

本文整理本模板中 API、Web、Admin、Mobile 和微信小程序端的本地启动与调试方式。

## 1. 安装依赖

在仓库根目录执行：

```bash
pnpm install
```

## 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env
```

至少需要配置：

```txt
DATABASE_URL
JWT_SECRET
```

本地 MySQL 示例：

```env
DATABASE_URL=mysql://root:password@localhost:3306/fullstack_app
JWT_SECRET=replace-with-a-long-random-secret
```

## 3. 初始化数据库

确认本机 MySQL 已启动，然后执行：

```bash
pnpm db:init
```

该命令会按需创建数据库，并执行 `scripts/mysql/schema.sql` 初始化表结构。

## 4. API 服务

启动 NestJS API：

```bash
pnpm dev:api
```

默认访问地址：

```txt
http://localhost:3000
```

前端、多端应用默认都会请求这个 API 服务。调试客户端前，通常需要先启动 API。

## 5. Web 端

启动 Web 应用：

```bash
pnpm dev:web
```

访问地址：

```txt
http://localhost:8081
```

Web 端由 Vite 启动，支持热更新。修改页面、组件、样式后，浏览器会自动刷新或局部更新。

## 6. Admin 端

启动管理后台：

```bash
pnpm dev:admin
```

访问地址：

```txt
http://localhost:8082
```

Admin 端同样由 Vite 启动，支持热更新。

## 7. Mobile Android 端

Mobile 端位于 `apps/mobile`，使用 Expo + React Native + expo-router。

启动 Expo 开发服务：

```bash
pnpm dev:mobile
```

或者直接启动 Android：

```bash
pnpm --filter mobile android
```

`pnpm dev:mobile` 启动后不会提供普通网页地址，而是会在终端显示二维码和快捷键。

### 7.1 使用手机调试

1. 在手机应用商店或 `https://expo.dev/go` 安装 Expo Go。
2. 确认手机和电脑在同一个 Wi-Fi 下。
3. 执行 `pnpm dev:mobile`。
4. 使用 Expo Go 扫描终端中的二维码。

如果局域网连接不通，可以使用 tunnel 模式：

```bash
pnpm --filter mobile start -- --tunnel
```

### 7.2 使用 Android 模拟器调试

1. 打开 Android Studio 的 Android 模拟器。
2. 执行 `pnpm dev:mobile`。
3. 在 Expo 终端中按 `a`，Expo 会尝试在 Android 模拟器中打开应用。

也可以直接执行：

```bash
pnpm --filter mobile android
```

### 7.3 Mobile 端 API 地址

Android 模拟器访问电脑本机 API 时，不能使用 `localhost` 指向宿主机。建议使用：

```powershell
$env:EXPO_PUBLIC_API_BASE_URL="http://10.0.2.2:3000"
pnpm dev:mobile
```

真机调试时需要使用电脑的局域网 IP，例如：

```powershell
$env:EXPO_PUBLIC_API_BASE_URL="http://192.168.1.23:3000"
pnpm dev:mobile
```

### 7.4 Mobile 热更新说明

Expo 开发期的 LAN、Tunnel、Localhost 连接模式都支持 Fast Refresh。修改 JS、TS、页面和样式后，通常会自动刷新。

以下改动通常不能只靠热更新生效，需要重新启动 Expo，甚至重新构建开发客户端或安装包：

- 新增或修改原生模块。
- 修改部分 `app.json` 原生配置。
- 修改 Android 包名、权限、scheme。
- 升级 React Native、Expo SDK 或原生依赖。

生产环境热更新不是由 LAN/Tunnel 决定的，需要单独接入 Expo EAS Update。

## 8. 微信小程序端

小程序端位于 `apps/weapp`，使用 Taro 编译微信小程序。

启动编译监听：

```bash
pnpm dev:weapp
```

该命令会执行：

```bash
taro build --type weapp --watch
```

编译产物输出到：

```txt
apps/weapp/dist/
```

### 8.1 使用微信开发者工具查看

1. 打开微信开发者工具。
2. 选择导入项目。
3. 项目目录选择：

```txt
d:\YY代码库\AI\fullstack-app-template\apps\weapp
```

不要直接选择 `dist` 目录，因为 `apps/weapp/project.config.json` 中已经配置：

```json
"miniprogramRoot": "dist/"
```

微信开发者工具会自动把 `apps/weapp/dist` 作为小程序根目录。

当前 `appid` 是游客模式：

```json
"appid": "touristappid"
```

本地预览可以先用游客模式。如果需要真机调试、登录、支付或其他微信能力，需要替换成真实小程序 AppID。

### 8.2 小程序端 API 地址

小程序端默认读取：

```txt
TARO_APP_API_BASE_URL
```

未配置时会使用：

```txt
http://localhost:3000
```

在微信开发者工具中，`localhost:3000` 通常可以访问电脑本机 API。真机预览时不能使用 `localhost`，需要改成局域网 IP 或线上 HTTPS 地址，并处理微信小程序合法域名限制。

## 9. 一次启动全部开发任务

可以在根目录执行：

```bash
pnpm dev
```

该命令由 Turborepo 编排，会启动各 workspace 的 `dev` 任务。多端同时调试时建议确保端口不冲突，并按需只启动当前要调试的平台。

## 10. 端口占用处理

当前 Web 和 Admin 端口约定为：

```txt
Web:   http://localhost:8081
Admin: http://localhost:8082
API:   http://localhost:3000
```

如果端口被旧的 Node 进程占用，可以查看占用进程：

```powershell
netstat -ano | Select-String ':8081|:8082|:3000'
```

结束指定进程：

```powershell
Stop-Process -Id <PID> -Force
```

如果提示拒绝访问，需要使用管理员权限打开 PowerShell，或回到启动 dev server 的终端窗口按 `Ctrl+C` 停止。

## 11. 新增功能时的推荐更新顺序

```txt
1. scripts/mysql/schema.sql
2. packages/schemas
3. apps/api module/service/controller
4. packages/api-client
5. apps/* pages and store
6. README or docs
```

这个顺序可以让数据库结构、API 契约、请求 SDK 和各端页面保持一致。
