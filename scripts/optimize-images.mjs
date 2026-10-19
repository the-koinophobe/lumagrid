// Shrink every photo in /public in place: fix rotation, cap the long edge,
// strip metadata and re-encode with mozjpeg. Safe to run again; files that
// are already small are left alone.
//
//   node scripts/optimize-images.mjs
//
// Run it after adding new photos. Next/Image still makes responsive sizes at
// request time; this just keeps the originals small so builds, the repo and
// raw <img> tags in blog posts stay light.
import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..", "public");
const MAX_EDGE = 1920;
const QUALITY = 78;
const SKIP = /icon|manifest|logo|og[\\/]default/i;

let before = 0, after = 0, count = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(jpe?g)$/i.test(name) && !SKIP.test(p)) files.push(p);
  }
}
const files = [];
walk(ROOT);

for (const file of files) {
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();
  const out = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();
  before += input.length;
  if (out.length < input.length * 0.95) {
    fs.writeFileSync(file, out);
    after += out.length;
    count++;
    console.log(`${(input.length / 1024).toFixed(0).padStart(5)}KB -> ${(out.length / 1024).toFixed(0).padStart(4)}KB  ${meta.width}x${meta.height}  ${path.relative(ROOT, file)}`);
  } else {
    after += input.length;
  }
}
console.log(`\n${count}/${files.length} files shrunk: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
