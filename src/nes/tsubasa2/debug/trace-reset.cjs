/**
 * trace-reset.cjs — 跑到检测到 RESET 为止, 自动停止
 * RESET 检测: CPU PC 回到 $FFF0/$C64D (RESET 向量入口)
 * 记录全程 MMC3 + NT + 调色板 + PPU寄存器 + OAM
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

let frameCount = 0;
let firstResetSkipped = false;

// 收集器
const mmc3Lines = [];
const ntLines = [];
const palLines = [];
const regLines = [];
const oamLines = [];
const audioLines = [];

// 记录上一次的 R6/R7 值, 检测 RESET 初始化序列
let prevR6 = -1;
let prevR7 = -1;
let initSeqCount = 0;

nes.tracer.start(nes, {
  trackCPU: false,
  trackMMC3: true,
  trackNT: true,
  trackPalette: true,
  trackPPURegs: true,
  trackOAM: true,
  trackAudio: true,
  maxLines: 5000000,
  callback: (line) => {
    const prefix = 'F' + frameCount + ' ';
    if (line.includes('[MMC3]')) mmc3Lines.push(prefix + line);
    else if (line.includes('[NT_')) ntLines.push(prefix + line);
    else if (line.includes('[PAL_')) palLines.push(prefix + line);
    else if (line.includes('[PPU_REG]')) regLines.push(prefix + line);
    else if (line.includes('[OAM]')) oamLines.push(prefix + line);
    else if (line.includes('[AUDIO]')) audioLines.push(prefix + line);
  },
});

console.log('Tracing until RESET detected (auto-stop)...');

// 第一帧前先跑一帧跳过初始 RESET
nes.frame();
frameCount = 1;
firstResetSkipped = true;
console.log('  Initial RESET skipped, now tracing...');

// Hook CPU.doResetInterrupt 检测 RESET
// tsnes CPU 在 irqType=2 (IRQ_RESET) 时调 doResetInterrupt(), 读 $FFFC/$FFFD 跳到 RESET 入口
let resetCount = 0;
let resetFrame = -1;
const origDoReset = nes.cpu.doResetInterrupt.bind(nes.cpu);
nes.cpu.doResetInterrupt = function() {
  resetCount++;
  console.log('  [RESET] doResetInterrupt called! count=' + resetCount + ' frame=' + frameCount);
  if (resetCount >= 2) {
    resetFrame = frameCount;
  }
  return origDoReset();
};

for (let i = 1; i < 100000 && resetFrame < 0; i++) {
  frameCount = i;
  nes.frame();
  if (resetFrame >= 0) {
    console.log('  RESET detected at frame ' + i + '! Stopping.');
    break;
  }
  if ((i + 1) % 500 === 0) console.log('  frame ' + (i + 1) + '...');
}

nes.tracer.stop();

// 写文件
fs.writeFileSync(path.join(outDir, 'mmc3-reset.log'), mmc3Lines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'nt-reset.log'), ntLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'palette-reset.log'), palLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'ppu_regs-reset.log'), regLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'oam-reset.log'), oamLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'audio-reset.log'), audioLines.join('\n') + '\n');

console.log('\n=== Trace 完成 ===');
console.log('总帧数: ' + frameCount);
console.log('MMC3 切换: ' + mmc3Lines.length + ' 行');
console.log('NT 写入: ' + ntLines.length + ' 行');
console.log('调色板写入: ' + palLines.length + ' 行');
console.log('PPU 寄存器: ' + regLines.length + ' 行');
console.log('OAM: ' + oamLines.length + ' 行');
console.log('Audio: ' + audioLines.length + ' 行');
