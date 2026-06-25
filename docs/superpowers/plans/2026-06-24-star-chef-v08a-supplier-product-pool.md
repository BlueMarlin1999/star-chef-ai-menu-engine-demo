# Implementation Plan - Star Chef v0.8a Supplier Product Pool Import

## Goal

Add a professional Star Chef page that demonstrates how supplier quotes, new products, and seasonal dishes enter the menu engine through mapping, gates, AI candidate generation, and manual adjustment.

## Files

- `v08a-supplier-product-pool.html`
- `v08a-supplier-product-pool-data.js`
- `v08a-supplier-product-pool-app.js`
- `index.html`
- `README.md`
- `STAR_CHEF_PROGRESS_AND_TODO.md`
- `scripts/test-v07-db-toolkit.mjs`
- `docs/superpowers/specs/2026-06-24-star-chef-v08a-supplier-product-pool-design.md`

## Implementation Steps

1. Add v0.8a data seed.
   - Supplier candidates.
   - Four-library mapping state.
   - Candidate menus.
   - Manual adjustment actions.
   - Quality gates.

2. Add v0.8a page shell.
   - App header and navigation.
   - Hero summary.
   - Workflow section.
   - Supplier import board.
   - Library matching board.
   - Menu candidate board.
   - Quality gates.

3. Add interaction layer.
   - Filter supplier products by status.
   - Select supplier product and update detail panel.
   - Select menu item and show linked supplier source.
   - Record manual action in the adjustment log.

4. Update project entry points.
   - Make v0.8a the current version in `README.md`.
   - Add v0.8a as first active section on `index.html`.
   - Update progress and todo document.

5. Extend static contract check.
   - Require v0.8a HTML, data, app, spec, and plan markers.

6. Verify locally.
   - JavaScript syntax.
   - Static contract check.
   - Desktop screenshot.
   - Mobile screenshot.
   - Interaction proof.
   - No unexpected Git artifacts.

7. Publish.
   - Commit scoped changes.
   - Push to GitHub Pages repository.
   - Verify public URLs.

## Verification Checklist

- [ ] `node -c v08a-supplier-product-pool-data.js`
- [ ] `node -c v08a-supplier-product-pool-app.js`
- [ ] `node scripts/test-v07-db-toolkit.mjs`
- [ ] `git diff --check`
- [ ] Desktop viewport: 1440 x 1000.
- [ ] Mobile viewport: 390 x 844.
- [ ] Supplier filter changes visible rows.
- [ ] Supplier selection updates detail panel.
- [ ] Menu selection updates manual panel.
- [ ] Manual action writes to adjustment log.
- [ ] Public GitHub Pages route loads after push.
