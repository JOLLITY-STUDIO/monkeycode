// 检查 ppu.buffer 类型与取值
const { Tsubasa2 } = require('./dist-cjs2/game/index');
const { HeadlessRuntime } = require('./dist-cjs2/game/runtime/HeadlessRuntime');
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
const origLog = console.log;
console.log = () => {};
game.boot(runtime);
console.log = origLog;
for (let i = 0; i <= 790; i++) game.frame(runtime);
const b = runtime.ppu.buffer;
console.log('buffer ctor:', b.constructor.name);
console.log('buffer length:', b.length);
console.log('is Uint8Array:', b instanceof Uint8Array);
console.log('is Uint32Array:', b instanceof Uint32Array);
console.log('byteLength:', b.byteLength);
// y15 x8 像素
const idx = 15 * 256 + 8;
console.log('y15x8 raw:', b[idx], 'hex:', b[idx].toString(16));
if (b instanceof Uint8Array) {
  const p = idx * 4;
  console.log('as RGBA:', b[p], b[p+1], b[p+2], b[p+3]);
}
// 找非零行首
for (let y = 0; y < 30; y++) {
  let v = b[y * 256 + 8];
  console.log(`y${y} x8:`, v, v.toString(16));
}
