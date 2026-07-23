/**
 * 从 rom.nes 中提取 PRG-ROM 数据并导出为 TypeScript 模块
 * 
 * 使用: node tools/export_prg_rom.mjs
 * 输出: src/tsnes/tsubasa-code/prg_rom_data.ts
 * 
 * MMC3 将 PRG-ROM 分成 8KB 的 bank，通过 bank switching 映射到
 * CPU 地址空间的 0x8000-0xFFFF（4 个 8KB 窗口）。
 * 初始映射: 0x8000=bank0, 0xA000=bank1, 0xC000=倒数第2, 0xE000=最后
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const romPath = resolve(ROOT, 'rom.nes');
const outPath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'prg_rom_data.ts');

console.log(`Reading ${romPath}...`);
const raw = readFileSync(romPath);

// 验证 iNES 魔数
if (raw[0] !== 0x4E || raw[1] !== 0x45 || raw[2] !== 0x53 || raw[3] !== 0x1A) {
  throw new Error('Not a valid NES ROM.');
}

// 解析 iNES header
const prgCount = raw[4];        // 16KB bank 数量
const chrCount = raw[5];        // 8KB bank 数量
const mapperLo = (raw[6] >> 4) & 0xF;
const mapperHi = raw[7] & 0xF0;
const mapper = mapperHi | mapperLo;
const hasTrainer = (raw[6] & 4) !== 0;

console.log(`iNES header: mapper=${mapper}, PRG=${prgCount}x16KB (${prgCount * 16}KB), CHR=${chrCount}x8KB (${chrCount * 8}KB), trainer=${hasTrainer}`);

// PRG-ROM 起始偏移
const prgOffset = 16 + (hasTrainer ? 512 : 0);

// 提取原始 PRG-ROM bytes
const PRG_SIZE = prgCount * 16384;
const prgBytes = raw.slice(prgOffset, prgOffset + PRG_SIZE);

const bank8KCount = prgCount * 2;
console.log(`MMC3 banks: ${bank8KCount} × 8KB`);

// 按 8KB 切分
const BANKS = [];
for (let i = 0; i < bank8KCount; i++) {
  const start = i * 8192;
  BANKS.push(Array.from(prgBytes.slice(start, start + 8192)));
}

// 初始 MMC3 映射状态
const initBankLo = 0;                          // 0x8000-0x9FFF
const initBankMidLo = 1;                       // 0xA000-0xBFFF
const initBankMidHi = bank8KCount - 2;          // 0xC000-0xDFFF (固定)
const initBankHi = bank8KCount - 1;             // 0xE000-0xFFFF (固定)

// 每个 bank 格式化为多行 TS number[]，每行 64 个字节
const BYTES_PER_LINE = 64;
function formatBankArray(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += BYTES_PER_LINE) {
    lines.push(bytes.slice(i, i + BYTES_PER_LINE).map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(','));
  }
  return lines;
}

console.log(`Generating raw byte arrays (${BYTES_PER_LINE} bytes/line)...`);

const bankDefs = BANKS.map((bytes, i) => {
  const padded = String(i).padStart(2, '0');
  const lines = formatBankArray(bytes);
  return `/** PRG-ROM MMC3 bank ${padded} (8KB) — ${bytes.length} bytes */
const _PRG_BANK_${padded}: readonly number[] = [
${lines.map(l => `  ${l}`).join(',\n')}
];`;
});

const bankRefs = Array.from(
  { length: bank8KCount },
  (_, i) => `  _PRG_BANK_${String(i).padStart(2, '0')}`
).join(',\n');

const output = `/**
 * PRG-ROM 数据 — 由 tools/export_prg_rom.mjs 自动生成，请不要手动修改
 * 
 * 原始文件: rom.nes
 * Mapper: ${mapper} (MMC3)
 * PRG-ROM: ${prgCount} 个 16KB bank → ${bank8KCount} 个 8KB MMC3 bank
 * 
 * PRG_ROM_BANKS: Uint8Array[] 共 ${bank8KCount} 个 (每项 8KB)
 */

${bankDefs.join('\n\n')}

// ---------- 预构建 Uint8Array[] ----------

/** 全部 PRG-ROM 8KB MMC3 bank（预构建，初次 import 即就绪） */
export const PRG_ROM_BANKS: readonly Uint8Array[] = [
${bankRefs}
].map(arr => new Uint8Array(arr));

// ---------- MMC3 Bank 读取 ----------

/** PRG-ROM 总 8KB bank 数量 */
export const PRG_8K_BANK_COUNT = ${bank8KCount};

/** MMC3 初始 8KB bank 映射 */
export const MMC3_INIT_MAP: Record<number, number> = {
  0x8000: ${initBankLo},   // 第一个 8KB
  0xA000: ${initBankMidLo},// 第二个 8KB
  0xC000: ${initBankMidHi},// 倒数第二个 8KB (固定)
  0xE000: ${initBankHi},   // 最后一个 8KB (固定)
};

/**
 * 从 PRG-ROM 读取 1 字节 (MMC3 映射)
 * @param addr CPU 地址 (0x4020 ~ 0xFFFF)
 * @param banks PRG-ROM 8KB bank 数组 (长度 = PRG_8K_BANK_COUNT)
 * @param map8k 当前 8KB bank 映射表 (key=窗口基地址, value=8KB bank 索引)
 */
export function readPrgRom(
  addr: number,
  banks: Uint8Array[],
  map8k: Record<number, number>,
): number {
  // 确定属于哪个 8KB 窗口
  const windowBase = addr & 0xE000; // 0x8000, 0xA000, 0xC000, or 0xE000
  const offset = addr & 0x1FFF;     // 0x0000 ~ 0x1FFF

  if (addr < 0x8000) {
    // 0x4020-0x5FFF: 通常为 PRG-RAM / mapper 寄存器区
    // 0x6000-0x7FFF: SRAM / Save RAM (MMC3)
    // 返回 0 (open bus 模拟)
    return 0;
  }

  const bank8k = map8k[windowBase] ?? 0;
  return banks[bank8k]?.[offset] ?? 0;
}
`;

writeFileSync(outPath, output, 'utf-8');
console.log(`Written ${outPath}`);
console.log(`  PRG-ROM banks: ${prgCount} × 16KB (raw bytes)`);
console.log(`  Initial MMC3 map: { 0x8000:${initBankLo}, 0xA000:${initBankMidLo}, 0xC000:${initBankMidHi}, 0xE000:${initBankHi} }`);
