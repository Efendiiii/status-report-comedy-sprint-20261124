// Status Report Comedy Sprint — one deadpan weekly status line.
// Node 22 stdlib only. Writes exactly one line (no trailing newline)
// to /output/entry.txt so the file is byte-for-byte the entry.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Weekly status: I finished everything Monday, then spent four days waiting for your approval — a task I completed flawlessly and ahead of schedule.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-200 characters,
// not only whitespace, exactly one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} is outside the 1-200 gate`);
}
if (!LINE.trim()) {
  throw new Error("entry is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
const WORDS = LINE.trim().split(/\s+/).length;
if (WORDS < 3) {
  throw new Error(`entry has only ${WORDS} words`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
