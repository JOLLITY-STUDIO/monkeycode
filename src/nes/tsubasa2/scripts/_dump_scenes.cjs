const fs = require('fs');

function readLines(file) { return fs.readFileSync(file, 'utf8').split(/\r?\n/); }

// Logical line ends with " ; $XXXX" (possibly wrapped). Build addr index.
function buildIndex(lines) {
  const idx = {};
  let current = [];
  let curAddr = null;
  const logical = [];
  for (const raw of lines) {
    const m = raw.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
    current.push(raw.trim());
    if (m) {
      curAddr = m[1].toUpperCase();
      logical.push({ addr: curAddr, code: current.join(' ').replace(/\s+/g, ' ').trim() });
      current = [];
    }
  }
  if (current.length) logical.push({ addr: curAddr ?? '????', code: current.join(' ').replace(/\s+/g, ' ').trim() });
  logical.forEach((e, i) => { if (e.addr !== '????') idx[e.addr] = i; });
  return { idx, logical };
}

function dumpRegion(lines, idx, logical, start, end, label) {
  const s = idx[start.toUpperCase()];
  if (s === undefined) { console.log(`=== ${label} $${start} NOT FOUND ===`); return; }
  const e = idx[end.toUpperCase()];
  const stop = (e !== undefined && e > s) ? e : s + 40;
  console.log(`=== ${label} $${start}..$${end} ===`);
  for (let i = s; i < Math.min(stop, logical.length); i++) {
    console.log(`  ${logical[i].addr} ${logical[i].code}`);
  }
}

const b02sub = readLines('src/asm/bank02/code_sub.s');
const b02data = readLines('src/asm/bank02/code_data.s');
const b02main = readLines('src/asm/bank02/code_main.s');
const b00main = readLines('src/asm/bank00/code_main.s');
const b00scene = readLines('src/asm/bank00/code_scene.s');

// scenes 1-13 in code_sub.s (relative)
let { idx, logical } = buildIndex(b02sub);
console.log('========== code_sub.s scenes 1-13 ==========');
for (const a of ['855A', '857C', '8582', '85A3', '85A9', '85B1', '85B9', '85C0', '85CE', '85DC', '85E9', '8603', '861D']) {
  dumpRegion(b02sub, idx, logical, a, (parseInt(a, 16) + 0x24).toString(16).toUpperCase().padStart(4, '0'), 'scene');
}
console.log('========== code_sub.s 8486 dispatch ==========');
dumpRegion(b02sub, idx, logical, '8486', '84C0', 'dispatch');

// scenes 14-23 + subs in code_data.s (relative)
({ idx, logical } = buildIndex(b02data));
console.log('========== code_data.s scenes 14-23 ==========');
for (const a of ['862A', '8651', '869D', '877B', '8783', '878E', '87BE', '87CF', '87D7', '87FB']) {
  dumpRegion(b02data, idx, logical, a, (parseInt(a, 16) + 0x90).toString(16).toUpperCase().padStart(4, '0'), 'scene');
}
console.log('========== code_data.s subs A72C/A767/A82F ==========');
for (const a of ['872C', '8767', '882F']) {
  dumpRegion(b02data, idx, logical, a, (parseInt(a, 16) + 0x60).toString(16).toUpperCase().padStart(4, '0'), 'sub');
}

// bank00 subs 8895/8920/8976/88CA in code_main.s
({ idx, logical } = buildIndex(b00main));
console.log('========== bank00 code_main.s subs ==========');
for (const a of ['8895', '8920', '8976', '88CA']) {
  dumpRegion(b00main, idx, logical, a, (parseInt(a, 16) + 0x60).toString(16).toUpperCase().padStart(4, '0'), 'sub');
}

// bank00 8C6D/8C71 nibble-to-tile in code_scene.s
({ idx, logical } = buildIndex(b00scene));
console.log('========== bank00 code_scene.s nibble 8C6D/8C71 ==========');
for (const a of ['8C6D', '8C71']) {
  dumpRegion(b00scene, idx, logical, a, (parseInt(a, 16) + 0x20).toString(16).toUpperCase().padStart(4, '0'), 'sub');
}
console.log('DONE');
