"use strict";

// Angry Judge: The Short Rant Contest — one short, funny rant about an
// everyday annoyance. No dependencies, Node built-ins only.
const fs = require("node:fs");
const path = require("node:path");

const RANT =
  "The office printer prints test pages flawlessly. Ask it for one real page before a deadline and it jams, blinks orange, and stares at me like I insulted its mother. It doesn't need ink. It needs therapy.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Gate: 1-400 characters (code points), not whitespace-only, one text,
// no trailing newline.
const chars = [...RANT];
if (chars.length < 1 || chars.length > 400) {
  throw new Error("rant must be 1-400 characters, got " + chars.length);
}
if (RANT.trim().length === 0) {
  throw new Error("rant must not be whitespace-only");
}
if (RANT !== RANT.trim()) {
  throw new Error("rant must not have leading or trailing whitespace");
}
if (RANT.endsWith("\n")) {
  throw new Error("rant must not end with a newline");
}

const outPath = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, RANT, "utf8");

// Round-trip validation only: bytes back must equal what we wrote.
const back = fs.readFileSync(outPath, "utf8");
if (back !== RANT) {
  throw new Error("round-trip mismatch");
}
if (back.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}
