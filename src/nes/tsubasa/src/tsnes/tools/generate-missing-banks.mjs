/**
 * generate-missing-banks.mjs
 *
 * 從 hex2asm PRG bank 來源檔案生成 game-engine/banks/ 中的缺失 bank 文件。
 *
 * 用法: node tools/generate-missing-banks.mjs
 *
 * 輸出:
 *  - game-engine/banks/bank-XX.ts (skeleton/registration)
 *  - game-engine/banks/bank-XX-data.ts (純資料 bank only)
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const hex2asmDir = path.join(repoRoot, 'tsubasa-hex2asm', 'prg_banks');
const banksOutDir = path.join(repoRoot, 'game-engine', 'banks');

// ── 所有 32 bank 的描述 ──
const ALL_BANKS = [
  { idx: 0,  name: 'bank-00', file: 'prg_bank_00_dispatch_scene_engine',  type: 'CODE', status: 'done' },
  { idx: 1,  name: 'bank-01', file: 'prg_bank_01_match_jump',              type: 'CODE', status: 'done' },
  { idx: 2,  name: 'bank-02', file: 'prg_bank_02_nmi_renderer',            type: 'CODE', status: 'done' },
  { idx: 3,  name: 'bank-03', file: 'prg_bank_03_data',                    type: 'DATA', status: 'missing' },
  { idx: 4,  name: 'bank-04', file: 'prg_bank_04_data',                    type: 'DATA', status: 'missing' },
  { idx: 5,  name: 'bank-05', file: 'prg_bank_05_data',                    type: 'DATA', status: 'missing' },
  { idx: 6,  name: 'bank-06', file: 'prg_bank_06_palette_data',            type: 'DATA', status: 'done' },
  { idx: 7,  name: 'bank-07', file: 'prg_bank_07_sprite_data',             type: 'DATA', status: 'missing' },
  { idx: 8,  name: 'bank-08', file: 'prg_bank_08_data',                    type: 'DATA', status: 'missing' },
  { idx: 9,  name: 'bank-09', file: 'prg_bank_09_data',                    type: 'DATA', status: 'missing' },
  { idx: 10, name: 'bank-10', file: 'prg_bank_10_data',                    type: 'DATA', status: 'missing' },
  { idx: 11, name: 'bank-11', file: 'prg_bank_11_background',              type: 'CODE', status: 'missing' },
  { idx: 12, name: 'bank-12', file: 'prg_bank_12_audio',                   type: 'CODE', status: 'done' },
  { idx: 13, name: 'bank-13', file: 'prg_bank_13_data',                    type: 'DATA', status: 'missing' },
  { idx: 14, name: 'bank-14', file: 'prg_bank_14_data',                    type: 'DATA', status: 'missing' },
  { idx: 15, name: 'bank-15', file: 'prg_bank_15_data',                    type: 'DATA', status: 'done' },
  { idx: 16, name: 'bank-16', file: 'prg_bank_16_scene_logic',             type: 'CODE', status: 'missing' },
  { idx: 17, name: 'bank-17', file: 'prg_bank_17_data',                    type: 'DATA', status: 'missing' },
  { idx: 18, name: 'bank-18', file: 'prg_bank_18_data',                    type: 'DATA', status: 'missing' },
  { idx: 19, name: 'bank-19', file: 'prg_bank_19_lookup_tables',           type: 'CODE', status: 'missing' },
  { idx: 20, name: 'bank-20', file: 'prg_bank_20_team_data',               type: 'CODE', status: 'missing' },
  { idx: 21, name: 'bank-21', file: 'prg_bank_21_data',                    type: 'DATA', status: 'missing' },
  { idx: 22, name: 'bank-22', file: 'prg_bank_22_sprite_engine',           type: 'CODE', status: 'missing' },
  { idx: 23, name: 'bank-23', file: 'prg_bank_23_data',                    type: 'DATA', status: 'missing' },
  { idx: 24, name: 'bank-24', file: 'prg_bank_24_cutscene',                type: 'CODE', status: 'missing' },
  { idx: 25, name: 'bank-25', file: 'prg_bank_25_data',                    type: 'DATA', status: 'missing' },
  { idx: 26, name: 'bank-26', file: 'prg_bank_26_match_core',              type: 'CODE', status: 'missing' },
  { idx: 27, name: 'bank-27', file: 'prg_bank_27_player_data',             type: 'CODE', status: 'missing' },
  { idx: 28, name: 'bank-28', file: 'prg_bank_28_attributes',              type: 'CODE', status: 'missing' },
  { idx: 29, name: 'bank-29', file: 'prg_bank_29_data',                    type: 'DATA', status: 'missing' },
  { idx: 30, name: 'bank-30', file: 'prg_bank_30_system_lib',              type: 'CODE', status: 'done' },
  { idx: 31, name: 'bank-31', file: 'prg_bank_31_boot_vectors',            type: 'CODE', status: 'done' },
];

// 缺失 bank 列表
const missing = ALL_BANKS.filter(b => b.status === 'missing');
console.log(`共有 ${missing.length} 個缺失 bank (${missing.filter(b => b.type === 'DATA').length} DATA, ${missing.filter(b => b.type === 'CODE').length} CODE)`);

// ── 檢查 hex2asm 來源檔案 ──
for (const b of missing) {
  const srcPath = path.join(hex2asmDir, `${b.file}.ts`);
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️  來源檔案不存在: ${b.file}.ts`);
  }
}

console.log('\n開始生成缺失 bank 文件...\n');

// ── 生成 DATA bank 文件 ──
for (const b of missing) {
  if (b.type !== 'DATA') continue;

  const srcPath = path.join(hex2asmDir, `${b.file}.ts`);
  const outDataPath = path.join(banksOutDir, `${b.name}-data.ts`);
  const outCodePath = path.join(banksOutDir, `${b.name}.ts`);

  let dataContent = '';
  let codeContent = '';

  if (fs.existsSync(srcPath)) {
    const srcText = fs.readFileSync(srcPath, 'utf-8');

    // 提取 DATA_$8000_$9FFF 常量（纯 data bank 的标准模式）
    const dataMatch = srcText.match(/const DATA_\$8000_\$9FFF[^=]*=\s*\[([\s\S]*?)\n\];/);
    if (dataMatch) {
      const arrContent = dataMatch[1]
        .replace(/^\s*/gm, '')      // 去行首空白
        .replace(/\s*$/gm, '')      // 去行尾空白
        .trim();

      dataContent = `/**
 * Bank ${b.idx.toString().padStart(2, '0')} 完整 ROM 数据 — 内联常数
 * 8KB MMC3 PRG bank，$8000-$9FFF
 * 功能: 纯数据
 * 来源: tsubasa-hex2asm/prg_banks/${b.file}.ts
 */
export const PRG_BANK_${b.idx.toString().padStart(2, '0')}: readonly number[] = [
  ${arrContent}
];
`;

      codeContent = `/**
 * Bank ${b.idx.toString().padStart(2, '0')}: Data Bank ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 * 功能: 纯数据 bank，供其他 bank 透过 MMC3 切换读取
 *
 * ═══════════════════════════════════════
 * 架构角色: Data Provider（静态 ROM 资料）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态
 * ═══════════════════════════════════════
 *   ✅ ROM 数据 — 内联常数 bank-${b.idx.toString().padStart(2, '0')}-data.ts
 *   ✅ 注册 — registerBankRom(${b.idx})
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/${b.file}.ts
 */

import { registerBankRom } from './system-state';
import { PRG_BANK_${b.idx.toString().padStart(2, '0')} } from './${b.name}-data';

// 注册 ROM 数据
registerBankRom(${b.idx}, new Uint8Array(PRG_BANK_${b.idx.toString().padStart(2, '0')}));

/** ROM 数据直接访问 */
export function rom${b.idx.toString().padStart(2, '0')}(offset: number): number {
  return PRG_BANK_${b.idx.toString().padStart(2, '0')}[offset & 0x1FFF] ?? 0;
}

/** 读取 16-bit 指针 (little-endian) */
export function rom${b.idx.toString().padStart(2, '0')}Ptr16(offset: number): number {
  const lo = PRG_BANK_${b.idx.toString().padStart(2, '0')}[offset & 0x1FFF] ?? 0;
  const hi = PRG_BANK_${b.idx.toString().padStart(2, '0')}[(offset + 1) & 0x1FFF] ?? 0;
  return (hi << 8) | lo;
}

/** 读取整个 bank 数据 */
export function getBank${b.idx.toString().padStart(2, '0')}Data(): readonly number[] {
  return PRG_BANK_${b.idx.toString().padStart(2, '0')};
}
`;
      console.log(`  ✅ bank-${b.idx.toString().padStart(2, '0')} (DATA) — 從 ${b.file}.ts 提取`);
    } else {
      // 无法匹配，生成简化版
      console.warn(`  ⚠️  bank-${b.idx.toString().padStart(2, '0')}: 無法解析 DATA_$8000_$9FFF，使用空数据`);
      dataContent = `// TODO: 数据源文件未正确解析 — ${b.file}.ts
export const PRG_BANK_${b.idx.toString().padStart(2, '0')}: readonly number[] = [];
`;
      codeContent = `/**
 * Bank ${b.idx.toString().padStart(2, '0')}: Data Bank (TODO)
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/${b.file}.ts
 */

import { registerBankRom } from './system-state';
import { PRG_BANK_${b.idx.toString().padStart(2, '0')} } from './${b.name}-data';

registerBankRom(${b.idx}, new Uint8Array(PRG_BANK_${b.idx.toString().padStart(2, '0')}));

export function rom${b.idx.toString().padStart(2, '0')}(offset: number): number {
  return PRG_BANK_${b.idx.toString().padStart(2, '0')}[offset & 0x1FFF] ?? 0;
}
`;
    }
  } else {
    dataContent = `// TODO: 来源文件不存在
export const PRG_BANK_${b.idx.toString().padStart(2, '0')}: readonly number[] = [];
`;
    codeContent = `/** Bank ${b.idx.toString().padStart(2, '0')}: TODO */
import { registerBankRom } from './system-state';
import { PRG_BANK_${b.idx.toString().padStart(2, '0')} } from './${b.name}-data';
registerBankRom(${b.idx}, new Uint8Array(PRG_BANK_${b.idx.toString().padStart(2, '0')}));
`;
  }

  // 写入文件
  fs.writeFileSync(outDataPath, dataContent, 'utf-8');
  fs.writeFileSync(outCodePath, codeContent, 'utf-8');
}

// ── 生成 CODE bank skeleton ──
for (const b of missing) {
  if (b.type !== 'CODE') continue;

  const outCodePath = path.join(banksOutDir, `${b.name}.ts`);
  
  const hexName = b.file.replace('prg_bank_', '').replace(/_/g, ' ').replace(/^\d+/, '');
  const desc = b.file.replace('prg_bank_', '');

  // 提取 hex2asm 中找到的 CODE 段資訊
  const srcPath = path.join(hex2asmDir, `${b.file}.ts`);
  let codeSections = '';
  if (fs.existsSync(srcPath)) {
    const srcText = fs.readFileSync(srcPath, 'utf-8');
    const matches = srcText.matchAll(/\/\*\* \$(....)-\$(....), (\d+) bytes \[code\] \*\/\nfunction (CODE_\$...._\$....)\(\)/g);
    const sections = [];
    for (const m of matches) {
      sections.push(`//   ${m[3].padEnd(7)} — ${m[1]}-${m[2]}, ${m[4]} bytes`);
    }
    codeSections = sections.join('\n');
  }

  const skeleton = `/**
 * Bank ${b.idx.toString().padStart(2, '0')}: ${hexName} ($8000-$9FFF 或 $A000-$BFFF)
 *
 * MMC3 可切换 bank。
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（功能主控）
 * ═══════════════════════════════════════
 *
 * ═══════════════════════════════════════
 * 翻译状态 (SKELETON — 待完整翻译)
 * ═══════════════════════════════════════
${codeSections || '//   (未解析 hex2asm 源码)'}
 *
 * ═══════════════════════════════════════
 * 原始 hex: tsubasa-hex2asm/prg_banks/${b.file}.ts
 * ═══════════════════════════════════════
 */

import type { SystemState } from './system-state';
import { writeMem, readMem, registerBankRom } from './system-state';

// ── ROM data: 从独立 data 文件加载（如存在），否则从 PRG_ROM_BANKS ──
// import { PRG_BANK_${b.idx.toString().padStart(2, '0')} } from './${b.name}-data';
// registerBankRom(${b.idx}, new Uint8Array(PRG_BANK_${b.idx.toString().padStart(2, '0')}));

// ═════════════════════════════════════════════════
// 标志位辅助
// ═════════════════════════════════════════════════

const FLAG_C = 0x01;
const FLAG_Z = 0x02;
const FLAG_N = 0x80;

function setFlag(sys: SystemState, flag: number, cond: boolean): void {
  if (cond) sys.regs.P |= flag;
  else sys.regs.P &= ~flag;
}

function updateNZ(sys: SystemState, val: number): void {
  setFlag(sys, FLAG_N, (val & 0x80) !== 0);
  setFlag(sys, FLAG_Z, (val & 0xFF) === 0);
}

// ═════════════════════════════════════════════════
// TODO: 翻译入口
// ═════════════════════════════════════════════════

/**
 * bank${b.idx.toString().padStart(2, '0')}_entry — skeleton stub
 *
 * TODO: 完整翻译 6502 CODE 段
 */
export function bank${b.idx.toString().padStart(2, '0')}_entry(sys: SystemState): void {
  // TODO: implement from ${b.file}.ts
  console.warn(\`[bank${b.idx.toString().padStart(2, '0')}] entry called — not yet implemented\`);
}
`;

  fs.writeFileSync(outCodePath, skeleton, 'utf-8');
  console.log(`  📝 bank-${b.idx.toString().padStart(2, '0')} (CODE) — skeleton 已建立 (${b.file}.ts)`);
}

console.log(`\n=== 完成 ===`);
console.log(`已生成 ${missing.filter(b => b.type === 'DATA').length} DATA bank 文件`);
console.log(`已生成 ${missing.filter(b => b.type === 'CODE').length} CODE bank skeleton 文件`);
