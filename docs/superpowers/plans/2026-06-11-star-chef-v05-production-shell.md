# Star Chef v0.5 Production Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a front-end production shell that demonstrates the first formal go-live workflow: role selection, project master data, data import status, dish-name mapping, data-quality gates, and approval flow.

**Architecture:** Keep the current GitHub Pages static deployment, but split v0.5 into focused files: `v05-production-app.html`, `v05-production-data.js`, and `v05-production-app.js`. The page simulates production state in browser memory and localStorage, while the data model mirrors future backend entities from v0.4.

**Tech Stack:** Static HTML/CSS/JavaScript, no backend dependency, no package install, verified with Chrome/Playwright against local and GitHub Pages URLs.

---

### Task 1: v0.5 Data Model

**Files:**
- Create: `/Users/marlins/outputs/star_chef_public_demo/v05-production-data.js`

- [x] Define users and roles: 运营经理、厨师长、采购经理、财务.
- [x] Define Huazhu project master fields: project, region, business model, meal periods, stall rules, target cost rate.
- [x] Define import streams: 周菜单、成本卡、供应商报价、售价参考.
- [x] Define mapping candidates: source dish name, standard dish name, match confidence, required owner, status.
- [x] Define data-quality gates: P0 missing standard mapping, P0 missing cost card, P0 missing supplier quote mapping, P1 missing SOP.

### Task 2: v0.5 Production Shell Page

**Files:**
- Create: `/Users/marlins/outputs/star_chef_public_demo/v05-production-app.html`
- Create: `/Users/marlins/outputs/star_chef_public_demo/v05-production-app.js`

- [x] Build a dense enterprise app shell, not a marketing page.
- [x] Add role switcher that changes visible action wording.
- [x] Add project master card for Huazhu Jiangqiao.
- [x] Add data import pipeline with statuses and blocking impact.
- [x] Add dish mapping workbench with approve/reject buttons.
- [x] Add data-quality gate panel that updates when mappings are approved.
- [x] Add approval flow panel for operations, chef, procurement, and finance.
- [x] Add launch-readiness score and exportable checklist.

### Task 3: Link v0.5 From Home

**Files:**
- Modify: `/Users/marlins/outputs/star_chef_public_demo/index.html`

- [x] Update title/header to include v0.5.
- [x] Add v0.5 entry card above v0.4.
- [x] Keep v0.3 and v0.4 links available.

### Task 4: Verification and Deployment

**Files:**
- Verify local static pages.
- Commit and push to GitHub Pages.

- [x] Run JavaScript syntax checks for `v05-production-data.js` and `v05-production-app.js`.
- [x] Use Chrome DOM dump to verify v0.5 content renders.
- [x] Capture desktop and mobile screenshots.
- [x] Inspect mobile screenshot with `view_image`.
- [ ] Commit and push to `BlueMarlin1999/star-chef-ai-menu-engine-demo`.
- [ ] Verify public GitHub Pages URL returns v0.5 content.

### Scope Guard

This task does not implement a backend, database, real enterprise WeChat OAuth, AI model calls, or Excel parsing. Those belong to v0.6 after this production shell is reviewed.
