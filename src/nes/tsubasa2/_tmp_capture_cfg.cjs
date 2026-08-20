// 帧级快照: 驱动 BOOT→TITLE→MEETING→STORY→MATCH, 记录每次配置加载的最终字段
const { NES } = require('d:/studio/github/monkeycode/src/nes/tsnes/_build/index.js');
const rom = require('fs').readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const mem = (a) => nes.cpu.mem[a & 0xffff];
const hex = (n) => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = (n) => '$' + n.toString(16).toUpperCase().padStart(4, '0');

// 每次配置加载特征: 75/76/48/5B 在同一帧变化 = 配置加载
const snaps = [];
let lastFp = '';
let lastLog = -1;
function poll(f) {
  const s = {
    ED: mem(0xED), EC: mem(0xEC),
    m5E: mem(0x5E), m5F: mem(0x5F), m72: mem(0x72), m62: mem(0x62),
    m60: mem(0x60), m61: mem(0x61), m75: mem(0x75), m76: mem(0x76),
    m48: mem(0x48), m5B: mem(0x5B), m5C: mem(0x5C), m5D: mem(0x5D),
  };
  const fp = [s.ED, s.EC, s.m5E, s.m5F, s.m72, s.m62, s.m60, s.m61, s.m75, s.m76, s.m48, s.m5B, s.m5C, s.m5D].join(',');
  if (fp !== lastFp) {
    snaps.push({ f, ...s });
    lastFp = fp;
  }
}

// 驱动: BOOT 340 → START(TITLE) → START(MEETING) → START(STORY) → 300
for (let i = 0; i < 340; i++) { nes.frame(); poll(i); }
const press = () => { nes.buttonDown(1, 'start'); nes.frame(); nes.frame(); nes.buttonUp(1, 'start'); nes.frame(); nes.frame(); };
press(); for (let i = 0; i < 80; i++) { nes.frame(); poll(i + 340); }
press(); for (let i = 0; i < 80; i++) { nes.frame(); poll(i + 420); }
press(); for (let i = 0; i < 400; i++) { nes.frame(); poll(i + 500); }

console.log('total frames=' + nes.fpsFrameCount + ' snapshots=' + snaps.length);
for (const s of snaps) {
  console.log(`f=${String(s.f).padStart(4)} ED=${hex(s.ED)} EC=${hex(s.EC)} 5E=${hex(s.m5E)} 5F=${hex(s.m5F)} 72=${hex(s.m72)} 62=${hex(s.m62)} 60=${hex(s.m60)} 61=${hex(s.m61)} 75=${hex(s.m75)} 76=${hex(s.m76)} 48=${hex(s.m48)} 5B=${hex(s.m5B)} 5C=${hex(s.m5C)} 5D=${hex(s.m5D)}`);
}
