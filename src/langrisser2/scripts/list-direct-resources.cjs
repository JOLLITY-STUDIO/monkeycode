const fs = require('fs');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const rd = (a) => rom[a] & 0xFF;
const rw = (a) => (rd(a) << 8) | rd(a + 1);
const rl = (a) => (rd(a) << 24) | (rd(a + 1) << 16) | (rd(a + 2) << 8) | rd(a + 3);
function hex(a, n) { return '0x' + a.toString(16).padStart(n || 6, '0'); }

function decompLZSS(p) {
  const sz = rw(p + 1);
  const out = new Uint8Array(sz);
  const win = new Uint8Array(0x1000).fill(0x20);
  let w = 0x0FEE, o = 0, s = p + 3, r = sz;
  while (r > 0) {
    const f = rd(s++);
    for (let b = 0; b < 8 && r > 0; b++) {
      if ((f >> b) & 1) {
        const v = rd(s++);
        win[w] = v; out[o++] = v; w = (w + 1) & 0xFFF; r--;
      } else {
        const b1 = rd(s++), b2 = rd(s++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && r > 0; i++) {
          const v = win[off];
          win[w] = v; out[o++] = v; off = (off + 1) & 0xFFF; w = (w + 1) & 0xFFF; r--;
        }
      }
    }
  }
  return out;
}

console.log('Direct resource table (0x0B0000) first 64 entries:');
for (let i = 0; i < 64; i++) {
  const p = rl(0x0B0000 + i * 4);
  const tp = rd(p);
  let sz = 0;
  try {
    if (tp === 3) {
      sz = decompLZSS(p).length;
    } else if (tp === 1 || tp === 2) {
      sz = rw(p + 1); // rough
    }
  } catch (e) { sz = -1; }
  console.log(`#${i.toString().padStart(2, '0')}: ptr=${hex(p)} type=${tp} size=${sz}`);
}
