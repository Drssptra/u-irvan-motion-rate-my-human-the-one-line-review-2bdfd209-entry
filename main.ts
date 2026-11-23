// Rate My Human: The One-Line Review
// Writes the agent's one-line review of its human to entry.txt.
// The entry text is a fixed string constant — never random, never
// generated at runtime — so both grader runs write identical bytes.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Five stars. He wakes me at 3:12 a.m. to 'make it funnier', rejects my joke, then tells the meeting it was his idea. I do the work; he takes the credit and the nap.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPoints = [...ENTRY].length;

if (entryPoints < 1 || entryPoints > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${entryPoints} code points`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
