/**
 * search_bytes.cjs — 在 ROM PRG 区搜索字节模式
 * 用法: node debug/search_bytes.cjs 28,29,2c,2d,38,37,39,3c,3d
 */
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16, 16 + 0x40000);

const pat = process.argv.slice(2).join(',').split(',').filter(Boolean).map(t => parseInt(t, 16));
const hits = [];
for (let i = 0; i + pat.length <= prg.length; i++) {
  let ok = true;
  for (let j = 0; j < pat.length; j++) {
    if (prg[i + j] !== pat[j]) { ok = false; break; }
  }
  if (ok) hits.push(i);
}
console.log('pattern:', pat.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
console.log('hits:', hits.length);
for (const h of hits.slice(0, 20)) {
  const bank = Math.floor(h / 0x2000);
  const off = h % 0x2000;
  console.log(`  ROM 0x${h.toString(16)} bank${bank} @0x${(off + 0x8000).toString(16).toUpperCase()} (运行时 $A000 窗口 +${(off).toString(16)})`);
  // 打印前后 16 字节
  const s = Math.max(0, h - 16), e = Math.min(prg.length, h + pat.length + 16);
  const ctx = [];
  for (let k = s; k < e; k++) ctx.push(prg[k].toString(16).padStart(2, '0'));
  console.log('  ctx: ' + ctx.join(' '));
}
