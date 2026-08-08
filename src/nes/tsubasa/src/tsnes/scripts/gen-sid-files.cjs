/**
 * gen-sid-files.cjs
 * 解析 Bank 12 SE_MAP，提取每个 SID 的通道初始化列表 + 音序数据，
 * 生成独立的 TS 文件（去除所有 MMC3 bank 切换依赖）。
 *
 * 运行: node scripts/gen-sid-files.cjs
 */

const fs = require('fs');
const path = require('path');

// ── 配置 ──
const ROM_DIR = path.join(__dirname, '..', 'rom-data');
const OUT_DIR = path.join(__dirname, '..', 'sid-data');
const BANK_SIZE = 0x2000;

// ── 工具函数 ──
function extractArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const hexPattern = /0x([0-9A-Fa-f]{2})/g;
  const vals = [];
  let m;
  while ((m = hexPattern.exec(match[1])) !== null) vals.push(parseInt(m[1], 16));
  return vals;
}

function toHex(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }
function toHexAddr(n) { return '0x' + n.toString(16).toUpperCase().padStart(4, '0'); }

// ── 加载所有 bank ──
console.log('Loading banks...');
const bank12 = extractArray(path.join(ROM_DIR, 'prg-bank-12.ts'));
const bank13 = extractArray(path.join(ROM_DIR, 'prg-bank-13.ts'));
const bank14 = extractArray(path.join(ROM_DIR, 'prg-bank-14.ts'));
const bank15 = extractArray(path.join(ROM_DIR, 'prg-bank-15.ts'));

console.log(`  Bank 12: ${bank12.length} bytes`);
console.log(`  Bank 13: ${bank13.length} bytes`);
console.log(`  Bank 14: ${bank14.length} bytes`);
console.log(`  Bank 15: ${bank15.length} bytes`);

// ── 提取 Bank 12 共用表 ──
const FREQ_TBL_OFF = 0x070D; // $870D - 12×2 bytes
const DUR_TBL_OFF = 0x0725;  // $8725 - 64 bytes
const SE_MAP_OFF = 0x0BDA;   // $8BDA - 31 entries × 2B

const freqTable = [];
for (let i = 0; i < 12; i++) {
  const lo = bank12[FREQ_TBL_OFF + i * 2];
  const hi = bank12[FREQ_TBL_OFF + i * 2 + 1];
  freqTable.push(lo | ((hi & 7) << 8));
}

const durTable = bank12.slice(DUR_TBL_OFF, DUR_TBL_OFF + 64);

console.log('\nTables extracted:');
console.log(`  Freq table (12): ${freqTable.map(n => toHexAddr(n)).join(' ')}`);
console.log(`  Dur table (64): ${durTable.slice(0, 16).map(n => toHex(n)).join(' ')}...`);

// ── sidToBank 映射 ──
function sidToBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  if (sid < 0x5C) return 15;
  return 12;
}

// ── 获取指定 bank 在指定地址的字节 ──
function getBank(sid, addr) {
  const bankNum = sidToBank(sid);
  if (bankNum === 12) return { bank: bank12, num: 12 };
  if (bankNum === 13) return { bank: bank13, num: 13 };
  if (bankNum === 14) return { bank: bank14, num: 14 };
  if (bankNum === 15) return { bank: bank15, num: 15 };
  return { bank: bank12, num: 12 };
}

function readByte(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) {
    // Fixed window: Bank 12
    return bank12[addr - 0x8000] || 0;
  }
  if (addr >= 0xA000 && addr < 0xC000) {
    // Switchable window
    const { bank } = getBank(sid, addr);
    return bank[addr - 0xA000] || 0;
  }
  return 0;
}

// ── 追踪音序数据 ──
// 跟踪一条序列直到无法继续（遇到跳转/子程序时只记录命令而不深入）
function extractSequence(sid, startAddr, maxBytes = 8192) {
  const bytes = [];
  let addr = startAddr;
  
  while (bytes.length < maxBytes) {
    if (addr < 0x8000 || addr >= 0xC000) break; // 越界
    
    const b = readByte(sid, addr);
    bytes.push({ addr, val: b });
    addr++;
    
    if (b >= 0xE0) {
      // 命令字节 — 读取后续参数
      const cmd = b & 0x1F;
      if (cmd === 0x00 || cmd === 0x02 || cmd === 0x03 || 
          cmd === 0x09 || cmd === 0x0A || cmd === 0x0B || 
          cmd === 0x0C || cmd === 0x0D || cmd === 0x0E || cmd === 0x0F) {
        // 单字节参数命令
        if (addr < 0xC000) {
          bytes.push({ addr, val: readByte(sid, addr), isParam: true });
          addr++;
        }
      } else if (cmd === 0x04) {
        // $E4: 子程序调用 (2 字节地址)
        if (addr + 1 < 0xC000) {
          const lo = readByte(sid, addr);
          const hi = readByte(sid, addr + 1);
          bytes.push({ addr, val: lo, isParam: true });
          bytes.push({ addr: addr + 1, val: hi, isParam: true });
          addr += 2;
          // 不追踪子程序内部
        }
      } else if (cmd === 0x08) {
        // $E8: 跳转 (2 字节地址)
        if (addr + 1 < 0xC000) {
          const lo = readByte(sid, addr);
          const hi = readByte(sid, addr + 1);
          bytes.push({ addr, val: lo, isParam: true });
          bytes.push({ addr: addr + 1, val: hi, isParam: true });
          addr += 2;
        }
      } else if (cmd === 0x05) {
        // $E5: 返回 — 序列结束
        break;
      }
      // $E6/$E7: 无参数
    }
    // <$80: 音符字节，继续
    // $80-$DF: duration 前缀，继续等待下一个音符
  }
  
  return bytes;
}

// ── 提取 timing table ──
function extractTimingTable(sid, addr, maxBytes = 256) {
  const bytes = [];
  for (let i = 0; i < maxBytes; i++) {
    const b = readByte(sid, addr + i);
    if (b === 0xFF) { // 可能的终止符
      bytes.push(b);
      break;
    }
    bytes.push(b);
    if (bytes.length > 200) break;
  }
  return bytes;
}

// ── 解析所有 SID ──
const SE_MAP_COUNT = 44; // Sound IDs 0x30 - 0x5B (12:0x30-31, 13:0x32-43, 14:0x44-50, 15:0x51-5B)
const allSids = [];

console.log('\nParsing SE_MAP at $8BDA...');
for (let i = 0; i < SE_MAP_COUNT; i++) {
  const sidId = 0x30 + i;
  const ptrLo = bank12[SE_MAP_OFF + i * 2];
  const ptrHi = bank12[SE_MAP_OFF + i * 2 + 1];
  const initPtr = (ptrHi << 8) | ptrLo;

  // 允许 initPtr 在 $8000-$BFFF 范围（$A000-$BFFF 在 switchable bank 中）
  if (initPtr < 0x8000 || initPtr >= 0xC000) {
    console.log(`  SID 0x${sidId.toString(16)}: invalid pointer $${initPtr.toString(16)}, skipping`);
    continue;
  }

  console.log(`  SID 0x${sidId.toString(16)}: init list at $${initPtr.toString(16)}`);

  // 解析通道初始化列表 — 使用 readByte 处理跨 bank 读取
  const channels = [];
  let y = 0;
  while (y < 256) {
    const ch = readByte(sidId, initPtr + y);
    if (ch >= 0x80) break;
    
    const tLo = readByte(sidId, initPtr + y + 1);
    const tHi = readByte(sidId, initPtr + y + 2);
    const trackPtr = (tHi << 8) | tLo;
    y += 3;

    // 提取 channel 的音序数据
    const trackData = extractSequence(sidId, trackPtr);
    
    channels.push({
      ch,
      trackPtr,
      trackLen: trackData.length,
      trackBytes: trackData.map(t => t.val),
    });
  }

  allSids.push({
    id: sidId,
    initPtr,
    terminatorByte: readByte(sidId, initPtr + y) || 0x80,
    channels,
  });
}

console.log(`\nExtracted ${allSids.length} SIDs`);

// ── 统计每个 SID 的通道数 ──
for (const sid of allSids) {
  const chStr = sid.channels.map(c => c.ch).join(',');
  const bytesStr = sid.channels.map(c => c.trackLen).join(',');
  console.log(`  SID 0x${sid.id.toString(16)}: ${sid.channels.length}ch [${chStr}] bytes [${bytesStr}]`);
}

// ── 提取 Bank 12 的 timing tables ($8754 起) ──
console.log('\nExtracting timing tables...');
const TIMING_TBL_BASE = 0x0754; // $8754
const timingTables = [];
for (let i = 0; i < 32; i++) {
  const lo = bank12[TIMING_TBL_BASE + i * 2];
  const hi = bank12[TIMING_TBL_BASE + i * 2 + 1];
  const ptr = (hi << 8) | lo;
  if (ptr >= 0x8000 && ptr < 0xA000) {
    const tblData = extractTimingTable(0x30, ptr); // 使用 Bank 12 读取
    if (tblData.length > 0 && tblData.length < 100) {
      timingTables.push({ idx: i, ptr, data: tblData });
    }
  }
}
console.log(`  Found ${timingTables.length} timing tables`);

// ════════════════════════════════════════════════
// 生成输出文件
// ════════════════════════════════════════════════

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 生成 shared.ts (公共表) ──
let sharedTs = `/**
 * SID 音頻數據 — 公共表
 * 所有 SID 共享的頻率表、時長表、時序表。
 * 自動生成，請勿手動編輯。
 */

/** 12 音符頻率表 ($870D) — NES 11-bit period */
export const FREQ_TABLE: readonly number[] = [
  ${freqTable.map(n => '0x' + n.toString(16).toUpperCase().padStart(4, '0')).join(',\n  ')},
];

/** 64 音符時長表 ($8725) — 單位: 幀 */
export const DUR_TABLE: readonly number[] = [
  ${durTable.map(n => '0x' + n.toString(16).toUpperCase().padStart(2, '0')).join(', ')},

];

/** 時序表 ($8754) */
export const TIMING_TABLES: Record<number, { ptr: number; data: readonly number[] }> = {
${timingTables.map(t => `  ${t.idx}: { ptr: 0x${t.ptr.toString(16).toUpperCase().padStart(4, '0')}, data: [${t.data.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ')}] }`).join(',\n')},
};

/** APU 通道類型 */
export const CHANNEL_NAMES: Record<number, string> = {
  0: 'SQ1', 1: 'SQ2', 2: 'TRI', 3: 'NOISE',
  4: 'SQ1_SEC', 5: 'SQ2_SEC', 6: 'TRI_SEC', 7: 'NOISE_SEC',
};
`;

fs.writeFileSync(path.join(OUT_DIR, 'shared.ts'), sharedTs);
console.log('\nGenerated sid-data/shared.ts');

// ── 生成 SIDIndex.ts (索引) ──
let indexTs = `/**
 * SID 音頻數據索引
 * 自動生成，請勿手動編輯。
 */
`;

for (const sid of allSids) {
  const hexId = sid.id.toString(16).toUpperCase().padStart(2, '0');
  indexTs += `import sid_0x${hexId} from './sid-0x${hexId}';\n`;
}

indexTs += `
import { FREQ_TABLE, DUR_TABLE, TIMING_TABLES } from './shared';

export interface SidChannel {
  ch: number;
  trackPtr: number;
  trackBytes: readonly number[];
}

export interface SidData {
  id: number;
  channels: readonly SidChannel[];
}

/** 所有 SID 数据 */
export const ALL_SID_DATA: Record<number, SidData> = {
${allSids.map(s => {
  const hexId = s.id.toString(16).toUpperCase().padStart(2, '0');
  return `  0x${hexId}: sid_0x${hexId},`;
}).join('\n')}
};

/** 按 ID 获取 SID */
export function getSid(id: number): SidData | undefined {
  return ALL_SID_DATA[id];
}

export { FREQ_TABLE, DUR_TABLE, TIMING_TABLES };
`;

fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexTs);
console.log('Generated sid-data/index.ts');

// ── 生成每个 SID 的独立 TS 文件 ──
for (const sid of allSids) {
  const hexId = sid.id.toString(16).toUpperCase().padStart(2, '0');
  const fileName = `sid-0x${hexId}.ts`;
  
  const channelsTs = sid.channels.map(c => {
    const bytesStr = c.trackBytes.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
    return `    {
      ch: ${c.ch},
      trackPtr: 0x${c.trackPtr.toString(16).toUpperCase().padStart(4, '0')},
      trackBytes: [${bytesStr}],
    }`;
  }).join(',\n');
  
  const sidTs = `/**
 * SID 0x${hexId} — 音頻數據
 * Bank: ${sidToBank(sid.id)}
 * 通道初始化列表位置: 0x${sid.initPtr.toString(16).toUpperCase().padStart(4, '0')}
 * 自動生成，請勿手動編輯。
 */
import type { SidData } from './index';

const SID_0x${hexId}: SidData = {
  id: 0x${hexId},
  channels: [
${channelsTs},
  ],
};

export default SID_0x${hexId};
`;
  
  fs.writeFileSync(path.join(OUT_DIR, fileName), sidTs);
}
console.log(`Generated ${allSids.length} SID files`);

console.log('\nDone! Output in sid-data/');
