// 提取 bank28 全部数据表 (CPU $8000-$9FFF → file offset = cpu - 0x8000)
// 修正: 部分 CDL 标记错误, 表真实位置已从 asm 确认
const fs = require('fs');

const src = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m = src.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.error('FAILED parse array'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim(), 16));
const u8 = new Uint8Array(nums.length);
nums.forEach((v, i) => u8[i] = v & 0xFF);

function cpuAddr(a) { return a - 0x8000; }

// 表定义: [CPU起始地址, 长度, 名称] (位置已从 bank_28.asm CDL 确认)
const tables = [
  [0x818E, 11,  'T_ROLE_TYPE'],    // 角色类型表 (按 ram_043B-11 索引)
  [0x8199, 4,   'T_ATTR_BASE'],    // 属性基址 ($95D6/$9662 LE)
  [0x8206, 22,  'T_POS_8206'],     // 位置表 (entry 1, $8206 索引)
  [0x824C, 15,  'T_TEAM_824C'],    // 队伍表 (entry 2, 至 $825A)
  [0x82C0, 10,  'T_TEAM_82C0'],    // 队伍表 (entry 3, 至 $82C9)
  [0x8604, 5,   'T_POS_8604'],     // 位置表 (entry $8609 前, $8604-$8608)
  [0x86B5, 5,   'T_POS_86B5'],     // 位置表 ($86B5-$86B9)
  [0x87C3, 4,   'T_POS_87C3'],     // 位置表 ($87C3-$87C6)
  [0x89AF, 4,   'T_POS_89AF'],     // 位置表 (ram_0621 索引, $89AF-$89B2)
  [0x8AA8, 11,  'T_ROLE_TYPE2'],   // 角色类型表2 (与 $818E 同, $8AA8-$8AB2)
  [0x8B9E, 32,  'T_DIST_DIR'],     // 方向距离查找表 (2B/项, $8B9E-$8BBD)
  [0x8BBE, 64,  'T_ZONE_COORD'],   // 区域坐标表 (2B/项, $8BBE-$8BFD)
  [0x8E1B, 62,  'T_SCENE_PTR'],    // 场景数据指针表 (2B/项 LE, $8E1B-$8E58)
  [0x9460, 18,  'T_MATCH_CFG_PTR'],// 对阵配置指针表 (2B/项 LE, $9460-$9471)
  [0x9554, 18,  'T_MATCH_CFG2_PTR'],// 对阵配置指针表2 (2B/项 LE, $9554-$9565)
  [0x959E, 18,  'T_MATCH_CFG3_PTR'],// 对阵配置指针表3 (2B/项 LE, $959E-$95AF)
  [0x9E4E, 256, 'T_LEVEL_MAP'],    // 等级映射表 (256B, $9E4E-$9F4D)
];

let out = '/** Bank28 数据表提取 (CPU 地址) — 自动生成 */\n\n';

for (const [start, len, name] of tables) {
  const off = cpuAddr(start);
  const end = off + len;
  if (end > u8.length) { console.error(`表 ${name} 超界 ${start.toString(16)} len ${len}`); continue; }
  const bytes = Array.from(u8.slice(off, end));
  out += `// ── $${start.toString(16)} ${name} (${len}B) ──\n`;
  out += `export const ${name}: readonly number[] = [\n`;
  for (let i = 0; i < bytes.length; i += 16) {
    const row = bytes.slice(i, i + 16).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(', ');
    out += `  ${row}${i + 16 < bytes.length ? ',' : ''}\n`;
  }
  out += `];\n\n`;
}

// $8E1B 表指向的场景数据块 ($8F07-$8FBF, 每块 2B 记录)
const SCENE_START = 0x8F07;
const SCENE_END = 0x8FBF;
const sbytes = Array.from(u8.slice(cpuAddr(SCENE_START), cpuAddr(SCENE_END)));
out += `// ── $${SCENE_START.toString(16)}-$${SCENE_END.toString(16)} SCENE_DATA (${sbytes.length}B) ──\n`;
out += `export const SCENE_DATA: readonly number[] = [\n`;
for (let i = 0; i < sbytes.length; i += 16) {
  const row = sbytes.slice(i, i + 16).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(', ');
  out += `  ${row}${i + 16 < sbytes.length ? ',' : ''}\n`;
}
out += `];\n\n`;

fs.writeFileSync('_b28_tables_out.ts', out);
console.log(`OK — 提取 ${tables.length} 个表 + SCENE_DATA → _b28_tables_out.ts`);
for (const [start, len, name] of tables) {
  const off = cpuAddr(start);
  console.log(`${name} $${start.toString(16)}: [${Array.from(u8.slice(off, off + Math.min(len, 24))).map(b => b.toString(16).padStart(2,'0')).join(' ')}]${len > 24 ? ' …' : ''}`);
}
