// 验证: 模拟器 boot 配置加载 (ED=0x0A → idx10), 数据驱动监听 ram_005E 变化
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const rom = require('fs').readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const mem = (a) => nes.cpu.mem[a & 0xffff];
const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = (n) => '$' + n.toString(16).toUpperCase().padStart(4, '0');

let last5E = -1;
const loads = [];
nes.cpu._traceCb = function (pc, opcode, cycles) {
  const m5E = mem(0x5E);
  if (m5E !== last5E) {
    // ram_0063 指向 $A0xx/$A1xx/$A2xx 时是配置加载阶段
    const m63 = mem(0x63), m64 = mem(0x64);
    const ptr = m63 | (m64 << 8);
    if ((m64 === 0xA0 || m64 === 0xA1 || m64 === 0xA2 || m64 === 0xA3) || last5E === -1) {
      loads.push({
        f: nes.fpsFrameCount, pc: hex4(pc), ptr: hex4(ptr), m5E, last5E,
        m5F: hex(mem(0x5F)), m72: hex(mem(0x72)), m62: hex(mem(0x62)),
        m60: hex(mem(0x60)), m61: hex(mem(0x61)), m75: hex(mem(0x75)), m76: hex(mem(0x76)),
        m48: hex(mem(0x48)), m5B: hex(mem(0x5B)), m5C: hex(mem(0x5C)), m5D: hex(mem(0x5D)),
        ED: hex(mem(0xED)), EC: hex(mem(0xEC)), m63, m64
      });
    }
    last5E = m5E;
  }
};

for (let i = 0; i < 700; i++) nes.frame();
console.log('frames=' + nes.fpsFrameCount + ' loads=' + loads.length);
for (const l of loads) {
  console.log(`f=${l.f} pc=${l.pc} ptr=${l.ptr} 5E=${l.m5E} 5F=${l.m5F} 72=${l.m72} 62=${l.m62} 60=${l.m60} 61=${l.m61} 75=${l.m75} 76=${l.m76} 48=${l.m48} 5B=${l.m5B} 5C=${l.m5C} 5D=${l.m5D} ED=${l.ED} EC=${l.EC} [prev5E=${l.last5E}]`);
}
