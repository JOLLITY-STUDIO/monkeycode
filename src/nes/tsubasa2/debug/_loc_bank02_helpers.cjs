// Extract routines from bank02/_full.s by address
const fs = require('fs');
const src = fs.readFileSync('src/asm/bank02/_full.s', 'utf8').split(/\r?\n/);

// Build map: addr -> line index (only for lines with "; $XXXX" comments)
const map = new Map();
for (let i = 0; i < src.length; i++) {
  const m = /;\s*\$([0-9A-Fa-f]{4})/.exec(src[i]);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (!map.has(addr)) map.set(addr, i);
  }
}

function dump(from, to, label) {
  console.log(`\n===== ${label} $${from.toString(16).toUpperCase()}-$${to.toString(16).toUpperCase()} =====`);
  if (!map.has(from)) { console.log('  (start not found)'); return; }
  const start = map.get(from);
  let i = start;
  let end = start;
  while (i < src.length) {
    const m = /;\s*\$([0-9A-Fa-f]{4})/.exec(src[i]);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a > to) break;
      end = i;
    }
    i++;
  }
  for (let j = start; j <= end; j++) console.log(src[j]);
}

const targets = [
  [0x8895, 0x8975, '8895 loadChrConfig'],
  [0x8920, 0x8975, '8920 loadSceneData'],
  [0x8976, 0x8A20, '8976 load NT stream'],
  [0x98E8, 0x9900, '98E8 fill rows'],
  [0x9A35, 0x9A70, '9A35 loadPalettes+Fade'],
  [0x9B28, 0x9B6F, '9B28/9B5E NT buffer'],
  [0x9B7F, 0x9BA0, '9B7F/9B91 hide OAM + clear ext'],
  [0x9E36, 0x9E80, '9E36 div10 + 9E7C BCD'],
  [0x9F89, 0x9FA8, '9F89/9F96/9FA8'],
  [0xA72C, 0xA77A, 'A72C sprite stamp + A767 blob copy'],
  [0xA82F, 0xA855, 'A82F sprite OAM loader'],
];
for (const [f, t, l] of targets) dump(f, t, l);
