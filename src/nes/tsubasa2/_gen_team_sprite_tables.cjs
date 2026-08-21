// 临时脚本: 从 ROM 提取 bank22/27/29 数据表 → team/sprite 域 TS 表 (v3 修正偏移)
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(ROM);
const bankOff = (n) => 0x10 + n * 0x2000;
const b22 = buf.slice(bankOff(22), bankOff(22) + 0x2000);
const b27 = buf.slice(bankOff(27), bankOff(27) + 0x2000);
const b29 = buf.slice(bankOff(29), bankOff(29) + 0x2000);

function fmtTable(name, comment, bytes) {
  const lines = [`/** ${comment} */`, `export const ${name}: readonly number[] = [`];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    lines.push('  ' + chunk.map((v) => '0x' + v.toString(16).toUpperCase().padStart(2, '0')).join(', ') + ',');
  }
  lines.push('];');
  return lines.join('\n');
}
function u16(b, a) { return (b[a] ?? 0) | ((b[a + 1] ?? 0) << 8); }
function hex16list(arr) { return arr.map(v => '0x' + v.toString(16).toUpperCase().padStart(4, '0')).join(', '); }

// ============ bank22 ============
// 地址均为 $8000 基址, 物理偏移 = addr - 0x8000
// DISP_81D2 = $81D2 (40B), DISP_81FA = $81FA (64B)
// TEMPLATE_PTR_8280 = $8280 (code LDA ($0042),Y 引用, 索引=描述符$12字节 ASL)
const tplPtrs = [];
const tplCount = 47;
for (let i = 0; i < tplCount; i++) tplPtrs.push(u16(b22, 0x280 + i * 2));
const tplBad = tplPtrs.filter(v => v < 0x8200 || v > 0xa000);
console.log('bank22 tpl bad:', tplBad.length ? tplBad.map(v => '$' + v.toString(16).toUpperCase()).join(' ') : '(none)');

const out22 = [];
out22.push(`/**
 * sprite-table.ts — bank22 精灵生成数据表 (声明式数组)
 * @bank 22 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 22)
 *
 * bank22 入口 $8003: 读精灵描述符 ($003C) → 查模板指针表 → 解码模板流 → 写 OAM ($0200)。
 * 数据引用 (code_main.s):
 *   DISP_81D2         位移表 X ($81D2, 40B)  — Y 位移 (LDA $81D2,X)
 *   DISP_81FA         位移表 X ($81FA, 64B)  — X 位移 (LDA $81FA,X)
 *   TEMPLATE_PTR_8280 模板指针表 ($8280, u16 LE) — 索引 = 描述符($003C)+$12 字节 ASL
 *   模板流数据: 见 SPRITE_DATA_22 全字节 (模板指针指向的流)
 */
`);
out22.push(fmtTable('DISP_81D2', '位移表 $81D2 (40B)', [...b22.slice(0x1d2, 0x1d2 + 40)]));
out22.push(fmtTable('DISP_81FA', '位移表 $81FA (64B)', [...b22.slice(0x1fa, 0x1fa + 64)]));
out22.push(fmtTable('TEMPLATE_PTR_8280', `模板指针表 $8280 (${tplCount} × u16 LE)`, [...b22.slice(0x280, 0x280 + tplCount * 2)]));
out22.push(fmtTable('SPRITE_DATA_22', 'bank22 全字节 (8192B)', [...b22]));

// ============ bank27 ============
// 地址均为 $A000 基址 (code 引用), 物理偏移 = addr - 0xA000
// ANIM_PTR_A292 = 14 项 (0x292-0x2AD)
// ANIM_FRAME_PTR = $A42A (0x42A) 起 32 项 (至 $A46A 前)
const animPtrs = [];
for (let i = 0; i < 14; i++) animPtrs.push(u16(b27, 0x292 + i * 2));
const framePtrs = [];
for (let i = 0; i < 32; i++) framePtrs.push(u16(b27, 0x42a + i * 2));
const frameBad = framePtrs.filter(v => v < 0xa400 || v > 0xa800);
console.log('bank27 frame bad:', frameBad.length ? frameBad.map(v => '$' + v.toString(16).toUpperCase()).join(' ') : '(none)');

const out27 = [];
out27.push(`/**
 * sprite-animation-table.ts — bank27 动画数据表 (声明式数组)
 * @bank 27 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 27)
 *
 * bank27 代码 ($8104 动画数据加载 / $81DC 动画帧推进) 消费以下表 (地址均 $A000 基址):
 *   INDEX_A1DC        索引表 ($A1DC, LDA $A1DC,Y)  — 动画类型→tile 索引
 *   PTR_A6AD          指针表 ($A6AD, u16 LE, LDA $A6AE,X/$A6AD,X)
 *   PTR_AB65          指针表 ($AB65, u16 LE, LDA $AB66,X/$AB65,X)
 *   ANIM_PTR_A292     动画定义指针表 ($A292, 14 × u16 LE) — 索引=ram_05F3*2
 *   ANIM_FRAME_PTR_A42A 帧数据指针表 ($A42A, 32 × u16 LE) — 索引=流内帧码*2
 *   动画定义流: (时长, 帧码)* 终止 $FF; 帧数据流: (精灵数, 3B/精灵)* 终止 $00
 */
`);
out27.push(fmtTable('INDEX_A1DC', '索引表 $A1DC (32B)', [...b27.slice(0x1dc, 0x1dc + 32)]));
out27.push(fmtTable('PTR_A6AD', '指针表 $A6AD (64B = 32 × u16 LE)', [...b27.slice(0x6ad, 0x6ad + 64)]));
out27.push(fmtTable('PTR_AB65', '指针表 $AB65 (64B = 32 × u16 LE)', [...b27.slice(0xb65, 0xb65 + 64)]));
out27.push(fmtTable('ANIM_PTR_A292', `动画定义指针表 $A292 (14 × u16 LE)`, [...b27.slice(0x292, 0x292 + 14 * 2)]));
out27.push(fmtTable('ANIM_FRAME_PTR_A42A', `帧数据指针表 $A42A (32 × u16 LE)`, [...b27.slice(0x42a, 0x42a + 32 * 2)]));
out27.push(fmtTable('SPRITE_ANIM_DATA_27', 'bank27 全字节 (8192B)', [...b27]));

// ============ bank29 ============
const out29 = [];
out29.push(`/**
 * team-roster-table.ts — bank29 球队名单/阵型数据表 (声明式数组)
 * @bank 29 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 29)
 *
 * bank29 纯数据 bank:
 *   ROSTER_DATA_29 全 8192B; 偏移结构:
 *     0x0000- 球队球员 ID 序列 (每队一组, 组内以 0x00 分隔, 见 TEAM_PTR)
 *   TeamRosterService 通过具名访问器按需取用。
 */
`);
out29.push(fmtTable('ROSTER_DATA_29', 'bank29 全字节 (8192B)', [...b29]));

const files = {
  'src/game/prg/data/tables/sprite-table.ts': out22.join('\n'),
  'src/game/prg/data/tables/sprite-animation-table.ts': out27.join('\n'),
  'src/game/prg/data/tables/team-roster-table.ts': out29.join('\n'),
};
for (const [rel, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, rel), content);
  console.log('WROTE', rel, content.length, 'bytes');
}

console.log('\nbank22 TEMPLATE_PTR_8280 前16项:', tplPtrs.slice(0, 16).map(v => '$' + v.toString(16).toUpperCase()).join(' '));
console.log('bank27 ANIM_PTR_A292 14项:', animPtrs.map(v => '$' + v.toString(16).toUpperCase()).join(' '));
console.log('bank27 ANIM_FRAME_PTR_A42A 前16项:', framePtrs.slice(0, 16).map(v => '$' + v.toString(16).toUpperCase()).join(' '));
console.log('bank27 INDEX_A1DC 前16:', [...b27.slice(0x1dc, 0x1ec)].map(v => '$' + v.toString(16).toUpperCase().padStart(2, '0')).join(' '));
