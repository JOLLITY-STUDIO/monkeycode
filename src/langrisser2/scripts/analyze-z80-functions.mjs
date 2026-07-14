import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;
const Z80_RAM_BASE = 0xA000;

function hex(b) { return b.toString(16).padStart(2, '0'); }
function hex4(b) { return b.toString(16).padStart(4, '0'); }

console.log('=== Z80 Audio Driver Key Functions Analysis ===\n');

const functions = [
  { name: 'Init/Reset', addr: 0x1EC000, size: 0x34 },
  { name: 'Function 0x01FB', addr: 0x1EC0FB, size: 0x50 },
  { name: 'Function 0x014D', addr: 0x1EC14D, size: 0x50 },
  { name: 'Function 0x0455', addr: 0x1EC455, size: 0x80 },
  { name: 'Main Loop', addr: 0x1EC023, size: 0x80 },
  { name: 'YM2612 Write Routine', addr: 0x1EC544, size: 0x60 },
];

for (const func of functions) {
  const offset = func.addr - Z80_CODE_START;
  if (offset < 0 || offset + func.size > 0x1FFF) continue;
  
  const code = rom.slice(func.addr, func.addr + func.size);
  
  console.log(`--- ${func.name} (ROM 0x${func.addr.toString(16)}) ---`);
  console.log('Address    Bytes                  Disassembly');
  console.log('---------- ---------------------- ------------------------');
  
  let pos = 0;
  while (pos < code.length) {
    const addr = func.addr + pos;
    const opcode = code[pos];
    let bytes = [opcode];
    let mnemonic = '';
    let args = '';
    
    if (opcode === 0xED) {
      const ext = code[pos + 1];
      bytes.push(ext);
      pos += 2;
      
      if (ext === 0x49 || ext === 0x51 || ext === 0x59 || ext === 0x61 ||
          ext === 0x69 || ext === 0x71 || ext === 0x79 || ext === 0x41 ||
          ext === 0x45 || ext === 0x4D || ext === 0x55 || ext === 0x5D ||
          ext === 0x65 || ext === 0x6D || ext === 0x75 || ext === 0x7D) {
        bytes.push(code[pos]);
        bytes.push(code[pos + 1]);
        const val = (code[pos + 1] << 8) | code[pos];
        pos += 2;
        const ops = ['BC', 'DE', 'HL', 'SP', 'IX', 'IY', 'AF', ''];
        const idx = (ext >> 3) & 0x07;
        if (ext & 0x08) mnemonic = 'LD';
        else mnemonic = 'LD';
        args = `${ops[idx]}, ($${hex4(val)})`;
      } else {
        mnemonic = `ED $${hex(ext)}`;
      }
    } else if ((opcode & 0xC0) === 0xC0) {
      const rel = code[pos + 1];
      bytes.push(rel);
      pos += 2;
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      const cond = ['NZ', 'Z', 'NC', 'C'];
      mnemonic = `JR ${cond[(opcode >> 3) & 0x03]}`;
      args = `$${hex4(target)}`;
    } else if (opcode === 0xCD) {
      const callAddr = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = 'CALL';
      args = `$${hex4(callAddr)}`;
    } else if (opcode === 0xC3) {
      const jpAddr = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = 'JP';
      args = `$${hex4(jpAddr)}`;
    } else if (opcode === 0xD3) {
      const port = code[pos + 1];
      bytes.push(port);
      pos += 2;
      mnemonic = 'OUT';
      args = `($${hex(port)}), A`;
    } else if (opcode === 0xDB) {
      const port = code[pos + 1];
      bytes.push(port);
      pos += 2;
      mnemonic = 'IN';
      args = `A, ($${hex(port)})`;
    } else if (opcode === 0x3E) {
      const val = code[pos + 1];
      bytes.push(val);
      pos += 2;
      mnemonic = 'LD A';
      args = `$${hex(val)}`;
    } else if (opcode === 0x06 || opcode === 0x0E || opcode === 0x16 || opcode === 0x1E ||
               opcode === 0x26 || opcode === 0x2E || opcode === 0x36) {
      const regs = ['B', 'C', 'D', 'E', 'H', 'L', '(HL)', 'A'];
      const val = code[pos + 1];
      bytes.push(val);
      pos += 2;
      mnemonic = `LD ${regs[(opcode >> 3) & 0x07]}`;
      args = `$${hex(val)}`;
    } else if (opcode === 0x01 || opcode === 0x11 || opcode === 0x21 || opcode === 0x31) {
      const regs = ['BC', 'DE', 'HL', 'SP'];
      const val = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = `LD ${regs[(opcode >> 6) & 0x03]}`;
      args = `$${hex4(val)}`;
    } else if (opcode === 0x7F || opcode === 0x78 || opcode === 0x79 || opcode === 0x7A ||
               opcode === 0x7B || opcode === 0x7C || opcode === 0x7D || opcode === 0x7E) {
      const regs = ['A', 'B', 'C', 'D', 'E', 'H', 'L', '(HL)'];
      pos += 1;
      mnemonic = 'LD A';
      args = `, ${regs[opcode & 0x07]}`;
    } else if (opcode === 0xF3) { pos++; mnemonic = 'DI'; }
    else if (opcode === 0xFB) { pos++; mnemonic = 'EI'; }
    else if (opcode === 0xAF) { pos++; mnemonic = 'XOR A'; }
    else if (opcode === 0xB7) { pos++; mnemonic = 'OR A'; }
    else if (opcode === 0xC9) { pos++; mnemonic = 'RET'; }
    else if (opcode === 0xC0 || opcode === 0xC8 || opcode === 0xD0 || opcode === 0xD8) {
      const cond = ['NZ', 'Z', 'NC', 'C'];
      pos++;
      mnemonic = `RET ${cond[(opcode >> 3) & 0x03]}`;
    } else if (opcode === 0x03 || opcode === 0x13 || opcode === 0x23 || opcode === 0x33) {
      const regs = ['BC', 'DE', 'HL', 'SP'];
      pos++;
      mnemonic = `INC ${regs[(opcode >> 6) & 0x03]}`;
    } else if (opcode === 0x0B || opcode === 0x1B || opcode === 0x2B || opcode === 0x3B) {
      const regs = ['BC', 'DE', 'HL', 'SP'];
      pos++;
      mnemonic = `DEC ${regs[(opcode >> 6) & 0x03]}`;
    } else if (opcode === 0x32) {
      const addr = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = 'LD';
      args = `($${hex4(addr)}), A`;
    } else if (opcode === 0x3A) {
      const addr = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = 'LD A';
      args = `($${hex4(addr)})`;
    } else if (opcode === 0x2A) {
      pos++;
      mnemonic = 'LD A';
      args = '(HL+)';
    } else if (opcode === 0x3A) {
      const addr = (code[pos + 2] << 8) | code[pos + 1];
      bytes.push(code[pos + 1], code[pos + 2]);
      pos += 3;
      mnemonic = 'LD A';
      args = `($${hex4(addr)})`;
    } else if (opcode === 0x22) {
      pos++;
      mnemonic = 'LD (HL+)';
      args = ', A';
    } else if (opcode === 0x2A) {
      pos++;
      mnemonic = 'LD A';
      args = '(HL+)';
    } else if (opcode === 0xE6) {
      const val = code[pos + 1];
      bytes.push(val);
      pos += 2;
      mnemonic = 'AND';
      args = `$${hex(val)}`;
    } else if (opcode === 0x28) {
      const rel = code[pos + 1];
      bytes.push(rel);
      pos += 2;
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      mnemonic = 'JR Z';
      args = `$${hex4(target)}`;
    } else if (opcode === 0x10) {
      const rel = code[pos + 1];
      bytes.push(rel);
      pos += 2;
      const target = addr + 2 + (rel > 127 ? rel - 256 : rel);
      mnemonic = 'DJNZ';
      args = `$${hex4(target)}`;
    } else if (opcode === 0x04 || opcode === 0x0C || opcode === 0x14 || opcode === 0x1C ||
               opcode === 0x24 || opcode === 0x2C || opcode === 0x34 || opcode === 0x3C) {
      const regs = ['B', 'C', 'D', 'E', 'H', 'L', '(HL)', 'A'];
      pos++;
      mnemonic = `INC ${regs[opcode & 0x07]}`;
    } else if (opcode === 0x05 || opcode === 0x0D || opcode === 0x15 || opcode === 0x1D ||
               opcode === 0x25 || opcode === 0x2D || opcode === 0x35 || opcode === 0x3D) {
      const regs = ['B', 'C', 'D', 'E', 'H', 'L', '(HL)', 'A'];
      pos++;
      mnemonic = `DEC ${regs[opcode & 0x07]}`;
    } else {
      pos++;
      mnemonic = `DB $${hex(opcode)}`;
    }
    
    const byteStr = bytes.map(b => hex(b)).join(' ').padEnd(20);
    console.log(`0x${hex4(addr)}   ${byteStr} ${mnemonic} ${args}`);
  }
  
  console.log();
}

console.log('=== YM2612 Port Write Sequence Search ===');
console.log('Looking for OUT ($40),A / OUT ($41),A patterns...\n');

for (let i = 0; i < 0x1FFF - 5; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0x3E && rom[addr + 2] === 0xD3) {
    const data = rom[addr + 1];
    const port = rom[addr + 3];
    
    if (port === 0x40 || port === 0x41) {
      const nextData = rom[addr + 4];
      console.log(`0x${hex4(addr)}: LD A,$${hex(data)} ; OUT ($${hex(port)}),A  ; data=$${hex(data)}`);
    }
  }
}

console.log('\n=== 68K Communication Search ===');
for (let i = 0; i < 0x1FFF - 2; i++) {
  const addr = Z80_CODE_START + i;
  
  if (rom[addr] === 0xDB && (rom[addr + 1] === 0xFE || rom[addr + 1] === 0xFF)) {
    console.log(`0x${hex4(addr)}: IN A,($${hex(rom[addr + 1])}) ; 68K communication`);
  }
  if (rom[addr] === 0xD3 && (rom[addr + 1] === 0xFE || rom[addr + 1] === 0xFF)) {
    const prev = rom[addr - 1];
    const data = prev === 0x3E ? rom[addr - 2] : '?';
    console.log(`0x${hex4(addr)}: OUT ($${hex(rom[addr + 1])}),A ; data=$${hex(data)}`);
  }
}