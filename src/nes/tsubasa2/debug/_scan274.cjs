// 扫描 274-560 帧：每帧首行 + PPU 写 + bank 切换 + 关键 RAM 写，找新场景切换点
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const lines = fs.readFileSync(path.join(DIR, 'tsubasa1045.log'), 'utf8').split('\n');

let cur = null;
const frames = new Map(); // f -> {first, ppu:[], bank:[], ram:[]}
const re = /^f(\d+)\s/;
for (const l of lines) {
  const m = l.match(re);
  const f = m ? parseInt(m[1]) : cur;
  if (f === null || f < 274 || f > 560) { if (m && f > 560) break; continue; }
  if (m) {
    cur = f;
    if (!frames.has(f)) frames.set(f, { first: l.trim(), ppu: [], bank: [], ram: [] });
  }
  if (!frames.has(f)) continue;
  const e = frames.get(f);
  const t = l.trim();
  if (!e.firstSet && /^\$/.test(t)) { /* skip */ }
  // PPU 寄存器写
  const ppum = t.match(/(STA|STX|STY) \$200[0-7]\b/);
  if (ppum) e.ppu.push(t);
  const dma = t.match(/STA \$4014/);
  if (dma) e.ppu.push(t);
  // bank 切换 ($8000/$8001)
  const bm = t.match(/(STA|STX|STY) \$800[0-1]\b/);
  if (bm) e.bank.push(t);
  // 关键 RAM 写: $005B(场景flag), $001B, $0090/$0091(场景id)
  const rm = t.match(/STA \$00(5B|90|91|1B)\b/);
  if (rm) e.ram.push(t);
}
for (const f of [...frames.keys()].sort((a, b) => a - b)) {
  const e = frames.get(f);
  console.log(`\nf${f} first: ${e.first.slice(0, 80)}`);
  if (e.ram.length) console.log('  RAM:', e.ram.slice(0, 6).join(' | '));
  if (e.ppu.length) console.log('  PPU:', e.ppu.slice(0, 10).join(' | '));
  if (e.bank.length) console.log('  BANK:', e.bank.slice(0, 8).join(' | '));
}
