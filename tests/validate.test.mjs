import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const validate = path.join(root, "scripts", "validate.mjs");
const score = path.join(root, "scripts", "score.mjs");
const fixtures = path.join(__dirname, "fixtures");

function run(script, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8",
    cwd: root,
  });
}

describe("validate.mjs", () => {
  it("passes good-context.md", () => {
    const r = run(validate, [path.join(fixtures, "good-context.md")]);
    assert.equal(r.status, 0, r.stderr + r.stdout);
  });

  it("fails bloated-context.md", () => {
    const r = run(validate, [path.join(fixtures, "bloated-context.md")]);
    assert.equal(r.status, 1, "expected bloated context to fail");
    assert.match(r.stderr, /over budget/);
  });

  it("passes good-ecosystem.md", () => {
    const r = run(validate, [path.join(fixtures, "good-ecosystem.md")]);
    assert.equal(r.status, 0, r.stderr + r.stdout);
  });

  it("fails stale-ecosystem.md on placeholders", () => {
    const r = run(validate, [path.join(fixtures, "stale-ecosystem.md")]);
    assert.equal(r.status, 1);
    assert.match(r.stderr, /unfilled placeholder/);
  });

  it("passes example/context.md", () => {
    const r = run(validate, [path.join(root, "example", "context.md")]);
    assert.equal(r.status, 0, r.stderr + r.stdout);
  });

  it("dictionary has all six triggers and version", () => {
    const r = run(validate, [path.join(root, "dictionary.md")]);
    assert.equal(r.status, 0, r.stderr + r.stdout);
    const text = fs.readFileSync(path.join(root, "dictionary.md"), "utf8");
    assert.match(text, /^version:\s*3\.0\.0/m);
  });

  it("install.md wire block names all six triggers", () => {
    const text = fs.readFileSync(path.join(root, "install.md"), "utf8");
    for (const w of [
      "shipit",
      "auditthor",
      "savegame",
      "loadgame",
      "newgame",
      "freshstart",
    ]) {
      assert.match(
        text,
        new RegExp(`\`${w}\``),
        `install.md should mention ${w}`,
      );
    }
    // Wire block specifically must include newgame
    assert.match(
      text,
      /When the user says one of them \(`shipit`.+`newgame`.+`freshstart`\)/,
    );
  });
});

describe("score.mjs", () => {
  it("reports JSON for a synthetic journals tree", () => {
    const tmp = path.join(root, "tests", ".tmp-journals");
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.mkdirSync(path.join(tmp, "2026-01-15"), { recursive: true });
    fs.copyFileSync(
      path.join(fixtures, "good-context.md"),
      path.join(tmp, "2026-01-15", "context.md"),
    );
    fs.copyFileSync(
      path.join(root, "dictionary.md"),
      path.join(tmp, "dictionary.md"),
    );

    const r = run(score, [tmp]);
    assert.equal(r.status, 0, r.stderr);
    const report = JSON.parse(r.stdout);
    assert.equal(report.contexts, 1);
    assert.equal(report.pctUnderBudget, 100);
    assert.equal(report.dictionaryVersion, "3.0.0");

    fs.rmSync(tmp, { recursive: true, force: true });
  });
});
