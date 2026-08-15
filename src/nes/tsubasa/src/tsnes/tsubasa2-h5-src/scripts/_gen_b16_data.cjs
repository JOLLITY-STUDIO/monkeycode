/**
 * Bank16 数据层生成器 — 从 rom-data/prg-bank-16.ts 提取原始字节,
 * 生成 src/data/bank16-data.ts (含 readB16/readB16U16 与全部表访问器)。
 */
const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../../rom-data/prg-bank-16.ts');
const outPath = path.resolve(__dirname, '../src/data/bank16-data.ts');

const t = fs.readFileSync(srcPath, 'utf8');
// 提取全部 0xNN 十六进制项 (避开 number[] 类型注解的 [ 干扰)
const m = t.match(/\[([\s\S]*?)\];/);
if (!m) throw new Error('prg-bank-16.ts: 未找到数组');
const bytes = (m[1].match(/0x[0-9a-fA-F]+/g) ?? []).map((s) => parseInt(s, 16));
// 源文件含 8193 字节, 但 CPU 窗口仅映射 $8000-$9FFF (8192B), 末字节永不访问 → 截断
if (bytes.length < 8192) throw new Error('prg-bank-16.ts 长度异常: ' + bytes.length);
bytes.length = 8192;

function hexByte(b) {
  return '0x' + b.toString(16).toUpperCase().padStart(2, '0');
}

// 字节数组文本, 每行 16 个
const lines = [];
for (let i = 0; i < bytes.length; i += 16) {
  const chunk = bytes.slice(i, i + 16).map(hexByte).join(', ');
  lines.push('  ' + chunk + ',');
}
const arrayText = lines.join('\n');

const header = `/**
 * Bank 16 数据 (Data/Model 层) — 原始提取, 未结构化
 *
 * 来源: rom-data/prg-bank-16.ts (自动生成, 原始字节)
 * CPU 映射: bank 0x10 = 16, MMC3 R6 切到 $8000-$9FFF
 * PRG offset: 0x020010-0x02000F (0x020010 + (cpuAddr-0x8000))
 *
 * ⚠ 本文件由脚本 _gen_b16_data.cjs 自动生成, 不手工修改。
 *   service 仅通过 readB16/readB16U16 访问本 bank 数据,
 *   不直接引用 rom-data/prg-bank-16.ts。
 */

/** bank16 CPU 基址 */
export const B16_CPU_BASE = 0x8000;

/** bank16 原始字节 (CPU $8000-$9FFF, 8192B) */
export const B16_DATA: readonly number[] = [
`;

const footer = `];

/** 读 bank16 原始字节 (CPU 地址, 支持 $8000-$9FFF 与 $A000-$BFFF 双窗口) */
export function readB16(cpuAddr: number): number {
  let off = cpuAddr - B16_CPU_BASE;
  if (cpuAddr >= 0xa000) off = cpuAddr - 0xa000;
  return off >= 0 && off < B16_DATA.length ? B16_DATA[off] : 0;
}

/** 读 bank16 16bit LE (CPU 地址) */
export function readB16U16(cpuAddr: number): number {
  return readB16(cpuAddr) | (readB16(cpuAddr + 1) << 8);
}

// ═══════════════════════════════════════════════════════════════
// 结构化表访问 (全部位于 CPU $8000-$9FFF 窗口内)
// ═══════════════════════════════════════════════════════════════

/**
 * $80AF Table A — 脚本命令分发表 (16 项 ×2B LE)。
 * 由 $80A9 (SEC; SBC #$F0; JSR $C509) 按命令码 $F0-$FE 索引。
 * 有效命令: $F0-$FE, 索引 = 命令 - $F0。
 */
export function readB16CmdPtr(idx: number): number {
  return readB16U16(0x80af + ((idx & 0x0f) << 1));
}

/**
 * $8173 Table B — 谓词分发表 (74 项 ×2B LE)。
 * 由 $816E (AND #$7F; JSR $C509) 按条件码索引。
 */
export function readB16PredPtr(idx: number): number {
  return readB16U16(0x8173 + ((idx & 0x7f) << 1));
}

/**
 * $82FE Table D — X 计数分发表 (5 项有效 ×2B LE, 其余为统计数据)。
 * 前 5 项: $8336 $8337 $832D $8340 $834C (X 计数 0-4)。
 */
export function readB16XCountPtr(idx: number): number {
  return readB16U16(0x82fe + ((idx & 0x07) << 1));
}

/**
 * $886D Table F — 脚本字节分发表 (5 项有效 ×2B LE)。
 * 第 6 项为数据 ($00A9), 不参与分发。
 */
export function readB16ScriptBytePtr(idx: number): number {
  return readB16U16(0x886d + ((idx & 0x07) << 1));
}

/**
 * $88F4 Table G — 脚本命令分发表 (4 项有效 ×2B LE)。
 * 后 4 项为数据, 不参与分发。
 */
export function readB16ScriptCmdPtr(idx: number): number {
  return readB16U16(0x88f4 + ((idx & 0x07) << 1));
}

/**
 * $89BF Table H — 特殊动作指针表 (64 项 ×2B LE)。
 * $8006 入口在 ram_0518 bit7=0 时选择本表, 以 ram_0518*2 索引。
 */
export function readB16TableH(idx: number): number {
  return readB16U16(0x89bf + ((idx & 0x7f) << 1));
}

/**
 * $8ABF Table I — 特殊动作指针表 (64 项 ×2B LE)。
 * $8006 入口在 ram_0518 bit7=1 时选择本表, 以 (ram_0518&0x7F)*2 索引。
 */
export function readB16TableI(idx: number): number {
  return readB16U16(0x8abf + ((idx & 0x7f) << 1));
}

/**
 * $8291 小查找表 (6B): [00 01 FF FF 02 03] — X 帧方向查询。
 */
export function readB16Lookup8291(idx: number): number {
  return B16_DATA[0x91 + (idx & 0x07)] ?? 0;
}

/**
 * $8308 统计数据表 (23B): 各角色基础统计数据。
 */
export function readB16Stats8308(idx: number): number {
  return B16_DATA[0x108 + (idx & 0x3f)] ?? 0;
}

/**
 * $83AF 小查找表 (5B): [FF FF 00 FF 01]。
 */
export function readB16Lookup83AF(idx: number): number {
  return B16_DATA[0x3af + (idx & 0x07)] ?? 0;
}

/**
 * $83BB 小查找表 (7B): [FF 00 FF FF 01 FF 02]。
 */
export function readB16Lookup83BB(idx: number): number {
  return B16_DATA[0x3bb + (idx & 0x0f)] ?? 0;
}

/**
 * $857A 小查找表 (6B): [FF FF 00 01 FF 02]。
 */
export function readB16Lookup857A(idx: number): number {
  return B16_DATA[0x57a + (idx & 0x07)] ?? 0;
}

/**
 * $8622 查找表 (5B): [60 02 0F 21 22] — 射门/传中判段。
 */
export function readB16Lookup8622(idx: number): number {
  return B16_DATA[0x622 + (idx & 0x07)] ?? 0;
}

/**
 * $8635 小查找表 (6B): [FF FF 00 FF 01 02]。
 */
export function readB16Lookup8635(idx: number): number {
  return B16_DATA[0x635 + (idx & 0x0f)] ?? 0;
}

/**
 * $8645 小查找表 (5B): [FF FF FF 00 01]。
 */
export function readB16Lookup8645(idx: number): number {
  return B16_DATA[0x645 + (idx & 0x07)] ?? 0;
}

/**
 * $86A6 成对查找表 (14B = 7 对, 值+索引)。
 */
export function readB16Pair86A6(idx: number): number {
  return B16_DATA[0x6a6 + (idx & 0x1f)] ?? 0;
}

/**
 * $86C8 查找表 (4B): [08 0A 10 1F] — 射门力量判定阈值。
 */
export function readB16Lookup86C8(idx: number): number {
  return B16_DATA[0x6c8 + (idx & 0x07)] ?? 0;
}

/**
 * $86E3 表 (17B): 站位坐标表。
 */
export function readB16Table86E3(idx: number): number {
  return B16_DATA[0x6e3 + (idx & 0x1f)] ?? 0;
}

/**
 * $86F4 精灵动作表 ($86F4-$87DF, 236B) — 按角色/动作索引的精灵序列。
 */
export function readB16AnimAction(idx: number): number {
  return B16_DATA[0x6f4 + (idx & 0xff)] ?? 0;
}

/**
 * $876A 表 ($876A-$87DF, 118B) — 高编号动作精灵序列。
 */
export function readB16AnimHigh(idx: number): number {
  return B16_DATA[0x76a + (idx & 0xff)] ?? 0;
}
`;

const out = header + arrayText + footer;
fs.writeFileSync(outPath, out, 'utf8');
console.log('已生成', outPath, '字节数 =', bytes.length, '文件行数 =', out.split('\n').length);
