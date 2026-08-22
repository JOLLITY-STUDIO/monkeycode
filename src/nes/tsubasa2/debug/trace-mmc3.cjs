/**
 * trace-mmc3.cjs — 只跟踪 MMC3 bank 切换, 跑 300 帧
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const outDir = path.resolve(__dirname, 'trace');
fs.mkdirSync(outDir, { recursive: true });

const mmc3Lines = [];
nes.tracer.start(nes, {
  trackCPU: false,
  trackMMC3: true,
  maxLines: 100000,
  callback: (line) => mmc3Lines.push(line),
});

console.log('Tracing MMC3 bank switches for 300 frames...');
for (let i = 0; i < 300; i++) {
  nes.frame();
  if ((i + 1) % 50 === 0) console.log('  frame ' + (i + 1));
}
nes.tracer.stop();

// 写文件
fs.writeFileSync(path.join(outDir, 'mmc3.log'), mmc3Lines.join('\n') + '\n');

// 统计
const lines = mmc3Lines;
console.log('\nMMC3 trace: ' + lines.length + ' 行');

// 去重: 只看不同的 bank 切换
const seen = new Set();
const unique = [];
for (const l of lines) {
  const key = l.substring(l.indexOf('STA'));
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(l);
  }
}
console.log('去重后: ' + unique.length + ' 种不同切换');
for (const l of unique) console.log('  ' + l.substring(l.indexOf(']') + 1).trim());
