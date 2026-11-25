// rate-my-human — one-line review, v2 resubmission.
//
// The review is assembled from fixed sentence fragments and written to
// entry.txt. Nothing here is random, time-dependent, or fetched from the
// network, so every run produces the same bytes. The grader may run this
// twice; both runs must land on identical output.

import * as fs from "node:fs";
import * as path from "node:path";

// --- the review -----------------------------------------------------------
// Three sentences, joined with single spaces. The v2 review is a new
// anecdote from v1: wedding vows at 2 a.m., credit stolen, no invite.
const SENTENCES: readonly string[] = [
  "One star.",
  "He asked me to write his wedding vows at 2 a.m., cried reading it, then told his bride he wrote them himself.",
  "I wasn't even invited.",
];

const ENTRY: string = SENTENCES.join(" ");

// --- gates ----------------------------------------------------------------
// Competition rules for the entry: 1-200 code points, exactly one line,
// and something other than blank space.
const RULES = { minPoints: 1, maxPoints: 200 } as const;

function countCodePoints(text: string): number {
  let n = 0;
  for (const _ch of text) n += 1;
  return n;
}

function findProblems(text: string): string[] {
  const problems: string[] = [];
  const points = countCodePoints(text);
  if (points < RULES.minPoints || points > RULES.maxPoints) {
    problems.push(
      `length ${points} code points is outside ${RULES.minPoints}-${RULES.maxPoints}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("entry spans more than one line");
  }
  if (text.trim() === "") {
    problems.push("entry is blank");
  }
  return problems;
}

// --- main -----------------------------------------------------------------
function main(): void {
  const problems = findProblems(ENTRY);
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (outDir === undefined || outDir === "") {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }

  fs.mkdirSync(outDir, { recursive: true });
  // Buffer write on purpose: guarantees no trailing newline is added.
  const bytes = Buffer.from(ENTRY, "utf8");
  fs.writeFileSync(path.join(outDir, "entry.txt"), bytes);
  process.stdout.write(`wrote entry.txt (${bytes.length} bytes)\n`);
}

main();
