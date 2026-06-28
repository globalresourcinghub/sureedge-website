#!/usr/bin/env node
/**
 * docs-pending — lists code commits made since documentation was last updated.
 *
 * "Pending" = commits that touched code (app/ lib/ services/ components/) after the
 * most recent commit that touched any *.md doc. This is the running record of changes
 * that have not yet been reflected in the docs — derived from git, never hand-kept.
 *
 * Used by: docs-gate (block message), /wrap, and the SessionStart hook.
 * Exit code is always 0 — this is a report, not a gate.
 */
import { execSync } from 'node:child_process';

const sh = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

// Pathspecs. '*.md' matches any .md at any depth (git pathspec semantics).
const DOC_PATHS = `'*.md'`;
const CODE_PATHS = 'app lib services components';

const lastDocCommit = sh(`git log -1 --format=%H -- ${DOC_PATHS}`);
const range = lastDocCommit ? `${lastDocCommit}..HEAD` : 'HEAD';
const commits = sh(`git log ${range} --format='%h %s' -- ${CODE_PATHS}`);

if (!commits) {
  console.log('✓ No code commits since docs were last updated.');
  process.exit(0);
}

const since = lastDocCommit
  ? `${lastDocCommit.slice(0, 7)} (last doc update)`
  : 'repository start';
const lines = commits.split('\n');
console.log(`Code commits not yet reflected in docs — since ${since}:\n`);
console.log(commits);
console.log(`\n(${lines.length} commit${lines.length === 1 ? '' : 's'}. Reconcile into SITE_STATE.md / CLAUDE.md / docs/ on the next significant change, or via /wrap.)`);
process.exit(0);
