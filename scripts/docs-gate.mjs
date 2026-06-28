#!/usr/bin/env node
/**
 * docs-gate — blocks a push only when a *significant* change ships without a doc update.
 *
 * Honors the rule: trivial changes (formatting, small fixes, refactors) pass freely and
 * are recorded by git itself (see docs-pending). A *significant* change must be accompanied
 * by a documentation edit somewhere in the pushed range, or the push is blocked.
 *
 * SIGNIFICANT = any of:
 *   - a route added/removed         (A/D on app/api/**\/route.ts)
 *   - a page added/removed          (A/D on app/**\/page.tsx)
 *   - a schema change               (any change to lib/db/*.sql)
 *   - a dependency change           (dependencies in package.json)
 *   - a new env var used in code     (added process.env.X not already in CLAUDE.md)
 *   - a commit tagged feat / feat! / BREAKING CHANGE
 *
 * DOC update = any *.md changed in the same range.
 *
 * Invocation:
 *   - pre-push:  reads "<localRef> <localSha> <remoteRef> <remoteSha>" lines on stdin
 *   - CI / CLI:  node scripts/docs-gate.mjs --base <sha> --head <sha>
 *
 * Exit 0 = allowed, 1 = blocked.
 */
import { execSync } from 'node:child_process';
import { readFileSync, existsSync, readFileSync as rf } from 'node:fs';

const sh = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};
const ZERO = /^0+$/;
const claude = existsSync('CLAUDE.md') ? readFileSync('CLAUDE.md', 'utf8') : '';

/** Resolve the list of {base, head} ranges to evaluate. */
function ranges() {
  const args = process.argv.slice(2);
  const baseIdx = args.indexOf('--base');
  const headIdx = args.indexOf('--head');
  if (baseIdx !== -1 && headIdx !== -1) {
    return [{ base: args[baseIdx + 1], head: args[headIdx + 1] }];
  }
  // pre-push: parse stdin
  let stdin = '';
  try {
    stdin = rf(0, 'utf8');
  } catch {
    stdin = '';
  }
  const out = [];
  for (const line of stdin.split('\n').filter(Boolean)) {
    const [, localSha, , remoteSha] = line.split(/\s+/);
    if (!localSha || ZERO.test(localSha)) continue; // branch deletion
    let base;
    if (!remoteSha || ZERO.test(remoteSha)) {
      // new branch: compare against what main already has
      base = sh(`git merge-base origin/main ${localSha}`) || sh('git rev-parse origin/main') || '';
    } else {
      base = remoteSha;
    }
    out.push({ base, head: localSha });
  }
  return out;
}

function evaluate({ base, head }) {
  const spec = base ? `${base}..${head}` : head;
  const nameStatus = sh(`git diff --name-status ${spec}`);
  if (!nameStatus) return { significant: false, docTouched: false, reasons: [] };

  const files = nameStatus.split('\n').map((l) => {
    const [status, ...rest] = l.split(/\t/);
    return { status: status[0], path: rest.join('\t') };
  });

  const reasons = [];
  const isAddDel = (f, re) => (f.status === 'A' || f.status === 'D') && re.test(f.path);

  for (const f of files) {
    if (isAddDel(f, /^app\/api\/.*\/route\.ts$/)) reasons.push(`route ${f.status === 'A' ? 'added' : 'removed'}: ${f.path}`);
    if (isAddDel(f, /^app\/.*\/page\.tsx$/)) reasons.push(`page ${f.status === 'A' ? 'added' : 'removed'}: ${f.path}`);
    if (/^lib\/db\/.*\.sql$/.test(f.path)) reasons.push(`schema change: ${f.path}`);
  }

  // dependency change in package.json
  if (files.some((f) => f.path === 'package.json')) {
    const diff = sh(`git diff ${spec} -- package.json`);
    if (/^[+-]\s*"[^"]+":\s*"[~^]?\d/m.test(diff)) reasons.push('dependency change in package.json');
  }

  // new env var referenced in code, not yet in CLAUDE.md
  const addedEnv = (sh(`git diff ${spec} -- app lib services`)
    .split('\n')
    .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
    .join('\n')
    .match(/process\.env\.[A-Z0-9_]+/g) || [])
    .map((s) => s.replace('process.env.', ''));
  const newEnv = [...new Set(addedEnv)].filter((v) => claude && !claude.includes(v));
  if (newEnv.length) reasons.push(`new env var(s) not in CLAUDE.md: ${newEnv.join(', ')}`);

  // commit-message significance
  const msgs = sh(`git log ${spec} --format=%s%n%b`);
  if (/(^|\n)\s*feat(\(|!|:)|BREAKING CHANGE/i.test(msgs)) reasons.push('commit tagged feat/feat!/BREAKING');

  const docTouched = files.some((f) => /\.md$/.test(f.path));
  return { significant: reasons.length > 0, docTouched, reasons };
}

const evals = ranges().map(evaluate);
const significant = evals.some((e) => e.significant);
const docTouched = evals.some((e) => e.docTouched);
const reasons = [...new Set(evals.flatMap((e) => e.reasons))];

if (significant && !docTouched) {
  console.error('\n━━━ ❌ docs-gate: significant change with no documentation update ━━━\n');
  console.error('This push contains significant change(s):');
  for (const r of reasons) console.error(`  • ${r}`);
  console.error('\n…but no *.md file was updated in the same push.\n');
  console.error('Update the relevant doc and amend/add a commit, then push again:');
  console.error('  • architecture → SITE_STATE.md / CLAUDE.md');
  console.error('  • tests        → docs/testing-plan.md / CLAUDE.md testing section');
  console.error('  • failures     → docs/FAILED_SCENARIOS.md');
  console.error('  • to-dos       → CLAUDE.md "Pending Tasks"\n');
  console.error('Changes accumulated since docs were last updated:\n');
  try {
    console.error(execSync('node scripts/docs-pending.mjs', { encoding: 'utf8' }));
  } catch {}
  console.error('\n(Trivial-only pushes are never blocked. To override in a genuine emergency: DOCS_GATE_OVERRIDE=yes)\n');
  process.exit(process.env.DOCS_GATE_OVERRIDE === 'yes' ? 0 : 1);
}

console.log(
  significant
    ? '✓ docs-gate: significant change is accompanied by a doc update.'
    : '✓ docs-gate: no significant change (trivial push — recorded by git).'
);
process.exit(0);
