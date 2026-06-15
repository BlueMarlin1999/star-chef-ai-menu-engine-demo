# Star Chef - AI Menu Engine

Internal review and build package for the Huazhu / Shanghai Jiangqiao pilot.

Current version: **v0.7 database test toolkit**.

## Current Status

Star Chef has moved from a static menu prototype into a database-first system build:

- v0.3: meal-period and stall rules, procurement deduplication, chef task logic, and cost-risk screening.
- v0.4: system build package for business and technical alignment.
- v0.5: production-system shell with roles, imports, mappings, gates, and approvals.
- v0.6: PostgreSQL schema, API contract, database operations runbook, and data governance model.
- v0.7: Docker/PostgreSQL test toolkit with Huazhu seed data, native PostgreSQL fallback, and smoke tests.

## Key Links

- Public home: https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/
- Progress and todo: [STAR_CHEF_PROGRESS_AND_TODO.md](./STAR_CHEF_PROGRESS_AND_TODO.md)
- v0.7 database test page: [v07-database-test.html](./v07-database-test.html)
- v0.6 database foundation: [v06-database-foundation.html](./v06-database-foundation.html)
- PostgreSQL schema: [db/star-chef-v06-schema.sql](./db/star-chef-v06-schema.sql)
- v0.7 smoke test: [db/star-chef-v07-smoke-test.sql](./db/star-chef-v07-smoke-test.sql)
- v0.7 smoke test result: [db/star-chef-v07-smoke-test-result-2026-06-15.md](./db/star-chef-v07-smoke-test-result-2026-06-15.md)

## Local Verification

Static toolkit check:

```bash
node scripts/test-v07-db-toolkit.mjs
```

Live PostgreSQL smoke test. The runner uses Docker when the Docker daemon is available; otherwise it falls back to a local Homebrew PostgreSQL 16+ installation:

```bash
node scripts/run-v07-db-test.mjs
```

After a native fallback run, inspect the temporary database with:

```bash
/opt/homebrew/opt/postgresql@16/bin/psql -h /private/tmp -p 54329 -U starchef -d starchef_test
```

## Scope Note

The original Excel workbooks and source screenshots are not included in this public demo repository. This repository is for internal product, data, and operating-model review.
