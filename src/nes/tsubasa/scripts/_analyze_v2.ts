// 分析 opening trace — 提取游戏高层逻辑
// 目标：理解 opening 动画在做什么（PPU写入、场景切换、计时等）
// 而不是逐条翻译 6502 指令

import * as fs from 'fs';

interface TraceEntry {
  f: number;      // frame
  pc: number;     // program counter
  op: string;     // mnemonic
  a: number;      // accumulator
  x: number;      // X register
  y: number;      // Y register
  sp: number;     // stack pointer
  p: number;      // status flags
  cy: number;     // cycle
}

interface PPUWrite {
  frame: number;
  cy: number;
  addr: number;   // $2000-$2007 or $4014
  value: number;
  comment?: string;
}

interface FrameSummary {
  frame: number;
  instrCount: number;
  uniquePCs: number;
  ppuWrites: PPUWrite[];
  // 关键地址访问
  keyPCs: Map<number, number>;  // pc -> hit count
  // 寄存器值变化
  regSnapshots: { cy: number; A: number; X: number; Y: number; SP: number; P: number }[];
}

const trace: { trace: TraceEntry[] } = JSON.parse(
  fs.readFileSync('test_output/opening_trace.json', 'utf8')
);

const entries = trace.trace;

// === PPU寄存器写入检测 ===
// 我们通过检测 $2000-$2007 和 $4014 的写操作来理解画面
const ppuRegNames: Record<number, string> = {
  0x2000: 'PPUCTRL',
  0x2001: 'PPUMASK',
  0x2002: 'PPUSTATUS',
  0x2003: 'OAMADDR',
  0x2004: 'OAMDATA',
  0x2005: 'PPUSCROLL',
  0x2006: 'PPUADDR',
  0x2007: 'PPUDATA',
  0x4014: 'OAMDMA',
};

// 构建帧分析
const frames: FrameSummary[] = [];
let currentFrame: FrameSummary | null = null;

for (const e of entries) {
  if (!currentFrame || currentFrame.frame !== e.f) {
    if (currentFrame) frames.push(currentFrame);
    currentFrame = {
      frame: e.f,
      instrCount: 0,
      uniquePCs: 0,
      ppuWrites: [],
      keyPCs: new Map(),
      regSnapshots: [],
    };
  }
  currentFrame.instrCount++;

  // 记录寄存器快照（每隔 N 条）
  if (currentFrame.regSnapshots.length < 20 || e.f <= 3) {
    currentFrame.regSnapshots.push({
      cy: e.cy, A: e.a, X: e.x, Y: e.y, SP: e.sp, P: e.p
    });
    // 只保留最近20条
    if (currentFrame.regSnapshots.length > 20) {
      currentFrame.regSnapshots.shift();
    }
  }
}

if (currentFrame) frames.push(currentFrame);

// 第二遍：检测 STA $200x 和 STA $4014
// 需要看指令详情 —— 这些信息在 trace 里只有 pc 和 op，没有 operand
// 我们需要用反汇编来查找写 PPU 的指令

// 先看看 trace 里 PC 的分布
console.log('=== 帧概览 ===');
for (const f of frames) {
  console.log(`Frame ${f.frame}: ${f.instrCount.toLocaleString()} instrs`);
}

// 看看关键 PC 区域
console.log('\n=== PC 地址分布 ===');
const pcBanks: Record<string, number> = {};
for (const e of entries) {
  const bank = (e.pc >> 12).toString(16).toUpperCase().padStart(4, '0');
  if (!pcBanks[bank]) pcBanks[bank] = 0;
  pcBanks[bank]++;
}
const bankSorted = Object.entries(pcBanks).sort((a, b) => b[1] - a[1]);
for (const [bank, count] of bankSorted.slice(0, 10)) {
  console.log(`  $${bank}xxx: ${count.toLocaleString()} (${(count/entries.length*100).toFixed(1)}%)`);
}

// 分析各帧间的 PC 变化（稳态判断）
console.log('\n=== 帧间唯一 PC 数 ===');
for (const f of frames) {
  const uniq = new Set<number>();
  // 重新遍历 entries 收集唯一 PC
  const frameEntries = entries.filter(e => e.f === f.frame);
  for (const e of frameEntries) {
    uniq.add(e.pc);
  }
  console.log(`Frame ${f.frame}: ${frameEntries.length.toLocaleString()} instrs, ${uniq.size} unique PCs`);
}

// 找原始 ROM 里的关键地址
// $C64D = RESET 入口
// $C76E = NMI 入口
// $8000-$9FFF = 切换 bank 的主逻辑
// $C000-$CFFF = 固定 bank

// 列出每帧前10条指令
console.log('\n=== 每帧前5条指令 ===');
for (const f of frames.slice(0, 8)) {
  const frameEntries = entries.filter(e => e.f === f.frame).slice(0, 5);
  console.log(`Frame ${f.frame}:`);
  for (const e of frameEntries) {
    console.log(`  cy=${e.cy} PC=$${e.pc.toString(16).toUpperCase().padStart(4,'0')} ${e.op} A=$${e.a.toString(16)} X=$${e.x.toString(16)} Y=$${e.y.toString(16)}`);
  }
}

// 看最后一帧的结尾
console.log('\n=== 最后3帧最后5条指令 ===');
for (const f of frames.slice(-3)) {
  const frameEntries = entries.filter(e => e.f === f.frame);
  const last5 = frameEntries.slice(-5);
  console.log(`Frame ${f.frame}:`);
  for (const e of last5) {
    console.log(`  cy=${e.cy} PC=$${e.pc.toString(16).toUpperCase().padStart(4,'0')} ${e.op} A=$${e.a.toString(16)} X=$${e.x.toString(16)} Y=$${e.y.toString(16)}`);
  }
}
