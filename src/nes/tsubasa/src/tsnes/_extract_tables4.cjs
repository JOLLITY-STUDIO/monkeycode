const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
const data = new Map();
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/00:([0-9A-F]{4}):\s+((?:[0-9A-F]{2})(?:\s+[0-9A-F]{2}){0,2})\s+\S/);
  if (m) {
    const cpu = parseInt(m[1], 16);
    const bytes = m[2].trim().split(/\s+/).map(b => parseInt(b, 16));
    for (let j = 0; j < bytes.length; j++) data.set(cpu + j, bytes[j]);
  }
}
console.log('parsed bytes:', data.size);
function dump(realStart, len, name) {
  const start = realStart - 0x2000; // real → disasm
  const bytes = [];
  for (let i = 0; i < len; i++) {
    const b = data.get(start + i);
    bytes.push(b === undefined ? -1 : b);
  }
  const arr = [];
  for (let i = 0; i < bytes.length; i += 16) {
    arr.push(bytes.slice(i, i + 16).map(b => b < 0 ? '??' : '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(', '));
  }
  console.log(`/** ${name} — $${realStart.toString(16).toUpperCase()} (${len} 字节) */`);
  console.log(`export const ${name}: readonly number[] = [` + arr.map(l => '\n  ' + l).join('') + '\n];\n');
}
const tables = [
  ['B1E8', 0x80, 'MENU_TBL'],
  ['B229', 0x18, 'CURSOR_GFX'],
  ['B241', 0x20, 'OPTION_SCREEN_Y'],
  ['B2ED', 0x10, 'INPUT_EC_DELTA2'],
  ['B205', 0x30, 'COPY_B205'],
  ['B271', 0x10, 'COPY_B271'],
  ['AD8A', 0x10, 'POS_TABLE_AD8A'],
  ['BCD1', 0x22, 'SCENE_TEAM_BITS'],
  ['BCF3', 0x10, 'GFX_PTR_BCF3'],
  ['BD64', 0x2C, 'GFX_PTR_BD64'],
  ['BDA8', 0x10, 'GFX_PTR_BDA8'],
  ['B393', 0x22, 'SCENE_STAT_B393'],
  ['B3B5', 0x22, 'SCENE_STAT_B3B5'],
  ['B3D7', 0x22, 'SCENE_STAT_B3D7'],
  ['B3F9', 0x22, 'SCENE_STAT_B3F9'],
  ['B41B', 0x22, 'SCENE_STAT_B41B'],
  ['B0D7', 0x40, 'SCRIPT_DISPATCH'],
  ['BC6E', 0x24, 'PLAYER_DATA_BC6E'],
  ['B255', 0x24, 'OPTION_FLAG_B255'],
  ['B22D', 0x04, 'CURSOR_FLAG_B22D'],
  ['B823', 0x10, 'SPRITE_POS_A2'],
  ['B82D', 0x04, 'SPRITE_POS_B2'],
  ['B831', 0x04, 'SPRITE_POS_C2'],
  ['BB2E', 0x30, 'NAME_SEARCH2'],
  ['B981', 0x40, 'NAME_ROW2'],
];
for (const [a, len, name] of tables) dump(parseInt(a, 16), len, name);
