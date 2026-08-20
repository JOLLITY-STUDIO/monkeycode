// dump $6000-$8000 + 追踪 ram_0063/0064/005E/0072 变化 (数据驱动, 不依赖 PC)
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const rom = require('fs').readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const mem = (a) => nes.cpu.mem[a & 0xffff];
const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = (n) => '$' + n.toString(16).toUpperCase().padStart(4, '0');

// 追踪 ram_0063/0064 指向 $A0xx (指针表) 的时刻
let last63 = -1, last64 = -1;
const cfgLoads = [];
let cur = null;
let frameNo = 0;

const origCb = nes.cpu._traceCb;
nes.cpu._traceCb = function (pc, opcode, cycles) {
  if (origCb) { try { origCb.call(this, pc, opcode, cycles); } catch {} }
  frameNo = nes.fpsFrameCount;
  const m63 = mem(0x63), m64 = mem(0x64);
  if (m63 !== last63 || m64 !== last64) {
    // ram_0063/0064 变化
    const ptr = m63 | (m64 << 8);
    if (m64 === 0xA0 && m63 >= 0x80 && m63 <= 0xC0) {
      // 指针表区 $A080-$A0C0
      if (!cur) {
        cur = { f: frameNo, ptr, samples: [], done: false };
        cfgLoads.push(cur);
      }
    } else if (cur && !cur.done && (m64 === 0xA0 || (m64 === 0x7E || m64 === 0x7D || m64 === 0x7F))) {
      cur.samples.push({ f: frameNo, pc: hex(pc), ptr: hex4(ptr), A: this.REG_ACC, X: this.REG_X, Y: this.REG_Y, m5E: mem(0x5E), m5F: mem(0x5F), m72: mem(0x72), m70: mem(0x70), m71: mem(0x71), m75: mem(0x75), m76: mem(0x76), m48: mem(0x48), m5C: mem(0x5C), m5D: mem(0x5D), m62: mem(0x62), m61: mem(0x61), m60: mem(0x60), m5B: mem(0x5B) });
    }
    last63 = m63; last64 = m64;
  }
};

// 驱动
for (let i = 0; i < 340; i++) nes.frame();  // BOOT 保护期
nes.buttonDown(1, 'start'); nes.frame(); nes.frame(); nes.buttonUp(1, 'start'); nes.frame(); nes.frame();
for (let i = 0; i < 60; i++) nes.frame();
nes.buttonDown(1, 'start'); nes.frame(); nes.frame(); nes.buttonUp(1, 'start'); nes.frame(); nes.frame();
for (let i = 0; i < 60; i++) nes.frame();
nes.buttonDown(1, 'start'); nes.frame(); nes.frame(); nes.buttonUp(1, 'start'); nes.frame(); nes.frame();
for (let i = 0; i < 200; i++) nes.frame();

console.log('cfgLoads=' + cfgLoads.length + ' frames=' + nes.fpsFrameCount);
for (const c of cfgLoads) {
  console.log('\n=== cfg ptr=' + hex4(c.ptr) + ' @f=' + c.f + ' (samples=' + c.samples.length + ') ===');
  const seen = new Set();
  for (const s of c.samples) {
    const k = s.pc + '|' + s.ptr;
    if (seen.has(k)) continue;
    seen.add(k);
    console.log('  f=' + s.f + ' pc=' + s.pc + ' ptr=' + s.ptr + ' A=' + hex(s.A) + ' X=' + hex(s.X) + ' Y=' + hex(s.Y) + ' m5E=' + hex(s.m5E) + ' m5F=' + hex(s.m5F) + ' m72=' + hex(s.m72) + ' m70=' + hex(s.m70) + ' m71=' + hex(s.m71) + ' m75=' + hex(s.m75) + ' m76=' + hex(s.m76) + ' m48=' + hex(s.m48) + ' m5C=' + hex(s.m5C) + ' m5D=' + hex(s.m5D) + ' m62=' + hex(s.m62) + ' m61=' + hex(s.m61) + ' m60=' + hex(s.m60) + ' m5B=' + hex(s.m5B));
  }
}

// dump $6000-$8000 内容摘要 (找非零/非FF区域)
console.log('\n=== $6000-$7FFF dump (非 00/FF 区) ===');
let lastRun = null;
const runs = [];
for (let a = 0x6000; a <= 0x7fff; a++) {
  const v = mem(a);
  if (v !== 0 && v !== 0xff) {
    if (lastRun && a - lastRun.end === 1) lastRun.end = a;
    else { lastRun = { start: a, end: a }; runs.push(lastRun); }
  }
}
for (const r of runs.slice(0, 30)) {
  const s = [];
  for (let a = r.start; a <= Math.min(r.end, r.start + 31); a++) s.push(hex(mem(a)));
  console.log(hex4(r.start) + '-' + hex4(r.end) + ' len=' + (r.end - r.start + 1) + ': ' + s.join(' '));
}
