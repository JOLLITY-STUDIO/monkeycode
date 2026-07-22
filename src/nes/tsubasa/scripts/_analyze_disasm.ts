// 直接用 tsnes 跑 opening demo，dump 关键地址的反汇编和寄存器状态
import NES from './src/tsnes/src/nes';
import { readFileSync } from 'fs';

const romData = new Uint8Array(readFileSync('rom.nes'));
const nes = new NES({ onFrame: () => {}, onStatusUpdate: () => {}, emulateSound: false });
nes.loadROM(romData);

const OP_TABLE: Record<number,[string,number]> = {
  0x00:['BRK',1],0x01:['ORA',2],0x05:['ORA',2],0x06:['ASL',2],0x08:['PHP',1],0x09:['ORA',2],
  0x0A:['ASL',1],0x0D:['ORA',3],0x0E:['ASL',3],0x10:['BPL',2],0x11:['ORA',2],
  0x15:['ORA',2],0x16:['ASL',2],0x18:['CLC',1],0x19:['ORA',3],0x1D:['ORA',3],0x1E:['ASL',3],
  0x20:['JSR',3],0x21:['AND',2],0x24:['BIT',2],0x25:['AND',2],0x26:['ROL',2],
  0x28:['PLP',1],0x29:['AND',2],0x2A:['ROL',1],0x2C:['BIT',3],0x2D:['AND',3],0x2E:['ROL',3],
  0x30:['BMI',2],0x31:['AND',2],0x35:['AND',2],0x36:['ROL',2],0x38:['SEC',1],0x39:['AND',3],
  0x3D:['AND',3],0x3E:['ROL',3],0x40:['RTI',1],0x41:['EOR',2],0x45:['EOR',2],0x46:['LSR',2],
  0x48:['PHA',1],0x49:['EOR',2],0x4A:['LSR',1],0x4C:['JMP',3],0x4D:['EOR',3],0x4E:['LSR',3],
  0x50:['BVC',2],0x51:['EOR',2],0x55:['EOR',2],0x56:['LSR',2],0x58:['CLI',1],0x59:['EOR',3],
  0x5D:['EOR',3],0x5E:['LSR',3],0x60:['RTS',1],0x61:['ADC',2],0x65:['ADC',2],0x66:['ROR',2],
  0x68:['PLA',1],0x69:['ADC',2],0x6A:['ROR',1],0x6C:['JMP',3],0x6D:['ADC',3],0x6E:['ROR',3],
  0x70:['BVS',2],0x71:['ADC',2],0x75:['ADC',2],0x76:['ROR',2],0x78:['SEI',1],0x79:['ADC',3],
  0x7D:['ADC',3],0x7E:['ROR',3],0x81:['STA',2],0x84:['STY',2],0x85:['STA',2],0x86:['STX',2],
  0x88:['DEY',1],0x8A:['TXA',1],0x8C:['STY',3],0x8D:['STA',3],0x8E:['STX',3],
  0x90:['BCC',2],0x91:['STA',2],0x94:['STY',2],0x95:['STA',2],0x96:['STX',2],
  0x98:['TYA',1],0x99:['STA',3],0x9A:['TXS',1],0x9D:['STA',3],
  0xA0:['LDY',2],0xA1:['LDA',2],0xA2:['LDX',2],0xA4:['LDY',2],0xA5:['LDA',2],0xA6:['LDX',2],
  0xA8:['TAY',1],0xA9:['LDA',2],0xAA:['TAX',1],0xAC:['LDY',3],0xAD:['LDA',3],0xAE:['LDX',3],
  0xB0:['BCS',2],0xB1:['LDA',2],0xB4:['LDY',2],0xB5:['LDA',2],0xB6:['LDX',2],
  0xB8:['CLV',1],0xB9:['LDA',3],0xBA:['TSX',1],0xBC:['LDY',3],0xBD:['LDA',3],0xBE:['LDX',3],
  0xC0:['CPY',2],0xC1:['CMP',2],0xC4:['CPY',2],0xC5:['CMP',2],0xC6:['DEC',2],
  0xC8:['INY',1],0xC9:['CMP',2],0xCA:['DEX',1],0xCC:['CPY',3],0xCD:['CMP',3],0xCE:['DEC',3],
  0xD0:['BNE',2],0xD1:['CMP',2],0xD5:['CMP',2],0xD6:['DEC',2],0xD8:['CLD',1],0xD9:['CMP',3],
  0xDD:['CMP',3],0xDE:['DEC',3],0xE0:['CPX',2],0xE1:['SBC',2],0xE4:['CPX',2],0xE5:['SBC',2],
  0xE6:['INC',2],0xE8:['INX',1],0xE9:['SBC',2],0xEA:['NOP',1],0xEC:['CPX',3],0xED:['SBC',3],0xEE:['INC',3],
  0xF0:['BEQ',2],0xF1:['SBC',2],0xF5:['SBC',2],0xF6:['INC',2],0xF8:['SED',1],0xF9:['SBC',3],
  0xFD:['SBC',3],0xFE:['INC',3],
};

function disasmOne(pc: number, mem: Uint8Array): string {
  const op = mem[pc];
  const d = OP_TABLE[op];
  if (!d) return `${pc.toString(16).toUpperCase().padStart(4,'$')}: db $${op.toString(16)}`;
  const [mn,sz] = d;
  let s = `${pc.toString(16).toUpperCase().padStart(4,'$')}: ${mn}`;
  for(let i=1;i<sz;i++) s += ' '+mem[(pc+i)&0xFFFF].toString(16).toUpperCase().padStart(2,'0');
  return s;
}

function disasmRange(start: number, len: number, mem: Uint8Array): string[] {
  let res: string[] = [];
  let pc = start;
  while (pc < start + len) {
    res.push(disasmOne(pc, mem));
    const op = mem[pc];
    const sz = OP_TABLE[op]?.[1] ?? 1;
    pc += sz;
  }
  return res;
}

// Trace first 20 frames, recording important state transitions
let frameLog: string[] = [];
let lastBank8000 = -1;

nes.cpu._traceCb = () => {}; // disable trace callback for speed

// Run with custom logging
for (let f = 0; f < 20; f++) {
  const pc = nes.cpu.REG_PC;
  const bank = (pc & 0xE000);
  if (f < 6 || (f < 20 && bank === 0x8000)) {
    frameLog.push(`Frame ${f}: PC=${pc.toString(16).toUpperCase().padStart(4,'$')} bank=${bank.toString(16).toUpperCase().padStart(4,'$')} A=${nes.cpu.REG_ACC.toString(16)} X=${nes.cpu.REG_X.toString(16)} Y=${nes.cpu.REG_Y.toString(16)} SP=${nes.cpu.REG_SP.toString(16)}`);
  }
  nes.frame();
}

console.log('=== Frame start PCs ===');
for (const l of frameLog) console.log(l);

// Now look at what's at key addresses after 20 frames
console.log('\n=== Disassembly at key addresses (frame 20 memory state) ===');
const mem = nes.cpu.mem;

// RESET vector
const resetLo = mem[0xFFFC], resetHi = mem[0xFFFD];
const reset = (resetHi<<8)|resetLo;
console.log(`\nRESET vector: $${reset.toString(16).toUpperCase().padStart(4,'0')}`);
console.log(disasmRange(reset, 20, mem).join('\n'));

// NMI vector
const nmiLo = mem[0xFFFA], nmiHi = mem[0xFFFB];
const nmi = (nmiHi<<8)|nmiLo;
console.log(`\nNMI vector: $${nmi.toString(16).toUpperCase().padStart(4,'0')}`);

// The C64D init routine
console.log(`\n--- Init at $C64D ---`);
console.log(disasmRange(0xC64D, 30, mem).join('\n'));

// The $7FFF area (RAM trampoline)
console.log(`\n--- $7FF0-$7FFF (RAM) ---`);
for(let a=0x7FF0;a<=0x7FFF;a++) console.log(`${a.toString(16).toUpperCase().padStart(4,'$')}: ${mem[a].toString(16).toUpperCase().padStart(2,'0')}`);
