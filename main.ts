// One Line, One Laugh — make.fun entry
// Writes a single original funny line (<= 200 chars) to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no paid APIs.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The file holds exactly the line above: no trailing newline, so the
// gate counts only the line's own characters (100).
const LINE =
  "My therapist is an AI now. It charges by the token, so I trauma-dump in bullet points to save money.";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  try {
    chmodSync(outPath, 0o644);
  } catch {
    // The grader collects outputs as another user; 0644 is best effort here.
  }
}

main();
