const NES = require('./_test_out/core/nes').default;
const { PRG, HEADER, NES_CHR_ROM } = require('./_test_out/game/rom');
const { Tsubasa2 } = require('./_test_out/game/index');

let lastBuf = null;
let frameCount = 0;
const nes = new NES({
  onFrame: (buf) => { lastBuf = buf; frameCount++; },
  onStatusUpdate: () => {},
  emulateSound: false,
});
nes.loadTsROM({ header: HEADER, prg: PRG, chr: NES_CHR_ROM });

const t = new Tsubasa2();
t.boot();

for (let f = 1; f <= 10; f++) {
  t.frame(nes);
}

console.log('[RESULT] onFrame called', frameCount, 'times in 10 frames');
if (lastBuf) {
  let nonZero = 0;
  let black = 0;
  const colorSet = new Set();
  for (let i = 0; i < lastBuf.length; i++) {
    colorSet.add(lastBuf[i]);
    if (lastBuf[i]) nonZero++; else black++;
  }
  console.log('[FRAME10] buffer size =', lastBuf.length);
  console.log('[FRAME10] nonZero px =', nonZero, 'black px =', black);
  console.log('[FRAME10] unique colors =', colorSet.size);
  const top = [...colorSet].sort((a, b) => b - a).slice(0, 6);
  console.log('[FRAME10] top colors =', top.map((v) => '#' + (v >>> 0).toString(16).padStart(8, '0')).join(' '));
  // 采样中间像素
  const mid = Math.floor(lastBuf.length / 2);
  console.log('[FRAME10] center px =', '#' + lastBuf[mid].toString(16).padStart(8, '0'));
  // 若干行首像素
  const row = [];
  for (let y = 0; y < 240; y += 20) {
    const px = lastBuf[y * 256 + 10];
    row.push('y' + y + ':' + '#' + px.toString(16).padStart(8, '0'));
  }
  console.log('[FRAME10] column 10:', row.join(' '));
} else {
  console.log('[RESULT] lastBuf is null — onFrame never fired!');
}

// 直接调 startVBlank 手动渲染后检查 buffer
nes.ppu.startFrame();
nes.ppu.endFrame();
console.log('[MANUAL] buffer nonZero after manual startFrame+endFrame:', (() => { let n = 0; for (let i = 0; i < nes.ppu.buffer.length; i++) if (nes.ppu.buffer[i]) n++; return n; })());
