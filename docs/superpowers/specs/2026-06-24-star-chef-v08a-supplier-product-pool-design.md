# Star Chef v0.8a Supplier Product Pool Import - Design Spec

Date: 2026-06-24  
Project: Huazhu / Shanghai Jiangqiao  
Surface: `v08a-supplier-product-pool.html`

## Product Intent

v0.8a moves Star Chef from an abstract menu loop into the first concrete operating surface for supplier-driven menu innovation.

The screen must answer one business question:

> When a supplier sends a quote sheet, new products, and seasonal dish ideas, which items can enter the menu engine, which require trial, which require human review, and which must be blocked?

## Users

- Procurement manager: price, tax, delivery, account period, min order, supply risk, price trend.
- Executive chef: SOP readiness, cooking method, portion, reheating, food safety, serving rhythm.
- Operations manager: meal period, stall opening rules, customer acceptance, menu composition, manual adjustment.
- Finance / CFO: cost visibility, price confidence, margin boundary, blocked profit claims.

## Scope

Included:

- Supplier product import queue.
- New product and seasonal dish candidate pool.
- Mapping to product library, SOP library, price database, and menu rule library.
- Candidate menu generation by breakfast, lunch, and dinner operating rules.
- Manual adjustment actions: lock, replace, trial, SOP request, risk block.
- Gate summary and next engineering outputs.

Excluded:

- Real Excel parser.
- Real database persistence.
- Real gross margin calculation.
- Purchase order generation.
- WeCom login and approval workflow.

## Data Model Demonstrated

Each supplier product candidate contains:

- Supplier and source.
- Category and status.
- Price, unit, tax, delivery, account period.
- Specification, storage, shelf life, best taste window.
- Supply risk and market trend.
- Four-library mapping result.
- Missing fields and risk items.
- Suggested dishes.
- Recommended human action.
- Owner and gate result.

## Business Rules

- Supplier items do not enter formal menus automatically.
- New products can enter candidate pools only after mapping.
- Missing SOP blocks formal publication.
- High-risk seasonal items can be manually reviewed but cannot be auto-generated into weekly menus.
- Desserts are sold separately and do not occupy hot-dish stall quota.
- Rice and soup are free/self-service but still cost-bearing.
- Lunch has five open stalls: noodle, feature, stir-fry 1, stir-fry 2, stir-fry 3.
- Dinner has only noodle and stir-fry 1 open.
- Breakfast has only the noodle/breakfast stall open.

## Acceptance Standard

The prototype is accepted when:

- The home page exposes v0.8a as the current active version.
- v0.8a shows supplier item filtering and detail selection.
- The four-library mapping is visible.
- The candidate menu includes actual Huazhu-style dishes and supplier-linked new/seasonal products.
- Manual actions update a visible adjustment log.
- Mobile and desktop screenshots show no broken layout or hidden primary content.
- Static contract checks include v0.8a files and markers.

## Next Engineering Boundary

v0.8a is still a front-end operating sample. The next product increment should build the real importer:

1. Parse the supplier quote Excel file.
2. Preserve raw rows.
3. Normalize units and prices.
4. Map supplier product names to standard ingredients/products.
5. Write import batches and quote rows into PostgreSQL.
6. Replace the v0.8a seed data with real imported rows.
