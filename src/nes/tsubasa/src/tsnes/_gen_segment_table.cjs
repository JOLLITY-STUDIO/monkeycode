/**
 * 生成 bank03 segment 表对象 TypeScript 文件
 * 输入: temp/chr_bank0/bank03_segments.json
 * 输出: game-engine/native-game/tsubasa/banks/prg/bank-03-segment-table.ts
 * 用法: node _gen_segment_table.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SEGMENTS_IN = path.join(ROOT, 'temp', 'chr_bank0', 'bank03_segments.json');
const OUT = path.join(ROOT, 'game-engine', 'native-game', 'tsubasa', 'banks', 'prg', 'bank-03-segment-table.ts');

const segments = JSON.parse(fs.readFileSync(SEGMENTS_IN, 'utf-8'));

const lines = [];

lines.push(`/**`);
lines.push(` * Bank 03 — 对话文本分段表 (Segment Table)`);
lines.push(` *`);
lines.push(` * 从 ROM Bank 03 原始字节流解析，按控制码切分为 text/control 段。`);
lines.push(` * 每条记录有自增 id (0-based)，对应原始 ROM 中的 offset。`);
lines.push(` *`);
lines.push(` * 生成脚本: _gen_segment_table.cjs`);
lines.push(` * 数据来源: temp/chr_bank0/bank03_segments.json`);
lines.push(` *`);
lines.push(` * 段类型:`);
lines.push(` *   text     — 字符 tile 序列 (对话文本)`);
lines.push(` *   control  — 控制码字节 (换行/翻页/结束等)`);
lines.push(` */`);
lines.push(``);
lines.push(`/** 文本段 — 单个字符 tile */`);
lines.push(`export interface TextChar {`);
lines.push(`  tile: number;`);
lines.push(`  label: string | null;`);
lines.push(`  mark: number | null;`);
lines.push(`  markType: string | null;`);
lines.push(`}`);
lines.push(``);
lines.push(`/** 分段记录 */`);
lines.push(`export interface SegmentEntry {`);
lines.push(`  /** 自增段索引 (0-based) */`);
lines.push(`  id: number;`);
lines.push(`  /** 原始 ROM 中偏移 (Bank 03 内偏移，0 ~ 8191) */`);
lines.push(`  offset: number;`);
lines.push(`  /** 段类型 */`);
lines.push(`  type: 'text' | 'control';`);
lines.push(`  /** 段长度 (字节数) */`);
lines.push(`  length: number;`);
lines.push(`  /** 十六进制原文 (调试用) */`);
lines.push(`  hex: string;`);
lines.push(`  /** [type=text] 字符数组 */`);
lines.push(`  chars?: TextChar[];`);
lines.push(`  /** [type=control] 原始字节 */`);
lines.push(`  bytes?: number[];`);
lines.push(`}`);
lines.push(``);
lines.push(`/**`);
lines.push(` * ===== SEGMENT TABLE =====`);
lines.push(` * ${segments.length} 条记录 (text: ${segments.filter(s=>s.type==='text').length}, control: ${segments.filter(s=>s.type==='control').length})`);
lines.push(` */`);
lines.push(`export const segmentTable: SegmentEntry[] = [`);

// 写入每条记录 (JSON 内联)
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  const entry = {
    id: i,
    offset: seg.offset,
    type: seg.type,
    length: seg.length,
    hex: seg.hex,
  };
  if (seg.type === 'text') {
    entry.chars = seg.chars.map(c => ({
      tile: c.tile,
      label: c.label,
      mark: c.mark,
      markType: c.markType,
    }));
  } else {
    entry.bytes = seg.bytes;
  }
  const json = JSON.stringify(entry);
  const comma = i < segments.length - 1 ? ',' : '';
  lines.push(`  ${json}${comma}`);
}

lines.push(`];`);
lines.push(``);
lines.push(`/** 快速查询: 按 offset 获取段 (O(n), debug用) */`);
lines.push(`export function getSegmentByOffset(offset: number): SegmentEntry | undefined {`);
lines.push(`  return segmentTable.find(s => s.offset === offset);`);
lines.push(`}`);
lines.push(``);
lines.push(`/** 快速查询: 按 id 获取段 (O(1) via id === index) */`);
lines.push(`export function getSegmentById(id: number): SegmentEntry | undefined {`);
lines.push(`  return segmentTable[id];`);
lines.push(`}`);
lines.push(``);

fs.writeFileSync(OUT, lines.join('\n'), 'utf-8');

const stat = fs.statSync(OUT);
console.log(`✓ 生成: ${OUT}`);
console.log(`  大小: ${(stat.size / 1024).toFixed(1)} KB`);
console.log(`  行数: ${lines.length}`);
console.log(`  段数: ${segments.length}`);
