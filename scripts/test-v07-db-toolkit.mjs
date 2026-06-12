#!/usr/bin/env node

import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const checks = [
  {
    file: "db/docker-compose.v07-test.yml",
    markers: ["postgres:16", "starchef_test", "54329", "starchef_pgdata_v07"],
  },
  {
    file: "db/star-chef-v07-test-seed.sql",
    markers: ["Dan Ops", "红烧牛肉拉面", "supplier_quote_batches", "menu_plan_items", "audit_logs"],
  },
  {
    file: "db/star-chef-v07-smoke-test.sql",
    markers: ["Star Chef v0.7 smoke test", "assert_min_count", "quality_gates", "audit_logs"],
  },
  {
    file: "scripts/run-v07-db-test.mjs",
    markers: ["docker", "star-chef-v06-schema.sql", "star-chef-v07-test-seed.sql", "star-chef-v07-smoke-test.sql"],
  },
  {
    file: "v07-database-test-data.js",
    markers: ["__STAR_CHEF_V07_TEST_DATA__", "schema", "seed", "smoke"],
  },
  {
    file: "v07-database-test.html",
    markers: ["v0.7 数据库测试工具包", "v07-database-test-data.js", "v07-database-test-app.js"],
  },
  {
    file: "v07-database-test-app.js",
    markers: ["render", "role", "smoke"],
  },
  {
    file: "index.html",
    markers: ["v0.7 数据库测试工具包", "v07-database-test.html", "star-chef-v07-smoke-test.sql"],
  },
];

const failures = [];

for (const check of checks) {
  const fullPath = join(root, check.file);
  try {
    const stat = statSync(fullPath);
    if (!stat.isFile()) {
      failures.push(`${check.file}: not a file`);
      continue;
    }
    const content = readFileSync(fullPath, "utf8");
    for (const marker of check.markers) {
      if (!content.includes(marker)) {
        failures.push(`${check.file}: missing marker "${marker}"`);
      }
    }
  } catch (error) {
    failures.push(`${check.file}: ${error.code === "ENOENT" ? "missing" : error.message}`);
  }
}

if (failures.length > 0) {
  console.error("Star Chef v0.7 database toolkit contract failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Star Chef v0.7 database toolkit contract passed.");
