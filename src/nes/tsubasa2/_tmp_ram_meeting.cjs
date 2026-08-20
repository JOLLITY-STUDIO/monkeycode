// 简化测试: tsnes 跑 3000 帧, dump RAM 找 Tsubasa
const path = require('path');
const fs = require('fs');
const tsnesRoot = 'd:/studio/github/monkeycode/src/nes/tsnes/_build';
const nesMod = require(path.join(tsnesRoot, 'nes.js'));
const NES = nesMod.default;

const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const romData = fs.readFileSync(romPath);
const nes = new NES();
nes.loadROM(romData);

let out = 'start\n';
try {
  for (let i = 0; i < 6000; i++) {
    nes.frame();
  }
  out += 'ran 6000 frames\n';
} catch(e) {
  out += 'err at frame: ' + e.message + '\n';
  out += e.stack + '\n';
}

// dump RAM $0300 区
out += '\n=== RAM $0300 球员槽 ===\n';
for (let i = 0; i < 22; i++) {
  const addr = 0x0300 + i * 0x0C;
  const bytes = [];
  for (let j = 0; j < 12; j++) bytes.push(nes.cpu.mem[addr + j] || 0);
  const pid = bytes[0];
  if (pid !== 0) {
    out += `slot${i}: PID=${pid.toString(16)} Guts=${((bytes[2]<<8)|bytes[1]).toString(16)} Lv=${bytes[3].toString(16)} [${bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ')}]\n`;
  }
}

// 搜索 748 (0x02EC)
out += '\n=== 搜索 748 (0x02EC LE) ===\n';
for (let addr = 0; addr < 0x0800; addr++) {
  if (nes.cpu.mem[addr] === 0xEC && nes.cpu.mem[addr+1] === 0x02) {
    out += `748 @ $${addr.toString(16)}: [${Array.from({length:8},(_,j)=>nes.cpu.mem[addr-2+j]).map(b=>b.toString(16).padStart(2,'0')).join(' ')}]\n`;
  }
}

// 搜索 PID=0x01
out += '\n=== 搜索 PID=0x01 ===\n';
for (let addr = 0x0300; addr < 0x0500; addr++) {
  if (nes.cpu.mem[addr] === 0x01) {
    out += `PID=01 @ $${addr.toString(16)}: [${Array.from({length:12},(_,j)=>nes.cpu.mem[addr+j]).map(b=>b.toString(16).padStart(2,'0')).join(' ')}]\n`;
  }
}

fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_ram_meeting.txt', out + '\nDONE\n');
