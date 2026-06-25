# Development Flow

## 1. Install Dependencies

```bash
pnpm install
```

## 2. Prepare Environment

Copy `.env.example` to `.env`, then update at least:

```txt
DATABASE_URL
JWT_SECRET
```

For local MySQL:

```env
DATABASE_URL=mysql://root:password@localhost:3306/fullstack_app
```

## 3. Initialize MySQL

Make sure your local MySQL service is running, then run:

```bash
pnpm db:init
```

This creates the configured database and applies `scripts/mysql/schema.sql`.

## 4. Start Apps

```bash
pnpm dev:api
pnpm dev:web
pnpm dev:admin
pnpm dev:weapp
pnpm dev:mobile
```

## 5. Add a Feature

Recommended update order:

```txt
1. scripts/mysql/schema.sql
2. packages/schemas
3. apps/api module/service/controller
4. packages/api-client
5. apps/* pages and store
6. README or docs
```

This keeps database shape, API contracts, and frontend usage aligned.
