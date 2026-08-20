// tsnes trace: 驱动到 MATCH 阶段, 采集 bank0 $8B1C-$8B6F 比赛配置读取链
const path = require('path');
const fs = require('fs');
const TS = path.join('d:/studio/github/monkeycode/src/nes/tsnes/_build');
const { NES } = require(TS + '/index.js');

const ROM_PATH = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(ROM_PATH);

const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const K = { a: 'a', b: 'b', select: 'select', start: 'start', up: 'up', down: 'down', left: 'left', right: 'right' };
function tap(key, frames = 1) {
  nes.buttonDown(1, key);
  for (let i = 0; i < frames; i++) nes.frame();
  nes.buttonUp(1, key);
  for (let i = 0; i < 2; i++) nes.frame();
}
function run(f) { for (let i = 0; i < f; i++) nes.frame(); }

const mem = (a) => nes.cpu.mem[a & 0xffff];
const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hits = [];
let armed = false;
let cur = null;
const dispatchCalls = [];
const af7Calls = [];
let mainLoopCount = 0;
let frameNo = 0;

const origCb = nes.cpu._traceCb;
nes.cpu._traceCb = function (pc, opcode, cycles) {
  if (origCb) { try { origCb.call(this, pc, opcode, cycles); } catch {} }
  frameNo = nes.fpsFrameCount;
  if (pc === 0xc400) dispatchCalls.push({ f: frameNo, A: this.REG_ACC });
  if (pc === 0x9eed) { mainLoopCount++; if (mainLoopCount < 5 || mainLoopCount % 500 === 0) af7Calls.push('mainloop f=' + frameNo); }
  if (pc === 0x806c) af7Calls.push('$806C LDA #$17→JSR $8AF7 f=' + frameNo);
  if (pc === 0x8824) af7Calls.push('$8824 JSR $8AF7 f=' + frameNo + ' A=' + hex(this.REG_ACC));
  if (pc === 0x8af7) af7Calls.push('$8AF7 entry A=' + hex(this.REG_ACC) + ' f=' + frameNo);
  if (pc === 0x8b1c) {
    armed = true;
    cur = {
      frame: frameNo,
      ram_00ED: mem(0x00ED), ram_00EC: mem(0x00EC), ram_001B: mem(0x1B),
      segs: [],
    };
    hits.push(cur);
  }
  if (armed && cur && pc >= 0x8b1c && pc <= 0x8c00) {
    cur.segs.push({
      pc: hex(pc), op: opcode,
      A: this.REG_ACC, X: this.REG_X, Y: this.REG_Y,
      m63: mem(0x63), m64: mem(0x64), m70: mem(0x70), m71: mem(0x71),
      m5E: mem(0x5E), m5F: mem(0x5F), m72: mem(0x72), m62: mem(0x62),
      m61: mem(0x61), m60: mem(0x60), m5C: mem(0x5C), m5D: mem(0x5D),
      m48: mem(0x48), m75: mem(0x75), m76: mem(0x76), m5B: mem(0x5B),
      m63m: mem(0x63) | (mem(0x64) << 8),
    });
  }
  if (pc === 0x8c00 && armed) {
    const dump = [];
    for (let a = 0x7e00; a <= 0x7f20; a++) dump.push(mem(a));
    cur.dump = dump;
    armed = false;
  }
};

const L = [];
// ---- 驱动: BOOT 保护期 ~300 帧, 不按 START, 等自动进 TITLE ----
run(340);
L.push('after BOOT auto: f=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)) + ' mainloop=' + mainLoopCount);
tap(K.start, 3);                                   // TITLE → KICKOFF
run(60);
L.push('TITLE anim: f=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)));
tap(K.start, 3);                                   // KICKOFF → MEETING
run(60);
L.push('MEETING: f=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)));
tap(K.start, 3);
run(60);
L.push('after MEETING: f=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)));
// STORY: 多次 A 跳过
for (let i = 0; i < 6; i++) { tap(K.a, 2); run(8); }
L.push('after STORY A×6: f=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)));
let limit = 5000;
while (hits.length === 0 && limit-- > 0) nes.frame();
L.push('END hits=' + hits.length + ' frames=' + nes.fpsFrameCount + ' ED=' + hex(mem(0xED)) + ' mainloop=' + mainLoopCount);
console.log(L.join('\n'));
console.log('\n=== 关键调用 ($806C/$8824/$8AF7/mainloop) ===');
console.log(af7Calls.slice(0, 40).join('\n'));
console.log('\n=== $C400 分发 (前30) ===');
console.log(dispatchCalls.slice(0, 30).map(d => 'f=' + d.f + ' A=' + hex(d.A)).join('\n'));

for (const h of hits) {
  console.log('\n=== $8B1C hit @frame ' + h.frame + ' ED=' + hex(h.ram_00ED) + ' EC=' + hex(h.ram_00EC) + ' 1B=' + hex(h.ram_001B) + ' ===');
  const key = new Set(['0x8B28', '0x8B31', '0x8B39', '0x8B3D', '0x8B55', '0x8B5F', '0x8B71', '0x8B93', '0x8BC7', '0x8BDA', '0x8BF3']);
  for (const s of h.segs) {
    if (key.has(s.pc)) console.log(JSON.stringify(s));
  }
  if (h.dump) {
    console.log('dump $7E00-$7F20:');
    let line = '';
    for (let i = 0; i < h.dump.length; i++) {
      line += hex(h.dump[i]) + ' ';
      if ((i + 1) % 16 === 0) { console.log('  $' + (0x7e00 + i - 15).toString(16).toUpperCase().padStart(4, '0') + ': ' + line); line = ''; }
    }
    if (line) console.log('  ...: ' + line);
  }
}
