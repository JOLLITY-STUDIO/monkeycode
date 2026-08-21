// bank02 全表 ROM 校准验证
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B02 = (addr) => 0x10 + 2 * 0x2000 + (addr - 0xA000);

function extract(name, srcPath) {
  const src = fs.readFileSync(srcPath, 'utf8');
  const re = new RegExp('export const ' + name + '\\s*(?::\\s*[^=]*)?=\\s*\\[([\\s\\S]*?)\\n\\](?:\\s*as const)?\\s*;');
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

const SRC = 'src/game/prg/data/tables/bank02-tables.ts';
function cmp(name, addr, count) {
  const arr = extract(name, SRC);
  if (!arr) { console.log('SKIP ' + name + ' (未找到)'); return; }
  let ok = arr.length >= count; const d = [];
  for (let i = 0; i < count; i++) {
    if (arr[i] !== rom[B02(addr) + i]) { ok = false; if (d.length < 6) d.push('+' + i + ' ROM=0x' + rom[B02(addr) + i].toString(16) + ' TS=0x' + arr[i].toString(16)); }
  }
  console.log((ok ? 'PASS' : 'FAIL') + ' ' + name + ' (' + arr.length + 'B @$' + addr.toString(16).toUpperCase() + ', 比对' + count + 'B)');
  if (!ok) d.forEach(x => console.log('  ' + x));
}

cmp('ROSTER_TABLE', 0xAA47, 46);
cmp('ROSTER_ATTR_TABLE', 0xAA75, 25);
cmp('PASSWORD_KANA_CHARS', 0xAB2F, 40);
cmp('PASSWORD_GRID_TILES', 0xAB2F, 100);
cmp('PASSWORD_SPRITE_DATA', 0xA677, 8);
cmp('PASSWORD_CONTINUE_TABLE', 0xAA97, 72);
cmp('PASSWORD_POS_INC_TABLE', 0xAADF, 16);
cmp('SPRITE_POS_TABLE', 0xA98E, 118);
cmp('SPRITE_OFFSET_TABLE', 0xAAF0, 48);
cmp('PASSWORD_LEVEL_ADJ_TABLE', 0xAB1F, 16);
