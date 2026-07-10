#!/usr/bin/env node
/**
 * Validate a Janaru journals/ tree (or a single context.md).
 * Usage: node scripts/validate.mjs [path]
 * Default path: ./journals or cwd if it looks like a journals root.
 * Exit 0 = pass, 1 = fail.
 */

import fs from "node:fs";
import path from "node:path";

const MAX_CONTEXT_CHARS = 1200; // ~300 tokens heuristic
const DATE_FOLDER = /^\d{4}-\d{2}-\d{2}$/;
const PLACEHOLDER = /\{[A-Z][A-Z0-9_]*\}/;

const args = process.argv.slice(2);
const target = path.resolve(args[0] || guessRoot());

const errors = [];
const warnings = [];

function guessRoot() {
  if (fs.existsSync("journals")) return "journals";
  return ".";
}

function estimateTokens(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words * 1.3);
}

/** Body of an ## Section until the next ## heading (or EOF). */
function sectionAfter(text, name) {
  const re = new RegExp(`^##\\s+${name}\\b[^\\n]*\\n`, "im");
  const m = re.exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^##\s+/m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function validateContext(file, rel = file) {
  const text = read(file);
  const tokens = estimateTokens(text);
  const chars = text.length;

  if (!/^#\s+/m.test(text)) {
    errors.push(`${rel}: missing top-level heading`);
  }
  if (!/Updated:\s*\S+/i.test(text)) {
    errors.push(`${rel}: missing Updated: timestamp`);
  }
  if (!/^##\s+(State|Status)\b/m.test(text)) {
    errors.push(`${rel}: missing ## State (or ## Status)`);
  }
  const nextBody = sectionAfter(text, "Next");
  if (nextBody == null) {
    errors.push(`${rel}: missing ## Next`);
  } else if (!nextBody || /^(tbd|\?|-?\s*none\.?)$/i.test(nextBody)) {
    errors.push(`${rel}: ## Next is empty or non-actionable`);
  }

  if (chars > MAX_CONTEXT_CHARS || tokens > 300) {
    errors.push(
      `${rel}: over budget (${chars} chars, ~${tokens} tokens; max ~${MAX_CONTEXT_CHARS} chars / ~300 tokens)`,
    );
  }

  if (/Checkpoint Protocol|Say "checkpoint"/i.test(text)) {
    warnings.push(`${rel}: stale checkpoint wording — use savegame`);
  }
  if (/journals\/\{?PROJECT\}?\//i.test(text) || /journals\/[^/\s]+\/\d{4}-\d{2}-\d{2}/.test(text)) {
    if (!/journals\/\d{4}-\d{2}-\d{2}\//.test(text)) {
      warnings.push(`${rel}: non-canonical path hint (prefer journals/YYYY-MM-DD/)`);
    }
  }
}

function validateEcosystem(file, rel = file) {
  const text = read(file);
  const leftovers = text.match(PLACEHOLDER);
  if (leftovers) {
    errors.push(`${rel}: unfilled placeholder ${leftovers[0]}`);
  }
}

function validateDictionary(file, rel = file) {
  const text = read(file);
  if (!/^version:\s*\d+\.\d+\.\d+/m.test(text)) {
    warnings.push(`${rel}: missing version: X.Y.Z header`);
  }
  for (const w of ["savegame", "loadgame", "newgame", "shipit", "auditthor", "freshstart"]) {
    if (!new RegExp(`^##\\s+${w}\\b`, "m").test(text)) {
      errors.push(`${rel}: missing ## ${w}`);
    }
  }
}

function walkJournals(root) {
  const eco = path.join(root, "ecosystem.md");
  if (fs.existsSync(eco)) validateEcosystem(eco, "ecosystem.md");

  const dict = path.join(root, "dictionary.md");
  if (fs.existsSync(dict)) validateDictionary(dict, "dictionary.md");

  const entries = fs.readdirSync(root, { withFileTypes: true });
  let contexts = 0;
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    if (!DATE_FOLDER.test(ent.name)) {
      warnings.push(`${ent.name}/: not a YYYY-MM-DD date folder (extensions ok if intentional)`);
      continue;
    }
    const ctx = path.join(root, ent.name, "context.md");
    if (fs.existsSync(ctx)) {
      contexts++;
      validateContext(ctx, `${ent.name}/context.md`);
    }
  }
  if (contexts === 0 && isDir(root)) {
    // Maybe a single context.md was passed, or empty journals
    const single = path.join(root, "context.md");
    if (fs.existsSync(single)) {
      validateContext(single, "context.md");
    } else if (!fs.existsSync(eco) && !fs.existsSync(dict)) {
      errors.push(`${root}: no context.md, ecosystem.md, or dictionary.md found`);
    }
  }
}

function main() {
  if (!fs.existsSync(target)) {
    console.error(`Not found: ${target}`);
    process.exit(1);
  }

  const stat = fs.statSync(target);
  if (stat.isFile()) {
    const base = path.basename(target);
    if (/ecosystem/i.test(base)) validateEcosystem(target, base);
    else if (/dictionary/i.test(base)) validateDictionary(target, base);
    else validateContext(target, base);
  } else {
    walkJournals(target);
  }

  for (const w of warnings) console.warn(`warn: ${w}`);
  for (const e of errors) console.error(`fail: ${e}`);

  if (errors.length) {
    console.error(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
    process.exit(1);
  }
  console.log(`ok — ${warnings.length} warning(s)`);
  process.exit(0);
}

main();
