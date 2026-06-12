#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const composeFile = join(root, "db", "docker-compose.v07-test.yml");
const sqlFiles = [
  join(root, "db", "star-chef-v06-schema.sql"),
  join(root, "db", "star-chef-v07-test-seed.sql"),
  join(root, "db", "star-chef-v07-smoke-test.sql"),
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    ...options,
  });

  if (result.error) {
    return { ok: false, code: 127, output: result.error.message };
  }

  return {
    ok: result.status === 0,
    code: result.status ?? 1,
    output: [result.stdout, result.stderr].filter(Boolean).join("\n"),
  };
}

function requireDocker() {
  const version = run("docker", ["--version"]);
  if (!version.ok) {
    console.error("Docker is required for live Star Chef v0.7 database testing.");
    console.error("Install Docker Desktop on this Mac, or run this toolkit on a server that has Docker.");
    console.error("Static validation is still available with: node scripts/test-v07-db-toolkit.mjs");
    process.exit(2);
  }

  const compose = run("docker", ["compose", "version"]);
  if (!compose.ok) {
    console.error("Docker is installed, but `docker compose` is not available.");
    console.error("Install a Docker version with Compose v2 support.");
    process.exit(2);
  }
}

function runRequired(label, command, args, options = {}) {
  console.log(`\n[Star Chef v0.7] ${label}`);
  const result = run(command, args, options);
  if (result.output.trim()) {
    console.log(result.output.trim());
  }
  if (!result.ok) {
    console.error(`[Star Chef v0.7] Failed: ${label}`);
    process.exit(result.code || 1);
  }
}

function waitForDatabase() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const result = run("docker", [
      "compose",
      "-f",
      composeFile,
      "exec",
      "-T",
      "starchef-postgres",
      "pg_isready",
      "-U",
      "starchef",
      "-d",
      "starchef_test",
    ]);

    if (result.ok) {
      console.log("[Star Chef v0.7] PostgreSQL is ready.");
      return;
    }

    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
    process.stdout.write(attempt === 1 ? "[Star Chef v0.7] Waiting for PostgreSQL" : ".");
  }

  console.error("\n[Star Chef v0.7] PostgreSQL did not become ready within 30 seconds.");
  process.exit(1);
}

function applySql(sqlPath) {
  if (!existsSync(sqlPath)) {
    console.error(`[Star Chef v0.7] SQL file missing: ${sqlPath}`);
    process.exit(1);
  }

  runRequired(`Apply ${sqlPath.replace(`${root}/`, "")}`, "docker", [
    "compose",
    "-f",
    composeFile,
    "exec",
    "-T",
    "starchef-postgres",
    "psql",
    "-v",
    "ON_ERROR_STOP=1",
    "-U",
    "starchef",
    "-d",
    "starchef_test",
  ], {
    input: readFileSync(sqlPath, "utf8"),
  });
}

requireDocker();

runRequired("Start PostgreSQL test container", "docker", [
  "compose",
  "-f",
  composeFile,
  "up",
  "-d",
]);

waitForDatabase();

for (const sqlFile of sqlFiles) {
  applySql(sqlFile);
}

console.log("\nStar Chef v0.7 live database smoke test passed.");
console.log("Inspect with:");
console.log("docker compose -f db/docker-compose.v07-test.yml exec starchef-postgres psql -U starchef -d starchef_test");
console.log("Stop with:");
console.log("docker compose -f db/docker-compose.v07-test.yml down");
