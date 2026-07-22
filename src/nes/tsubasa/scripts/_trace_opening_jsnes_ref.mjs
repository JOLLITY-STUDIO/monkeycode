/**
 * jsNes CPU trace — 带注释的 txt 参考输出
 * 用法: node _trace_opening_jsnes_ref.mjs
 * 输出: test_output/opening_jsnes_ref.txt
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import NES from '../src/jsnes/src/nes.js';

const ROM_PATH = 'rom.nes';
const MAX_FRAMES = 4500;
const ROM = new Uint8Array(readFileSync(ROM_PATH));

// jsNes 初始化
const nes = new NES({ onFrame: () => {}, onStatusUpdate: () => {}, emulateSound: false });
nes.loadROM(ROM);

// 帧数据收集
const frames = [];
let totalInstr = 0, curFrameData = null, curFrameIdx = -1;

nes.cpu._traceCb = (pc) => {
  totalInstr++;
  if (nes.fpsFrameCount !== curFrameIdx) {
    if (curFrameData) {
      curFrameData.instrCount = curFrameData._instrCount;
      curFrameData.lastPC = pc;
      curFrameData.z26 = nes.cpu.mem[0x26]; curFrameData.z27 = nes.cpu.mem[0x27];
      curFrameData.z4A = nes.cpu.mem[0x4A]; curFrameData.z4B = nes.cpu.mem[0x4B];
      curFrameData.z4C = nes.cpu.mem[0x4C];
      frames[curFrameIdx] = curFrameData;
    }
    curFrameIdx = nes.fpsFrameCount;
    curFrameData = { frame: curFrameIdx, _instrCount: 0, instrCount: 0, firstPC: pc, lastPC: 0, z26:0,z27:0,z4A:0,z4B:0,z4C:0 };
  }
  curFrameData._instrCount++;
};

// 跑满 4500 帧
const t0 = Date.now();
for (let f = 0; f < MAX_FRAMES; f++) {
  nes.frame();
  if (f % 300 === 299) console.log(`  ${f+1}/${MAX_FRAMES} (${((Date.now()-t0)/1000).toFixed(0)}s)`);
}
if (curFrameData) {
  curFrameData.instrCount = curFrameData._instrCount;
  curFrameData.z26 = nes.cpu.mem[0x26]; curFrameData.z27 = nes.cpu.mem[0x27];
  curFrameData.z4A = nes.cpu.mem[0x4A]; curFrameData.z4B = nes.cpu.mem[0x4B];
  curFrameData.z4C = nes.cpu.mem[0x4C];
  frames[curFrameIdx] = curFrameData;
}
const elapsed = (Date.now() - t0) / 1000;

// ============================================================
// 辅助函数
// ============================================================
const h8  = v => '$' + v.toString(16).padStart(2, '0');
const h16 = v => '$' + v.toString(16).toUpperCase().padStart(4, '0');
const sceneStr = fd => h8(fd.z4B) + h8(fd.z4A);

// ============================================================
// 分析: 场景变化, $4C变化, 关键节点
// ============================================================
const valid = frames.filter(f => f);

// 场景变化
const sceneChanges = [];
let prevSid = -1;
valid.forEach(f => {
  const sid = (f.z4B << 8) | f.z4A;
  if (sid !== prevSid) {
    sceneChanges.push({ frame: f.frame, scene: sceneStr(f), $4C: h8(f.z4C), firstPC: h16(f.firstPC) });
    prevSid = sid;
  }
});

// $4C 变化
const c4cChanges = [];
let prev4c = -1;
valid.forEach(f => {
  if (f.z4C !== prev4c) {
    c4cChanges.push({ frame: f.frame, $4C: h8(f.z4C), scene: sceneStr(f) });
    prev4c = f.z4C;
  }
});

// 关键节点
const first$0F0F = valid.find(f => f.z4A===0x0F && f.z4B===0x0F);
const first4c80  = valid.find(f => f.z4C===0x80);
const last = valid[valid.length-1];

// ============================================================
// 生成 txt
// ============================================================
let out = '';
const L = (s) => out += s + '\n';

L('====================================================================');
L('  jsNes CPU 帧级别 trace — 原版 ROM 开场动画参考数据');
L('  ROM: 天使之翼2 (Mapper 4, 16 PRG banks)');
L('  每帧 ~60fps, 约 9500 条指令/帧');
L('====================================================================');
L('');
L(`总帧数:    ${valid.length}`);
L(`总指令:    ${totalInstr.toLocaleString()}`);
L(`耗时:      ${elapsed.toFixed(1)}秒 (脚本运行时间)`);
L(`结束帧:    scene=${sceneStr(last)}  4C=${h8(last.z4C)}  27=${h8(last.z27)}`);
L('');
L('--- 字段说明 ---');
L('  frame    = 帧号 (0-based, 约 每60帧=1秒)');
L('  scene    = [$4B:$4A] 场景ID (游戏内部场景状态编号)');
L('  4C       = [$4C] ZP_SCENE_STATUS (显示控制: $00=准备阶段, $80=渲染中)');
L('  27       = [$27] ZP_JMP_IDX (dispatch跳转索引, 0=handleForward主逻辑)');
L('  firstPC  = 本帧第一条CPU指令地址 (CPU=$C500主循环, NMI=$9F04/$9F06)');
L('  instr    = 本帧执行了多少条6502指令');
L('');

L('====================================================================');
L('  关键时间节点');
L('====================================================================');
L(`  F0     CPU启动 RESET → $FFF0`);
L(`  F1     ROM初始化 → $C65B`);
L(`  F2     切bank → $C65D, scene=$0000`);
L(`  F3-6   内存初始化 + PPU设置`);
L(`  F7-8   首次NMI → $9F06/$9F04`);
L(`  F9     进入主循环 → $C500`);
L(`  F10    场景初始化开始 scene=$0101 (每帧+1逐级递增)`);
L(`  F24    场景初始化完成 scene=$0F0F (${first$0F0F.instrCount.toLocaleString()} 条指令/帧)`);
if (first4c80)  L(`  F${first4c80.frame}    4C 首次变 $80 ─ 进入渲染主体阶段 (${(first4c80.frame/60).toFixed(1)}秒)`);
L('');

L('====================================================================');
L('  $4C 变化历程 (共 ' + c4cChanges.length + ' 次切换)');
L('====================================================================');
L('  帧号    $4C     场景');
L('  ──────  ──────  ──────');
c4cChanges.forEach(c => {
  L(`  F${String(c.frame).padStart(4)}    ${c.$4C}    ${c.scene}`);
});
L('');

L('====================================================================');
L('  场景ID变化历程 (共 ' + sceneChanges.length + ' 次切换)');
L('  ([] 内标注: 需多少帧走到下一步)');
L('====================================================================');
L('  帧号    场景ID   $4C    首PC     间隔帧数');
L('  ──────  ──────   ──────  ───────  ────────');
let lastFrame = -1;
sceneChanges.forEach((s, i) => {
  const gap = i === 0 ? '' : String(s.frame - lastFrame);
  L(`  F${String(s.frame).padStart(4)}    ${s.scene}     ${s.$4C}     ${s.firstPC}  ${gap}`);
  lastFrame = s.frame;
});
L('');

L('====================================================================');
L('  前 40 帧详情 (启动阶段)');
L('====================================================================');
L('  帧号   首PC      场景  $4C $27   指令数');
L('  ────── ────────  ──── ──── ────  ─────────');
valid.slice(0, 40).forEach(f => {
  L(`  F${String(f.frame).padStart(4)}   ${h16(f.firstPC)}   ${sceneStr(f)} ${h8(f.z4C)} ${h8(f.z27)}  ${f.instrCount.toLocaleString()}`);
});
L('');

L('====================================================================');
L('  最后 10 帧');
L('====================================================================');
L('  帧号   首PC      场景  $4C $27');
L('  ────── ────────  ──── ──── ────');
valid.slice(-10).forEach(f => {
  L(`  F${String(f.frame).padStart(4)}   ${h16(f.firstPC)}   ${sceneStr(f)} ${h8(f.z4C)} ${h8(f.z27)}`);
});
L('');

// 场景 $0F0F 区间统计
const range0F0F = valid.filter(f => f.z4A===0x0F && f.z4B===0x0F);
L('====================================================================');
L(`  scene=$0F0F 总区间: F${range0F0F[0].frame} ~ F${range0F0F[range0F0F.length-1].frame}`);
L(`  共 ${range0F0F.length} 帧 (${(range0F0F.length/60).toFixed(1)} 秒) — 开场动画实际渲染时长`);
L('====================================================================');
L('');

// ============================================================
// 4500 帧完整数据 — 每行一帧
// ============================================================
L('====================================================================');
L('  全部 4500 帧逐帧数据');
L('====================================================================');
L('  格式: 帧号  首PC    场景  $4C $27  指令数');
L('  ────── ────────  ──── ──── ────  ─────────');
valid.forEach(f => {
  L(`  F${String(f.frame).padStart(4)}   ${h16(f.firstPC)}   ${sceneStr(f)} ${h8(f.z4C)} ${h8(f.z27)}  ${String(f.instrCount).padStart(5)}`);
});
L('');
L('--- EOF ---');

// 写入文件
if (!existsSync('test_output')) mkdirSync('test_output');
const outPath = 'test_output/opening_jsnes_ref.txt';
writeFileSync(outPath, out);
console.log(`\nDone → ${outPath}  (${elapsed.toFixed(1)}s)`);

// 控制台摘要
console.log(out);
