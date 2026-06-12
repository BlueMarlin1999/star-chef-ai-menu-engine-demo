# Star Chef v0.7 Database Test Toolkit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a testable database toolkit so Star Chef can validate the PostgreSQL schema, seed Huazhu pilot data, and run smoke tests before buying or connecting a cloud database.

**Architecture:** Keep v0.7 as a repo-contained toolkit. Static checks run with Node on this Mac even when Docker and psql are missing; live database checks run through Docker/PostgreSQL when Docker is available.

**Tech Stack:** PostgreSQL 16, Docker Compose, SQL seed/smoke files, Node.js 24 static/runtime scripts, static GitHub Pages documentation.

---

### Task 1: Plan And Red Test

**Files:**
- Create: `scripts/test-v07-db-toolkit.mjs`
- Create: `docs/superpowers/plans/2026-06-13-star-chef-v07-database-test-toolkit.md`

- [x] **Step 1: Save this implementation plan**

Run: `test -f docs/superpowers/plans/2026-06-13-star-chef-v07-database-test-toolkit.md`

Expected: exit `0`.

- [x] **Step 2: Write a failing toolkit contract test**

Create `scripts/test-v07-db-toolkit.mjs` to assert that these files exist and contain required markers:

```text
db/docker-compose.v07-test.yml
db/star-chef-v07-test-seed.sql
db/star-chef-v07-smoke-test.sql
scripts/run-v07-db-test.mjs
v07-database-test.html
v07-database-test-data.js
v07-database-test-app.js
index.html
```

- [x] **Step 3: Run the test and verify it fails**

Run: `node scripts/test-v07-db-toolkit.mjs`

Expected: FAIL because the v0.7 files do not exist yet.

### Task 2: Database Test Assets

**Files:**
- Create: `db/docker-compose.v07-test.yml`
- Create: `db/star-chef-v07-test-seed.sql`
- Create: `db/star-chef-v07-smoke-test.sql`
- Create: `scripts/run-v07-db-test.mjs`

- [x] **Step 1: Add Docker Compose for local PostgreSQL**

Create a PostgreSQL 16 service named `starchef-postgres` with:

```text
database: starchef_test
user: starchef
password: starchef_test
port: 54329
volume: starchef_pgdata_v07
```

- [x] **Step 2: Add Huazhu v0.7 seed data**

Insert app users, approved dish aliases, ingredients, recipes, supplier quotes, one lunch menu plan, sample menu items, import batches/rows, quality gate status, approval rows, and audit logs.

- [x] **Step 3: Add smoke-test SQL**

Assert counts and business rules using PostgreSQL `do $$` blocks:

```text
minimum table count
Huazhu project exists
all five roles exist
service rules cover breakfast/lunch/dinner
supplier quotes exist
menu items exist
P0 gates include blocked states
audit logs exist
```

- [x] **Step 4: Add one-command runner**

Create a Node script that checks Docker availability, starts compose, runs v0.6 schema, v0.7 seed, and v0.7 smoke tests through `docker compose exec -T`.

### Task 3: Public Review Page

**Files:**
- Create: `v07-database-test-data.js`
- Create: `v07-database-test.html`
- Create: `v07-database-test-app.js`
- Modify: `index.html`

- [x] **Step 1: Add v0.7 page data**

Represent testing layers, command sequence, pass criteria, failure handling, and rollout checklist in `window.__STAR_CHEF_V07_TEST_DATA__`.

- [x] **Step 2: Add v0.7 static page**

Create a responsive page for operations, chef, procurement, finance, and system administrator review.

- [x] **Step 3: Add app renderer**

Render status cards, commands, SQL assets, gate checks, and escalation rules. Support role switching.

- [x] **Step 4: Add homepage entry**

Add a v0.7 section before v0.6 with links to the database test page, compose file, seed SQL, smoke SQL, and one-command runner.

### Task 4: Verification And Release

**Files:**
- All v0.7 files above

- [x] **Step 1: Run static contract test**

Run: `node scripts/test-v07-db-toolkit.mjs`

Expected: PASS.

- [x] **Step 2: Run JavaScript syntax checks**

Run:

```bash
node -c scripts/run-v07-db-test.mjs
node -c scripts/test-v07-db-toolkit.mjs
node -c v07-database-test-data.js
node -c v07-database-test-app.js
```

Expected: all exit `0`.

- [x] **Step 3: Run live DB test if Docker exists**

Run: `node scripts/run-v07-db-test.mjs`

Expected: if Docker is installed, schema/seed/smoke pass; if Docker is missing, script exits with an explicit prerequisite message.

- [x] **Step 4: Verify local page and public page**

Use local HTTP and public GitHub Pages checks to confirm `v07-database-test.html` and homepage links are available.

- [x] **Step 5: Commit and push**

Commit message: `Add Star Chef v0.7 database test toolkit`.
