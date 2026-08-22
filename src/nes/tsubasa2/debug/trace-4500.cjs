/**
 * trace-4500.cjs — 固定跑 4500 帧, 记录 MMC3 + NT + 调色板 + PPU寄存器 + OAM
 * 开场动画约 4200+ 帧, 4500 帧覆盖完整开场
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

const FRAME_COUNT = 4500;
const mmc3Lines = [];
const ntLines = [];
const palLines = [];
const regLines = [];
const oamLines = [];

let frameCount = 0;

nes.tracer.start(nes, {
  trackCPU: false,
  trackMMC3: true,
  trackNT: true,
  trackPalette: true,
  trackPPURegs: true,
  trackOAM: true,
  maxLines: 5000000,
  callback: (line) => {
    const prefix = 'F' + frameCount + ' ';
    if (line.includes('[MMC3]')) mmc3Lines.push(prefix + line);
    else if (line.includes('[NT_')) ntLines.push(prefix + line);
    else if (line.includes('[PAL_')) palLines.push(prefix + line);
    else if (line.includes('[PPU_REG]')) regLines.push(prefix + line);
    else if (line.includes('[OAM]')) oamLines.push(prefix + line);
  },
});

console.log('Tracing ' + FRAME_COUNT + ' frames (full opening)...');
nes.frame(); // 跳过初始 RESET
for (let i = 1; i <= FRAME_COUNT; i++) {
  frameCount = i;
  nes.frame();
  if (i % 500 === 0) console.log('  frame ' + i + '...');
}
nes.tracer.stop();

// 写文件
fs.writeFileSync(path.join(outDir, 'mmc3-full.log'), mmc3Lines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'nt-full.log'), ntLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'palette-full.log'), palLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'ppu_regs-full.log'), regLines.join('\n') + '\n');
fs.writeFileSync(path.join(outDir, 'oam-full.log'), oamLines.join('\n') + '\n');

console.log('\n=== Trace 完成 ===');
console.log('总帧数: ' + FRAME_COUNT);
console.log('MMC3: ' + mmc3Lines.length + ' 行');
console.log('NT: ' + ntLines.length + ' 行');
console.log('Palette: ' + palLines.length + ' 行');
console.log('PPU Regs: ' + regLines.length + ' 行');
console.log('OAM: ' + oamLines.length + ' 行');
