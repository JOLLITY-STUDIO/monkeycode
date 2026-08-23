// 探测: 前若干帧 CPU 实际执行了哪些 $8xxx 地址, 确认 sceneLoad 运行时 PC
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const nes = new tsnes.NES();
nes.loadROM(fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes')));

let frameCount = 0;
let hits = 0;
nes.tracer.start(nes, {
  trackCPU: true,
  addressRange: [0x8000, 0x9000],
  maxLines: 800,
  callback: (line) => {
    hits++;
    if (hits <= 40) console.log('f' + frameCount + ' ' + line.slice(0, 100));
  },
});
for (let i = 0; i < 120; i++) {
  nes.frame();
  frameCount++;
  if (hits >= 800) break;
}
nes.tracer.stop();
console.log('total $8xxx hits:', hits, 'frames:', frameCount);
