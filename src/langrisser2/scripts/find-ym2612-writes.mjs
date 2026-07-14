import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;
const Z80_CODE_SIZE = 0x1FFF;

function hex(b) { return b.toString(16).toUpperCase().padStart(2, '0'); }
function hex4(b) { return b.toString(16).toUpperCase().padStart(4, '0'); }
function hex8(b) { return b.toString(16).toUpperCase().padStart(8, '0'); }

console.log('=== YM2612 OUT Instructions in Z80 Driver ===\n');

const ym2612Writes = [];
for (let i = 0; i < Z80_CODE_SIZE - 4; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x3E && rom[addr + 2] === 0xD3) {
    const data = rom[addr + 1];
    const port = rom[addr + 3];
    
    if (port === 0x40 || port === 0x41 || port === 0x42) {
      ym2612Writes.push({ addr, data, port });
    }
  }
  
  if (rom[addr] === 0x3E && rom[addr + 2] === 0x3E && rom[addr + 4] === 0xD3) {
    const reg = rom[addr + 1];
    const data = rom[addr + 3];
    const port = rom[addr + 5];
    
    if (port === 0x40 || port === 0x41 || port === 0x42) {
      ym2612Writes.push({ addr, reg, data, port, type: 'pair' });
    }
  }
}

console.log(`Found ${ym2612Writes.length} YM2612 write patterns\n`);
console.log('Address    Pattern          Port  Reg   Data  Description');
console.log('---------- ---------------- ----  ----  ----  -----------');

for (const write of ym2612Writes) {
  if (write.type === 'pair') {
    const desc = getYM2612Description(write.port, write.reg);
    console.log(`0x${hex8(write.addr)}  LD A,$${hex(write.reg)}  $${hex(write.port)}  $${hex(write.reg)}  $${hex(write.data)}  ${desc}`);
  } else {
    console.log(`0x${hex8(write.addr)}  OUT ($${hex(write.port)}),A  $${hex(write.port)}  -  $${hex(write.data)}`);
  }
}

console.log('\n=== YM2612 Port 0x40/0x41 Write Sequences ===\n');

for (let i = 0; i < ym2612Writes.length - 1; i++) {
  const curr = ym2612Writes[i];
  const next = ym2612Writes[i + 1];
  
  if (next.addr - curr.addr <= 6) {
    const seq = [];
    let j = i;
    while (j < ym2612Writes.length && ym2612Writes[j].addr - curr.addr <= 10) {
      seq.push(ym2612Writes[j]);
      j++;
    }
    
    if (seq.length >= 2) {
      const first = seq[0];
      const last = seq[seq.length - 1];
      let desc = '';
      
      if (seq.length === 2) {
        desc = getYM2612Description(seq[0].port, seq[0].reg);
      } else if (seq.length === 3) {
        desc = getYM2612Description(seq[0].port, seq[0].reg);
      }
      
      const bytes = seq.map(s => `$${hex(s.reg || s.data)}`).join(' ');
      console.log(`Sequence at 0x${hex8(first.addr)} (${seq.length} writes): ${bytes}  ; ${desc}`);
    }
  }
}

console.log('\n=== 68K Communication Ports ===\n');
for (let i = 0; i < Z80_CODE_SIZE - 2; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0xDB && (rom[addr + 1] === 0xFE || rom[addr + 1] === 0xFF)) {
    console.log(`0x${hex8(addr)}: IN A,($${hex(rom[addr + 1])})  ; 68K Communication`);
  }
  if (rom[addr] === 0xD3 && (rom[addr + 1] === 0xFE || rom[addr + 1] === 0xFF)) {
    let data = '?';
    if (addr > 0 && rom[addr - 1] === 0x3E) {
      data = `$${hex(rom[addr - 2])}`;
    }
    console.log(`0x${hex8(addr)}: OUT ($${hex(rom[addr + 1])}),A  ; data=${data}`);
  }
}

console.log('\n=== Key Memory Addresses Written ===\n');
const memWrites = [];
for (let i = 0; i < Z80_CODE_SIZE - 3; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x32) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const memAddr = (hi << 8) | lo;
    memWrites.push({ addr, memAddr });
  }
}

const uniqueWrites = [...new Set(memWrites.map(m => m.memAddr))].sort();
for (const addr of uniqueWrites.slice(0, 30)) {
  const desc = getMemoryDescription(addr);
  console.log(`$${hex4(addr)}  ; ${desc}`);
}

function getYM2612Description(port, reg) {
  if (port === 0x40) {
    const channel = (reg >> 8) & 0x03;
    const op = reg & 0x03;
    const type = (reg >> 3) & 0x1F;
    
    const types = [
      'F-Number(lo)', 'F-Number(hi)', 'Block', 'Mult', 'Detune',
      'Total Level', 'Rate Scale', 'Attack', 'Decay', 'Sustain',
      'Release', 'Sustain Level', 'Waveform', 'Feedback', 'Algorithm',
      'LFO', 'Pan', 'Key On/Off'
    ];
    
    if (type < types.length) {
      return `Ch${channel} OP${op} ${types[type]}`;
    }
    return `Ch${channel} OP${op} Reg$${hex(type)}`;
  }
  if (port === 0x41) {
    return 'YM2612 Data Port';
  }
  return '';
}

function getMemoryDescription(addr) {
  if (addr >= 0x1500 && addr < 0x1600) return 'Z80 RAM - Work Area';
  if (addr >= 0x1FF0 && addr <= 0x1FFF) return 'Z80 RAM - Communication';
  if (addr >= 0x1000 && addr < 0x1400) return 'Z80 RAM - Music Buffer';
  if (addr === 0x15A6) return 'Z80 RAM - Command Status';
  if (addr === 0x15AE) return 'Z80 RAM - Music Status';
  return 'Z80 RAM';
}