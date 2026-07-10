#!/usr/bin/env node
/**
 * Efficiency report for a Janaru journals/ tree.
 * Usage: node scripts/score.mjs <journals-path>
 */

import fs from "node:fs";
import path from "node:path";

const MAX_TOKENS = 300;
const DATE_FOLDER = /^\d{4}-\d{2}-\d{2}$/;

const root = path.resolve(process.argv[2] || "journals");

function estimateTokens(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words * 1.3);
}

function hasTimestamp(text) {
  return /Updated:\s*\S+/i.test(text);
}

function main() {
  if (!fs.existsSync(root)) {
    console.error(`Not found: ${root}`);
    process.exit(1);
  }

  const contexts = [];
  for (const name of fs.readdirSync(root)) {
    if (!DATE_FOLDER.test(name)) continue;
    const file = path.join(root, name, "context.md");
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const tokens = estimateTokens(text);
    contexts.push({
      date: name,
      tokens,
      chars: text.length,
      underBudget: tokens <= MAX_TOKENS,
      hasUpdated: hasTimestamp(text),
      mtime: fs.statSync(file).mtime,
    });
  }

  contexts.sort((a, b) => a.date.localeCompare(b.date));

  const dictPath = path.join(root, "dictionary.md");
  let dictVersion = null;
  if (fs.existsSync(dictPath)) {
    const m = fs.readFileSync(dictPath, "utf8").match(/^version:\s*([\d.]+)/m);
    dictVersion = m?.[1] || "missing";
  }

  const tokens = contexts.map((c) => c.tokens);
  const median = tokens.length
    ? tokens.slice().sort((a, b) => a - b)[Math.floor(tokens.length / 2)]
    : 0;
  const max = tokens.length ? Math.max(...tokens) : 0;
  const under = contexts.filter((c) => c.underBudget).length;
  const stamped = contexts.filter((c) => c.hasUpdated).length;
  const newest = contexts.length ? contexts[contexts.length - 1] : null;
  const daysSince = newest
    ? Math.floor((Date.now() - newest.mtime.getTime()) / 86400000)
    : null;

  const report = {
    root,
    contexts: contexts.length,
    medianTokens: median,
    maxTokens: max,
    pctUnderBudget: contexts.length
      ? Math.round((under / contexts.length) * 100)
      : 0,
    pctWithUpdated: contexts.length
      ? Math.round((stamped / contexts.length) * 100)
      : 0,
    daysSinceLastSavegame: daysSince,
    dictionaryVersion: dictVersion,
    rows: contexts,
  };

  console.log(JSON.stringify(report, null, 2));

  // Human summary
  console.error(`
Janaru score — ${root}
  contexts: ${report.contexts}
  median tokens: ${report.medianTokens} (target ≤ ${MAX_TOKENS})
  max tokens: ${report.maxTokens}
  under budget: ${report.pctUnderBudget}%
  with Updated: ${report.pctWithUpdated}%
  days since last save: ${report.daysSinceLastSavegame ?? "n/a"}
  dictionary: ${report.dictionaryVersion ?? "none"}
`);
}

main();
