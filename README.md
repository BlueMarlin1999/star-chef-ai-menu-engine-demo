# Star Chef - AI Menu Engine

Internal review and build package for the Huazhu / Shanghai Jiangqiao pilot.

Current version: **v0.8a Supplier Product Pool Import**.

## Current Status

Star Chef has moved from a static menu prototype into a database-first system build:

- v0.3: meal-period and stall rules, procurement deduplication, chef task logic, and cost-risk screening.
- v0.4: system build package for business and technical alignment.
- v0.5: production-system shell with roles, imports, mappings, gates, and approvals.
- v0.6: PostgreSQL schema, API contract, database operations runbook, and data governance model.
- v0.7: Docker/PostgreSQL test toolkit with Huazhu seed data, native PostgreSQL fallback, and smoke tests.
- v0.8: Menu Operations Loop, reframing Star Chef from prompt-based AI output into auditable operating loops.
- v0.8a: Supplier product pool import, mapping supplier quotes, new products, and seasonal dishes to product library, SOP, price database, menu rules, AI candidate menus, and manual adjustment actions.

## Key Links

- Public home: https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/
- v0.8a supplier product pool import: [v08a-supplier-product-pool.html](./v08a-supplier-product-pool.html)
- Supplier collaboration preview: [star-chef-supplier-preview/](./star-chef-supplier-preview/)
- Progress and todo: [STAR_CHEF_PROGRESS_AND_TODO.md](./STAR_CHEF_PROGRESS_AND_TODO.md)
- v0.8 menu operations loop: [v08-menu-operations-loop.html](./v08-menu-operations-loop.html)
- v0.8a design spec: [docs/superpowers/specs/2026-06-24-star-chef-v08a-supplier-product-pool-design.md](./docs/superpowers/specs/2026-06-24-star-chef-v08a-supplier-product-pool-design.md)
- v0.8a implementation plan: [docs/superpowers/plans/2026-06-24-star-chef-v08a-supplier-product-pool.md](./docs/superpowers/plans/2026-06-24-star-chef-v08a-supplier-product-pool.md)
- v0.8 design spec: [docs/superpowers/specs/2026-06-16-star-chef-v08-menu-operations-loop-design.md](./docs/superpowers/specs/2026-06-16-star-chef-v08-menu-operations-loop-design.md)
- v0.8 implementation plan: [docs/superpowers/plans/2026-06-16-star-chef-v08-menu-operations-loop.md](./docs/superpowers/plans/2026-06-16-star-chef-v08-menu-operations-loop.md)
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
