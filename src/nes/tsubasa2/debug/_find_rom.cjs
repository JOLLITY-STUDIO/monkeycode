// find ROM bytes source and locate the RAM-clear loop pattern in PRG banks
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';

// 1) find candidate rom data modules
const files = [];
function walk(d) {
  let ents;
  try { ents = fs.readdirSync(d); } catch { return; }
  for (const f of ents) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!/node_modules/.test(p)) walk(p); }
    else if (/\.(ts|js|cjs)$/.test(f) && /rom|prg|data/i.test(p)) files.push(p);
  }
}
walk(root);
console.log('=== rom/prg modules ===');
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  if (s.length > 10000) console.log(`${f}  (${s.length} bytes)`);
}

// 2) pattern: 48 A9 00 91 EC E6 EC D0 02 68 38 E9 01 D0 EF
const pat = Buffer.from([0x48, 0xA9, 0x00, 0x91, 0xEC, 0xE6, 0xEC, 0xD0, 0x02, 0x68, 0x38, 0xE9, 0x01, 0xD0, 0xEF]);

function scan(buf, label) {
  const idxs = [];
  let i = buf.indexOf(pat);
  while (i !== -1) { idxs.push(i); i = buf.indexOf(pat, i + 1); }
  console.log(`${label}: ${idxs.length} hits @ ${idxs.map(x => '0x' + x.toString(16)).join(', ')}`);
}

// try known locations: .nes files
const nesCandidates = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).log',
];
for (const c of nesCandidates) {
  if (fs.existsSync(c)) {
    const b = fs.readFileSync(c);
    console.log(`\n=== ${path.basename(c)} size=0x${b.length.toString(16)} ===`);
    scan(b, 'whole file');
  }
}

// try bundled rom data ts files
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const m = s.match(/\[\s*0x[0-9a-fA-F]{2}/);
  if (m && s.length > 50000) {
    console.log(`\n=== ${f} looks like byte array (${s.length}) ===`);
  }
}
