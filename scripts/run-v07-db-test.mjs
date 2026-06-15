#!/usr/bin/env node

import { existsSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const composeFile = join(root, "db", "docker-compose.v07-test.yml");
const nativePort = process.env.STAR_CHEF_TEST_PORT || "54329";
const nativeSocketDir = "/private/tmp";
const nativeDataDir = process.env.STAR_CHEF_TEST_DATA_DIR || "/private/tmp/starchef-pg16-v07";
const nativeLogFile = process.env.STAR_CHEF_TEST_LOG || `${nativeDataDir}.log`;
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

function dockerIsReady() {
  const version = run("docker", ["--version"]);
  if (!version.ok) {
    return { ok: false, reason: "Docker CLI is not installed." };
  }

  const compose = run("docker", ["compose", "version"]);
  if (!compose.ok) {
    return { ok: false, reason: "`docker compose` is not available." };
  }

  const daemon = run("docker", ["info"], { timeout: 5000 });
  if (!daemon.ok) {
    return { ok: false, reason: "Docker daemon is not running." };
  }

  return { ok: true };
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

function waitForDockerDatabase() {
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

function applyDockerSql(sqlPath) {
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

function runDockerDatabaseTest() {
  runRequired("Start PostgreSQL test container", "docker", [
    "compose",
    "-f",
    composeFile,
    "up",
    "-d",
  ]);

  waitForDockerDatabase();

  for (const sqlFile of sqlFiles) {
    applyDockerSql(sqlFile);
  }

  console.log("\nStar Chef v0.7 live database smoke test passed with Docker PostgreSQL.");
  console.log("Inspect with:");
  console.log("docker compose -f db/docker-compose.v07-test.yml exec starchef-postgres psql -U starchef -d starchef_test");
  console.log("Stop with:");
  console.log("docker compose -f db/docker-compose.v07-test.yml down");
}

function findNativePostgresBin() {
  const candidates = [
    process.env.POSTGRES_BIN,
    "/opt/homebrew/opt/postgresql@16/bin",
    "/opt/homebrew/opt/postgresql@17/bin",
    "/opt/homebrew/opt/postgresql@18/bin",
    "/usr/local/opt/postgresql@16/bin",
    "/usr/local/opt/postgresql@17/bin",
    "/usr/local/opt/postgresql@18/bin",
  ].filter(Boolean);

  return candidates.find((candidate) => (
    existsSync(join(candidate, "postgres")) &&
    existsSync(join(candidate, "initdb")) &&
    existsSync(join(candidate, "pg_ctl")) &&
    existsSync(join(candidate, "pg_isready")) &&
    existsSync(join(candidate, "createdb")) &&
    existsSync(join(candidate, "psql"))
  ));
}

function applyNativeSql(binDir, sqlPath) {
  if (!existsSync(sqlPath)) {
    console.error(`[Star Chef v0.7] SQL file missing: ${sqlPath}`);
    process.exit(1);
  }

  runRequired(`Apply ${sqlPath.replace(`${root}/`, "")}`, join(binDir, "psql"), [
    "-h",
    nativeSocketDir,
    "-p",
    nativePort,
    "-U",
    "starchef",
    "-d",
    "starchef_test",
    "-v",
    "ON_ERROR_STOP=1",
    "-f",
    sqlPath,
  ]);
}

function runNativeDatabaseTest(dockerReason) {
  const binDir = findNativePostgresBin();
  if (!binDir) {
    console.error("Docker is not available for Star Chef v0.7 database testing.");
    console.error(`Docker status: ${dockerReason}`);
    console.error("Native PostgreSQL was not found either.");
    console.error("Install Docker Desktop, or install PostgreSQL 16+ with Homebrew:");
    console.error("brew install postgresql@16 libpq");
    console.error("Static validation is still available with: node scripts/test-v07-db-toolkit.mjs");
    process.exit(2);
  }

  console.log(`[Star Chef v0.7] Docker fallback reason: ${dockerReason}`);
  console.log(`[Star Chef v0.7] Using native PostgreSQL binaries: ${binDir}`);

  run(join(binDir, "pg_ctl"), ["-D", nativeDataDir, "stop", "-m", "fast"]);
  rmSync(nativeDataDir, { recursive: true, force: true });
  rmSync(nativeLogFile, { force: true });

  runRequired("Initialize native PostgreSQL test cluster", join(binDir, "initdb"), [
    "-D",
    nativeDataDir,
    "-U",
    "starchef",
    "-A",
    "trust",
    "--no-locale",
    "--encoding=UTF8",
  ]);

  runRequired("Start native PostgreSQL test server", join(binDir, "pg_ctl"), [
    "-D",
    nativeDataDir,
    "-o",
    `-p ${nativePort} -k ${nativeSocketDir}`,
    "-l",
    nativeLogFile,
    "start",
  ]);

  runRequired("Check native PostgreSQL readiness", join(binDir, "pg_isready"), [
    "-h",
    nativeSocketDir,
    "-p",
    nativePort,
    "-U",
    "starchef",
  ]);

  runRequired("Create Star Chef test database", join(binDir, "createdb"), [
    "-h",
    nativeSocketDir,
    "-p",
    nativePort,
    "-U",
    "starchef",
    "starchef_test",
  ]);

  for (const sqlFile of sqlFiles) {
    applyNativeSql(binDir, sqlFile);
  }

  console.log("\nStar Chef v0.7 live database smoke test passed with native PostgreSQL.");
  console.log("Inspect with:");
  console.log(`${join(binDir, "psql")} -h ${nativeSocketDir} -p ${nativePort} -U starchef -d starchef_test`);
  console.log("Stop with:");
  console.log(`${join(binDir, "pg_ctl")} -D ${nativeDataDir} stop -m fast`);
}

const docker = dockerIsReady();
if (docker.ok) {
  runDockerDatabaseTest();
} else {
  runNativeDatabaseTest(docker.reason);
}
