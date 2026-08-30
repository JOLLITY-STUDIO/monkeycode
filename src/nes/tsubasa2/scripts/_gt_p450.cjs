// 提取 GT f447-453 的 p 字段 + emu palette 对比
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/opening/opening-title-1.ts', 'utf8');
for (const l of s.split('\n')) {
  const m = l.match(/f:\s*(\d+)/);
  if (m) {
    const f = +m[1];
    if (f >= 447 && f <= 453) {
      const p = l.match(/p:\{bg:\[[^\]]*\],spr:\[[^\]]*\]\}/);
      const sc = l.match(/sc:\[[^\]]*\]/);
      console.log('GT f' + f, p ? p[0].slice(0, 130) : 'p:null', sc ? sc[0].slice(0, 100) : '');
    }
  }
}
const emu = JSON.parse(fs.readFileSync('output/emu-full/frame-0450/palette.json', 'utf8'));
console.log('emu pal bg:', JSON.stringify(emu.bg));
console.log('emu pal spr:', JSON.stringify(emu.spr));
