// 分析 380 逐帧 log：帧覆盖 + 每帧 PPU/CHR bank/RAM 写 → 找场景切换行为
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const file = 'tsubasa-when-show380-逐帧.log';
const lines = fs.readFileSync(path.join(DIR, file), 'utf8').split('\n');

const frames = new Map();
const re = /^f(\d+)\s/;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(re);
  if (m) frames.set(parseInt(m[1]), (frames.get(parseInt(m[1])) || 0) + 1);
}
const fsorted = [...frames.keys()].sort((a, b) => a - b);
console.log('frames:', fsorted.length, 'range', fsorted[0], '-', fsorted[fsorted.length - 1]);
console.log('first:', fsorted.slice(0, 15).join(','));
console.log('last:', fsorted.slice(-15).join(','));

// 每帧首行 + PPU 写 + bank 写 + 关键 RAM
let cur = null;
const detail = new Map();
for (const l of lines) {
  const m = l.match(re);
  const f = m ? parseInt(m[1]) : cur;
  if (f === null) continue;
  if (m) { cur = f; if (!detail.has(f)) detail.set(f, { first: l.trim(), ppu: [], bank: [], ram: [], oam: [] }); }
  const e = detail.get(f);
  if (!e) continue;
  const t = l.trim();
  if (/STA \$200[0-7]/.test(t) || /STA \$4014/.test(t)) e.ppu.push(t);
  if (/STA \$800[0-1]/.test(t)) e.bank.push(t);
  if (/STA \$00(5B|90|91|1B|20)\b/.test(t)) e.ram.push(t);
}
for (const f of fsorted) {
  const e = detail.get(f);
  console.log(`\n--- f${f} (${frames.get(f)} lines) first: ${e.first.slice(0, 90)}`);
  if (e.ram.length) console.log('  RAM:', e.ram.slice(0, 8).join(' | '));
  if (e.bank.length) console.log('  BANK:', e.bank.slice(0, 6).join(' | '));
  if (e.ppu.length) console.log('  PPU:', e.ppu.slice(0, 14).join(' | '));
}
