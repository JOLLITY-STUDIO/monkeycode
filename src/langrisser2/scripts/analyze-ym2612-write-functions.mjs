import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;

function hex(b) { return b.toString(16).toUpperCase().padStart(2, '0'); }
function hex4(b) { return b.toString(16).toUpperCase().padStart(4, '0'); }
function hex8(b) { return b.toString(16).toUpperCase().padStart(8, '0'); }

console.log('=== YM2612 Write Function Analysis ===\n');

const functions = [
  { name: 'YM2612 Write Function 1 (0x0544)', addr: 0x1EC544, size: 0x30 },
  { name: 'YM2612 Write Function 2 (0x056C)', addr: 0x1EC56C, size: 0x30 },
  { name: 'Command Handler (0x00BB)', addr: 0x1EC0BB, size: 0x50 },
  { name: 'Main Loop (0x0023)', addr: 0x1EC023, size: 0x50 },
];

for (const func of functions) {
  const offset = func.addr - Z80_CODE_START;
  const code = rom.slice(func.addr, func.addr + func.size);
  
  console.log(`--- ${func.name} (ROM 0x${hex8(func.addr)}) ---`);
  console.log('Address    Bytes          Disassembly');
  console.log('---------- -------------- --------------------------');
  
  let pos = 0;
  while (pos < code.length) {
    const addr = func.addr + pos;
    const opcode = code[pos];
    
    if (opcode === 0xED) {
      const ext = code[pos + 1];
      console.log(`0x${hex4(addr)}   ED ${hex(ext)}      ED extended`);
      pos += 2;
    } else if ((opcode & 0xC0) === 0xC0) {
      const rel = code[pos + 1];
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      const cond = ['NZ', 'Z', 'NC', 'C'];
      console.log(`0x${hex4(addr)}   ${hex(opcode)} ${hex(rel)}    JR ${cond[(opcode >> 3) & 0x03]} $${hex4(target)}`);
      pos += 2;
    } else if (opcode === 0xCD) {
      const callAddr = (code[pos + 2] << 8) | code[pos + 1];
      console.log(`0x${hex4(addr)}   CD ${hex(code[pos+1])} ${hex(code[pos+2])}   CALL $${hex4(callAddr)}`);
      pos += 3;
    } else if (opcode === 0xC3) {
      const jpAddr = (code[pos + 2] << 8) | code[pos + 1];
      console.log(`0x${hex4(addr)}   C3 ${hex(code[pos+1])} ${hex(code[pos+2])}   JP $${hex4(jpAddr)}`);
      pos += 3;
    } else if (opcode === 0x3A) {
      const lo = code[pos + 1];
      const hi = code[pos + 2];
      const memAddr = (hi << 8) | lo;
      console.log(`0x${hex4(addr)}   3A ${hex(lo)} ${hex(hi)}     LD A,($${hex4(memAddr)})`);
      pos += 3;
    } else if (opcode === 0x32) {
      const lo = code[pos + 1];
      const hi = code[pos + 2];
      const memAddr = (hi << 8) | lo;
      console.log(`0x${hex4(addr)}   32 ${hex(lo)} ${hex(hi)}     LD ($${hex4(memAddr)}),A`);
      pos += 3;
    } else if (opcode === 0x01 || opcode === 0x11 || opcode === 0x21 || opcode === 0x31) {
      const lo = code[pos + 1];
      const hi = code[pos + 2];
      const val = (hi << 8) | lo;
      const regs = ['BC', 'DE', 'HL', 'SP'];
      console.log(`0x${hex4(addr)}   ${hex(opcode)} ${hex(lo)} ${hex(hi)}     LD ${regs[(opcode >> 6) & 0x03]},$${hex4(val)}`);
      pos += 3;
    } else if (opcode === 0x3E) {
      const val = code[pos + 1];
      console.log(`0x${hex4(addr)}   3E ${hex(val)}        LD A,$${hex(val)}`);
      pos += 2;
    } else if (opcode === 0x2A) {
      console.log(`0x${hex4(addr)}   2A            LD A,(HL+)`);
      pos += 1;
    } else if (opcode === 0x22) {
      console.log(`0x${hex4(addr)}   22            LD (HL+),A`);
      pos += 1;
    } else if (opcode === 0xE6) {
      const val = code[pos + 1];
      console.log(`0x${hex4(addr)}   E6 ${hex(val)}        AND $${hex(val)}`);
      pos += 2;
    } else if (opcode === 0x28) {
      const rel = code[pos + 1];
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      console.log(`0x${hex4(addr)}   28 ${hex(rel)}        JR Z,$${hex4(target)}`);
      pos += 2;
    } else if (opcode === 0x10) {
      const rel = code[pos + 1];
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      console.log(`0x${hex4(addr)}   10 ${hex(rel)}        DJNZ $${hex4(target)}`);
      pos += 2;
    } else if (opcode === 0x20) {
      const rel = code[pos + 1];
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      console.log(`0x${hex4(addr)}   20 ${hex(rel)}        JR NZ,$${hex4(target)}`);
      pos += 2;
    } else if (opcode === 0xF9) {
      console.log(`0x${hex4(addr)}   F9            LD SP,HL`);
      pos += 1;
    } else if (opcode === 0x78) {
      console.log(`0x${hex4(addr)}   78            LD A,B`);
      pos += 1;
    } else if (opcode === 0x79) {
      console.log(`0x${hex4(addr)}   79            LD A,C`);
      pos += 1;
    } else if (opcode === 0x7B) {
      console.log(`0x${hex4(addr)}   7B            LD A,E`);
      pos += 1;
    } else if (opcode === 0x7E) {
      console.log(`0x${hex4(addr)}   7E            LD A,(HL)`);
      pos += 1;
    } else if (opcode === 0x4F) {
      console.log(`0x${hex4(addr)}   4F            LD C,A`);
      pos += 1;
    } else if (opcode === 0x77) {
      console.log(`0x${hex4(addr)}   77            LD (HL),A`);
      pos += 1;
    } else if (opcode === 0x1B) {
      console.log(`0x${hex4(addr)}   1B            DEC DE`);
      pos += 1;
    } else if (opcode === 0x23) {
      console.log(`0x${hex4(addr)}   23            INC HL`);
      pos += 1;
    } else if (opcode === 0x03) {
      console.log(`0x${hex4(addr)}   03            INC BC`);
      pos += 1;
    } else if (opcode === 0x13) {
      console.log(`0x${hex4(addr)}   13            INC DE`);
      pos += 1;
    } else if (opcode === 0x05) {
      console.log(`0x${hex4(addr)}   05            DEC B`);
      pos += 1;
    } else if (opcode === 0x04) {
      console.log(`0x${hex4(addr)}   04            INC B`);
      pos += 1;
    } else if (opcode === 0x06) {
      const val = code[pos + 1];
      console.log(`0x${hex4(addr)}   06 ${hex(val)}        LD B,$${hex(val)}`);
      pos += 2;
    } else if (opcode === 0x16) {
      const val = code[pos + 1];
      console.log(`0x${hex4(addr)}   16 ${hex(val)}        LD D,$${hex(val)}`);
      pos += 2;
    } else if (opcode === 0xAF) {
      console.log(`0x${hex4(addr)}   AF            XOR A`);
      pos += 1;
    } else if (opcode === 0xB7) {
      console.log(`0x${hex4(addr)}   B7            OR A`);
      pos += 1;
    } else if (opcode === 0xC9) {
      console.log(`0x${hex4(addr)}   C9            RET`);
      pos += 1;
    } else if (opcode === 0xC0) {
      console.log(`0x${hex4(addr)}   C0            RET NZ`);
      pos += 1;
    } else if (opcode === 0xD9) {
      console.log(`0x${hex4(addr)}   D9            EXX`);
      pos += 1;
    } else if (opcode === 0xDD) {
      const ext = code[pos + 1];
      console.log(`0x${hex4(addr)}   DD ${hex(ext)}      IX extended`);
      pos += 2;
    } else if (opcode === 0xFD) {
      const ext = code[pos + 1];
      console.log(`0x${hex4(addr)}   FD ${hex(ext)}      IY extended`);
      pos += 2;
    } else {
      console.log(`0x${hex4(addr)}   ${hex(opcode)}            DB $${hex(opcode)}`);
      pos += 1;
    }
  }
  console.log();
}

console.log('=== Key Memory-Mapped YM2612 Accesses ===');
console.log('Looking for writes to $4000-$4003 (YM2612 ports)...\n');

for (let i = 0; i < 0x2000 - 3; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x32) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const memAddr = (hi << 8) | lo;
    
    if (memAddr >= 0x4000 && memAddr <= 0x4003) {
      console.log(`0x${hex8(addr)}: LD ($${hex4(memAddr)}),A  ; YM2612 port ${memAddr - 0x4000}`);
    }
  }
  
  if (rom[addr] === 0x3A) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const memAddr = (hi << 8) | lo;
    
    if (memAddr >= 0x4000 && memAddr <= 0x4003) {
      console.log(`0x${hex8(addr)}: LD A,($${hex4(memAddr)})  ; Read YM2612 port ${memAddr - 0x4000}`);
    }
  }
}

console.log('\n=== 68K Communication Registers ($1FF8-$1FFF) ===');
for (let i = 0; i < 0x2000 - 3; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x32 || rom[addr] === 0x3A) {
    const lo = rom[addr + 1];
    const hi = rom[addr + 2];
    const memAddr = (hi << 8) | lo;
    
    if (memAddr >= 0x1FF8 && memAddr <= 0x1FFF) {
      const type = rom[addr] === 0x32 ? 'WRITE' : 'READ';
      console.log(`0x${hex8(addr)}: ${type} $${hex4(memAddr)}`);
    }
  }
}