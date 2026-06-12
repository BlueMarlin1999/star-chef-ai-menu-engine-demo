# Star Chef v0.6 Database Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the database foundation package for Star Chef so the next production step can create a PostgreSQL-backed Enterprise WeChat internal system.

**Architecture:** Keep the current GitHub Pages deployment as a public review surface, while adding a real database blueprint: PostgreSQL schema, API contract, maintenance runbook, and an interactive v0.6 database foundation page. The page explains what each table does, what data is still blocked, and how Excel imports will move into database tables.

**Tech Stack:** Static HTML/CSS/JavaScript for the review page, PostgreSQL SQL for the future database, Markdown for API and operations documentation.

---

### Task 1: Database Schema Package

**Files:**
- Create: `/Users/marlins/outputs/star_chef_public_demo/db/star-chef-v06-schema.sql`

- [x] Define PostgreSQL tables for projects, users, roles, dishes, ingredients, recipes, supplier quotes, menu plans, import batches, mapping tasks, quality gates, approvals, audit logs, and file assets.
- [x] Add practical constraints: unique keys, status checks, foreign keys, and useful indexes.
- [x] Seed the first Huazhu project, core roles, P0/P1 quality gates, and a small menu/dish sample from the current prototype.

### Task 2: API and Operations Documents

**Files:**
- Create: `/Users/marlins/outputs/star_chef_public_demo/db/star-chef-v06-api-contract.md`
- Create: `/Users/marlins/outputs/star_chef_public_demo/db/star-chef-v06-operations-runbook.md`

- [x] Document the first backend endpoints for Enterprise WeChat auth, Excel import, field mapping, dish mapping, quality gate status, approval flow, and audit logs.
- [x] Document the database purchase recommendation, starting configuration, backup policy, security rules, maintenance rhythm, and cost bands.
- [x] Make clear that v0.6 is a database design and integration contract, not a live cloud database purchase.

### Task 3: v0.6 Review Page

**Files:**
- Create: `/Users/marlins/outputs/star_chef_public_demo/v06-database-data.js`
- Create: `/Users/marlins/outputs/star_chef_public_demo/v06-database-foundation.html`
- Create: `/Users/marlins/outputs/star_chef_public_demo/v06-database-app.js`

- [x] Add a database readiness cockpit for Huazhu.
- [x] Show database layers: master data, transaction data, workflow, audit, file assets, integration.
- [x] Show the top tables with owners, purpose, current readiness, and key dependencies.
- [x] Add an import flow view that traces Excel files into staging, mapping, canonical tables, quality gates, and approvals.
- [x] Add role controls for operations, chef, procurement, finance, and system admin.
- [x] Add a cost and maintenance panel that explains expected monthly budget and who maintains what.

### Task 4: Homepage Entry and Verification

**Files:**
- Modify: `/Users/marlins/outputs/star_chef_public_demo/index.html`

- [x] Update the homepage title/header to v0.6.
- [x] Add a v0.6 card above v0.5.
- [x] Keep v0.3, v0.4, and v0.5 links available.
- [x] Run JavaScript syntax checks for v0.6 files.
- [x] Verify local HTML contains the expected v0.6 entry points.
- [x] Render desktop and mobile screenshots.
- [x] Commit, push, and verify GitHub Pages returns the v0.6 page.

### Scope Guard

v0.6 does not buy a cloud database, connect to Tencent Cloud, implement Enterprise WeChat OAuth, parse real Excel files server-side, or expose a real backend. Those belong to v0.7 after the schema and operations contract are reviewed.
