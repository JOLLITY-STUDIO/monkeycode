/**
 * gen-bgm-sid.cjs — 重新生成 mini-audio/bgm-data/bgm-sid/BGM_0xXX.ts + index.ts
 *
 * ★ 关键修复（对照 bank_12.asm $8349 反汇编）:
 *   1. SE_MAP 索引必须 = SE#-1（$8349: DEY; TYA; ASL → $8BDA+(SE#-1)*2）
 *      —— 旧生成器用 SE_MAP_OFF+i*2 且标号 0x30+i，实际读到的是 SE#i+1，
 *         导致全部文件指向错误的轨道（0x33/0x34/0x39 因此“无数据/无声音”）。
 *   2. NES_BASE = SE_MAP initPtr；RAW 从 initPtr 起（含 init list 头）。
 *   3. 数据追踪: initPtr + 各 trackPtr + E8/E9 跳转目标 BFS；
 *      trackPtr 指向 0xFF 终止符时（引擎通道重启会跳过），从 +1 起扫。
 *   4. 引擎真实行为: 首字节 bit7 置位 → 该 SE 静音（$8362 BPL→STX $4015→RTS）。
 *      0x31 是引擎特殊命令（$806C CPY #$31，永远不经过 $8349）→ 不入 BGM 列表。
 *      0x4A/0x5B 为空轨道（实机即无声）→ 标记 silent。
 *
 * 运行: node scripts/gen-bgm-sid.cjs
 */
const fs = require('fs');
const path = require('path');

const ROM_DIR = path.join(__dirname, '..', 'rom-data');
const OUT_DIR = path.join(__dirname, '..', 'mini-audio', 'bgm-data', 'bgm-sid');

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

const bank12 = extractArray(path.join(ROM_DIR, 'prg-bank-12.ts'));
const bank13 = extractArray(path.join(ROM_DIR, 'prg-bank-13.ts'));
const bank14 = extractArray(path.join(ROM_DIR, 'prg-bank-14.ts'));
const bank15 = extractArray(path.join(ROM_DIR, 'prg-bank-15.ts'));
const BANKS = { 12: bank12, 13: bank13, 14: bank14, 15: bank15 };

/** 与引擎 $8002 一致的窗口 bank 选择 */
function sidToBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  if (sid < 0x5C) return 15;
  return 12;
}

function readByte(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return bank12[addr - 0x8000] || 0; // 固定窗口 Bank 12
  if (addr >= 0xA000 && addr < 0xC000) { // 可切换窗口 → 当前 SID 所在 bank
    const b = BANKS[sidToBank(sid)];
    return b[addr - 0xA000] || 0;
  }
  return 0;
}

// ── $84C9 命令参数表（对照播放器 _dispatchCmd）──
const CMD_ARGS = {
  0x00: 1, // E0 set timing ptr
  0x01: 0, // E1 nop
  0x02: 1, // E2 set vol env
  0x03: 1, // E3 or vol ctrl
  0x04: 1, // E4 enable sweep
  0x05: 1, // E5 set portamento
  0x06: 0, // E6 nop
  0x07: 0, // E7 nop
  0x08: 2, // E8 jump abs
  0x09: 2, // E9 call abs
  0x0A: 0, // EA return（不是终止符！）
  0x0B: 1, // EB loop start
  0x0C: 0, // EC loop end
  0x0D: 1, // ED set ch type
  0x0E: 0, // EE clear ch type
  0x0F: 0, // EF dmc A
  0x10: 0, // F0 dmc B
  0x11: 0, // F1 dmc C
  0x12: 0, // F2 stop all
  0x13: 0, // F3 portamento on
  0x14: 0, // F4 portamento off
  0x15: 0, 0x16: 0, 0x17: 0, 0x18: 0, // F5-F8 nop
  0x19: 0, // F9 rest 1
  0x1A: 1, // FA rest dur
  0x1B: 0, 0x1C: 0, 0x1D: 0, 0x1E: 0, // FB-FE nop
  0x1F: 0, // FF stop
};

/**
 * 解析 init list（$8349 语义）:
 *   [chNum lo hi]* 直到字节 >= 0x80（0xFF 终止符）。
 *   chNum >= 8 视为非法/直接数据。
 * @returns {{ entries: Array<{ch:number,tp:number}>, silent: boolean }}
 */
function parseInitList(sid, addr) {
  const entries = [];
  let p = addr;
  while (entries.length < 8) {
    const ch = readByte(sid, p);
    if (ch >= 0x80) return { entries, silent: entries.length === 0 }; // 0xFF 终止符
    if (ch >= 0x08) return { entries, silent: entries.length === 0 }; // 非法通道号 → 数据
    const lo = readByte(sid, p + 1);
    const hi = readByte(sid, p + 2);
    const trackPtr = (hi << 8) | lo;
    if (trackPtr < 0x8000 || trackPtr >= 0xC000) {
      return { entries, silent: entries.length === 0 };
    }
    entries.push({ ch, tp: trackPtr });
    p += 3;
  }
  return { entries, silent: entries.length === 0 };
}

/** 从 start 线性扫描一个数据段，返回可达地址集合并收集跳转目标 */
function scanRange(sid, start, jumpQueue) {
  const reachable = new Set();
  let addr = start;
  let count = 0;
  while (count++ < 20000) {
    if (addr < 0x8000 || addr >= 0xC000) break;
    const b = readByte(sid, addr);
    reachable.add(addr);
    addr++;
    // 0xFF = stop（通道重启/结束）；其余命令/音符继续扫（0xEA 是 RETURN，非终止）
    if (b === 0xFF) break;
    if (b >= 0xE0) {
      const nArgs = CMD_ARGS[b & 0x1F] || 0;
      if (nArgs === 2) {
        if (addr + 1 >= 0xC000) break;
        const lo = readByte(sid, addr);
        const hi = readByte(sid, addr + 1);
        reachable.add(addr);
        reachable.add(addr + 1);
        if ((b & 0x1F) === 0x08 || (b & 0x1F) === 0x09) {
          const target = (hi << 8) | lo;
          if (target >= 0x8000 && target < 0xC000) jumpQueue.push(target);
        }
        addr += 2;
      } else if (nArgs === 1) {
        if (addr >= 0xC000) break;
        reachable.add(addr);
        addr++;
      }
    }
  }
  return reachable;
}

/**
 * 追踪一个 SID 的全部可达地址（BFS: initPtr + trackPtr + E8/E9 目标）。
 * @returns {{ reachable: Set<number>, rawStart: number, maxAddr: number }}
 *   rawStart = min(reachable)：共享乐句可能低于 initPtr（E8/E9 回跳），
 *             RAW 必须从 rawStart 起才能让播放器解析这些目标。
 *   maxAddr  = max(reachable)。
 */
function traceReachable(sid, initPtr, entries) {
  const reachable = new Set();
  const queue = [];
  const scanned = new Set();
  const enqueue = (seed) => {
    if (scanned.has(seed)) return;
    queue.push(seed);
  };
  // initPtr 本身：线性扫（含 header → 首段轨道数据）
  // 注意：trackPtr 常指向 0xFF 终止符（引擎重启时跳过一个字节），这里也跳过
  enqueue(initPtr);
  for (const e of entries) {
    enqueue(readByte(sid, e.tp) >= 0x80 ? e.tp + 1 : e.tp);
  }
  while (queue.length > 0) {
    const start = queue.pop();
    if (scanned.has(start)) continue; // 已在前面扫过（含重复入队）
    scanned.add(start);
    const r = scanRange(sid, start, queue); // 新 E8/E9 目标会 push 进 queue
    for (const a of r) reachable.add(a);
  }

  let min = 0xFFFF, max = 0;
  for (const a of reachable) {
    if (a < min) min = a;
    if (a > max) max = a;
  }
  if (min === 0xFFFF) { min = initPtr; max = initPtr; }
  return { reachable, rawStart: min, maxAddr: max };
}

function hex2(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }
function hex4(n) { return '0x' + n.toString(16).toUpperCase().padStart(4, '0'); }

/**
 * 实测时长修正（_analyze_bgm_dur.ts one-shot 实测）：
 * 轨道 raw 长度偏大但实际 7s 自然停，应归类为音效 SFX 而非 JINGLE。
 * <10s 的一律视为音效（用户确认）。
 */
const TYPE_FIX = { '0x45': 'SFX', '0x57': 'SFX' };

/** 类型判定：silent → SILENT；TYPE_FIX 覆盖 → 修正值；否则按 raw 长度猜 */
function guessType(hexId, rawLen, silent) {
  if (silent) return 'SILENT';
  if (TYPE_FIX[hexId]) return TYPE_FIX[hexId];
  return rawLen < 200 ? 'SFX' : rawLen < 700 ? 'JINGLE' : 'BGM';
}

function fmtArr(arr, perLine = 12) {
  if (!arr || arr.length === 0) return '';
  const lines = [];
  for (let i = 0; i < arr.length; i += perLine) {
    lines.push('  ' + arr.slice(i, i + perLine).map(hex2).join(', '));
  }
  return lines.join(',\n') + ',';
}

/** 生成单个 BGM 文件 */
function genBgmFile(se, info) {
  const hexId = se.toString(16).toUpperCase().padStart(2, '0');
  const bank = info.bank;
  const initPtr = info.initPtr;
  const rawStart = info.rawStart != null ? info.rawStart : initPtr;
  const headerOffset = info.headerOffset != null ? info.headerOffset : 0;
  const raw = info.raw;
  const trackMap = info.trackMap; // {4,5,6,7 → number[]}
  const chNums = info.chNums;     // header 中的通道号（文档用）

  const typeGuess = guessType(hexId, raw.length, info.silent);
  const notesEst = info.silent ? 0 : Math.max(0, raw.length - 64);

  const ts = `/**
 * SID 0x${hexId} — Bank ${bank}
 * Channels: ${chNums.join(',') || '—'}
 * Bytes: ${raw.length} | Notes: ${notesEst}
 * initPtr = ${hex4(initPtr)}（$8349 引擎真实入口，SE_MAP 索引 SE#-1）
 * RAW_START = ${hex4(rawStart)}（= min(reachable)，含 E8/E9 共享乐句区）
 * HEADER_OFFSET = ${hex2(headerOffset)}（header 在 RAW 内的偏移 = initPtr - RAW_START）
 * ${info.silent ? '★ 引擎空轨道（首字节 0xFF → 实机即无声）' : ''}
 * 自动生成（scripts/gen-bgm-sid.cjs），请勿手改
 */

/** SQ1 (ch=0/4) */
export const BGM_${hexId}_TRACK_SQ1: readonly number[] = [
${fmtArr(trackMap[4])}
];

/** SQ2 (ch=1/5) */
export const BGM_${hexId}_TRACK_SQ2: readonly number[] = [
${fmtArr(trackMap[5])}
];

/** TRI (ch=2/6) */
export const BGM_${hexId}_TRACK_TRI: readonly number[] = [
${fmtArr(trackMap[6])}
];

/** NOISE (ch=3/7) */
export const BGM_${hexId}_TRACK_NOISE: readonly number[] = [
${fmtArr(trackMap[7])}
];

/** 共享数据（RAW_START 起始完整可达区） */
export const BGM_${hexId}_RAW: readonly number[] = [
${fmtArr(raw)}
];

/** NES 基址 = RAW_START（raw[0] 对应的 NES 地址） */
export const BGM_${hexId}_NES_BASE = ${hex4(rawStart)};

/** header 在 RAW 内的偏移（initPtr - RAW_START），播放器解析 header 用 */
export const BGM_${hexId}_HEADER_OFFSET = ${hex2(headerOffset)};

/** 元数据 */
export const BGM_${hexId}_META = {
  id: ${hex2(se)}, bank: ${bank}, type: '${typeGuess}',
  channels: [${chNums.join(',')}],
  bytes: ${raw.length}, notes: ${notesEst},
  silent: ${info.silent},
} as const;
`;

  const file = path.join(OUT_DIR, `BGM_0x${hexId}.ts`);
  fs.writeFileSync(file, ts);
}

// ═══════════════════════════════════════════════
// 主流程
// ═══════════════════════════════════════════════
const SE_MAP_OFF = 0x0BDA;
const ENTRIES = [];

console.log('== 重新生成 bgm-sid 数据（SE_MAP 索引 = SE#-1）==\n');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (let se = 0x30; se <= 0x5B; se++) {
  // 0x31 是引擎特殊命令（$806C CPY #$31 → 跳过 $8349），不是轨道
  if (se === 0x31) {
    console.log(`${hex2(se)} 引擎特殊命令（SE 音量恢复），不入 BGM 列表`);
    continue;
  }

  const idx = se - 1;
  const off = SE_MAP_OFF + idx * 2;
  const lo = bank12[off];
  const hi = bank12[off + 1];
  const initPtr = (hi << 8) | lo;
  const bank = sidToBank(se);

  const { entries, silent: hdrSilent } = parseInitList(se, initPtr);
  // ★ 0x4A 修复：header 非空但所有入口首字节均为 0xFF 终止符 → 引擎启动即静音（实机无声）。
  //   parseInitList 只看 header 是否有条目；0x4A 的 8 个 ch 全指向 0x8E5A（=0xFF），
  //   每个通道读到第一个字节就是终止符 → 无声。这里补判"入口全死"。
  //   注意：只能判定 === 0xFF。0xE0/0xE2 等是命令字节（正常轨道数据），不是终止。
  const silent = hdrSilent || (entries.length > 0 && entries.every(e => readByte(se, e.tp) === 0xFF));
  const chNums = entries.map(e => e.ch);
  if (silent) {
    console.log(`${hex2(se)} bank${bank}: initPtr=${hex4(initPtr)} 空轨道（实机即无声），标记 silent`);
    const info = {
      bank, initPtr, silent: true,
      rawStart: initPtr, headerOffset: 0,
      raw: [0xFF],
      trackMap: { 4: [], 5: [], 6: [], 7: [] },
      chNums: [],
    };
    genBgmFile(se, info);
    ENTRIES.push({ se, bank, initPtr, rawStart: initPtr, headerOffset: 0, silent: true, rawLen: 0, chNums: [], tracks: [], warns: [] });
    continue;
  }

  const { reachable, rawStart, maxAddr } = traceReachable(se, initPtr, entries);
  const headerOffset = initPtr - rawStart;

  // 校验 trackPtr 全部在 [rawStart, maxAddr]
  const warns = [];
  for (const e of entries) {
    if (e.tp < rawStart) warns.push(`trackPtr ${hex4(e.tp)} < rawStart`);
    if (e.tp > maxAddr) warns.push(`trackPtr ${hex4(e.tp)} > maxAddr`);
  }
  if (headerOffset > 0) {
    warns.push(`含共享乐句区（RAW_START ${hex4(rawStart)} 起 ${headerOffset}B，E8/E9 已覆盖）`);
  }

  const rawLen = maxAddr - rawStart + 1;
  if (rawLen <= 0 || rawLen > 30000) {
    console.log(`${hex2(se)} bank${bank}: RAW 长度异常 ${rawLen}，跳过`);
    continue;
  }

  const raw = [];
  for (let a = rawStart; a <= maxAddr; a++) raw.push(readByte(se, a));

  // 通道映射：header 条目 → 内部通道 4-7（后写覆盖 = 引擎最后一次初始化生效）
  // 引擎 $8349 每个条目都会覆盖同组通道指针，最终可听 = 每组最高通道号条目
  const lastEntry = {}; // internalCh → raw offset
  for (const e of entries) {
    const internalCh = e.ch >= 4 ? e.ch : e.ch + 4;
    lastEntry[internalCh] = e.tp - rawStart;
  }
  const trackMap = {};
  for (let ic = 4; ic <= 7; ic++) {
    const off = lastEntry[ic];
    trackMap[ic] = off !== undefined ? raw.slice(off) : [];
  }

  genBgmFile(se, {
    bank, initPtr, rawStart, headerOffset, raw, trackMap, chNums, silent: false,
  });

  const warnStr = warns.length > 0 ? '  ⚠ ' + warns.join('; ') : '';
  console.log(
    `✓ ${hex2(se)} bank${bank} initPtr=${hex4(initPtr)} rawStart=${hex4(rawStart)}` +
    ` headerOff=${hex2(headerOffset)} raw=${raw.length}B ch[${chNums.join(',')}]${warnStr}`
  );
  ENTRIES.push({ se, bank, initPtr, rawStart, headerOffset, silent: false, rawLen: raw.length, chNums, tracks: entries.map(e => e.tp), warns });
}

// ═══════════════════════════════════════════════
// 重新生成 index.ts
// ═══════════════════════════════════════════════
function genIndex() {
  const lines = [];
  lines.push('/**');
  lines.push(' * BGM SID 数据索引 — Bank 12/13/14/15 所有音频轨道');
  lines.push(` * 自动生成 — ${ENTRIES.length} SID 轨道`);
  lines.push(' */');
  lines.push('');

  const ids = [];
  for (const e of ENTRIES) {
    const hexId = e.se.toString(16).toUpperCase().padStart(2, '0');
    ids.push(hexId);
    lines.push('import {');
    lines.push(`  BGM_${hexId}_TRACK_SQ1, BGM_${hexId}_TRACK_SQ2, BGM_${hexId}_TRACK_TRI, BGM_${hexId}_TRACK_NOISE,`);
    lines.push(`  BGM_${hexId}_RAW, BGM_${hexId}_NES_BASE, BGM_${hexId}_HEADER_OFFSET, BGM_${hexId}_META,`);
    lines.push(`} from './BGM_0x${hexId}';`);
    lines.push('');
  }

  lines.push('// ════════════════════════════════════════════════');
  lines.push('// 接口');
  lines.push('// ════════════════════════════════════════════════');
  lines.push('');
  lines.push('export interface BgmSidEntry {');
  lines.push('  id: string;');
  lines.push('  bank: number;');
  lines.push('  type: string;');
  lines.push('  chCount: number;');
  lines.push('  bytes: number;');
  lines.push('  notes: number;');
  lines.push('  name?: string;');
  lines.push('  desc?: string;');
  lines.push('  /** 引擎空轨道（实机即无声） */');
  lines.push('  silent?: boolean;');
  lines.push('  /** Per-channel track data */');
  lines.push('  trackSQ1: readonly number[];');
  lines.push('  trackSQ2: readonly number[];');
  lines.push('  trackTRI: readonly number[];');
  lines.push('  trackNOISE: readonly number[];');
  lines.push('  /** Shared raw data for CALL/JUMP NES address resolution */');
  lines.push('  raw: readonly number[];');
  lines.push('  /** NES 基址 = RAW_START（raw[0] 对应的 NES 地址） */');
  lines.push('  nesBase: number;');
  lines.push('  /** header 在 raw 内的偏移（initPtr - RAW_START），默认 0 */');
  lines.push('  headerOffset?: number;');
  lines.push('  /** Whether raw is a real shared BGM header (true for bank-shared raw data). SID tracks should load from split track arrays. */');
  lines.push('  useSharedRaw?: boolean;');
  lines.push('}');
  lines.push('');
  lines.push('// ════════════════════════════════════════════════');
  lines.push('// BGM 主列表（SID 轨道）');
  lines.push('// ════════════════════════════════════════════════');
  lines.push('');
  lines.push('export const BGM_SID_LIST: BgmSidEntry[] = [');
  lines.push('');

  for (const e of ENTRIES) {
    const hexId = e.se.toString(16).toUpperCase().padStart(2, '0');
    const hexIdL = '0x' + hexId;
    const bank = e.bank;
    const chCount = e.silent ? 0 : new Set(e.chNums.map(c => (c >= 4 ? c : c + 4))).size;
    const type = guessType(hexId, e.rawLen, e.silent);
    const notes = e.silent ? 0 : Math.max(0, e.rawLen - 64);
    const desc = e.silent
      ? `空轨道 · init ${hex4(e.initPtr)} · 实机即无声`
      : `${type} · ${e.rawLen}B · ${notes} notes · init ${hex4(e.initPtr)}`;
    lines.push('  {');
    lines.push(`    id: '${hexIdL}', bank: ${bank}, type: '${type}', chCount: ${chCount},`);
    lines.push(`    bytes: ${e.rawLen}, notes: ${notes},`);
    lines.push(`    name: '${hexIdL} · Bank ${bank}',`);
    lines.push(`    desc: '${desc}',`);
    if (e.silent) lines.push('    silent: true,');
    lines.push(`    trackSQ1: BGM_${hexId}_TRACK_SQ1,`);
    lines.push(`    trackSQ2: BGM_${hexId}_TRACK_SQ2,`);
    lines.push(`    trackTRI: BGM_${hexId}_TRACK_TRI,`);
    lines.push(`    trackNOISE: BGM_${hexId}_TRACK_NOISE,`);
    lines.push(`    raw: BGM_${hexId}_RAW,`);
    lines.push(`    nesBase: BGM_${hexId}_NES_BASE,`);
    lines.push(`    headerOffset: BGM_${hexId}_HEADER_OFFSET,`);
    lines.push('  },');
    lines.push('');
  }
  lines.push('];');
  lines.push('');
  lines.push('// ════════════════════════════════════════════════');
  lines.push('// 辅助索引');
  lines.push('// ════════════════════════════════════════════════');
  lines.push('');
  lines.push('/** 按 Bank 分组 */');
  lines.push('export const BGM_BY_BANK: Record<number, BgmSidEntry[]> = {};');
  lines.push('for (const e of BGM_SID_LIST) {');
  lines.push('  if (!BGM_BY_BANK[e.bank]) BGM_BY_BANK[e.bank] = [];');
  lines.push('  BGM_BY_BANK[e.bank].push(e);');
  lines.push('}');
  lines.push('');
  lines.push('/** 按类型分组 */');
  lines.push('export const BGM_BY_TYPE: Record<string, BgmSidEntry[]> = {};');
  lines.push('for (const e of BGM_SID_LIST) {');
  lines.push('  if (!BGM_BY_TYPE[e.type]) BGM_BY_TYPE[e.type] = [];');
  lines.push('  BGM_BY_TYPE[e.type].push(e);');
  lines.push('}');
  lines.push('');
  lines.push('/** 获取所有 BGM */');
  lines.push('export const ALL_BGM_LIST: BgmSidEntry[] = BGM_SID_LIST;');
  lines.push('');
  lines.push('/** BGM 总数 */');
  lines.push('export const BGM_TOTAL_COUNT = BGM_SID_LIST.length;');
  lines.push('');

  const indexPath = path.join(OUT_DIR, 'index.ts');
  fs.writeFileSync(indexPath, lines.join('\n'));
  console.log('\nindex.ts 已重新生成（' + ENTRIES.length + ' SID）');
}

genIndex();
console.log('\n完成。输出目录:', OUT_DIR);
