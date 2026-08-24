/**
 * extract_special_moves.cjs — 从真 ROM 提取特殊动作表
 *
 * 数据源（docs/rom-data-locations.md §5）：
 *   - 角色必杀技表 (7 项 × 2 字节)         ROM 0x8F00+ (明星 0x8F00-0x91FF), 0x9200+ (名人)
 *   - 每个角色 7 项技能：Shot, Pass, Dribble, Block, Tackle, PassCut, Other
 *
 * 输出：src/game/prg/data/tables/special-moves.ts
 *   每条 PlayerSpecialMoves { id, name, shot:[addrHi,addrLo], pass, dribble, block, tackle, passCut }
 *
 * 用法：cd scripts && node extract_special_moves.cjs > ../src/game/prg/data/tables/special-moves.ts
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM);
const prg = rom.slice(16);

const NAMES = {
  0x01: 'Tsubasa', 0x0B: 'Souta', 0x0C: 'Jitou', 0x0E: 'Ishizaki',
  0x0D: 'Matsuyama', 0x17: 'Masao', 0x18: 'Kazuo', 0x11: 'Misaki',
  0x1A: 'Hyuga', 0x15: 'Nitta', 0x19: 'Sano', 0x1F: 'Sawada',
  0x20: 'Misugi',
  // 名人 (0x9200+)
  0x30: 'Napoleon', 0x31: 'Pierr', 0x33: 'Diaz',
  0x34: 'Schneider', 0x35: 'Kapilman', 0x36: 'CarlosSantana',
  0x37: 'Coimbra',
};

// §5 §1：从文档中读取的明星必杀技起点（每个角色 Shot 是 0x8F17+ 等）
// 每个角色数据 7 项 × 2 byte
const STARS_BASE_ROM = 0x8F00;     // Shot 起头 0x8F17
const STARS_OFFSETS = {
  0x01: 0x17, // Tsubasa
  0x0B: 0x87, // Souta
  0x0C: 0x95, // Jitou
  0x0E: 0x33, // Ishizaki
  0x0D: 0xA3, // Matsuyama
  0x17: 0x4F, // Masao
  0x18: 0x5D, // Kazuo
  0x11: 0x25, // Misaki
  0x1A: 0x79, // Hyuga
  0x15: 0x41, // Nitta
  0x19: 0x6B, // Sano
  0x1F: 0xB1, // Sawada
  0x20: 0xBF, // Misugi
};

const VIPS_BASE_ROM = 0x9200;
const VIPS_OFFSETS = {
  0x30: 0x0B, // Napoleon
  0x31: 0x19, // Pierr
  0x33: 0x6D, // Diaz
  0x34: 0x89, // Schneider
  0x35: 0xB3, // Kapilman
  0x36: 0xC1, // Carlos Santana
  0x37: 0x3F, // Coimbra
};

// 读取 7 项技能（每项 2 byte LE: [RAM addr low, ROM addr high]）
function readSpecialMoves(baseAddr) {
  // 数据布局：每角色 7 项（shot, pass, dribble, block, tackle, passCut, ?），每项 2 byte LE
  // 文档只给 shot 一项确切地址，按经验每项 2 byte；保守按 7 项 × 2 = 14 byte 取
  const result = [];
  for (let i = 0; i < 7; i++) {
    const lo = prg[baseAddr + i * 2];
    const hi = prg[baseAddr + i * 2 + 1];
    result.push({ ramAddr: lo, romAddr: hi });
  }
  return result;
}

const lines = [];
lines.push('/**');
lines.push(' * special-moves.ts — 角色必杀技表（从真 ROM 提取）');
lines.push(' *');
lines.push(' * 数据源（docs/rom-data-locations.md §5）：');
lines.push(' *   - 明星必杀技表 (7 项 × 2 byte)   ROM 0x8F00+');
lines.push(' *   - 名人必杀技表 (7 项 × 2 byte)   ROM 0x9200+');
lines.push(' *');
lines.push(' * 注：每角色 7 项为 Shot/Pass/Dribble/Block/Tackle/PassCut/Other 的 RAM/ROM 地址组合');
lines.push(' *');
lines.push(' * 重生：scripts/extract_special_moves.cjs');
lines.push(' */');
lines.push('');
lines.push('/** 必杀技项：{ ramAddr, romAddr } 双地址 */');
lines.push('export interface SpecialMoveSlot {');
lines.push('  readonly ramAddr: number;');
lines.push('  readonly romAddr: number;');
lines.push('}');
lines.push('');
lines.push('/** 角色必杀技集合（7 项） */');
lines.push('export interface PlayerSpecialMoves {');
lines.push('  readonly id: number;');
lines.push('  readonly name: string;');
lines.push('  readonly shot: SpecialMoveSlot;');
lines.push('  readonly pass: SpecialMoveSlot;');
lines.push('  readonly dribble: SpecialMoveSlot;');
lines.push('  readonly block: SpecialMoveSlot;');
lines.push('  readonly tackle: SpecialMoveSlot;');
lines.push('  readonly passCut: SpecialMoveSlot;');
lines.push('  readonly other: SpecialMoveSlot;');
lines.push('}');
lines.push('');
lines.push('export const SPECIAL_MOVES_TABLE: ReadonlyArray<PlayerSpecialMoves> = [');
for (const [idStr, off] of Object.entries(STARS_OFFSETS)) {
  const id = parseInt(idStr, 10);
  const name = NAMES[id] || `Star${id.toString(16)}`;
  const moves = readSpecialMoves(STARS_BASE_ROM + off);
  lines.push(`  {`);
  lines.push(`    id: 0x${id.toString(16).toUpperCase()},`);
  lines.push(`    name: '${name}',`);
  lines.push(`    shot: { ramAddr: 0x${moves[0].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[0].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    pass: { ramAddr: 0x${moves[1].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[1].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    dribble: { ramAddr: 0x${moves[2].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[2].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    block: { ramAddr: 0x${moves[3].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[3].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    tackle: { ramAddr: 0x${moves[4].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[4].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    passCut: { ramAddr: 0x${moves[5].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[5].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    other: { ramAddr: 0x${moves[6].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[6].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`  },`);
}
for (const [idStr, off] of Object.entries(VIPS_OFFSETS)) {
  const id = parseInt(idStr, 10);
  const name = NAMES[id] || `VIP${id.toString(16)}`;
  const moves = readSpecialMoves(VIPS_BASE_ROM + off);
  lines.push(`  {`);
  lines.push(`    id: 0x${id.toString(16).toUpperCase()},`);
  lines.push(`    name: '${name}',`);
  lines.push(`    shot: { ramAddr: 0x${moves[0].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[0].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    pass: { ramAddr: 0x${moves[1].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[1].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    dribble: { ramAddr: 0x${moves[2].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[2].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    block: { ramAddr: 0x${moves[3].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[3].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    tackle: { ramAddr: 0x${moves[4].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[4].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    passCut: { ramAddr: 0x${moves[5].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[5].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`    other: { ramAddr: 0x${moves[6].ramAddr.toString(16).padStart(2, '0').toUpperCase()}, romAddr: 0x${moves[6].romAddr.toString(16).padStart(2, '0').toUpperCase()} },`);
  lines.push(`  },`);
}
lines.push('];');
lines.push('');

lines.push('/** 按 ID 查必杀技集合 */');
lines.push('export function findSpecialMovesById(id: number): PlayerSpecialMoves | null {');
lines.push('  for (const s of SPECIAL_MOVES_TABLE) {');
lines.push('    if (s.id === (id & 0xff)) return s;');
lines.push('  }');
lines.push('  return null;');
lines.push('}');
lines.push('');

process.stdout.write(lines.join('\n') + '\n');
