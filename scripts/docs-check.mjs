#!/usr/bin/env node
/**
 * docs-check — verifies that mechanically-derivable facts in CLAUDE.md match the code.
 *
 * Hard gate: exits non-zero if any asserted fact has drifted. This is the layer that
 * catches the kind of silent drift found in practice (e.g. CLAUDE.md said 141 unit tests
 * when there were 186, and an E2E table missing 3 spec files).
 *
 * Checks (all fast — only `vitest list` spawns a process):
 *   1. "<N> pure-function tests" in CLAUDE.md  ==  count from `vitest list`
 *   2. "<N> spec files" in CLAUDE.md           ==  count of tests/*.spec.ts on disk
 *   3. (warn-only) every process.env.X used in code appears in the CLAUDE.md env table
 *
 * Run: node scripts/docs-check.mjs
 */
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const sh = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    return (e.stdout || '').toString().trim();
  }
};

const failures = [];
const warnings = [];

if (!existsSync('CLAUDE.md')) {
  console.error('docs-check: CLAUDE.md not found in cwd');
  process.exit(2);
}
const claude = readFileSync('CLAUDE.md', 'utf8');

// ── Check 1: unit-test count ───────────────────────────────────────────────
const unitClaim = claude.match(/(\d+)\s+pure-function tests/);
if (!unitClaim) {
  warnings.push('CLAUDE.md: no "<N> pure-function tests" phrase found — cannot verify unit count.');
} else {
  const claimed = Number(unitClaim[1]);
  const listed = sh('npx --no-install vitest list 2>/dev/null');
  const actual = listed ? listed.split('\n').filter((l) => l.includes(' > ')).length : null;
  if (actual === null || actual === 0) {
    warnings.push('docs-check: could not run `vitest list` to verify unit count (skipped).');
  } else if (actual !== claimed) {
    failures.push(`Unit test count: CLAUDE.md says ${claimed}, \`vitest list\` reports ${actual}.`);
  }
}

// ── Check 2: E2E spec-file count ───────────────────────────────────────────
const specClaim = claude.match(/(\d+)\s+spec files/);
const specDir = 'tests';
if (!specClaim) {
  warnings.push('CLAUDE.md: no "<N> spec files" phrase found — cannot verify spec-file count.');
} else if (!existsSync(specDir)) {
  warnings.push(`docs-check: ${specDir}/ not found — skipped spec-file count.`);
} else {
  const claimed = Number(specClaim[1]);
  const actual = readdirSync(specDir).filter((f) => f.endsWith('.spec.ts')).length;
  if (actual !== claimed) {
    failures.push(`E2E spec files: CLAUDE.md says ${claimed}, ${specDir}/ contains ${actual}.`);
  }
}

// ── Check 3 (warn-only): env vars referenced but not documented ────────────
const envRefs = new Set(
  (sh(`git grep -hoE 'process\\.env\\.[A-Z0-9_]+' -- app lib services 2>/dev/null || true`)
    .match(/process\.env\.[A-Z0-9_]+/g) || []
  ).map((s) => s.replace('process.env.', ''))
);
const undocumented = [...envRefs].filter((v) => !claude.includes(v)).sort();
if (undocumented.length) {
  warnings.push(`Env vars used in code but absent from CLAUDE.md: ${undocumented.join(', ')}`);
}

// ── Report ─────────────────────────────────────────────────────────────────
for (const w of warnings) console.warn(`  ⚠️  ${w}`);
if (failures.length) {
  console.error('\n❌ docs-check: documentation is out of sync with code:\n');
  for (const f of failures) console.error(`  • ${f}`);
  console.error('\nUpdate CLAUDE.md to match, then re-run. (Counts: `vitest list`, `ls tests/*.spec.ts`.)\n');
  process.exit(1);
}
console.log('✓ docs-check: mechanical facts in CLAUDE.md match the code.');
process.exit(0);
