/**
 * Bank 18 数据 (Data/Model 层) — 原始提取, 未结构化
 *
 * 来源: rom-data/prg-bank-18.ts (自动生成, 原始字节, 自动提取)
 * 数据已直接 import, cpuAddr (0x8000-0x9FFF) 仅作数据索引保留
 * PRG offset: 0x024010-0x02600F
 *
 * ⚠ 本文件由脚本自动提取, 不结构化。service 仅通过 readB18/readB18U16
 *   访问本 bank 数据, 不直接引用 rom-data/prg-bank-18.ts。
 *
 * ⚠ 章节指针表说明: 本 bank 经完整反汇编确认是「渲染数据 Bank」(已查证
 *   2026-08, asm/bank18 全部 .s 审阅)——全部为背景 tile 图块 (bg tile
 *   索引) / 精灵对数据, 数据值集中在 $01/$0D/$1A/$50-$5F/$E8/$F0/$1E/
 *   $34/$3C/$41/$44/$80-$99 等 tile 索引区间, 不含任何 .word 章节指针数组。
 *   章节→Bank19 数据流偏移映射由 Bank00/Bank02 代码跨 bank 维护, 不在本
 *   bank; 确切映射属未反汇编/待 trace 的章节选择流程 (详见
 *   service/bank18_story.ts 文件头注释)。
 */

import PRG_BANK_18 from './prg-bank-18';

/** bank18 CPU 基址 */
export const B18_CPU_BASE = 0x8000;

/** bank18 原始字节 (CPU $8000-$9FFF) */
export const B18_DATA: readonly number[] = PRG_BANK_18;

/**
 * 读 bank18 内 cpuAddr 处的原始字节。
 * bank18 无代码, 数据经 $8000-$9FFF (R6) 直接访问。
 */
export function readB18(cpuAddr: number): number {
  const off = cpuAddr - B18_CPU_BASE;
  return off >= 0 && off < B18_DATA.length ? B18_DATA[off] : 0;
}

/** 读 bank18 16bit LE (CPU 地址) */
export function readB18U16(cpuAddr: number): number {
  return readB18(cpuAddr) | (readB18(cpuAddr + 1) << 8);
}

// ═══════════════════════════════════════════════════════════════
// 结构化数据访问
// ═══════════════════════════════════════════════════════════════

/**
 * 背景 tile 图块读取。
 * bank18 的数据大量以 16 字节一行的 4×4 tile 图块 (bg) 排布,
 * 每行对应一个 4×4=16 tile 的背景块。行基址 = $8000 + row*16。
 *
 * 偏移 (0-15) 按行列: 行 = off >> 2, 列 = off & 3。
 */
export function readB18TileRow(row: number): readonly number[] {
  const base = row * 16;
  const out: number[] = [];
  for (let i = 0; i < 16; i++) {
    out.push(readB18(0x8000 + base + i));
  }
  return out;
}

/**
 * 精灵对读取 (tile 对)。
 * bank18 多处出现 $50/$51/$54/$55 + $52/$53/$56/$57 等 2×2 精灵对
 * (如路沿/装饰), 以 4 字节为一对连续索引。
 *
 * 注: 本 bank 无指针表, 各数据段的业务边界 (哪些行属于哪张场景地图)
 * 由 Bank00/Bank02 跨 bank 引用定位, 此处仅提供按偏移的基础读取。
 */
export function readB18Byte(off: number): number {
  return off >= 0 && off < B18_DATA.length ? B18_DATA[off] : 0;
}

// ═══════════════════════════════════════════════════════════════
// 场景图块 (Scene Tile-Map) 注册表
//
// 【数据边界来源 — 已查证 2026-08】asm/bank18 全部 .s 为连续 tile 索引流,
// 每行 16 字节 = 4×4 bg 图块。数据被「全 $01 / 全 $00 padding 行」分隔为
// 若干独立场景段 (见 asm 反汇编, 相邻场景之间以全 $01/$00 行隔开)。
// 下表即按此 padding 分隔识别出的真实场景段 (数组索引 0x0000-0x1FFF)。
//
// ⚠ 说明: 这些段是「背景 tile 图块 / 精灵对数据段」, 不是 .word 章节指针表。
//   bank18 经完整反汇编确认不含章节指针数组; 各段对应哪张剧情场景/哪个章节
//   由 Bank00/Bank02 跨 bank 章节选择流程引用, 属未反汇编/待 trace 段。此处
//   仅按 ROM 真实边界注册段区间, 供 service 按场景索引读取, 不臆造章节映射。
// ═══════════════════════════════════════════════════════════════

/** 单个场景段描述 (数组索引区间, 半开区间 [start,end)) */
export interface B18SceneMap {
  /** 起始数组索引 */
  readonly start: number;
  /** 结束数组索引 (不含) */
  readonly end: number;
  /** 段首 4 字节 (用于人工比对/调试) */
  readonly head: readonly number[];
}

/** bank18 场景图块段注册表 (索引 = 场景号, 按 ROM padding 分隔的真实边界) */
export const B18_SCENE_MAPS: readonly B18SceneMap[] = [
  // idx 0: [0x0000-0x0140) len=320 rows=20 — 开场/街道 tile (含 $10 场景标记字节)
  { start: 0x0000, end: 0x0140, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 1: [0x0150-0x06F0) len=1440 rows=90 — 大场景 tile 块 (3C 室内/门口系列)
  { start: 0x0150, end: 0x06f0, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 2: [0x0700-0x0B70) len=1136 rows=71 — 50/51 路沿精灵对 + 0D 地砖场景
  { start: 0x0700, end: 0x0b70, head: [0x52, 0x53, 0x56, 0x57] },
  // idx 3: [0x0B80-0x0C30) len=176 rows=11 — 40/43/48/4A 城门/门框 tile 段
  { start: 0x0b80, end: 0x0c30, head: [0x40, 0x40, 0x40, 0x40] },
  // idx 4: [0x0C40-0x0F60) len=800 rows=50 — 50/51 + 41/44 路沿/围栏场景
  { start: 0x0c40, end: 0x0f60, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 5: [0x0F70-0x1000) len=144 rows=9 — 10 11 3C 3C 门口/房间 tile 段
  { start: 0x0f70, end: 0x1000, head: [0x10, 0x11, 0x3c, 0x3c] },
  // idx 6: [0x1010-0x1140) len=304 rows=19 — 文字/散点 tile 段
  { start: 0x1010, end: 0x1140, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 7: [0x1150-0x1260) len=272 rows=17 — 0D 地砖 + 10 门口场景
  { start: 0x1150, end: 0x1260, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 8: [0x1270-0x1930) len=1728 rows=108 — 大场景 tile 块 (05/06 地面系列)
  { start: 0x1270, end: 0x1930, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 9: [0x1940-0x1F00) len=1472 rows=92 — 球场/看台 tile 段 (1F/1D 看台边)
  { start: 0x1940, end: 0x1f00, head: [0x1f, 0x1d, 0x00, 0x00] },
  // idx 10: [0x1F10-0x1F40) len=48 rows=3 — 文字精灵对段 (4E/4F/42/43)
  { start: 0x1f10, end: 0x1f40, head: [0x01, 0x01, 0x01, 0x01] },
  // idx 11: [0x1F60-0x2000) len=160 rows=10 — 文字/对话 tile 段 (00 07 3E 01)
  { start: 0x1f60, end: 0x2000, head: [0x00, 0x07, 0x3e, 0x01] },
];

/** bank18 场景段总数 */
export const B18_SCENE_COUNT: number = B18_SCENE_MAPS.length;

/**
 * 读指定场景段的原始 tile 字节 (真实 ROM 数据, 数组索引 0x0000-0x1FFF)。
 * @param sceneIdx 场景段索引 (0..B18_SCENE_COUNT-1)
 */
export function readB18Scene(sceneIdx: number): readonly number[] {
  const m = B18_SCENE_MAPS[sceneIdx];
  if (!m) return [];
  const out: number[] = [];
  for (let i = m.start; i < m.end; i++) {
    out.push(B18_DATA[i]);
  }
  return out;
}

/**
 * 读指定场景段的单行 tile (16 字节 = 4×4 bg 图块)。
 * @param sceneIdx 场景段索引
 * @param row 场景内行号 (0 基)
 */
export function readB18SceneRow(sceneIdx: number, row: number): readonly number[] {
  const m = B18_SCENE_MAPS[sceneIdx];
  if (!m) return [];
  const base = m.start + row * 16;
  const out: number[] = [];
  for (let i = 0; i < 16; i++) {
    const idx = base + i;
    out.push(idx < m.end && idx >= m.start ? B18_DATA[idx] : 0x01);
  }
  return out;
}
