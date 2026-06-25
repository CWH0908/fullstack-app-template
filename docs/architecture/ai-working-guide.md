# AI Working Guide

Use this guide when asking AI to modify the project.

## Must Follow

- Read the root `README.md` and `docs/architecture/overview.md` first.
- Do not share UI components across platforms.
- Do not duplicate DTO types inside pages.
- Do not bypass `@template/api-client` for backend requests.
- Do not put platform storage code inside `packages/store`.

## Feature Checklist

```txt
MySQL schema changed?
Zod schema updated?
NestJS service/controller updated?
api-client updated?
Valtio state affected?
weapp/mobile/web/admin pages affected?
README/docs need updates?
```

## Good Prompt

```txt
Please add a membership level field and update the full chain:
MySQL schema, Zod schemas, Nest API, api-client, weapp/mobile/web/admin display, and docs.
Keep UI platform-specific. Share only types, schemas, and request SDK code.
```
