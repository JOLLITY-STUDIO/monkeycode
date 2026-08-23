// 完整开场 trace: 只跟踪 NT/Palette/OAM, 跑到 ram_00ED BF→0 (标题)
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const outDir = path.resolve(__dirname, 'trace2');
fs.mkdirSync(outDir, { recursive: true });
const ntLog = fs.createWriteStream(path.join(outDir, 'nt.log'));
const edLog = [];

let prevED = -1;
let frameCount = 0;
let stopped = false;
let ntNonZero = { nt0: 0, nt1: 0 };
let maxNT0 = 0, maxNT1 = 0;

nes.tracer.start(nes, {
  trackNT: true,
  trackPalette: true,
  trackOAM: true,
  maxLines: 4000000,
  callback: (line) => {
    if (line.startsWith('[NT_WRITE]')) {
      // 提取 tile 值, 只记录非零
      const m = line.match(/tile=#\$([0-9A-F]{2})/i);
      if (m && parseInt(m[3] || m[1], 16) !== 0) {
        ntLog.write(`f${frameCount} ` + line + '\n');
      }
    }
  },
});

for (let i = 0; i < 6000 && !stopped; i++) {
  nes.frame();
  frameCount++;
  const ed = nes.cpu.mem[0x00ED] ?? 0;
  const vm = nes.ppu.vramMem;
  let n0 = 0, n1 = 0;
  if (vm) {
    for (let j = 0x2000; j < 0x2400; j++) if (vm[j] !== 0) n0++;
    for (let j = 0x2400; j < 0x2800; j++) if (vm[j] !== 0) n1++;
  }
  if (n0 > maxNT0) maxNT0 = n0;
  if (n1 > maxNT1) maxNT1 = n1;
  if (ed !== prevED) {
    edLog.push(`f${frameCount} ram_00ED=0x${ed.toString(16).toUpperCase()} nt0=${n0} nt1=${n1}`);
    console.log(`  f${frameCount} ram_00ED=0x${ed.toString(16).toUpperCase()} nt0=${n0} nt1=${n1}`);
    prevED = ed;
  }
  if (frameCount % 1000 === 0) console.log(`  ... f${frameCount} nt0=${n0} nt1=${n1}`);
  // 开场结束: BF→0
  if (edLog.length >= 3) {
    const last3 = edLog.slice(-3).map(e => parseInt(e.match(/0x([0-9A-F]+)/)[1], 16));
    if (last3[0] === 0xBF && last3[2] === 0x00) {
      console.log('  → 开场结束进标题 (BF→0)');
      stopped = true;
    }
  }
}
nes.tracer.stop();
ntLog.end();
const out = edLog.join('\n') + `\nmaxNT0=${maxNT0} maxNT1=${maxNT1}\ntotalFrames=${frameCount}\n`;
fs.writeFileSync(path.join(outDir, 'summary.txt'), out);
console.log(out);
