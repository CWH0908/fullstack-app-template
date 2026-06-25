# Architecture Overview

## Why Monorepo

This template keeps the WeChat mini program, mobile app, web app, admin app, shared packages, and NestJS API in one pnpm workspace. Product apps live in `apps/*`; reusable contracts and utilities live in `packages/*`.

## Runtime Responsibilities

| Runtime | Responsibility |
| --- | --- |
| Taro mini program | WeChat-specific login, sharing, payment, and mini program pages |
| Expo mobile | Android-first native app experience |
| Vite web | User-facing web and H5 pages |
| Vite admin | Operations and internal management console |
| NestJS API | Auth, business rules, database access, and integrations |

## Shared Package Rules

- `packages/shared` contains pure TypeScript constants, types, and utilities.
- `packages/schemas` contains Zod schemas and inferred API types.
- `packages/api-client` wraps backend requests and response validation.
- `packages/store` contains shared Valtio state only, without platform storage code.

## Data Flow

```txt
UI event
  -> Valtio local state
  -> TanStack Query mutation/query
  -> api-client fetch wrapper
  -> Zod schema validation
  -> NestJS controller
  -> NestJS service
  -> Kysely
  -> MySQL
```

## Database

The cloud API path uses `MySQL + Kysely + mysql2`. The schema bootstrap SQL lives at `scripts/mysql/schema.sql`.

Electron or local validation can later add `SQLite + better-sqlite3 + Kysely` as a separate local database path. Do not treat SQLite as the source of truth for the cloud API schema.

## AI Collaboration Notes

When asking AI to change a feature, give it this repo structure and ask it to update the complete chain:

```txt
MySQL schema, Zod schemas, Nest API, api-client, affected frontend pages/store, and docs.
Do not share cross-platform UI. Share only types, schemas, client code, and business rules.
```
