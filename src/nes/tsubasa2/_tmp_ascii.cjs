// 临时：把 H5 f2 buffer 转 ASCII 可视化确认 TECMO logo 内容
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

const rt = new HeadlessRuntime();
const g = new Tsubasa2();
g.boot(rt);
const ppu = rt.ppu;
for (let f = 0; f < 3; f++) rt.frame(g);

const buf = ppu.buffer;
// 只打印 y 60-150 区域，x 60-190
for (let y = 60; y < 150; y++) {
  let line = '';
  for (let x = 60; x < 196; x++) {
    const v = buf[y * 256 + x];
    line += v ? '#' : '.';
  }
  console.log(String(y).padStart(3) + ' ' + line);
}
