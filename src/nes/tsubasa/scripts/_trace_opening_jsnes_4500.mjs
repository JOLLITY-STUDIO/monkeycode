/**
 * jsNes CPU trace — 完整开场动画参考数据 (4500帧)
 * 用法: node _trace_opening_jsnes_4500.mjs
 *
 * 输出: test_output/opening_jsnes_4500_trace.json
 * 每帧记录: 帧号、指令数、首/末PC、关键ZP状态($26/$27/$4A/$4B/$4C)
 * 从 scripts/ 目录运行
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import NES from '../src/jsnes/src/nes.js';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = 100; // 调试帧数
const WATCH_MAX_FRAMES = 100; // 写监控帧数
const WATCH_ADDRS = [0x26, 0x27, 0x4A, 0x4B, 0x4C];

const ROM = new Uint8Array(readFileSync(ROM_PATH));
console.log(`ROM: ${ROM.length} bytes`);

// ============================================================
// 数据结构
// ============================================================
const frames = [];
let totalInstr = 0;
let curFrameData = null;
let curFrameIdx = -1;

/** ★ 写入监控: 每次 CPU 写入 $26/$27/$4A/$4B/$4C 时记录 */
const cpuWrites = [];
const _prevSnap = {};
WATCH_ADDRS.forEach(a => _prevSnap[a] = 0);

// ============================================================
// jsNes 初始化
// ============================================================
const nes = new NES({
  onFrame: () => {},
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadROM(ROM);
console.log(`Mapper: ${nes.rom.mapperType}, PRG banks: ${nes.rom.romCount}\n`);

// ============================================================
// CPU trace callback
// ============================================================
nes.cpu._traceCb = (pc, opcode, cycles) => {
  totalInstr++;

  // ★ 写入监控: 对比前后快照 (traceCb 在指令执行后调用, mem 已更新)
  if (curFrameIdx < WATCH_MAX_FRAMES) {
    for (const a of WATCH_ADDRS) {
      const cur = nes.cpu.mem[a];
      if (cur !== _prevSnap[a]) {
        cpuWrites.push({
          f: curFrameIdx >= 0 ? curFrameIdx : 0,
          pc: pc.toString(16).toUpperCase().padStart(4, '0'),
          a: a.toString(16).padStart(2, '0'),
          v: cur,
          ov: _prevSnap[a],
        });
      }
      _prevSnap[a] = cur;
    }
  }

  if (nes.fpsFrameCount !== curFrameIdx) {
    // 保存上一帧
    if (curFrameData) {
      curFrameData.instrCount = curFrameData._instrCount;
      curFrameData.lastPC = pc;
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
};

// ============================================================
// 主循环 — 跑满 4500 帧
// ============================================================
console.log(`Running ${MAX_FRAMES} frames...\n`);

const t0 = Date.now();
for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();

  // 每秒输出进度
  if (f % 60 === 59) {
    const elapsed = (Date.now() - t0) / 1000;
    const fps = (f / elapsed).toFixed(0);
    console.log(`  F${String(f+1).padStart(5)}/${MAX_FRAMES} | ${elapsed.toFixed(1)}s | ${fps}fps | ${(totalInstr/1e6).toFixed(1)}M instr`);
  }
}

// 补充最后一帧
if (curFrameData) {
  curFrameData.instrCount = curFrameData._instrCount;
  curFrameData.z26 = nes.cpu.mem[0x26];
  curFrameData.z27 = nes.cpu.mem[0x27];
  curFrameData.z4A = nes.cpu.mem[0x4A];
  curFrameData.z4B = nes.cpu.mem[0x4B];
  curFrameData.z4C = nes.cpu.mem[0x4C];
  frames[curFrameIdx] = curFrameData;
}

const elapsed = (Date.now() - t0) / 1000;

// ============================================================
// 分析
// ============================================================

// 场景变化检测: 找出 scene ID 发生变化的帧
const sceneChanges = [];
let prevScene = -1;
frames.forEach(f => {
  if (!f) return;
  const sid = (f.z4B << 8) | f.z4A;
  if (sid !== prevScene) {
    sceneChanges.push({
      frame: f.frame,
      scene: `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}`,
      $4C: `$${f.z4C.toString(16).padStart(2,'0')}`,
      firstPC: `$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')}`,
    });
    prevScene = sid;
  }
});

// $4C 变化检测
const c4CChanges = [];
let last4C = -1;
frames.forEach(f => {
  if (!f) return;
  if (f.z4C !== last4C) {
    c4CChanges.push({ frame: f.frame, $4C: `$${f.z4C.toString(16).padStart(2,'0')}`, scene: `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}` });
    last4C = f.z4C;
  }
});

// ============================================================
// 输出
// ============================================================
const actualFrames = frames.filter(f => f).length;
const report = {
  note: 'jsNes CPU trace — 完整开场动画参考 (4500帧)',
  maxFrames: MAX_FRAMES,
  actualFrames,
  totalInstructions: totalInstr,
  elapsedSec: elapsed.toFixed(1),
  sceneChanges,
  $4C_changes: c4CChanges,
  frames: frames.filter(f => f).map(f => ({ ...f, _instrCount: undefined })),
};

if (!existsSync('test_output')) mkdirSync('test_output');
const outPath = 'test_output/opening_jsnes_4500_trace.json';

// 手动生成 JSON: 每条 frame 记录一行
const cleanFrames = frames.filter(f => f).map(f => JSON.stringify({ ...f, _instrCount: undefined }));
const jsonOut = [
  '{',
  `  "note": ${JSON.stringify(report.note)},`,
  `  "maxFrames": ${report.maxFrames},`,
  `  "actualFrames": ${report.actualFrames},`,
  `  "totalInstructions": ${report.totalInstructions},`,
  `  "elapsedSec": ${JSON.stringify(report.elapsedSec)},`,
  `  "sceneChanges": ${JSON.stringify(sceneChanges)},`,
  `  "$4C_changes": ${JSON.stringify(c4CChanges)},`,
  `  "frames": [`,
  cleanFrames.map(s => `    ${s}`).join(',\n'),
  `  ]`,
  '}',
].join('\n');
writeFileSync(outPath, jsonOut);

// ★ 输出 CPU 写入日志
const writesPath = 'test_output/cpu_writes_jsnes.json';
const fmtW = (v) => v.toString(16).padStart(2,'0');
writeFileSync(writesPath, JSON.stringify(cpuWrites, null, 2));
const firstWritesByAddr = {};
cpuWrites.forEach(w => {
  if (!firstWritesByAddr[w.a]) firstWritesByAddr[w.a] = w;
});
console.log(`\n=== CPU writes to $26/$27/$4A/$4B/$4C (first ${WATCH_MAX_FRAMES} frames) ===`);
console.log(`Total writes: ${cpuWrites.length}`);
for (const a of WATCH_ADDRS) {
  const sa = a.toString(16).padStart(2,'0');
  const fw = firstWritesByAddr[sa];
  const cnt = cpuWrites.filter(w => w.a === sa).length;
  if (fw) console.log(`  $${sa}: ${cnt} writes, first: F${fw.f} PC=$${fw.pc} ${fmtW(fw.ov)}→${fmtW(fw.v)}`);
  else console.log(`  $${sa}: 0 writes`);
}

// ============================================================
// 控制台摘要
// ============================================================
const valid = frames.filter(f => f);
const last = valid[valid.length - 1];
const lastScene = `$${last.z4A.toString(16).padStart(2,'0')}${last.z4B.toString(16).padStart(2,'0')}`;

console.log(`\n========================================`);
console.log(`SUMMARY`);
console.log(`========================================`);
console.log(`Frames:        ${actualFrames}`);
console.log(`Instructions:  ${totalInstr.toLocaleString()}`);
console.log(`Elapsed:       ${elapsed.toFixed(1)}s`);
console.log(`End frame:     scene=${lastScene}  $4C=$${last.z4C.toString(16).padStart(2,'0')}  $27=$${last.z27.toString(16).padStart(2,'0')}`);

console.log(`\nScene transitions (${sceneChanges.length}):`);
sceneChanges.forEach(s => console.log(`  F${String(s.frame).padStart(4)}  scene=${s.scene}  $4C=${s.$4C}  PC=${s.firstPC}`));

console.log(`\n$4C changes (${c4CChanges.length}):`);
c4CChanges.forEach(c => console.log(`  F${String(c.frame).padStart(4)}  $4C=${c.$4C}  scene=${c.scene}`));

console.log(`\n=== First 40 frames ===`);
valid.slice(0, 40).forEach(f => {
  const scene = `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}`;
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | scene=${scene} | $4C=$${f.z4C.toString(16).padStart(2,'0')} | $27=$${f.z27.toString(16).padStart(2,'0')} | instr=${f.instrCount.toLocaleString()}`);
});

// 找 $4C 首次变化的帧
const first4c80 = valid.find(f => f.z4C === 0x80);
if (first4c80) {
  console.log(`\n$4C 首次变 $80: F${first4c80.frame} (${(first4c80.frame/60).toFixed(1)}秒)`);
}

console.log(`\nLast 10 frames:`);
valid.slice(-10).forEach(f => {
  const scene = `$${f.z4A.toString(16).padStart(2,'0')}${f.z4B.toString(16).padStart(2,'0')}`;
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | scene=${scene} | $4C=$${f.z4C.toString(16).padStart(2,'0')} | $27=$${f.z27.toString(16).padStart(2,'0')}`);
});

console.log(`\nSaved to ${outPath}`);
