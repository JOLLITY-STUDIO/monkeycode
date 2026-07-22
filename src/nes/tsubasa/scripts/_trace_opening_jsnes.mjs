/**
 * jsNes CPU trace — full instruction-level trace for opening animation
 * 用法: node _trace_opening_jsnes.mjs [MAX_FRAMES=600]
 *
 * 策略:
 *   - 记录每帧 PC 序列的 hash 作为 "场景签名"
 *   - 检测签名重复模式来自动停止
 *   - 同时记录关键 ZP 状态 ($26 $27 $4A $4B $4C)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import NES from './src/jsnes/src/nes.js';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = parseInt(process.argv[2] || '7200'); // 最多 120 秒 (60fps)
const LOOP_DETECT_FRAMES = 30;  // 滑动窗口大小（提高到1秒窗口）
const LOOP_MIN_REPEATS = 3;     // 至少重复3次

const ROM = new Uint8Array(readFileSync(ROM_PATH));
console.log(`ROM: ${ROM.length} bytes`);

// ============================================================
// 数据结构
// ============================================================
/** 每帧快照 */
const frames = []; // { frame, instrCount, firstPC, lastPC, z26, z27, z4A, z4B, z4C, pcHash, stateHash }
/** 采样指令 (每 500 条记录一次) */
const sampledInstr = [];
/** PC hash → 出现过的帧号 */
const pcHashSeen = new Map();
/** 序列hash → 出现次数 */
const seqHashSeen = new Map();

let totalInstr = 0;
let curFrameData = null;
let curFrameIdx = -1;

// ============================================================
// jsNes 初始化
// ============================================================
const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadROM(ROM);

console.log(`Mapper: ${nes.rom.mapperType}, PRG banks: ${nes.rom.romCount}`);

// ============================================================
// CPU trace callback
// ============================================================
nes.cpu._traceCb = (pc, opcode, cycles) => {
  totalInstr++;

  // 帧切换
  if (nes.fpsFrameCount !== curFrameIdx) {
    // 保存上一帧数据
    if (curFrameData) {
      curFrameData.instrCount = curFrameData._instrCount;
      curFrameData.lastPC = pc;
      // 现在才记录 ZP (帧结束后的状态)
      curFrameData.z26 = nes.cpu.mem[0x26];
      curFrameData.z27 = nes.cpu.mem[0x27];
      curFrameData.z4A = nes.cpu.mem[0x4A];
      curFrameData.z4B = nes.cpu.mem[0x4B];
      curFrameData.z4C = nes.cpu.mem[0x4C];
      frames[curFrameIdx] = curFrameData;
    }
    curFrameIdx = nes.fpsFrameCount;
    curFrameData = {
      frame: curFrameIdx,
      _instrCount: 0,
      instrCount: 0,
      firstPC: pc,
      lastPC: 0,
      z26: 0, z27: 0, z4A: 0, z4B: 0, z4C: 0,
    };
  }
  curFrameData._instrCount++;

  // 采样 (每 200 条)
  if (totalInstr % 200 === 0) {
    sampledInstr.push({ i: totalInstr, f: curFrameIdx, pc, op: opcode, cy: cycles });
  }
};

// ============================================================
// 帧签名计算: 连续 N 帧的场景状态序列做指纹
// ============================================================
function frameSeqHash(startFrame) {
  const parts = [];
  for (let i = 0; i < LOOP_DETECT_FRAMES; i++) {
    const fd = frames[startFrame + i];
    if (!fd) return null;
    // 用 scene + $4C + 首PC 构成签名
    parts.push(`${fd.z4A}|${fd.z4B}|${fd.z4C}|${fd.firstPC}`);
  }
  return parts.join(';');
}

// ============================================================
// 主循环
// ============================================================
console.log(`\nRunning up to ${MAX_FRAMES} frames (auto-detect loop)...\n`);

const t0 = Date.now();
let stopped = false;
let stopReason = '';
let stopFrame = MAX_FRAMES;

for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();

  // 进度 (每秒输出)
  if (f % 60 === 0 && f > 0) {
    const fps = (f / ((Date.now() - t0) / 1000)).toFixed(0);
    const fd = frames[f];
    if (fd) {
      const sceneStr = `$${fd.z4A.toString(16).padStart(2,'0')}${fd.z4B.toString(16).padStart(2,'0')}`;
      console.log(`  F${String(f).padStart(5)} | totalinstr:${String(totalInstr).padStart(10)} | scene=${sceneStr} | $4C=$${fd.z4C.toString(16).padStart(2,'0')} | $27=$${fd.z27.toString(16).padStart(2,'0')} | ${fps}fps`);
    }
  }

  if (f < LOOP_DETECT_FRAMES * 2) continue;
  if (stopped) continue;

  // 循环检测: 用连续 LOOP_DETECT_FRAMES 帧的序列做指纹
  const seqHash = frameSeqHash(f - LOOP_DETECT_FRAMES + 1);
  if (!seqHash) continue;
  const prev = pcHashSeen.get(seqHash);
  if (prev !== undefined && f - prev > LOOP_DETECT_FRAMES * 2) {
    // 找到了匹配的帧序列
    if (seqHashSeen.has(seqHash)) {
      seqHashSeen.set(seqHash, seqHashSeen.get(seqHash) + 1);
    } else {
      seqHashSeen.set(seqHash, 1);
    }
    if (seqHashSeen.get(seqHash) >= LOOP_MIN_REPEATS) {
      stopReason = `loop: ${LOOP_DETECT_FRAMES}-frame window repeated ${LOOP_MIN_REPEATS}x, first at F${prev}, now F${f}`;
      stopFrame = f;
      stopped = true;
      console.log(`\n  >>> LOOP DETECTED at frame ${f}: ${stopReason}`);
    }
  }
  pcHashSeen.set(seqHash, f);
}

// 补充最后一帧 (在 frame loop 结束后保存)
if (curFrameData) {
  curFrameData.instrCount = curFrameData._instrCount;
  // 再次采样 ZP
  curFrameData.z26 = nes.cpu.mem[0x26];
  curFrameData.z27 = nes.cpu.mem[0x27];
  curFrameData.z4A = nes.cpu.mem[0x4A];
  curFrameData.z4B = nes.cpu.mem[0x4B];
  curFrameData.z4C = nes.cpu.mem[0x4C];
  frames[curFrameIdx] = curFrameData;
}

const elapsed = Date.now() - t0;

// ============================================================
// 分析: PC top-N 统计
// ============================================================
const pcCount = new Map();
frames.forEach(f => {
  if (!f) return;
  pcCount.set(f.firstPC, (pcCount.get(f.firstPC) || 0) + 1);
});
const topPCs = [...pcCount.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([pc, count]) => ({ pc: `$${pc.toString(16).toUpperCase().padStart(4, '0')}`, count }));

// ============================================================
// 输出
// ============================================================
const actualFrames = frames.filter(f => f).length;
const report = {
  note: 'jsNes CPU trace — opening animation full instruction-level trace',
  maxFrames: MAX_FRAMES,
  actualFrames,
  totalInstructions: totalInstr,
  stopReason,
  elapsedMs: elapsed,
  fpsAvg: (actualFrames / (elapsed / 1000)).toFixed(1),
  topFramePCs: topPCs,
  sampledInstructions: sampledInstr,
  frames: frames.filter(f => f).map(f => ({
    ...f,
    _instrCount: undefined,
  })),
};

if (!existsSync('test_output')) mkdirSync('test_output');
const outPath = 'test_output/opening_jsnes_trace.json';
writeFileSync(outPath, JSON.stringify(report, null, 2));

// ============================================================
// 控制台摘要
// ============================================================
console.log(`\n========================================`);
console.log(`SUMMARY`);
console.log(`========================================`);
console.log(`Frames:        ${actualFrames}`);
console.log(`Instructions:  ${totalInstr.toLocaleString()}`);
console.log(`Stop reason:   ${stopReason || 'max frames reached'}`);
console.log(`Elapsed:       ${elapsed}ms (${report.fpsAvg} fps)`);
console.log(`\nTop frame entry PCs:`);
topPCs.forEach(e => console.log(`  ${e.pc}: ${e.count} frames`));
console.log(`\n=== First 30 frames ===`);
frames.slice(0, 30).forEach(f => {
  if (!f) return;
  const scene = `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}`;
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | $27=$${f.z27.toString(16).padStart(2,'0')} | scene=${scene} | $4C=$${f.z4C.toString(16).padStart(2,'0')} | instr=${f.instrCount.toLocaleString()}`);
});
console.log(`\n=== Last 30 frames ===`);
frames.slice(-30).forEach(f => {
  if (!f) return;
  const scene = `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}`;
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | $27=$${f.z27.toString(16).padStart(2,'0')} | scene=${scene} | $4C=$${f.z4C.toString(16).padStart(2,'0')}`);
});
console.log(`\nSaved to ${outPath}`);
