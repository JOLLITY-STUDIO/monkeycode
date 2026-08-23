/**
 * _tmp_emu_trace_30f.cjs — 模拟器开场前 30 帧 CPU trace (输出文件后分析)
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

const outFile = path.resolve(__dirname, 'trace/opening-30f-cpu.log');
nes.tracer.start(nes, {
  trackCPU: true,
  maxLines: 3000000,
  outputFile: outFile,
});
for (let f = 0; f < 30; f++) {
  nes.frame();
}
nes.tracer.stop();
console.log('done, ram_00ED=' + nes.cpu.mem[0x00ED]);
