// 快速分析: fap rooster 全文 + lap Coffee maker 正文值网格
const fs = require('fs');
const BASE = 'd:/studio/github/monkeycode/src/nds/picpic/';
let out = '';

function hexDump(b, label) {
  out += `\n=== ${label} (len=${b.length}) ===\n`;
  for (let i = 0; i < b.length; i += 16) {
    const slice = b.slice(i, i + 16);
    out += i.toString(16).padStart(4, '0') + ': ' +
      Array.from(slice).map(x => x.toString(16).padStart(2, '0')).join(' ') + '\n';
  }
}

// 1) rooster.fap 全文
const fb = fs.readFileSync(BASE + 'roms/extracted/fap_d/3300401_rooster.fap');
hexDump(fb, 'rooster.fap');

// 2) fap 15x15 nibble 值视图 (head=2, low-first)
out += '\n=== rooster nibble 值视图 (15x15) ===\n';
for (let y = 0; y < 15; y++) {
  let l = '';
  for (let x = 0; x < 15; x++) {
    const i = y * 15 + x;
    const byte = fb[2 + (i >> 1)];
    const v = (i & 1) ? (byte >> 4) : (byte & 0x0F);
    l += v.toString(16);
  }
  out += l + '\n';
}

// 3) Coffee maker.lap 值网格 (26头, 20x20)
const lb = fs.readFileSync(BASE + 'roms/extracted/lap_d/1_dat/2000203_Coffee maker.lap');
out += `\n=== Coffee maker.lap 值网格 (head=26, ${lb[0]}x${lb[1]}) ===\n`;
const hh = lb[0], ww = lb[1];
for (let y = 0; y < hh; y++) {
  let l = '';
  for (let x = 0; x < ww; x++) {
    const v = lb[26 + y * ww + x];
    l += (v === 0) ? '.' : (v === 1 ? '#' : v.toString(16));
  }
  out += l + '\n';
}

fs.writeFileSync(BASE + 'tools/_maze_out.txt', out);
console.log('written', out.length);
