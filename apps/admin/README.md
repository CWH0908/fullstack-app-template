# Admin

管理后台应用。默认使用 Vite React，后续可以接入 Tailwind、shadcn/ui、权限路由和数据表格。

## 职责

- 运营后台页面。
- 管理员工作流。
- Web 专属组件。
- 后台权限和菜单。

后台仍然通过 `@template/api-client` 访问 `apps/api`，不要绕过共享 SDK。
