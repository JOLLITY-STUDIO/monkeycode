// 验证 bank01-tables.ts 生成结果 — 按导出名逐个对比 (临时脚本)
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-01.ts', 'utf8');
const eq = rom.indexOf('= [');
const a = rom.indexOf('[', eq);
const b = rom.lastIndexOf(']');
const raw = rom.slice(a + 1, b).split(',').map(t => parseInt(t.trim(), 16));

const gen = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/data/bank01-tables.ts', 'utf8');

// 解析生成文件中的每个具名数组
function parseNamed(src, name) {
  const re = new RegExp('export const ' + name + ': readonly number\\[\\] = \\[([\\s\\S]*?)\\];');
  const m = src.match(re);
  if (!m) return null;
  return m[1].split(',').map(t => parseInt(t.trim(), 16)).filter(v => !Number.isNaN(v));
}

const tables = [
  ['MENU_BLOCK_DEF', 0xB1E8, 64],
  ['MENU_TYPE_Y', 0xB229, 4],
  ['MENU_CURSOR_POS', 0xB22D, 18],
  ['MENU_SCREEN_Y', 0xB241, 18],
  ['MENU_OPTION_FLAG', 0xB255, 28],
  ['GFX_XFER', 0xB271, 124],
  ['INPUT_EC_DELTA', 0xB2ED, 16],
  ['INIT_PALETTE', 0xB205, 248],
  ['SCENE_GFX_TABLE', 0xB393, 34],
  ['SCENE_ATTR_TABLE', 0xB3B5, 34],
  ['SCENE_DATA_TABLE2', 0xB3D7, 34],
  ['SCENE_DATA_TABLE3', 0xB3F9, 34],
  ['SCENE_DATA_TABLE4', 0xB41B, 34],
  ['MENU_TILE', 0xBC6E, 99],
  ['TEAM_ATTR', 0xBCD1, 34],
  ['GFX_PTR_TABLE', 0xBCF3, 113],
  ['DATA_PTR_TABLE', 0xBD64, 139],
  ['PLAYER_GFX_PTR', 0xBC58, 22],
  ['GFX_DATA_PTR', 0xBDA8, 40],
  ['PLAYER_FIELD_IDX', 0xAD8A, 502],
];
let allOk = true;
for (const [name, addr, len] of tables) {
  const src = raw.slice(addr - 0xA000, addr - 0xA000 + len);
  const g = parseNamed(gen, name);
  if (!g) { console.log(name, 'NOT FOUND in generated'); allOk = false; continue; }
  let firstDiff = -1;
  for (let i = 0; i < len; i++) if (src[i] !== g[i]) { firstDiff = i; break; }
  const ok = firstDiff < 0 && g.length === len;
  if (!ok) allOk = false;
  console.log(name, '$' + addr.toString(16).toUpperCase(), len + 'B', ok ? 'OK' : 'MISMATCH len=' + g.length + ' diff@' + firstDiff);
  if (firstDiff >= 0) {
    const s = Math.max(0, firstDiff - 3), e = Math.min(len, firstDiff + 6);
    console.log('  rom:', src.slice(s, e).map(v => v.toString(16).padStart(2, '0')).join(' '));
    console.log('  gen:', g.slice(s, e).map(v => v.toString(16).padStart(2, '0')).join(' '));
  }
}
console.log(allOk ? 'ALL TABLES OK' : 'HAS ISSUES');
