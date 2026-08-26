// 最小复现：11帧后读取 nameTable[0] 与逐帧读取对比
const { HeadlessRuntime } = require('./dist-cjs/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('./dist-cjs/game/index');

function cellVal(v) {
  if (v === undefined || v === null) return 0;
  return typeof v === 'object' ? (v.tile || 0) : v;
}

// 场景A：一次跑11帧再读
const rA = new HeadlessRuntime();
const gA = new Tsubasa2();
gA.boot(rA);
for (let f = 0; f < 11; f++) rA.frame(gA);
const tA = rA.ppu.nameTable[0];
let row12A = '';
for (let x = 12; x < 24; x++) row12A += cellVal(tA[12 * 32 + x]).toString(16).padStart(2, '0') + ' ';
console.log('A (11 frames then read): ' + row12A);

// 场景B：逐帧读（模拟 nt_frames）
const rB = new HeadlessRuntime();
const gB = new Tsubasa2();
gB.boot(rB);
for (let f = 0; f < 11; f++) {
  rB.frame(gB);
  if (f === 10) {
    const t = rB.ppu.nameTable[0];
    let row12 = '';
    for (let x = 12; x < 24; x++) row12 += cellVal(t[12 * 32 + x]).toString(16).padStart(2, '0') + ' ';
    console.log('B (read at frame 10): ' + row12);
  }
}
