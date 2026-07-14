import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..', '..');
const ROM_PATH = path.join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const Z80_CODE_START = 0x1EC000;
const Z80_CODE_SIZE = 0x2000;

function hex(b) { return b.toString(16).toUpperCase().padStart(2, '0'); }
function hex4(b) { return b.toString(16).toUpperCase().padStart(4, '0'); }
function hex8(b) { return b.toString(16).toUpperCase().padStart(8, '0'); }

console.log('=== Z80 Audio Driver Raw Hex Dump ===\n');
console.log('Address      00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F');
console.log('------------ ------------------------------------------------');

for (let i = 0; i < Z80_CODE_SIZE; i += 16) {
  const addr = Z80_CODE_START + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    if (i + j < Z80_CODE_SIZE) {
      line.push(hex(rom[addr + j]));
    } else {
      line.push('  ');
    }
  }
  console.log(`${hex8(addr)}  ${line.slice(0, 8).join(' ')}  ${line.slice(8).join(' ')}`);
  
  if (i > 0 && i % 256 === 0) {
    console.log('');
  }
}

console.log('\n\n=== Searching for OUT instructions ($D3) ===\n');
const outInstructions = [];
for (let i = 0; i < Z80_CODE_SIZE; i++) {
  if (rom[Z80_CODE_START + i] === 0xD3) {
    const port = rom[Z80_CODE_START + i + 1];
    const prev2 = rom[Z80_CODE_START + i - 2];
    const prev1 = rom[Z80_CODE_START + i - 1];
    
    let data = '?';
    if (prev1 === 0x3E) {
      data = `$${hex(prev2)}`;
    }
    
    outInstructions.push({
      addr: Z80_CODE_START + i,
      port: `$${hex(port)}`,
      data,
      prev1: `$${hex(prev1)}`,
      prev2: `$${hex(prev2)}`
    });
  }
}

console.log(`Found ${outInstructions.length} OUT instructions\n`);
console.log('Address    Port  Data  Prev');
console.log('---------- ----- ----- -----');
for (const out of outInstructions) {
  console.log(`0x${hex8(out.addr)}  ${out.port}  ${out.data}  ${out.prev1} ${out.prev2}`);
}

console.log('\n\n=== Searching for IN instructions ($DB) ===\n');
const inInstructions = [];
for (let i = 0; i < Z80_CODE_SIZE; i++) {
  if (rom[Z80_CODE_START + i] === 0xDB) {
    const port = rom[Z80_CODE_START + i + 1];
    inInstructions.push({
      addr: Z80_CODE_START + i,
      port: `$${hex(port)}`
    });
  }
}

console.log(`Found ${inInstructions.length} IN instructions\n`);
console.log('Address    Port');
console.log('---------- -----');
for (const instr of inInstructions) {
  console.log(`0x${hex8(instr.addr)}  ${instr.port}`);
}

console.log('\n\n=== Searching for LD A,($xxxx) patterns ===\n');
const ldAFromMem = [];
for (let i = 0; i < Z80_CODE_SIZE - 3; i++) {
  if (rom[Z80_CODE_START + i] === 0x3A) {
    const lo = rom[Z80_CODE_START + i + 1];
    const hi = rom[Z80_CODE_START + i + 2];
    const addr = (hi << 8) | lo;
    ldAFromMem.push({
      instrAddr: Z80_CODE_START + i,
      memAddr: addr
    });
  }
}

console.log(`Found ${ldAFromMem.length} LD A,($xxxx) instructions\n`);
console.log('Address    MemAddr');
console.log('---------- --------');
for (const ld of ldAFromMem.slice(0, 30)) {
  console.log(`0x${hex8(ld.instrAddr)}  $${hex4(ld.memAddr)}`);
}

console.log('\n\n=== Searching for CALL instructions ===\n');
const callInstructions = [];
for (let i = 0; i < Z80_CODE_SIZE - 3; i++) {
  if (rom[Z80_CODE_START + i] === 0xCD) {
    const lo = rom[Z80_CODE_START + i + 1];
    const hi = rom[Z80_CODE_START + i + 2];
    const addr = (hi << 8) | lo;
    callInstructions.push({
      instrAddr: Z80_CODE_START + i,
      targetAddr: addr
    });
  }
}

console.log(`Found ${callInstructions.length} CALL instructions\n`);
console.log('Address    Target');
console.log('---------- --------');
for (const call of callInstructions) {
  console.log(`0x${hex8(call.instrAddr)}  $${hex4(call.targetAddr)}`);
}