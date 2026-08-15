const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
// parse data lines: flags 0xPRG 00:CPU: bytes  .byte
const data = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^([CDRUDX\s\-]+)\s+0x([0-9A-F]{6})\s+00:([0-9A-F]{4}):\s+([0-9A-F]{2})(?:\s+([0-9A-F]{2}))?(?:\s+([0-9A-F]{2}))?/);
  if (m) {
    const cpu = parseInt(m[3], 16);
    data.set(cpu, parseInt(m[4], 16));
  }
}
function dump(start, len, name) {
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push((data.get(start + i) ?? 0x00));
  const hex = bytes.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(', ');
  console.log(`/** ${name} — $${start.toString(16).toUpperCase()} (${len} 字节) */`);
  // wrap 16 per line
  const arr = [];
  for (let i = 0; i < bytes.length; i += 16) arr.push(bytes.slice(i, i + 16).map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(', '));
  console.log(`export const ${name}: readonly number[] = [` + arr.map(l => '\n  ' + l).join('') + '\n];\n');
}
// 参考地址表
const tables = [
  ['B1E8', 0x50, 'MENU_TBL'],      // 菜单项 tile/标志 (X 索引到 $41)
  ['B229', 0x18, 'CURSOR_GFX'],    // 光标图形 (Y = (flag&C0)>>6, *2)
  ['B241', 0x20, 'OPTION_SCREEN_Y'], // 选项屏幕 Y 坐标
  ['B2ED', 0x10, 'INPUT_EC_DELTA2'], // 输入→EC 增量
  ['B205', 0x30, 'COPY_B205'],     // 复制到 ram_0460
  ['B271', 0x10, 'COPY_B271'],     // 复制到 ram_039C
  ['AD8A', 0x10, 'POS_TABLE_AD8A'], // 位置表
  ['BCD1', 0x22, 'SCENE_TEAM_BITS'], // 场景→球队位
  ['BCF3', 0x10, 'GFX_PTR_BCF3'],  // 图形指针
  ['BD64', 0x2C, 'GFX_PTR_BD64'],  // 图形指针2
  ['BDA8', 0x10, 'GFX_PTR_BDA8'],  // 图形指针3
  ['B393', 0x22, 'SCENE_STAT_B393'], // 场景能力
  ['B3B5', 0x22, 'SCENE_STAT_B3B5'],
  ['B3D7', 0x22, 'SCENE_STAT_B3D7'],
  ['B3F9', 0x22, 'SCENE_STAT_B3F9'],
  ['B41B', 0x22, 'SCENE_STAT_B41B'],
  ['B0D7', 0x40, 'SCRIPT_DISPATCH'], // 脚本分发表
  ['BC6E', 0x24, 'PLAYER_DATA_BC6E'], // 球员数据
  ['BB2E', 0x30, 'NAME_SEARCH2'],
  ['B981', 0x40, 'NAME_ROW2'],
];
for (const [a, len, name] of tables) {
  dump(parseInt(a, 16), len, name);
}
