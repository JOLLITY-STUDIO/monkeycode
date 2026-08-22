/**
 * _live.cjs — 运行时验证: 每帧读 ram_001B, 检查 NMI 是否置位
 */
const fs = require('fs');
const path = require('path');
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));
const NES = tsnes.NES;
const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const nes = new NES({ emulateSound: false });
nes.loadROM(fs.readFileSync(romPath));

// 打印 mapper bank 映射键
const map = nes.mmap.prgBankMap;
console.log('prgBankMap keys:', Object.keys(map));
console.log("map['8000'] =", map['8000'], " map[0x8000] =", map[0x8000]);

// 读 CPU 地址字节
function rd(addr) { return nes.cpu.load(addr & 0xffff) & 0xff; }
function hex16(addr) {
  const a = [];
  for (let i = 0; i < 16; i++) a.push(rd(addr + i).toString(16).padStart(2, '0'));
  return a.join(' ');
}
console.log('CPU $9F00-$9F0F:', hex16(0x9F00));
console.log('CPU $9F00-$9F0F (bank0 期望: d0 eb a5 1b 10 fc 29 7f 85 1b 4c ed 9e 86 00 a9)');

// 跑 200 帧, 每帧记录 ram_001B
const prev = [];
let nmiCount = 0;
const nmiHits = [];
let last1B = -1;
for (let f = 0; f < 200; f++) {
  nes.frame();
  const v = rd(0x001B);
  if (v !== last1B) {
    if (last1B !== -1) {
      // 变化
      if (v & 0x80) nmiHits.push(`F${f} ram_001B=$${v.toString(16).padStart(2, '0')} bit7置位!`);
    }
    last1B = v;
  }
  if (f < 60) prev.push(`F${f}: $${v.toString(16).padStart(2, '0')}`);
}
console.log('前 60 帧 ram_001B:', prev.join(' '));
console.log('bit7 置位事件:', nmiHits.length ? nmiHits.slice(0, 20).join('\n') : '(无 — NMI 从未置位 ram_001B!)');
console.log('最终 ram_001B: $' + rd(0x001B).toString(16).padStart(2, '0'));
console.log('最终 ram_00ED: $' + rd(0x00ED).toString(16).padStart(2, '0'));
