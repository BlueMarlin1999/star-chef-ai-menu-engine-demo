# Star Chef v0.8 Menu Operations Loop Design

## Purpose

Star Chef v0.8 changes the product center from "AI generates a menu" to "the system runs controlled menu-operation loops." The AI is one worker inside the loop. The product owner is still the operating organization: operations manager, chef lead, procurement manager, finance, and system administrator.

The v0.8 goal is not to maximize automation. The goal is to make the Huazhu Jiangqiao pilot reproducible: real source data enters the database, business gaps are detected, tasks are assigned, menu candidates are generated only when data gates allow it, and every decision is auditable.

## Operating Principle

Each loop has six required parts:

| Part | Star Chef meaning |
|---|---|
| Goal | A measurable business state, such as "supplier quote imported and mapped" or "weekly lunch menu ready for review." |
| Context | Project contract rules, meal-period/stall structure, source Excel rows, cost cards, supplier quotes, dish library, SOP status, historical menus, and approval history. |
| Action | Import, normalize, map, cost, generate, block, approve, export, or notify. |
| Feedback | Database checks, quality gates, human review, cost exceptions, missing-data reports, and future sales/preference feedback. |
| State | PostgreSQL tables, import batch records, mapping status, quality gate status, approval records, audit logs, and file assets. |
| Exit | A loop must end as pass, blocked, rejected, or needs-human-review. It must not run indefinitely. |

## Scope

v0.8 covers five loops:

1. Supplier Quote Import Loop
2. Cost Card and SOP Completeness Loop
3. Dish and Ingredient Mapping Loop
4. Weekly Menu Candidate Loop
5. Quality Gate and Approval Loop

v0.8 does not cover production AI scheduling at full scale, mobile mini-program launch, multi-project rollout, real Enterprise WeChat OAuth, or cloud database purchasing. Those come after the loop model proves that one project can preserve raw data, detect gaps, and produce auditable review outputs.

## Loop 1: Supplier Quote Import

Goal: transform a supplier quote workbook into approved or blocked quote rows.

Inputs:

- Supplier quote file
- Supplier identity
- Quote period
- Tax, delivery, account period, and minimum order fields
- Existing `ingredients` master data

Actions:

- Create an `import_batches` record with import type `supplier_quote`.
- Preserve every source row in `import_rows.raw_payload`.
- Normalize known fields into `import_rows.normalized_payload`.
- Create or update `supplier_quote_batches`.
- Match source ingredient names to `ingredients`.
- Write `supplier_quotes` with `mapping_status`.

Feedback and exits:

- Pass when all required rows map to a standard ingredient.
- Needs-human-review when a source item has multiple plausible ingredient matches.
- Blocked when unit, price, quote period, or supplier identity is missing.

## Loop 2: Cost Card and SOP Completeness

Goal: determine whether a dish can be costed and produced.

Inputs:

- Cost card workbook
- Dish name
- Main ingredient, auxiliary ingredient, seasoning rows
- Gross weight, net weight, loss rate
- SOP status, labor minutes, equipment requirements

Actions:

- Preserve raw cost-card rows.
- Map source dish names to `dishes` through `dish_aliases`.
- Create or update `recipes`.
- Create or update `recipe_items`.
- Mark SOP status as `approved`, `draft`, or `missing`.

Feedback and exits:

- Pass when dish, ingredients, weight, loss, and SOP status are usable.
- Needs-human-review when dish name or ingredient name is ambiguous.
- Blocked when the dish has no standard name, no cost card, or no production feasibility record.

## Loop 3: Dish and Ingredient Mapping

Goal: stop name drift before it corrupts cost and menu decisions.

Inputs:

- Source dish names from weekly menus and cost cards
- Source ingredient names from quote sheets and recipes
- Existing aliases
- Similarity candidates
- Human owner role

Actions:

- Generate candidate matches with confidence.
- Assign dish decisions to chef lead.
- Assign ingredient decisions to procurement manager.
- Record approval, rejection, and remapping.
- Keep original source names forever in raw import rows.

Feedback and exits:

- Pass when each source name has one approved standard target.
- Needs-human-review when confidence is below threshold or multiple candidates exist.
- Blocked when a source name affects menu costing but no owner has confirmed it.

## Loop 4: Weekly Menu Candidate

Goal: generate a weekly menu candidate only after enough data is usable.

Inputs:

- Project service rules
- Meal periods and open stalls
- Dish library and aliases
- Recipes and cost card coverage
- Supplier quotes
- Historical menu repetition records
- Contract constraints

Actions:

- Build the candidate dish pool by meal period and stall.
- Keep procurement quantity deduped across repeated stall presentation.
- Generate candidate menu items with cost estimate, sale price, target cost rate, and serving weight.
- Mark items as approved, pending, or blocked based on data gates.

Feedback and exits:

- Pass when the candidate meets data gates and is ready for operations review.
- Needs-human-review when cost is available but SOP or stall feasibility needs chef judgment.
- Blocked when cost, quote, standard name, or contract-rule data is missing.

## Loop 5: Quality Gate and Approval

Goal: prevent a weak menu from becoming a formal operating output.

Inputs:

- Candidate menu
- Quality gate definitions
- Role approvals
- Cost, SOP, quote, repetition, innovation, and contract-rule status

Actions:

- Run database checks for each quality gate.
- Create `project_quality_gate_status` records.
- Create role-specific approval tasks.
- Write audit logs for status changes and decisions.
- Export review output only after required gates pass or are explicitly waived.

Feedback and exits:

- Pass when required gates pass and required roles approve.
- Needs-human-review when a gate can be waived with reason.
- Blocked when a hard gate fails.
- Rejected when a required owner refuses approval.

## Data Contract

v0.8 must use the existing v0.6-v0.7 table family before adding new tables.

Existing tables used:

- `projects`
- `project_service_rules`
- `app_users`
- `app_roles`
- `user_project_roles`
- `dishes`
- `dish_aliases`
- `ingredients`
- `suppliers`
- `recipes`
- `recipe_items`
- `supplier_quote_batches`
- `supplier_quotes`
- `menu_plans`
- `menu_plan_items`
- `import_batches`
- `import_rows`
- `quality_gates`
- `project_quality_gate_status`
- `approvals`
- `audit_logs`
- `file_assets`

New tables should be avoided in v0.8 unless a required loop cannot be represented in these tables. If a new table is required, it must be justified by a smoke test that cannot pass with the current schema.

## User Experience Contract

The v0.8 review page must make the loop state obvious to non-technical users:

- Show one cockpit for the five loops.
- Each loop shows input, owner, current state, blocker, next action, and exit condition.
- Use role language instead of technical database language where possible.
- Keep database evidence visible for technical handoff.
- Do not imply the system is ready for formal production use.

## Acceptance Criteria

v0.8 is acceptable when:

1. A public review page explains the five-loop model clearly.
2. The progress document names v0.8 as "Menu Operations Loop."
3. The implementation plan defines concrete tasks for loop data, static page, README/progress updates, and validation.
4. Static validation passes.
5. The existing v0.7 live database smoke test still passes.
6. The public GitHub Pages deployment exposes the v0.8 review page.

## Operating Decision

Star Chef should not be positioned as an AI prompt product. It should be positioned as an operating system for institutional catering menu decisions: data enters, loops run, gates decide, people approve, and audit records remain.
