# API

NestJS API service for authentication, users, and backend aggregation.

```txt
src/
  auth/       # Login and JWT issuing
  users/      # User profile APIs
  database/   # Kysely + mysql2 database access
  common/     # Shared filters and guards
  config/     # Environment validation
```

## Database

The API uses MySQL through Kysely and mysql2. Configure the connection in the
repository root `.env`:

```env
DATABASE_URL=mysql://root:password@localhost:3306/fullstack_app
```

Initialize the local database schema:

```bash
pnpm db:init
```

The schema SQL is stored at `scripts/mysql/schema.sql`.
