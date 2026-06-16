# Star Chef v0.8 Menu Operations Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish the v0.8 review surface that reframes Star Chef as a five-loop menu operations system rather than a prompt-based AI menu generator.

**Architecture:** Keep the current static GitHub Pages architecture. Add a focused v0.8 data file, app file, and HTML page, then update homepage, README, and progress documents. No backend schema changes are required in v0.8; the existing v0.6-v0.7 database foundation remains the evidence layer.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing GitHub Pages deployment, existing Node validation scripts, existing PostgreSQL smoke-test runner.

---

## File Structure

- Create: `v08-loop-engine-data.js`
  - Owns the five-loop model, role accountability, loop states, exit conditions, and v0.8 acceptance gates.
- Create: `v08-loop-engine-app.js`
  - Renders loop cards, role lanes, data flow, gate table, and next-action view from the data object.
- Create: `v08-menu-operations-loop.html`
  - Provides the static page shell and production-grade layout for the v0.8 review page.
- Modify: `index.html`
  - Adds v0.8 to the version history and current status links.
- Modify: `README.md`
  - Adds the v0.8 page and design/plan links.
- Modify: `STAR_CHEF_PROGRESS_AND_TODO.md`
  - Moves the current phase from v0.7 smoke-test completion to v0.8 Menu Operations Loop.
- Modify: `scripts/test-v07-db-toolkit.mjs`
  - Expands static validation to include v0.8 files and homepage links.

## Task 1: Add v0.8 Loop Data

**Files:**
- Create: `v08-loop-engine-data.js`

- [ ] **Step 1: Create the data object**

Create `window.__STAR_CHEF_V08_LOOP_DATA__` with:

```js
window.__STAR_CHEF_V08_LOOP_DATA__ = {
  version: "v0.8",
  title: "Menu Operations Loop",
  subtitle: "从 AI 排菜单提示词升级为可审计的菜单运营循环。",
  project: {
    code: "HZ-JQ-2026",
    name: "华住项目",
    region: "上海江桥",
    currentGate: "v0.7 database smoke test passed",
    nextGate: "v0.8 controlled Excel import loops",
  },
  loopPrinciples: [
    { key: "goal", label: "目标", description: "每个循环必须有可度量业务结果。" },
    { key: "context", label: "上下文", description: "循环必须读取项目规则、原始行、主数据、审批历史和门禁状态。" },
    { key: "action", label: "动作", description: "动作只能是导入、映射、计价、生成、阻断、审批、导出或通知。" },
    { key: "feedback", label: "反馈", description: "反馈来自数据库检查、质量门禁和角色确认。" },
    { key: "state", label: "状态", description: "状态必须写入 PostgreSQL 表和审计日志。" },
    { key: "exit", label: "退出", description: "循环必须以通过、阻断、驳回或待人工确认结束。" },
  ],
  loops: []
};
```

- [ ] **Step 2: Add five loops**

Each loop must contain `id`, `name`, `owner`, `goal`, `inputs`, `actions`, `stateTables`, `exitStates`, `currentStatus`, `nextAction`.

- [ ] **Step 3: Validate syntax**

Run:

```bash
node -c v08-loop-engine-data.js
```

Expected: exit code 0.

## Task 2: Add v0.8 Renderer

**Files:**
- Create: `v08-loop-engine-app.js`

- [ ] **Step 1: Create safe rendering helpers**

Use these functions:

```js
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function list(items) {
  const ul = el("ul", "plain-list");
  items.forEach((item) => ul.appendChild(el("li", "", item)));
  return ul;
}
```

- [ ] **Step 2: Render five sections**

Render:

1. Hero status
2. Loop principles
3. Five-loop cockpit
4. Role accountability board
5. v0.8 acceptance gates

- [ ] **Step 3: Validate syntax**

Run:

```bash
node -c v08-loop-engine-app.js
```

Expected: exit code 0.

## Task 3: Add v0.8 HTML Page

**Files:**
- Create: `v08-menu-operations-loop.html`

- [ ] **Step 1: Create page shell**

Use the existing visual language from v0.6-v0.7: restrained B2B dashboard, teal header, white panels, compact data cards, and mobile responsive grid.

- [ ] **Step 2: Include scripts**

Include:

```html
<script src="./v08-loop-engine-data.js"></script>
<script src="./v08-loop-engine-app.js"></script>
```

- [ ] **Step 3: Add containers**

Add:

```html
<main>
  <section id="hero"></section>
  <section id="principles"></section>
  <section id="loops"></section>
  <section id="roles"></section>
  <section id="gates"></section>
</main>
```

## Task 4: Update Navigation and Project Docs

**Files:**
- Modify: `index.html`
- Modify: `README.md`
- Modify: `STAR_CHEF_PROGRESS_AND_TODO.md`

- [ ] **Step 1: Update homepage**

Add v0.8 as the current version and link `v08-menu-operations-loop.html`.

- [ ] **Step 2: Update README**

Add v0.8 to the status list and key links.

- [ ] **Step 3: Update progress document**

Set current phase to v0.8 Menu Operations Loop and make v0.8 the first priority before Excel parser implementation.

## Task 5: Expand Static Validation

**Files:**
- Modify: `scripts/test-v07-db-toolkit.mjs`

- [ ] **Step 1: Add v0.8 validation entries**

Add checks for:

- `v08-menu-operations-loop.html`
- `v08-loop-engine-data.js`
- `v08-loop-engine-app.js`
- `index.html`
- `README.md`

- [ ] **Step 2: Run validation**

Run:

```bash
node -c v08-loop-engine-data.js
node -c v08-loop-engine-app.js
node scripts/test-v07-db-toolkit.mjs
```

Expected: all commands exit 0.

## Task 6: Verify Existing Database Smoke Test Still Passes

**Files:**
- Existing: `scripts/run-v07-db-test.mjs`

- [ ] **Step 1: Run live test**

Run:

```bash
node scripts/run-v07-db-test.mjs
```

Expected: schema, seed, and smoke test all pass; output includes `Star Chef v0.7 live database smoke test passed`.

## Task 7: Commit and Publish

**Files:**
- All changed files

- [ ] **Step 1: Check diff**

Run:

```bash
git status --short
git diff --check
```

Expected: changed files listed; no whitespace errors.

- [ ] **Step 2: Commit**

Run:

```bash
git add README.md STAR_CHEF_PROGRESS_AND_TODO.md index.html scripts/test-v07-db-toolkit.mjs v08-loop-engine-data.js v08-loop-engine-app.js v08-menu-operations-loop.html docs/superpowers/specs/2026-06-16-star-chef-v08-menu-operations-loop-design.md docs/superpowers/plans/2026-06-16-star-chef-v08-menu-operations-loop.md
git commit -m "Add Star Chef v0.8 menu operations loop"
```

- [ ] **Step 3: Push and verify public page**

Run:

```bash
git push origin main
curl -I https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/v08-menu-operations-loop.html
```

Expected: HTTP 200 after GitHub Pages propagation.

## Self-Review

- Spec coverage: The plan implements the five-loop model, page, docs, validation, live smoke test, commit, and publication.
- Placeholder scan: No `TBD`, `TODO`, or undefined implementation placeholders remain.
- Type consistency: Data object name, file names, and HTML script names match across tasks.
