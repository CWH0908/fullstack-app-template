# @template/schemas

Zod schema 包。它是接口入参、响应结构和表单校验的单一事实来源。

推荐规则：

- 每个业务模块一个 `*.schema.ts`。
- 所有 `type` 都从 schema 推导，不手写重复类型。
- 后端 controller/service 和前端 api-client 共享同一份 schema。
