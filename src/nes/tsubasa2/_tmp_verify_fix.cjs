// 精确校验 STAMINA/PLAYER_STAT vs ROM (逐 16bit 比较, 忽略注释)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B01 = (addr) => 0x10 + 1 * 0x2000 + (addr - 0xA000);

function extract(name, srcPath) {
  const src = fs.readFileSync(srcPath, 'utf8');
  const re = new RegExp('export const ' + name + '\\s*:\\s*[^=]*=\\s*\\[([\\s\\S]*?)\\n\\](?:\\s*as const)?\\s*;');
  const m = src.match(re);
  if (!m) return null;
  const arr = [];
  for (const line of m[1].split('\n')) {
    const clean = line.replace(/\/\/.*$/, '').trim();
    if (!clean) continue;
    for (const tok of clean.split(',')) {
      const t = tok.trim();
      if (!t) continue;
      arr.push(parseInt(t, t.toLowerCase().startsWith('0x') ? 16 : 10));
    }
  }
  return arr;
}

const st = extract('STAMINA_TABLE_16BIT', 'src/game/prg/data/tables/player-table.ts');
console.log('STAMINA_TABLE_16BIT 解析 ' + st.length + ' 项');
let ok = true; const diffs = [];
for (let i = 0; i < 64; i++) {
  const romV = rom[B01(0xBA90) + i * 2] | (rom[B01(0xBA90) + i * 2 + 1] << 8);
  if (st[i] !== romV) { ok = false; diffs.push('idx' + i + ' ROM=0x' + romV.toString(16) + ' TS=0x' + st[i].toString(16)); }
}
console.log((ok ? 'PASS' : 'FAIL') + ' STAMINA_TABLE_16BIT @$BA90 (64×16bit)');
if (!ok) diffs.forEach(d => console.log('  ' + d));

// PLAYER_STAT @$BA4C (34×16bit)
const ps = extract('PLAYER_STAT_TABLE_16BIT', 'src/game/prg/data/tables/player-table.ts');
console.log('PLAYER_STAT_TABLE_16BIT 解析 ' + ps.length + ' 项');
let ok2 = true; const diffs2 = [];
for (let i = 0; i < 34; i++) {
  const romV = rom[B01(0xBA4C) + i * 2] | (rom[B01(0xBA4C) + i * 2 + 1] << 8);
  if (ps[i] !== romV) { ok2 = false; diffs2.push('idx' + i + ' ROM=0x' + romV.toString(16) + ' TS=0x' + ps[i].toString(16)); }
}
console.log((ok2 ? 'PASS' : 'FAIL') + ' PLAYER_STAT_TABLE_16BIT @$BA4C (34×16bit)');
if (!ok2) diffs2.forEach(d => console.log('  ' + d));
