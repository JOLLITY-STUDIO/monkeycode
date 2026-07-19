import fs from 'fs';
import path from 'path';

function walk(dir) {
  try { return fs.readdirSync(dir).map((x) => path.join(dir, x)); }
  catch { return []; }
}

function findText(dir, pat) {
  const q = [dir];
  const hits = [];
  while (q.length) {
    const c = q.pop();
    let s;
    try { s = fs.statSync(c); } catch { continue; }
    if (s.isDirectory()) { q.push(...walk(c)); continue; }
    if (!/\.(js|mjs|cjs|ts|mts|html)$/.test(c)) continue;
    let t;
    try { t = fs.readFileSync(c, 'utf8'); } catch { continue; }
    if (pat.test(t)) hits.push(c);
  }
  return hits;
}

console.log('--- files mentioning title scene / nametable / tilemap ---');
const files = findText('.', /nametable|tilemap|scene.*title|title.*scene/i);
for (const f of files) console.log(f);

console.log('\n--- files mentioning output image names ---');
const imgs = findText('.', /title-compare|plane-a-title|verify-rom-title|nametable-layout|tilemap-row|tilemap-plane/);
for (const f of imgs) console.log(f);

console.log('\n--- files mentioning 64列|40x28|64\*32|C000.*nametable ---');
const layout = findText('.', /64列|40x28|64\*32|40\*28|nametable.*C000|C000.*nametable/);
for (const f of layout) console.log(f);
