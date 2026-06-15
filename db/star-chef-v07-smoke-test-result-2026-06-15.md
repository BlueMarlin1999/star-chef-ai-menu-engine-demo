# Star Chef v0.7 Database Smoke Test Result

Date: 2026-06-15
Project sample: Huazhu Jiangqiao / `HZ-JQ-2026`
Runner: `node scripts/run-v07-db-test.mjs`
Result: Pass

## Environment

- Docker CLI was installed, but the Docker daemon was not running.
- The runner used the native PostgreSQL fallback.
- PostgreSQL binary path: `/opt/homebrew/opt/postgresql@16/bin`
- Temporary database: `starchef_test`
- Socket/port: `/private/tmp:54329`

## SQL Chain

1. `db/star-chef-v06-schema.sql`
2. `db/star-chef-v07-test-seed.sql`
3. `db/star-chef-v07-smoke-test.sql`

All three SQL files completed with exit code 0.

## Smoke Checks Passed

- Public core tables: 24 rows in `information_schema.tables`
- Huazhu project: 1 row
- Role definitions: 5 rows
- Huazhu role assignments: 5 rows
- Breakfast/lunch/dinner service rules: 3 rows
- Approved dish aliases: 6 rows
- Ingredients: 7 rows
- Recipes and recipe items: 7 joined rows
- Supplier quote rows: 7 rows
- Import raw rows preserved: 5 rows
- Lunch menu items: 6 rows
- Quality gates: 5 rows
- Audit logs: 3 rows
- Business gates, free rice/soup rule, and supplier mappings are testable.

## Key Table Counts

| Table | Count |
|---|---:|
| `projects` | 1 |
| `ingredients` | 7 |
| `recipes` | 6 |
| `supplier_quotes` | 7 |
| `menu_plan_items` | 6 |
| `audit_logs` | 3 |

## Fixes Made During Test

- Changed unsupported `JOIN (VALUES ...)` constructs to `CROSS JOIN (VALUES ...)` where no join condition was intended.
- Cast audit-log `before_payload` null values as `null::jsonb` so `UNION ALL` resolves JSON payload types correctly.

## Next Gate

v0.8 can start the Excel import loop only for three controlled source types:

1. Supplier quote workbook
2. Dish cost-card/SOP workbook
3. Weekly menu workbook

Do not move to AI menu generation until the import loop can preserve raw rows, map fields, report missing standards, and write audit logs.
