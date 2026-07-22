/**
 * TS disasm 内核 trace — 开场动画 CPU + PPU 帧级别快照 (4500 帧)
 * 用法: npx tsx scripts/_trace_opening_disasm.ts
 * 
 * 输出:
 *   test_output/opening_disasm_cpu.json  — 对齐 opening_jsnes_4500_trace.json
 *   test_output/opening_disasm_ppu.json  — 对齐 opening_jsnes_ppu.json
 */
import fs from 'node:fs';
import { GameContext } from '../src/disasm/_context';
import { allBanks } from '../src/disasm/banks/index';
import type { RomReader, BankRomSlice } from '../src/disasm/banks/_bank_types';
import { _cfg } from '../src/disasm/banks/bank_00_dispatch';
_cfg.verbose = false;

import { ROM as _r00 } from '../src/disasm/banks/_romdata/bank_00_data';
import { ROM as _r01 } from '../src/disasm/banks/_romdata/bank_01_data';
import { ROM as _r02 } from '../src/disasm/banks/_romdata/bank_02_data';
import { ROM as _r03 } from '../src/disasm/banks/_romdata/bank_03_data';
import { ROM as _r04 } from '../src/disasm/banks/_romdata/bank_04_data';
import { ROM as _r05 } from '../src/disasm/banks/_romdata/bank_05_data';
import { ROM as _r06 } from '../src/disasm/banks/_romdata/bank_06_data';
import { ROM as _r07 } from '../src/disasm/banks/_romdata/bank_07_data';
import { ROM as _r08 } from '../src/disasm/banks/_romdata/bank_08_data';
import { ROM as _r09 } from '../src/disasm/banks/_romdata/bank_09_data';
import { ROM as _r10 } from '../src/disasm/banks/_romdata/bank_10_data';
import { ROM as _r11 } from '../src/disasm/banks/_romdata/bank_11_data';
import { ROM as _r12 } from '../src/disasm/banks/_romdata/bank_12_data';
import { ROM as _r13 } from '../src/disasm/banks/_romdata/bank_13_data';
import { ROM as _r14 } from '../src/disasm/banks/_romdata/bank_14_data';
import { ROM as _r15 } from '../src/disasm/banks/_romdata/bank_15_data';
import { ROM as _r16 } from '../src/disasm/banks/_romdata/bank_16_data';
import { ROM as _r17 } from '../src/disasm/banks/_romdata/bank_17_data';
import { ROM as _r18 } from '../src/disasm/banks/_romdata/bank_18_data';
import { ROM as _r19 } from '../src/disasm/banks/_romdata/bank_19_data';
import { ROM as _r20 } from '../src/disasm/banks/_romdata/bank_20_data';
import { ROM as _r21 } from '../src/disasm/banks/_romdata/bank_21_data';
import { ROM as _r22 } from '../src/disasm/banks/_romdata/bank_22_data';
import { ROM as _r23 } from '../src/disasm/banks/_romdata/bank_23_data';
import { ROM as _r24 } from '../src/disasm/banks/_romdata/bank_24_data';
import { ROM as _r25 } from '../src/disasm/banks/_romdata/bank_25_data';
import { ROM as _r26 } from '../src/disasm/banks/_romdata/bank_26_data';
import { ROM as _r27 } from '../src/disasm/banks/_romdata/bank_27_data';
import { ROM as _r28 } from '../src/disasm/banks/_romdata/bank_28_data';
import { ROM as _r29 } from '../src/disasm/banks/_romdata/bank_29_data';
import { ROM as _r30 } from '../src/disasm/banks/_romdata/bank_30_data';
import { ROM as _r31 } from '../src/disasm/banks/_romdata/bank_31_data';
import { ROM as _r32 } from '../src/disasm/banks/_romdata/bank_32_data';
import { ROM as _r33 } from '../src/disasm/banks/_romdata/bank_33_data';
import { ROM as _r34 } from '../src/disasm/banks/_romdata/bank_34_data';
import { ROM as _r35 } from '../src/disasm/banks/_romdata/bank_35_data';
import { ROM as _r36 } from '../src/disasm/banks/_romdata/bank_36_data';
import { ROM as _r37 } from '../src/disasm/banks/_romdata/bank_37_data';
import { ROM as _r38 } from '../src/disasm/banks/_romdata/bank_38_data';
import { ROM as _r39 } from '../src/disasm/banks/_romdata/bank_39_data';
import { ROM as _r40 } from '../src/disasm/banks/_romdata/bank_40_data';
import { ROM as _r41 } from '../src/disasm/banks/_romdata/bank_41_data';
import { ROM as _r42 } from '../src/disasm/banks/_romdata/bank_42_data';
import { ROM as _r43 } from '../src/disasm/banks/_romdata/bank_43_data';
import { ROM as _r44 } from '../src/disasm/banks/_romdata/bank_44_data';
import { ROM as _r45 } from '../src/disasm/banks/_romdata/bank_45_data';
import { ROM as _r46 } from '../src/disasm/banks/_romdata/bank_46_data';
import { ROM as _r47 } from '../src/disasm/banks/_romdata/bank_47_data';

const ROM_DATA: Array<Uint8Array | undefined> = [
  _r00,_r01,_r02,_r03,_r04,_r05,_r06,_r07,
  _r08,_r09,_r10,_r11,_r12,_r13,_r14,_r15,
  _r16,_r17,_r18,_r19,_r20,_r21,_r22,_r23,
  _r24,_r25,_r26,_r27,_r28,_r29,_r30,_r31,
  _r32,_r33,_r34,_r35,_r36,_r37,_r38,_r39,
  _r40,_r41,_r42,_r43,_r44,_r45,_r46,_r47,
];

const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;
const MAX_FRAMES = 100; // 调试帧数

const h8  = (v: number) => '$' + ((v|0) & 0xFF).toString(16).padStart(2, '0');
const h16 = (v: number) => '$' + ((v|0) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');

// ============================================================
// ROM Reader
// ============================================================
let bank8000 = 0;
let bankA000 = 1;

function bankSlice(n: number): BankRomSlice {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return {
    u8(o: number) { return d[o] ?? 0; },
    u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
    data: d,
    romBase: n * PRG_BANK_SIZE,
  };
}

const rom: RomReader = {
  bank(a: number) {
    const ca = a & 0xFFFF;
    let bn: number;
    if (ca >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (ca >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (ca >= 0xA000) bn = bankA000;
    else bn = bank8000;
    return bankSlice(bn);
  },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

// ============================================================
// GameContext + MMC3 hook + 写入监控
// ============================================================
const WATCH_ADDRS = new Set([0x26, 0x27, 0x4A, 0x4B, 0x4C]);
const WATCH_MAX_FRAMES_D = 500;
const cpuWritesD: Array<{f:number, a:string, v:number, ov:number, caller?:string}> = [];
let _watchInitializing = true; // 跳过初始化阶段的写入记录

function _captureCaller(): string {
  const st = new Error().stack;
  if (!st) return '?';
  const lines = st.split('\n');
  // 跳过前3行(Error + setU8 + _captureCaller)，找到第一个有意义的调用
  for (let i = 3; i < lines.length; i++) {
    const m = lines[i].match(/at\s+(.+?)\s*\(/);
    if (m && !m[1].includes('_captureCaller') && !m[1].includes('ctx.ram.setU8')) {
      return m[1].trim();
    }
    const m2 = lines[i].match(/at\s+(\S+)/);
    if (m2 && !m2[1].includes('setU8')) return m2[1].replace(/^.*[\\/]/, '');
  }
  return '?';
}

let _watchCurFrame = 0;
const ctx = new GameContext();
const origSet = ctx.ram.setU8.bind(ctx.ram);
ctx.ram.setU8 = (a: number, v: number) => {
  if (!_watchInitializing && WATCH_ADDRS.has(a) && _watchCurFrame < WATCH_MAX_FRAMES_D) {
    const ov = ctx.ram.u8(a);
    if (ov !== v) {
      cpuWritesD.push({
        f: _watchCurFrame,
        a: a.toString(16).padStart(2, '0'),
        v, ov,
      });
    }
  }
  origSet(a, v);
  if (a === 0x8001) {
    const sel = ctx.ram.u8(0x8000) & 0x07;
    if (sel === 6) bank8000 = v;
    if (sel === 7) bankA000 = v;
  }
};
ctx.ram.setU8(0x24, 0);
ctx.ram.setU8(0x25, 1);
// ★ 对齐 jsNes: F0-F1 所有关键寄存器为 ff (reset 初始化), F2 起清零
ctx.ram.setU8(0x26, 0xff);
ctx.ram.setU8(0x27, 0xff);
ctx.ram.setU8(0x4A, 0xff);
ctx.ram.setU8(0x4B, 0xff);
ctx.ram.setU8(0x4C, 0xff);

// ============================================================
// PPU 快照函数 (对齐 opening_jsnes_ppu.json 格式)
// ============================================================
function snapshotPpu(frame: number) {
  const z26 = ctx.ram.u8(0x26);
  const z27 = ctx.ram.u8(0x27);
  const z4A = ctx.ram.u8(0x4A);
  const z4B = ctx.ram.u8(0x4B);
  const z4C = ctx.ram.u8(0x4C);

  // PPU 寄存器 mirror (ZP)
  const ctrl = ctx.ram.u8(0x20);
  const mask = ctx.ram.u8(0x21);
  // $48/$49 — PPUADDR 相关 (bank_02 NMI 使用)
  const ppuAddrLo = ctx.ram.u8(0x48);
  const ppuAddrHi = ctx.ram.u8(0x49);
  const vramAddress = (ppuAddrHi << 8) | ppuAddrLo;

  // 调色板数据 ($062A-$0631: 32 bytes)
  //   bytes 0-15: 背景调色板 (4 palettes × 4 colors, 只在 $3F00-$3F0F)
  //   bytes 16-31: 精灵调色板 ($3F10-$3F1F)
  const imgPal: number[] = [];
  const sprPal: number[] = [];
  for (let i = 0; i < 16; i++) {
    imgPal.push(ctx.ram.u8(0x062A + i) & 0x3F);
    sprPal.push(ctx.ram.u8(0x062A + 16 + i) & 0x3F);
  }

  // 统计非零调色板数量 (排除 $0F 黑色背景色)
  let imgPalNonZero = 0, sprPalNonZero = 0;
  for (let i = 0; i < 16; i++) {
    if ((imgPal[i] & 0x3F) !== 0x0F) imgPalNonZero++;
    if ((sprPal[i] & 0x3F) !== 0x0F) sprPalNonZero++;
  }

  // ★ 注意: disasm 没有真实 PPU VRAM/NT 模拟,
  //   所以 nametable_tiles / vram_tile_sample / pattern_sample 为空字符串
  return {
    frame,
    cpu: { z26, z27, z4A, z4B, z4C },
    ppu: {
      reg: {
        ctrl,
        mask,
        status: 0,          // disasm 无真实 PPU status
        vramAddress,
        regX: 0,            // disasm 无 scroll latch
      },
      ntId: null,           // disasm 无 nametable tracking
      vram_nz: 0,           // disasm 无 VRAM
      at_nz: 0,
      imgPalette: imgPal,
      sprPalette: sprPal,
      imgPalNonZero,
      sprPalNonZero,
      spritesUsed: 0,       // disasm 无 OAM
      vram_tile_sample: null,
      vram_attr_sample: null,
      nametable_tiles_nt0: null,
      nametable_attrib_nt0: null,
      pattern_sample: null,
    },
  };
}

// ============================================================
// BOOT: RESET 初始化
// ============================================================
console.log('BOOT...');
try {
  allBanks[31]?.fns?.['$FFF0']?.(ctx, rom) ?? allBanks[31]?.dispatch?.(ctx, rom);
} catch (e: any) {
  console.error('BOOT CRASH:', e.message);
  process.exit(1);
}
_watchInitializing = false; // ★ BOOT 完成，开始记录写入

// ============================================================
// 帧执行
// ============================================================
interface CpuRecord {
  frame: number;
  z26: number; z27: number; z4A: number; z4B: number; z4C: number;
}
const cpuFrames: CpuRecord[] = [];
let crashAt = -1;

// PPU snapshots: 首40帧 + 每60帧 + 关键帧 (对齐 jsNes PPU trace)
const ppuSnapFrames = new Set<number>();
for (let f = 0; f <= 40; f++) ppuSnapFrames.add(f);
for (let f = 60; f <= MAX_FRAMES; f += 60) ppuSnapFrames.add(f);
[377, 818, 1062, 1489, 1743, 2134].forEach(f => ppuSnapFrames.add(f));

const ppuSnapshots: ReturnType<typeof snapshotPpu>[] = [];

console.log(`\nRunning ${MAX_FRAMES} frames...`);
const t0 = Date.now();

for (let f = 0; f < MAX_FRAMES; f++) {
  _watchCurFrame = f; // ★ 写入监控追踪当前帧
  bank8000 = ctx.ram.u8(0x24);
  bankA000 = ctx.ram.u8(0x25);

  // 记录帧前 CPU 状态
  cpuFrames.push({
    frame: f,
    z26: ctx.ram.u8(0x26),
    z27: ctx.ram.u8(0x27),
    z4A: ctx.ram.u8(0x4A),
    z4B: ctx.ram.u8(0x4B),
    z4C: ctx.ram.u8(0x4C),
  });

  // ★ 模拟 NMI: bank_02 每帧处理 (joypad + display list → PPU)
  const bank2 = allBanks[2];
  if (bank2) {
    // $8116 processJoypadInput: 帧计数器 + joypad
    try { bank2.fns?.['$8116']?.(ctx); } catch (e) { /* ignore NMI errors */ }
    // $800A processDisplayList: display list → PPU 写入
    try { bank2.fns?.['$800A']?.(ctx, rom); } catch (e) { /* ignore NMI errors */ }
  }

  // 执行一帧
  if (bank8000 === 0) {
    try {
      // ★ jsNes 对齐: f=0 是 PPU 预热帧, 跳过 bank_00
      //    f=1 起正常 dispatch, $27=ff→sceneLoopEntry→$27=0, 然后 handleForward
      if (f >= 1) {
        allBanks[0]?.dispatch(ctx, rom);
      }
    } catch (e: any) {
      crashAt = f;
      console.error(`\nCRASH at frame ${f}: ${e.message}`);
      break;
    }
  }

  // PPU 快照 (帧结束后)
  if (ppuSnapFrames.has(f)) {
    ppuSnapshots.push(snapshotPpu(f));
  }

  if (f % 300 === 299) {
    const fd = cpuFrames[f];
    console.log(`  F${String(f+1).padStart(4)}/${MAX_FRAMES}  scene=${h8(fd.z4B)}${h8(fd.z4A)}  $4C=${h8(fd.z4C)}  $27=${h8(fd.z27)}  $26=${h8(fd.z26)}  b8=${h8(bank8000)}`);
  }
}

const valid = cpuFrames.slice(0, crashAt >= 0 ? crashAt : MAX_FRAMES);
const elapsed = (Date.now() - t0) / 1000;

// ============================================================
// 分析
// ============================================================
const sceneChanges: Array<{frame:number, scene:string, $4C:string}> = [];
let prevSid = -1;
valid.forEach(f => {
  const sid = (f.z4B << 8) | f.z4A;
  if (sid !== prevSid) {
    sceneChanges.push({ frame: f.frame, scene: h8(f.z4B)+h8(f.z4A), $4C: h8(f.z4C) });
    prevSid = sid;
  }
});

const c4cChanges: Array<{frame:number, $4C:string, scene:string}> = [];
let prev4c = -1;
valid.forEach(f => {
  if (f.z4C !== prev4c) {
    c4cChanges.push({ frame: f.frame, $4C: h8(f.z4C), scene: h8(f.z4B)+h8(f.z4A) });
    prev4c = f.z4C;
  }
});

const first0F0F = valid.find(f => f.z4A === 0x0F && f.z4B === 0x0F);
const first4c80  = valid.find(f => f.z4C === 0x80);
const range0F0F = valid.filter(f => f.z4A === 0x0F && f.z4B === 0x0F);

// ============================================================
// 输出 CPU trace JSON (对齐 opening_jsnes_4500_trace.json)
// ============================================================
const cpuJson = {
  note: 'TS disasm CPU trace — 开场动画 (4500帧)',
  maxFrames: MAX_FRAMES,
  actualFrames: valid.length,
  elapsedSec: elapsed.toFixed(1),
  sceneChanges,
  '$4C_changes': c4cChanges,
  frames: valid.map(f => ({
    frame: f.frame,
    z26: f.z26, z27: f.z27, z4A: f.z4A, z4B: f.z4B, z4C: f.z4C,
  })),
};

// ============================================================
// 输出 PPU trace JSON (对齐 opening_jsnes_ppu.json)
// ============================================================
const compactPpu = ppuSnapshots.map(s => ({
  ...s,
  ppu: {
    ...s.ppu,
    imgPalette: s.ppu.imgPalette.map(b => b.toString(16).padStart(2,'0')).join(''),
    sprPalette: s.ppu.sprPalette.map(b => b.toString(16).padStart(2,'0')).join(''),
  },
}));

const ppuJson = {
  note: 'TS disasm PPU trace — opening animation PPU snapshots',
  maxFrames: MAX_FRAMES,
  snapshots: ppuSnapshots.length,
  elapsedSec: elapsed.toFixed(1),
  frames: compactPpu,
};

// ============================================================
// 写入文件
// ============================================================
if (!fs.existsSync('test_output')) fs.mkdirSync('test_output', { recursive: true });

const cpuPath = 'test_output/opening_disasm_cpu.json';
const ppuPath = 'test_output/opening_disasm_ppu.json';

fs.writeFileSync(cpuPath, JSON.stringify(cpuJson, null, 2));
fs.writeFileSync(ppuPath, JSON.stringify(ppuJson, null, 2));

// ★ 输出 CPU 写入日志
const writesPathD = 'test_output/cpu_writes_disasm.json';
fs.writeFileSync(writesPathD, JSON.stringify(cpuWritesD, null, 2));
const firstWritesByAddrD: Record<string, typeof cpuWritesD[0]> = {};
cpuWritesD.forEach(w => { if (!firstWritesByAddrD[w.a]) firstWritesByAddrD[w.a] = w; });
console.log(`\n=== CPU writes to $26/$27/$4A/$4B/$4C (first ${WATCH_MAX_FRAMES_D} frames) ===`);
console.log(`Total writes: ${cpuWritesD.length}`);
for (const a of [0x26, 0x27, 0x4A, 0x4B, 0x4C]) {
  const sa = a.toString(16).padStart(2,'0');
  const fw = firstWritesByAddrD[sa];
  const cnt = cpuWritesD.filter(w => w.a === sa).length;
  if (fw) console.log(`  $${sa}: ${cnt} writes, first: F${fw.f} ${fw.ov.toString(16)}→${fw.v.toString(16)}`);
  else console.log(`  $${sa}: 0 writes`);
}

// ============================================================
// 控制台摘要
// ============================================================
const last = valid[valid.length - 1];
console.log(`
====================================================================
  TS disasm CPU + PPU trace
====================================================================
总帧数:    ${valid.length}${crashAt >= 0 ? ` (CRASH @F${crashAt})` : ''}
耗时:      ${elapsed.toFixed(1)}s
结束帧:    scene=${h8(last.z4B)}${h8(last.z4A)}  $4C=${h8(last.z4C)}  $27=${h8(last.z27)}

--- 关键节点 ---`);
if (first0F0F) console.log(`  F${first0F0F.frame}    scene=$0F0F 开场动画开始`);
if (first4c80)  console.log(`  F${first4c80.frame}    $4C首次变$80 (${(first4c80.frame/60).toFixed(1)}秒)`);
console.log(`  scene=$0F0F: ${range0F0F.length} 帧 (${(range0F0F.length/60).toFixed(1)}秒) total`);

console.log(`
--- $4C 变化 (${c4cChanges.length} 次) ---`);
c4cChanges.forEach(c => console.log(`  F${String(c.frame).padStart(4)}    ${c.$4C}    ${c.scene}`));

console.log(`
--- 前 40 帧 ---`);
valid.slice(0, 40).forEach(f => {
  console.log(`  F${String(f.frame).padStart(4)}   ${h8(f.z4B)}${h8(f.z4A)} ${h8(f.z4C)} ${h8(f.z27)} ${h8(f.z26)}`);
});

console.log(`
--- PPU 关键帧 ---`);
ppuSnapshots.forEach(s => {
  console.log(`  F${s.frame}: $4C=$${s.cpu.z4C.toString(16).padStart(2,'0')}  scene=$${s.cpu.z4B.toString(16).padStart(2,'0')}${s.cpu.z4A.toString(16).padStart(2,'0')}  mask=$%s  imgPal nz=${s.ppu.imgPalNonZero}/16  sprPal nz=${s.ppu.sprPalNonZero}/16`,
    s.ppu.reg.mask.toString(16).padStart(2,'0'));
});

console.log(`
DONE → ${cpuPath}\n       ${ppuPath}`);
