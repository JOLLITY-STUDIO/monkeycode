// @ts-nocheck — auto-generated de-CPU functions, mutates imported state
﻿// func_9B7E.ts
// Address range: $9B7E-$9BA5
// Instructions: 16
// Total hits: 3,093
// First seen at frame: 5

import { A, X, Y, PC, SP, C, Z, I, D, V, N, setZN, mem, zp, setZp, indX, indY, push, pull, pushWord, pullWord, FLAGS_BYTE, SET_FLAGS } from './state';
import { instrTable } from './instr_table';

export function func9B7E(): void {
  // hits: 3,093
  // pc range: $9B7E-$9BA5
  // --- pc 9B7E ---
  // $9B7E: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9B80 ---
  // $9B80: BRK
  // BRK (halt for now)
  return;

  // --- pc 9B82 ---
  // $9B82: SED
  D = true;

  // --- pc 9B86 ---
  // $9B86: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B89 ---
  // $9B89: LDA #$F8
  A = 0xF8;
  setZN(A);

  // --- pc 9B8A ---
  // $9B8A: SED
  D = true;

  // --- pc 9B8E ---
  // $9B8E: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B91 ---
  // $9B91: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 9B92 ---
  // $9B92: BRK
  // BRK (halt for now)
  return;

  // --- pc 9B95 ---
  // $9B95: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc 9B98 ---
  // $9B98: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc 9B9B ---
  // $9B9B: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc 9B9E ---
  // $9B9E: ORA $60
  A = (A | zp(0x60)) & 0xFF;
  setZN(A);

  // --- pc 9B9F ---
  // $9B9F: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9BA2 ---
  // $9BA2: STA $A020,Y
  mem[(0xA020 + Y) & 0xFFFF] = A;

  // --- pc 9BA5 ---
  // $9BA5: TYA
  A = Y; setZN(A);

  // fall-through end

}



// func_9DED.ts
// Address range: $9DED-$9E0B
// Instructions: 16
// Total hits: 104
// First seen at frame: 6


export function func9DED(): void {
  // hits: 104
  // pc range: $9DED-$9E0B
  // --- pc 9DED ---
  // $9DED: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9DEF ---
  // $9DEF: SBC $00A9
  { const r = mem[0xA9] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9DF1 ---
  // $9DF1: BRK
  // BRK (halt for now)
  return;

  // --- pc 9DF3 ---
  // $9DF3: CPX $08A0
  C = X >= mem[0x8A0];
  setZN((X - mem[0x8A0]) & 0xFF);

  // --- pc 9DF5 ---
  // $9DF5: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 9DF7 ---
  // $9DF7: CPX $ED26
  C = X >= mem[0xED26];
  setZN((X - mem[0xED26]) & 0xFF);

  // --- pc 9DF9 ---
  // $9DF9: SBC $0C90
  { const r = mem[0xC90] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9DFC ---
  // $9DFC: TXA
  A = X; setZN(A);

  // --- pc 9DFD ---
  // $9DFD: CLC
  C = false;

  // --- pc 9DFF ---
  // $9DFF: CPX $EC85
  C = X >= mem[0xEC85];
  setZN((X - mem[0xEC85]) & 0xFF);

  // --- pc 9E01 ---
  // $9E01: CPX $EDA5
  C = X >= mem[0xEDA5];
  setZN((X - mem[0xEDA5]) & 0xFF);

  // --- pc 9E03 ---
  // $9E03: SBC $0069
  { const r = mem[0x69] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9E05 ---
  // $9E05: BRK
  // BRK (halt for now)
  return;

  // --- pc 9E07 ---
  // $9E07: SBC $D088
  { const r = mem[0xD088] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9E08 ---
  // $9E08: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 9E0B ---
  // $9E0B: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_9EEC.ts
// Address range: $9EEC-$9F7C
// Instructions: 75
// Total hits: 1,750,257
// First seen at frame: 5


export function func9EEC(): void {
  // hits: 1,750,257
  // pc range: $9EEC-$9F7C
  // --- pc 9EEC ---
  // $9EEC: BRK
  // BRK (halt for now)
  return;

  // --- pc 9EEE ---
  // $9EEE: ORA ($B5,X)
  A = (A | mem[indX(0xB5)]) & 0xFF;
  setZN(A);

  // --- pc 9EF0 ---
  // $9EF0: BRK
  // BRK (halt for now)
  return;

  // --- pc 9EF2 ---
  // $9EF2: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 9EF5 ---
  // $9EF5: BEQ $9F52
  if (Z) { PC = 0x9F52; return; }

  // --- pc 9EF7 ---
  // $9EF7: DEC $00,X
  mem[(0x0 + X) & 0xFF] = (mem[(0x0 + X) & 0xFF] - 1) & 0xFF; setZN(mem[(0x0 + X) & 0xFF]);

  // --- pc 9EF8 ---
  // $9EF8: BRK
  // BRK (halt for now)
  return;

  // --- pc 9EFB ---
  // $9EFB: TXA
  A = X; setZN(A);

  // --- pc 9EFC ---
  // $9EFC: CLC
  C = false;

  // --- pc 9EFF ---
  // $9EFF: TAX
  X = A; setZN(X);

  // --- pc 9F01 ---
  // $9F01: ORA $EBD0,Y
  A = (A | mem[(0xEBD0 + Y) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 9F04 ---
  // $9F04: LDA $1B
  A = zp(0x1B);
  setZN(A);

  // --- pc 9F06 ---
  // $9F06: BPL $9F04
  if (!N) { PC = 0x9F04; return; }

  // --- pc 9F08 ---
  // $9F08: AND #$7F
  A = (A & 0x7F) & 0xFF;
  setZN(A);

  // --- pc 9F0A ---
  // $9F0A: STA $1B
  mem[0x1B] = A;

  // --- pc 9F0C ---
  // $9F0C: JMP $9EED
  PC = 0x9EED;
  return;

  // --- pc 9F0F ---
  // $9F0F: STX $00
  mem[0x0] = X;

  // --- pc 9F10 ---
  // $9F10: BRK
  // BRK (halt for now)
  return;

  // --- pc 9F13 ---
  // $9F13: ORA $22
  A = (A | zp(0x22)) & 0xFF;
  setZN(A);

  // --- pc 9F15 ---
  // $9F15: STA $23
  mem[0x23] = A;

  // --- pc 9F17 ---
  // $9F17: STA $8000
  mem[0x8000] = A;

  // --- pc 9F1A ---
  // $9F1A: LDA $03,X
  A = zp((0x3 + X) & 0xFF);
  setZN(A);

  // --- pc 9F1C ---
  // $9F1C: STA $25
  mem[0x25] = A;

  // --- pc 9F1D ---
  // $9F1D: AND $8D
  A = (A & zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc 9F21 ---
  // $9F21: LDA #$06
  A = 0x6;
  setZN(A);

  // --- pc 9F22 ---
  // $9F22: ASL $05
  C = (mem[0x5] & 0x80) !== 0; mem[0x5] = (mem[0x5] << 1) & 0xFF; setZN(mem[0x5]);

  // --- pc 9F25 ---
  // $9F25: STA $23
  mem[0x23] = A;

  // --- pc 9F27 ---
  // $9F27: STA $8000
  mem[0x8000] = A;

  // --- pc 9F2A ---
  // $9F2A: LDA $02,X
  A = zp((0x2 + X) & 0xFF);
  setZN(A);

  // --- pc 9F2C ---
  // $9F2C: STA $24
  mem[0x24] = A;

  // --- pc 9F2D ---
  // $9F2D: BIT $8D
  { const t = zp(0x8D); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc 9F31 ---
  // $9F31: LDA $01,X
  A = zp((0x1 + X) & 0xFF);
  setZN(A);

  // --- pc 9F32 ---
  // $9F32: ORA ($AA,X)
  A = (A | mem[indX(0xAA)]) & 0xFF;
  setZN(A);

  // --- pc 9F33 ---
  // $9F33: TAX
  X = A; setZN(X);

  // --- pc 9F34 ---
  // $9F34: TXS
  SP = X;

  // --- pc 9F35 ---
  // $9F35: PLA
  A = pull(); setZN(A);

  // --- pc 9F37 ---
  // $9F37: INC $68
  mem[0x68] = (mem[0x68] + 1) & 0xFF; setZN(mem[0x68]);

  // --- pc 9F38 ---
  // $9F38: PLA
  A = pull(); setZN(A);

  // --- pc 9F3B ---
  // $9F3B: PLA
  A = pull(); setZN(A);

  // --- pc 9F3D ---
  // $9F3D: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9F3E ---
  // $9F3E: PLA
  A = pull(); setZN(A);

  // --- pc 9F40 ---
  // $9F40: SBC #$68
  { const r = 0x68 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9F41 ---
  // $9F41: PLA
  A = pull(); setZN(A);

  // --- pc 9F43 ---
  // $9F43: NOP
  // NOP

  // --- pc 9F44 ---
  // $9F44: PLA
  A = pull(); setZN(A);

  // --- pc 9F47 ---
  // $9F47: PLA
  A = pull(); setZN(A);

  // --- pc 9F49 ---
  // $9F49: CPX $8568
  C = X >= mem[0x8568];
  setZN((X - mem[0x8568]) & 0xFF);

  // --- pc 9F4A ---
  // $9F4A: PLA
  A = pull(); setZN(A);

  // --- pc 9F4C ---
  // $9F4C: SBC $A868
  { const r = mem[0xA868] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9F4D ---
  // $9F4D: PLA
  A = pull(); setZN(A);

  // --- pc 9F4E ---
  // $9F4E: TAY
  Y = A; setZN(Y);

  // --- pc 9F4F ---
  // $9F4F: PLA
  A = pull(); setZN(A);

  // --- pc 9F50 ---
  // $9F50: TAX
  X = A; setZN(X);

  // --- pc 9F51 ---
  // $9F51: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9F53 ---
  // $9F53: BRK
  // BRK (halt for now)
  return;

  // --- pc 9F55 ---
  // $9F55: ASL $05
  C = (mem[0x5] & 0x80) !== 0; mem[0x5] = (mem[0x5] << 1) & 0xFF; setZN(mem[0x5]);

  // --- pc 9F58 ---
  // $9F58: STA $23
  mem[0x23] = A;

  // --- pc 9F5A ---
  // $9F5A: STA $8000
  mem[0x8000] = A;

  // --- pc 9F5D ---
  // $9F5D: LDA $02,X
  A = zp((0x2 + X) & 0xFF);
  setZN(A);

  // --- pc 9F5F ---
  // $9F5F: STA $24
  mem[0x24] = A;

  // --- pc 9F60 ---
  // $9F60: BIT $8D
  { const t = zp(0x8D); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc 9F64 ---
  // $9F64: LDA $01,X
  A = zp((0x1 + X) & 0xFF);
  setZN(A);

  // --- pc 9F65 ---
  // $9F65: ORA ($AA,X)
  A = (A | mem[indX(0xAA)]) & 0xFF;
  setZN(A);

  // --- pc 9F66 ---
  // $9F66: TAX
  X = A; setZN(X);

  // --- pc 9F67 ---
  // $9F67: TXS
  SP = X;

  // --- pc 9F68 ---
  // $9F68: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9F6B ---
  // $9F6B: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 9F6C ---
  // $9F6C: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 9F6E ---
  // $9F6E: BRK
  // BRK (halt for now)
  return;

  // --- pc 9F71 ---
  // $9F71: ORA ($B5,X)
  A = (A | mem[indX(0xB5)]) & 0xFF;
  setZN(A);

  // --- pc 9F73 ---
  // $9F73: ORA ($99,X)
  A = (A | mem[indX(0x99)]) & 0xFF;
  setZN(A);

  // --- pc 9F76 ---
  // $9F76: ORA ($94,X)
  A = (A | mem[indX(0x94)]) & 0xFF;
  setZN(A);

  // --- pc 9F78 ---
  // $9F78: ORA ($A9,X)
  A = (A | mem[indX(0xA9)]) & 0xFF;
  setZN(A);

  // --- pc 9F7B ---
  // $9F7B: STA $00,X
  mem[(0x0 + X) & 0xFF] = A;

  // --- pc 9F7C ---
  // $9F7C: BRK
  // BRK (halt for now)
  return;

  // fall-through end

}



// func_9FA7.ts
// Address range: $9FA7-$9FE1
// Instructions: 33
// Total hits: 25,165
// First seen at frame: 6


export function func9FA7(): void {
  // hits: 25,165
  // pc range: $9FA7-$9FE1
  // --- pc 9FA7 ---
  // $9FA7: BRK
  // BRK (halt for now)
  return;

  // --- pc 9FA9 ---
  // $9FA9: ORA $488A,Y
  A = (A | mem[(0x488A + Y) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 9FAA ---
  // $9FAA: TXA
  A = X; setZN(A);

  // --- pc 9FAB ---
  // $9FAB: PHA
  push(A);

  // --- pc 9FAC ---
  // $9FAC: TYA
  A = Y; setZN(A);

  // --- pc 9FAD ---
  // $9FAD: PHA
  push(A);

  // --- pc 9FAF ---
  // $9FAF: SBC $A548
  { const r = mem[0xA548] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9FB0 ---
  // $9FB0: PHA
  push(A);

  // --- pc 9FB2 ---
  // $9FB2: CPX $A548
  C = X >= mem[0xA548];
  setZN((X - mem[0xA548]) & 0xFF);

  // --- pc 9FB3 ---
  // $9FB3: PHA
  push(A);

  // --- pc 9FB6 ---
  // $9FB6: PHA
  push(A);

  // --- pc 9FB8 ---
  // $9FB8: NOP
  // NOP

  // --- pc 9FB9 ---
  // $9FB9: PHA
  push(A);

  // --- pc 9FBB ---
  // $9FBB: SBC #$48
  { const r = 0x48 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9FBC ---
  // $9FBC: PHA
  push(A);

  // --- pc 9FBE ---
  // $9FBE: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9FBF ---
  // $9FBF: PHA
  push(A);

  // --- pc 9FC2 ---
  // $9FC2: PHA
  push(A);

  // --- pc 9FC4 ---
  // $9FC4: INC $48
  mem[0x48] = (mem[0x48] + 1) & 0xFF; setZN(mem[0x48]);

  // --- pc 9FC5 ---
  // $9FC5: PHA
  push(A);

  // --- pc 9FC6 ---
  // $9FC6: TSX
  X = SP; setZN(X);

  // --- pc 9FC7 ---
  // $9FC7: TXA
  A = X; setZN(A);

  // --- pc 9FC9 ---
  // $9FC9: BRK
  // BRK (halt for now)
  return;

  // --- pc 9FCB ---
  // $9FCB: ORA ($AD,X)
  A = (A | mem[indX(0xAD)]) & 0xFF;
  setZN(A);

  // --- pc 9FCE ---
  // $9FCE: BRK
  // BRK (halt for now)
  return;

  // --- pc 9FD1 ---
  // $9FD1: LDA $0025
  A = mem[0x25];
  setZN(A);

  // --- pc 9FD3 ---
  // $9FD3: BRK
  // BRK (halt for now)
  return;

  // --- pc 9FD6 ---
  // $9FD6: LDA $19
  A = zp(0x19);
  setZN(A);

  // --- pc 9FD7 ---
  // $9FD7: ORA $04F0,Y
  A = (A | mem[(0x4F0 + Y) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 9FDA ---
  // $9FDA: CMP #$FF
  C = A >= 0xFF;
  setZN((A - 0xFF) & 0xFF);

  // --- pc 9FDC ---
  // $9FDC: BNE $9FE0
  if (!Z) { PC = 0x9FE0; return; }

  // --- pc 9FDF ---
  // $9FDF: INC $0095,X
  mem[(0x95 + X) & 0xFFFF] = (mem[(0x95 + X) & 0xFFFF] + 1) & 0xFF; setZN(mem[(0x95 + X) & 0xFFFF]);

  // --- pc 9FE1 ---
  // $9FE1: BRK
  // BRK (halt for now)
  return;

  // fall-through end

}



// func_A000.ts
// Address range: $A000-$A137
// Instructions: 125
// Total hits: 58,238
// First seen at frame: 7


export function funcA000(): void {
  // hits: 58,238
  // pc range: $A000-$A137
  // --- pc A000 ---
  // $A000: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc A001 ---
  // $A001: BRK
  // BRK (halt for now)
  return;

  // --- pc A004 ---
  // $A004: JSR $02A9
  pushWord(PC + 2);
  PC = 0x02A9;
  return;

  // --- pc A007 ---
  // $A007: STA $4014
  mem[0x4014] = A;

  // --- pc A009 ---
  // $A009: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A00C ---
  // $A00C: ASL $F0
  C = (mem[0xF0] & 0x80) !== 0; mem[0xF0] = (mem[0xF0] << 1) & 0xFF; setZN(mem[0xF0]);

  // --- pc A00E ---
  // $A00E: LSR $292C
  C = (mem[0x292C] & 1) !== 0; mem[0x292C] = mem[0x292C] >>> 1; setZN(mem[0x292C]);

  // --- pc A011 ---
  // $A011: ASL $70
  C = (mem[0x70] & 0x80) !== 0; mem[0x70] = (mem[0x70] << 1) & 0xFF; setZN(mem[0x70]);

  // --- pc A013 ---
  // $A013: EOR #$A9
  A = (A ^ 0xA9) & 0xFF;
  setZN(A);

  // --- pc A015 ---
  // $A015: BRK
  // BRK (halt for now)
  return;

  // --- pc A018 ---
  // $A018: JSR $00A2
  pushWord(PC + 2);
  PC = 0x00A2;
  return;

  // --- pc A01A ---
  // $A01A: BRK
  // BRK (halt for now)
  return;

  // --- pc A01D ---
  // $A01D: LDA $05E8,X
  A = mem[(0x5E8 + X) & 0xFFFF];
  setZN(A);

  // --- pc A01F ---
  // $A01F: ORA $10
  A = (A | zp(0x10)) & 0xFF;
  setZN(A);

  // --- pc A025 ---
  // $A025: STY $8C
  mem[0x8C] = Y;

  // --- pc A028 ---
  // $A028: JSR $BDA8
  pushWord(PC + 2);
  PC = 0xBDA8;
  return;

  // --- pc A029 ---
  // $A029: TAY
  Y = A; setZN(Y);

  // --- pc A02C ---
  // $A02C: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc A02F ---
  // $A02F: JSR $E9BD
  pushWord(PC + 2);
  PC = 0xE9BD;
  return;

  // --- pc A032 ---
  // $A032: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc A035 ---
  // $A035: JSR $EBBD
  pushWord(PC + 2);
  PC = 0xEBBD;
  return;

  // --- pc A038 ---
  // $A038: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc A03B ---
  // $A03B: JSR $88E8
  pushWord(PC + 2);
  PC = 0x88E8;
  return;

  // --- pc A03C ---
  // $A03C: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc A03D ---
  // $A03D: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc A03F ---
  // $A03F: INC $E8,X
  mem[(0xE8 + X) & 0xFF] = (mem[(0xE8 + X) & 0xFF] + 1) & 0xFF; setZN(mem[(0xE8 + X) & 0xFF]);

  // --- pc A040 ---
  // $A040: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc A041 ---
  // $A041: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc A042 ---
  // $A042: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc A045 ---
  // $A045: ORA $D0
  A = (A | zp(0xD0)) & 0xFF;
  setZN(A);

  // --- pc A048 ---
  // $A048: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc A049 ---
  // $A049: BRK
  // BRK (halt for now)
  return;

  // --- pc A04C ---
  // $A04C: ASL $A9
  C = (mem[0xA9] & 0x80) !== 0; mem[0xA9] = (mem[0xA9] << 1) & 0xFF; setZN(mem[0xA9]);

  // --- pc A04F ---
  // $A04F: STA $2006
  mem[0x2006] = A;

  // --- pc A051 ---
  // $A051: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc A053 ---
  // $A053: BRK
  // BRK (halt for now)
  return;

  // --- pc A056 ---
  // $A056: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc A059 ---
  // $A059: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc A05C ---
  // $A05C: JSR $21A5
  pushWord(PC + 2);
  PC = 0x21A5;
  return;

  // --- pc A05E ---
  // $A05E: AND ($8D,X)
  A = (A & mem[indX(0x8D)]) & 0xFF;
  setZN(A);

  // --- pc A061 ---
  // $A061: JSR $79A5
  pushWord(PC + 2);
  PC = 0x79A5;
  return;

  // --- pc A063 ---
  // $A063: ADC $0D10,Y
  { const r = mem[(0xD10 + Y) & 0xFFFF]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A072 ---
  // $A072: LDY #$46
  Y = 0x46;
  setZN(Y);

  // --- pc A074 ---
  // $A074: JSR $2046
  pushWord(PC + 2);
  PC = 0x2046;
  return;

  // --- pc A076 ---
  // $A076: JSR $45A5
  pushWord(PC + 2);
  PC = 0x45A5;
  return;

  // --- pc A078 ---
  // $A078: EOR $4A
  A = (A ^ zp(0x4A)) & 0xFF;
  setZN(A);

  // --- pc A079 ---
  // $A079: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc A07B ---
  // $A07B: JSR $7BA5
  pushWord(PC + 2);
  PC = 0x7BA5;
  return;

  // --- pc A07E ---
  // $A07E: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc A080 ---
  // $A080: JSR $20A5
  pushWord(PC + 2);
  PC = 0x20A5;
  return;

  // --- pc A082 ---
  // $A082: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc A085 ---
  // $A085: JSR $7AA5
  pushWord(PC + 2);
  PC = 0x7AA5;
  return;

  // --- pc A088 ---
  // $A088: STA $2005
  mem[0x2005] = A;

  // --- pc A08A ---
  // $A08A: JSR $44A6
  pushWord(PC + 2);
  PC = 0x44A6;
  return;

  // --- pc A08D ---
  // $A08D: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc A090 ---
  // $A090: JSR $16A0
  pushWord(PC + 2);
  PC = 0x16A0;
  return;

  // --- pc A092 ---
  // $A092: ASL $20,X
  C = (mem[(0x20 + X) & 0xFF] & 0x80) !== 0; mem[(0x20 + X) & 0xFF] = (mem[(0x20 + X) & 0xFF] << 1) & 0xFF; setZN(mem[(0x20 + X) & 0xFF]);

  // --- pc A095 ---
  // $A095: LDA ($A5,X)
  A = mem[indX(0xA5)];
  setZN(A);

  // --- pc A097 ---
  // $A097: ADC $10F0,Y
  { const r = mem[(0x10F0 + Y) & 0xFFFF]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A099 ---
  // $A099: BPL $A0A5
  if (!N) { PC = 0xA0A5; return; }

  // --- pc A09A ---
  // $A09A: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc A09D ---
  // $A09D: CPY #$8D
  C = Y >= 0x8D;
  setZN((Y - 0x8D) & 0xFF);

  // --- pc A0A0 ---
  // $A0A0: CPY #$8D
  C = Y >= 0x8D;
  setZN((Y - 0x8D) & 0xFF);

  // --- pc A0A3 ---
  // $A0A3: CPX #$A9
  C = X >= 0xA9;
  setZN((X - 0xA9) & 0xFF);

  // --- pc A0A6 ---
  // $A0A6: STA $78
  mem[0x78] = A;

  // --- pc A0A7 ---
  // $A0A7: SEI
  I = true;

  // --- pc A0AE ---
  // $A0AE: SEI
  I = true;

  // --- pc A0B1 ---
  // $A0B1: STA $8000
  mem[0x8000] = A;

  // --- pc A0B4 ---
  // $A0B4: LDA $9E
  A = zp(0x9E);
  setZN(A);

  // --- pc A0B6 ---
  // $A0B6: STA $8001
  mem[0x8001] = A;

  // --- pc A0B9 ---
  // $A0B9: LDA #$03
  A = 0x3;
  setZN(A);

  // --- pc A0BB ---
  // $A0BB: STA $8000
  mem[0x8000] = A;

  // --- pc A0BE ---
  // $A0BE: LDA $9F
  A = zp(0x9F);
  setZN(A);

  // --- pc A0C0 ---
  // $A0C0: STA $8001
  mem[0x8001] = A;

  // --- pc A0C3 ---
  // $A0C3: LDA #$04
  A = 0x4;
  setZN(A);

  // --- pc A0C5 ---
  // $A0C5: STA $8000
  mem[0x8000] = A;

  // --- pc A0C8 ---
  // $A0C8: LDA $A0
  A = zp(0xA0);
  setZN(A);

  // --- pc A0C9 ---
  // $A0C9: LDY #$8D
  Y = 0x8D;
  setZN(Y);

  // --- pc A0CD ---
  // $A0CD: LDA #$05
  A = 0x5;
  setZN(A);

  // --- pc A0CE ---
  // $A0CE: ORA $8D
  A = (A | zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc A0D2 ---
  // $A0D2: LDA $A1
  A = zp(0xA1);
  setZN(A);

  // --- pc A0D3 ---
  // $A0D3: LDA ($8D,X)
  A = mem[indX(0x8D)];
  setZN(A);

  // --- pc A0D7 ---
  // $A0D7: LDX #$02
  X = 0x2;
  setZN(X);

  // --- pc A0D9 ---
  // $A0D9: LDA #$04
  A = 0x4;
  setZN(A);

  // --- pc A0DB ---
  // $A0DB: STA $40
  mem[0x40] = A;

  // --- pc A0DC ---
  // $A0DC: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A0DF ---
  // $A0DF: STA $41
  mem[0x41] = A;

  // --- pc A0E0 ---
  // $A0E0: EOR ($A9,X)
  A = (A ^ mem[indX(0xA9)]) & 0xFF;
  setZN(A);

  // --- pc A0E2 ---
  // $A0E2: ORA ($8D,X)
  A = (A | mem[indX(0x8D)]) & 0xFF;
  setZN(A);

  // --- pc A0E5 ---
  // $A0E5: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A0E7 ---
  // $A0E7: BRK
  // BRK (halt for now)
  return;

  // --- pc A0EA ---
  // $A0EA: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A0EC ---
  // $A0EC: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc A0EF ---
  // $A0EF: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A0F0 ---
  // $A0F0: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc A0F3 ---
  // $A0F3: AND #$01
  A = (A & 0x1) & 0xFF;
  setZN(A);

  // --- pc A0F4 ---
  // $A0F4: ORA ($05,X)
  A = (A | mem[indX(0x5)]) & 0xFF;
  setZN(A);

  // --- pc A0F7 ---
  // $A0F7: STA $3F
  mem[0x3F] = A;

  // --- pc A0F9 ---
  // $A0F9: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc A0FB ---
  // $A0FB: SBC ($C5),Y
  { const r = mem[indY(0xC5)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A0FD ---
  // $A0FD: EOR ($F0,X)
  A = (A ^ mem[indX(0xF0)]) & 0xFF;
  setZN(A);

  // --- pc A106 ---
  // $A106: LDA ($B5,X)
  A = mem[indX(0xB5)];
  setZN(A);

  // --- pc A109 ---
  // $A109: EOR $3F
  A = (A ^ zp(0x3F)) & 0xFF;
  setZN(A);

  // --- pc A10B ---
  // $A10B: AND $3F
  A = (A & zp(0x3F)) & 0xFF;
  setZN(A);

  // --- pc A10D ---
  // $A10D: STA $1D,X
  mem[(0x1D + X) & 0xFF] = A;

  // --- pc A10E ---
  // $A10E: ORA $3FA5,X
  A = (A | mem[(0x3FA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc A111 ---
  // $A111: STA $1B,X
  mem[(0x1B + X) & 0xFF] = A;

  // --- pc A113 ---
  // $A113: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc A116 ---
  // $A116: CLC
  C = false;

  // --- pc A118 ---
  // $A118: SBC ($69,X)
  { const r = mem[indX(0x69)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A11B ---
  // $A11B: STA $E1
  mem[0xE1] = A;

  // --- pc A11C ---
  // $A11C: SBC ($A5,X)
  { const r = mem[indX(0xA5)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A11F ---
  // $A11F: ADC #$0D
  { const r = 0xD; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A120 ---
  // $A120: ORA $E285
  A = (A | mem[0xE285]) & 0xFF;
  setZN(A);

  // --- pc A123 ---
  // $A123: LDA $E3
  A = zp(0xE3);
  setZN(A);

  // --- pc A125 ---
  // $A125: ADC #$11
  { const r = 0x11; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A126 ---
  // $A126: ORA ($85),Y
  A = (A | mem[indY(0x85)]) & 0xFF;
  setZN(A);

  // --- pc A129 ---
  // $A129: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc A12A ---
  // $A12A: BRK
  // BRK (halt for now)
  return;

  // --- pc A12C ---
  // $A12C: LSR $85
  C = (mem[0x85] & 1) !== 0; mem[0x85] = mem[0x85] >>> 1; setZN(mem[0x85]);

  // --- pc A12F ---
  // $A12F: LDA $1B
  A = zp(0x1B);
  setZN(A);

  // --- pc A131 ---
  // $A131: ORA #$80
  A = (A | 0x80) & 0xFF;
  setZN(A);

  // --- pc A133 ---
  // $A133: STA $1B
  mem[0x1B] = A;

  // --- pc A135 ---
  // $A135: INC $3A
  mem[0x3A] = (mem[0x3A] + 1) & 0xFF; setZN(mem[0x3A]);

  // --- pc A137 ---
  // $A137: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_A160.ts
// Address range: $A160-$A189
// Instructions: 19
// Total hits: 6,757
// First seen at frame: 7


export function funcA160(): void {
  // hits: 6,757
  // pc range: $A160-$A189
  // --- pc A160 ---
  // $A160: STA $E000
  mem[0xE000] = A;

  // --- pc A162 ---
  // $A162: CPX #$8D
  C = X >= 0x8D;
  setZN((X - 0x8D) & 0xFF);

  // --- pc A165 ---
  // $A165: CPX #$A6
  C = X >= 0xA6;
  setZN((X - 0xA6) & 0xFF);

  // --- pc A167 ---
  // $A167: SEI
  I = true;

  // --- pc A169 ---
  // $A169: SEI
  I = true;

  // --- pc A16B ---
  // $A16B: AND ($A0,X)
  A = (A & mem[indX(0xA0)]) & 0xFF;
  setZN(A);

  // --- pc A16D ---
  // $A16D: ASL $88
  C = (mem[0x88] & 0x80) !== 0; mem[0x88] = (mem[0x88] << 1) & 0xFF; setZN(mem[0x88]);

  // --- pc A16E ---
  // $A16E: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc A170 ---
  // $A170: SBC $79B5,X
  { const r = mem[(0x79B5 + X) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A172 ---
  // $A172: ADC $7AB4,Y
  { const r = mem[(0x7AB4 + Y) & 0xFFFF]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A175 ---
  // $A175: STY $2006
  mem[0x2006] = Y;

  // --- pc A177 ---
  // $A177: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc A17A ---
  // $A17A: JSR $20A5
  pushWord(PC + 2);
  PC = 0x20A5;
  return;

  // --- pc A17C ---
  // $A17C: JSR $FC29
  pushWord(PC + 2);
  PC = 0xFC29;
  return;

  // --- pc A17F ---
  // $A17F: STA $2000
  mem[0x2000] = A;

  // --- pc A181 ---
  // $A181: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc A183 ---
  // $A183: BRK
  // BRK (halt for now)
  return;

  // --- pc A186 ---
  // $A186: JSR $058D
  pushWord(PC + 2);
  PC = 0x058D;
  return;

  // --- pc A189 ---
  // $A189: JSR $A84C
  pushWord(PC + 2);
  PC = 0xA84C;
  return;

  // fall-through end

}



// func_A1A7.ts
// Address range: $A1A7-$A1AC
// Instructions: 3
// Total hits: 699
// First seen at frame: 7


export function funcA1A7(): void {
  // hits: 699
  // pc range: $A1A7-$A1AC
  // --- pc A1A7 ---
  // $A1A7: JSR $78B5
  pushWord(PC + 2);
  PC = 0x78B5;
  return;

  // --- pc A1A9 ---
  // $A1A9: SEI
  I = true;

  // --- pc A1AC ---
  // $A1AC: BEQ $A1C0
  if (Z) { PC = 0xA1C0; return; }

  // fall-through end

}



// func_A1BF.ts
// Address range: $A1BF-$A1E3
// Instructions: 16
// Total hits: 6,291
// First seen at frame: 7


export function funcA1BF(): void {
  // hits: 6,291
  // pc range: $A1BF-$A1E3
  // --- pc A1BF ---
  // $A1BF: RTS
  PC = pullWord() + 1;
  return;

  // --- pc A1C2 ---
  // $A1C2: CPX #$85
  C = X >= 0x85;
  setZN((X - 0x85) & 0xFF);

  // --- pc A1C4 ---
  // $A1C4: SEI
  I = true;

  // --- pc A1C6 ---
  // $A1C6: CLC
  C = false;

  // --- pc A1C9 ---
  // $A1C9: LDA ($60,X)
  A = mem[indX(0x60)];
  setZN(A);

  // --- pc A1CA ---
  // $A1CA: RTS
  PC = pullWord() + 1;
  return;

  // --- pc A1CC ---
  // $A1CC: SEI
  I = true;

  // --- pc A1CE ---
  // $A1CE: BRK
  // BRK (halt for now)
  return;

  // --- pc A1D1 ---
  // $A1D1: STA $8000
  mem[0x8000] = A;

  // --- pc A1D4 ---
  // $A1D4: STX $8001
  mem[0x8001] = X;

  // --- pc A1D7 ---
  // $A1D7: LDX $79,Y
  X = zp((0x79 + Y) & 0xFF);
  setZN(X);

  // --- pc A1D8 ---
  // $A1D8: ADC $01A9,Y
  { const r = mem[(0x1A9 + Y) & 0xFFFF]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc A1DA ---
  // $A1DA: ORA ($05,X)
  A = (A | mem[indX(0x5)]) & 0xFF;
  setZN(A);

  // --- pc A1DD ---
  // $A1DD: STA $8000
  mem[0x8000] = A;

  // --- pc A1E0 ---
  // $A1E0: STX $8001
  mem[0x8001] = X;

  // --- pc A1E3 ---
  // $A1E3: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_A200.ts
// Address range: $A200-$A200
// Instructions: 1
// Total hits: 1
// First seen at frame: 4


export function funcA200(): void {
  // hits: 1
  // pc range: $A200-$A200
  // --- pc A200 ---
  // $A200: JMP $A21B
  PC = 0xA21B;
  return;

  // fall-through end

}



// func_A214.ts
// Address range: $A214-$A26A
// Instructions: 38
// Total hits: 931
// First seen at frame: 6


export function funcA214(): void {
  // hits: 931
  // pc range: $A214-$A26A
  // --- pc A214 ---
  // $A214: LDY $4C
  Y = zp(0x4C);
  setZN(Y);

  // --- pc A21A ---
  // $A21A: TAY
  Y = A; setZN(Y);

  // --- pc A21D ---
  // $A21D: TXS
  SP = X;

  // --- pc A21E ---
  // $A21E: PHA
  push(A);

  // --- pc A220 ---
  // $A220: BRK
  // BRK (halt for now)
  return;

  // --- pc A223 ---
  // $A223: LDY #$A5
  Y = 0xA5;
  setZN(Y);

  // --- pc A226 ---
  // $A226: ORA #$40
  A = (A | 0x40) & 0xFF;
  setZN(A);

  // --- pc A227 ---
  // $A227: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc A22A ---
  // $A22A: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc A22B ---
  // $A22B: BRK
  // BRK (halt for now)
  return;

  // --- pc A22D ---
  // $A22D: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc A231 ---
  // $A231: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A234 ---
  // $A234: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc A235 ---
  // $A235: BRK
  // BRK (halt for now)
  return;

  // --- pc A238 ---
  // $A238: STA $FFE0,Y
  mem[(0xFFE0 + Y) & 0xFFFF] = A;

  // --- pc A23B ---
  // $A23B: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A23E ---
  // $A23E: LDA #$98
  A = 0x98;
  setZN(A);

  // --- pc A23F ---
  // $A23F: TYA
  A = Y; setZN(A);

  // --- pc A242 ---
  // $A242: LDY #$68
  Y = 0x68;
  setZN(Y);

  // --- pc A243 ---
  // $A243: PLA
  A = pull(); setZN(A);

  // --- pc A245 ---
  // $A245: CPX $04A0
  C = X >= mem[0x4A0];
  setZN((X - mem[0x4A0]) & 0xFF);

  // --- pc A248 ---
  // $A248: JSR $AA06
  pushWord(PC + 2);
  PC = 0xAA06;
  return;

  // --- pc A24A ---
  // $A24A: TAX
  X = A; setZN(X);

  // --- pc A24D ---
  // $A24D: LDY #$E0
  Y = 0xE0;
  setZN(Y);

  // --- pc A24E ---
  // $A24E: CPX #$99
  C = X >= 0x99;
  setZN((X - 0x99) & 0xFF);

  // --- pc A251 ---
  // $A251: ORA $C8
  A = (A | zp(0xC8)) & 0xFF;
  setZN(A);

  // --- pc A252 ---
  // $A252: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A255 ---
  // $A255: JSR $9A43
  pushWord(PC + 2);
  PC = 0x9A43;
  return;

  // --- pc A257 ---
  // $A257: TXS
  SP = X;

  // --- pc A259 ---
  // $A259: BRK
  // BRK (halt for now)
  return;

  // --- pc A25B ---
  // $A25B: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc A25E ---
  // $A25E: JSR $98A0
  pushWord(PC + 2);
  PC = 0x98A0;
  return;

  // --- pc A260 ---
  // $A260: TYA
  A = Y; setZN(A);

  // --- pc A264 ---
  // $A264: LDA #$02
  A = 0x2;
  setZN(A);

  // --- pc A266 ---
  // $A266: STA $8F
  mem[0x8F] = A;

  // --- pc A268 ---
  // $A268: STA $91
  mem[0x91] = A;

  // --- pc A269 ---
  // $A269: STA ($68),Y
  mem[indY(0x68)] = A;

  // --- pc A26A ---
  // $A26A: PLA
  A = pull(); setZN(A);

  // fall-through end

}



// func_A280.ts
// Address range: $A280-$A2AB
// Instructions: 21
// Total hits: 21
// First seen at frame: 5


export function funcA280(): void {
  // hits: 21
  // pc range: $A280-$A2AB
  // --- pc A280 ---
  // $A280: LDX #$A2
  X = 0xA2;
  setZN(X);

  // --- pc A282 ---
  // $A282: ORA ($A9,X)
  A = (A | mem[indX(0xA9)]) & 0xFF;
  setZN(A);

  // --- pc A284 ---
  // $A284: ASL $0095,X
  C = (mem[(0x95 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x95 + X) & 0xFFFF] = (mem[(0x95 + X) & 0xFFFF] << 1) & 0xFF; setZN(mem[(0x95 + X) & 0xFFFF]);

  // --- pc A286 ---
  // $A286: BRK
  // BRK (halt for now)
  return;

  // --- pc A289 ---
  // $A289: STA $01,X
  mem[(0x1 + X) & 0xFF] = A;

  // --- pc A28A ---
  // $A28A: ORA ($A0,X)
  A = (A | mem[indX(0xA0)]) & 0xFF;
  setZN(A);

  // --- pc A28C ---
  // $A28C: PLP
  SET_FLAGS(pull());

  // --- pc A28E ---
  // $A28E: BRK
  // BRK (halt for now)
  return;

  // --- pc A292 ---
  // $A292: LDX #$15
  X = 0x15;
  setZN(X);

  // --- pc A293 ---
  // $A293: ORA $A9,X
  A = (A | zp((0xA9 + X) & 0xFF)) & 0xFF;
  setZN(A);

  // --- pc A295 ---
  // $A295: CPX $0095
  C = X >= mem[0x95];
  setZN((X - mem[0x95]) & 0xFF);

  // --- pc A297 ---
  // $A297: BRK
  // BRK (halt for now)
  return;

  // --- pc A29A ---
  // $A29A: STA $01,X
  mem[(0x1 + X) & 0xFF] = A;

  // --- pc A29B ---
  // $A29B: ORA ($A0,X)
  A = (A | mem[indX(0xA0)]) & 0xFF;
  setZN(A);

  // --- pc A29D ---
  // $A29D: BEQ $A248
  if (Z) { PC = 0xA248; return; }

  // --- pc A29F ---
  // $A29F: BRK
  // BRK (halt for now)
  return;

  // --- pc A2A3 ---
  // $A2A3: LDA $20
  A = zp(0x20);
  setZN(A);

  // --- pc A2A4 ---
  // $A2A4: JSR $8009
  pushWord(PC + 2);
  PC = 0x8009;
  return;

  // --- pc A2A7 ---
  // $A2A7: STA $20
  mem[0x20] = A;

  // --- pc A2A8 ---
  // $A2A8: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc A2AB ---
  // $A2AB: JSR $ED4C
  pushWord(PC + 2);
  PC = 0xED4C;
  return;

  // fall-through end

}



// func_A8CD.ts
// Address range: $A8CD-$A8FC
// Instructions: 21
// Total hits: 254,502
// First seen at frame: 6


export function funcA8CD(): void {
  // hits: 254,502
  // pc range: $A8CD-$A8FC
  // --- pc A8CD ---
  // $A8CD: RTS
  PC = pullWord() + 1;
  return;

  // --- pc A8CF ---
  // $A8CF: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc A8D3 ---
  // $A8D3: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc A8D4 ---
  // $A8D4: BRK
  // BRK (halt for now)
  return;

  // --- pc A8D8 ---
  // $A8D8: LDA $046A,Y
  A = mem[(0x46A + Y) & 0xFFFF];
  setZN(A);

  // --- pc A8DB ---
  // $A8DB: AND #$0C
  A = (A & 0xC) & 0xFF;
  setZN(A);

  // --- pc A8DD ---
  // $A8DD: BEQ $A8E1
  if (Z) { PC = 0xA8E1; return; }

  // --- pc A8DF ---
  // $A8DF: LDX #$F8
  X = 0xF8;
  setZN(X);

  // --- pc A8E0 ---
  // $A8E0: SED
  D = true;

  // --- pc A8E1 ---
  // $A8E1: TXA
  A = X; setZN(A);

  // --- pc A8E5 ---
  // $A8E5: LDA $0469,Y
  A = mem[(0x469 + Y) & 0xFFFF];
  setZN(A);

  // --- pc A8E8 ---
  // $A8E8: STA $0201,Y
  mem[(0x201 + Y) & 0xFFFF] = A;

  // --- pc A8EB ---
  // $A8EB: LDA $046A,Y
  A = mem[(0x46A + Y) & 0xFFFF];
  setZN(A);

  // --- pc A8EE ---
  // $A8EE: STA $0202,Y
  mem[(0x202 + Y) & 0xFFFF] = A;

  // --- pc A8F1 ---
  // $A8F1: LDA $046B,Y
  A = mem[(0x46B + Y) & 0xFFFF];
  setZN(A);

  // --- pc A8F4 ---
  // $A8F4: STA $0203,Y
  mem[(0x203 + Y) & 0xFFFF] = A;

  // --- pc A8F7 ---
  // $A8F7: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A8F8 ---
  // $A8F8: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A8F9 ---
  // $A8F9: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A8FA ---
  // $A8FA: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc A8FC ---
  // $A8FC: CLD
  D = false;

  // fall-through end

}



// func_AA06.ts
// Address range: $AA06-$AA1E
// Instructions: 15
// Total hits: 5,989
// First seen at frame: 4


export function funcAA06(): void {
  // hits: 5,989
  // pc range: $AA06-$AA1E
  // --- pc AA06 ---
  // $AA06: STY $ED
  mem[0xED] = Y;

  // --- pc AA07 ---
  // $AA07: SBC $A0E8
  { const r = mem[0xA0E8] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc AA08 ---
  // $AA08: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc AA0A ---
  // $AA0A: BRK
  // BRK (halt for now)
  return;

  // --- pc AA0B ---
  // $AA0B: PHA
  push(A);

  // --- pc AA0D ---
  // $AA0D: BRK
  // BRK (halt for now)
  return;

  // --- pc AA0F ---
  // $AA0F: CPX $ECE6
  C = X >= mem[0xECE6];
  setZN((X - mem[0xECE6]) & 0xFF);

  // --- pc AA11 ---
  // $AA11: CPX $02D0
  C = X >= mem[0x2D0];
  setZN((X - mem[0x2D0]) & 0xFF);

  // --- pc AA14 ---
  // $AA14: INC $ED
  mem[0xED] = (mem[0xED] + 1) & 0xFF; setZN(mem[0xED]);

  // --- pc AA15 ---
  // $AA15: SBC $3868
  { const r = mem[0x3868] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc AA16 ---
  // $AA16: PLA
  A = pull(); setZN(A);

  // --- pc AA17 ---
  // $AA17: SEC
  C = true;

  // --- pc AA19 ---
  // $AA19: ORA ($D0,X)
  A = (A | mem[indX(0xD0)]) & 0xFF;
  setZN(A);

  // --- pc AA1C ---
  // $AA1C: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc AA1E ---
  // $AA1E: CPX $A560
  C = X >= mem[0xA560];
  setZN((X - mem[0xA560]) & 0xFF);

  // fall-through end

}



// func_C3FF.ts
// Address range: $C3FF-$C4C7
// Instructions: 85
// Total hits: 17,645
// First seen at frame: 4


export function funcC3FF(): void {
  // hits: 17,645
  // pc range: $C3FF-$C4C7
  // --- pc C3FF ---
  // $C3FF: BRK
  // BRK (halt for now)
  return;

  // --- pc C400 ---
  // $C400: TAY
  Y = A; setZN(Y);

  // --- pc C402 ---
  // $C402: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc C404 ---
  // $C404: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc C407 ---
  // $C407: JSR $1EA9
  pushWord(PC + 2);
  PC = 0x1EA9;
  return;

  // --- pc C409 ---
  // $C409: ASL $2185,X
  C = (mem[(0x2185 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x2185 + X) & 0xFFFF] = (mem[(0x2185 + X) & 0xFFFF] << 1) & 0xFF; setZN(mem[(0x2185 + X) & 0xFFFF]);

  // --- pc C40B ---
  // $C40B: AND ($8D,X)
  A = (A & mem[indX(0x8D)]) & 0xFF;
  setZN(A);

  // --- pc C40E ---
  // $C40E: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc C410 ---
  // $C410: BRK
  // BRK (halt for now)
  return;

  // --- pc C413 ---
  // $C413: LDX #$00
  X = 0x0;
  setZN(X);

  // --- pc C414 ---
  // $C414: BRK
  // BRK (halt for now)
  return;

  // --- pc C417 ---
  // $C417: CPY $A2
  C = Y >= zp(0xA2);
  setZN((Y - zp(0xA2)) & 0xFF);

  // --- pc C41A ---
  // $C41A: JSR $C4B9
  pushWord(PC + 2);
  PC = 0xC4B9;
  return;

  // --- pc C41C ---
  // $C41C: CPY $98
  C = Y >= zp(0x98);
  setZN((Y - zp(0x98)) & 0xFF);

  // --- pc C41D ---
  // $C41D: TYA
  A = Y; setZN(A);

  // --- pc C420 ---
  // $C420: LDX #$24
  X = 0x24;
  setZN(X);

  // --- pc C423 ---
  // $C423: BMI $C472
  if (N) { PC = 0xC472; return; }

  // --- pc C424 ---
  // $C424: EOR $6638
  A = (A ^ mem[0x6638]) & 0xFF;
  setZN(A);

  // --- pc C425 ---
  // $C425: SEC
  C = true;

  // --- pc C428 ---
  // $C428: STA $3C
  mem[0x3C] = A;

  // --- pc C42A ---
  // $C42A: STX $3D
  mem[0x3D] = X;

  // --- pc C42B ---
  // $C42B: AND $3E84,X
  A = (A & mem[(0x3E84 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc C42D ---
  // $C42D: ROL $22A5,X
  { const c = C ? 1 : 0; C = (mem[(0x22A5 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x22A5 + X) & 0xFFFF] = ((mem[(0x22A5 + X) & 0xFFFF] << 1) | c) & 0xFF; setZN(mem[(0x22A5 + X) & 0xFFFF]); }

  // --- pc C430 ---
  // $C430: ORA #$07
  A = (A | 0x7) & 0xFF;
  setZN(A);

  // --- pc C432 ---
  // $C432: STA $8000
  mem[0x8000] = A;

  // --- pc C435 ---
  // $C435: LDA #$02
  A = 0x2;
  setZN(A);

  // --- pc C437 ---
  // $C437: STA $8001
  mem[0x8001] = A;

  // --- pc C43A ---
  // $C43A: JSR $A000
  pushWord(PC + 2);
  PC = 0xA000;
  return;

  // --- pc C43C ---
  // $C43C: LDY #$A5
  Y = 0xA5;
  setZN(Y);

  // --- pc C43F ---
  // $C43F: ORA #$06
  A = (A | 0x6) & 0xFF;
  setZN(A);

  // --- pc C440 ---
  // $C440: ASL $8D
  C = (mem[0x8D] & 0x80) !== 0; mem[0x8D] = (mem[0x8D] << 1) & 0xFF; setZN(mem[0x8D]);

  // --- pc C444 ---
  // $C444: LDA #$0C
  A = 0xC;
  setZN(A);

  // --- pc C446 ---
  // $C446: STA $8001
  mem[0x8001] = A;

  // --- pc C449 ---
  // $C449: JSR $8000
  pushWord(PC + 2);
  PC = 0x8000;
  return;

  // --- pc C44C ---
  // $C44C: LDA $22
  A = zp(0x22);
  setZN(A);

  // --- pc C44E ---
  // $C44E: ORA #$06
  A = (A | 0x6) & 0xFF;
  setZN(A);

  // --- pc C44F ---
  // $C44F: ASL $8D
  C = (mem[0x8D] & 0x80) !== 0; mem[0x8D] = (mem[0x8D] << 1) & 0xFF; setZN(mem[0x8D]);

  // --- pc C453 ---
  // $C453: LDA $24
  A = zp(0x24);
  setZN(A);

  // --- pc C454 ---
  // $C454: BIT $8D
  { const t = zp(0x8D); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc C458 ---
  // $C458: LDA $22
  A = zp(0x22);
  setZN(A);

  // --- pc C45A ---
  // $C45A: ORA #$07
  A = (A | 0x7) & 0xFF;
  setZN(A);

  // --- pc C45C ---
  // $C45C: STA $8000
  mem[0x8000] = A;

  // --- pc C45F ---
  // $C45F: LDA $25
  A = zp(0x25);
  setZN(A);

  // --- pc C460 ---
  // $C460: AND $8D
  A = (A & zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc C464 ---
  // $C464: LDA $23
  A = zp(0x23);
  setZN(A);

  // --- pc C466 ---
  // $C466: STA $8000
  mem[0x8000] = A;

  // --- pc C469 ---
  // $C469: LDY $3E
  Y = zp(0x3E);
  setZN(Y);

  // --- pc C46A ---
  // $C46A: ROL $3DA6,X
  { const c = C ? 1 : 0; C = (mem[(0x3DA6 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x3DA6 + X) & 0xFFFF] = ((mem[(0x3DA6 + X) & 0xFFFF] << 1) | c) & 0xFF; setZN(mem[(0x3DA6 + X) & 0xFFFF]); }

  // --- pc C46C ---
  // $C46C: AND $3CA5,X
  A = (A & mem[(0x3CA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc C46F ---
  // $C46F: LSR $3B
  C = (mem[0x3B] & 1) !== 0; mem[0x3B] = mem[0x3B] >>> 1; setZN(mem[0x3B]);

  // --- pc C471 ---
  // $C471: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C477 ---
  // $C477: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C47A ---
  // $C47A: BMI $C4AE
  if (N) { PC = 0xC4AE; return; }

  // --- pc C47C ---
  // $C47C: SEC
  C = true;

  // --- pc C47F ---
  // $C47F: STA $3C
  mem[0x3C] = A;

  // --- pc C481 ---
  // $C481: STX $3D
  mem[0x3D] = X;

  // --- pc C482 ---
  // $C482: AND $3E84,X
  A = (A & mem[(0x3E84 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc C484 ---
  // $C484: ROL $22A5,X
  { const c = C ? 1 : 0; C = (mem[(0x22A5 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x22A5 + X) & 0xFFFF] = ((mem[(0x22A5 + X) & 0xFFFF] << 1) | c) & 0xFF; setZN(mem[(0x22A5 + X) & 0xFFFF]); }

  // --- pc C487 ---
  // $C487: ORA #$07
  A = (A | 0x7) & 0xFF;
  setZN(A);

  // --- pc C489 ---
  // $C489: STA $8000
  mem[0x8000] = A;

  // --- pc C48C ---
  // $C48C: LDA #$02
  A = 0x2;
  setZN(A);

  // --- pc C48E ---
  // $C48E: STA $8001
  mem[0x8001] = A;

  // --- pc C491 ---
  // $C491: JSR $A160
  pushWord(PC + 2);
  PC = 0xA160;
  return;

  // --- pc C493 ---
  // $C493: LDA ($A5,X)
  A = mem[indX(0xA5)];
  setZN(A);

  // --- pc C496 ---
  // $C496: ORA #$07
  A = (A | 0x7) & 0xFF;
  setZN(A);

  // --- pc C498 ---
  // $C498: STA $8000
  mem[0x8000] = A;

  // --- pc C49B ---
  // $C49B: LDA $25
  A = zp(0x25);
  setZN(A);

  // --- pc C49C ---
  // $C49C: AND $8D
  A = (A & zp(0x8D)) & 0xFF;
  setZN(A);

  // --- pc C4A0 ---
  // $C4A0: LDA $23
  A = zp(0x23);
  setZN(A);

  // --- pc C4A2 ---
  // $C4A2: STA $8000
  mem[0x8000] = A;

  // --- pc C4A5 ---
  // $C4A5: LDY $3E
  Y = zp(0x3E);
  setZN(Y);

  // --- pc C4A6 ---
  // $C4A6: ROL $3DA6,X
  { const c = C ? 1 : 0; C = (mem[(0x3DA6 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x3DA6 + X) & 0xFFFF] = ((mem[(0x3DA6 + X) & 0xFFFF] << 1) | c) & 0xFF; setZN(mem[(0x3DA6 + X) & 0xFFFF]); }

  // --- pc C4A8 ---
  // $C4A8: AND $3CA5,X
  A = (A & mem[(0x3CA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc C4AB ---
  // $C4AB: LSR $3B
  C = (mem[0x3B] & 1) !== 0; mem[0x3B] = mem[0x3B] >>> 1; setZN(mem[0x3B]);

  // --- pc C4AD ---
  // $C4AD: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C4B1 ---
  // $C4B1: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C4B3 ---
  // $C4B3: BIT $A9
  { const t = zp(0xA9); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc C4B5 ---
  // $C4B5: ASL $4C
  C = (mem[0x4C] & 0x80) !== 0; mem[0x4C] = (mem[0x4C] << 1) & 0xFF; setZN(mem[0x4C]);

  // --- pc C4B8 ---
  // $C4B8: CPY $86
  C = Y >= zp(0x86);
  setZN((Y - zp(0x86)) & 0xFF);

  // --- pc C4BA ---
  // $C4BA: AND $A9
  A = (A & zp(0xA9)) & 0xFF;
  setZN(A);

  // --- pc C4BD ---
  // $C4BD: ORA $22
  A = (A | zp(0x22)) & 0xFF;
  setZN(A);

  // --- pc C4BF ---
  // $C4BF: STA $23
  mem[0x23] = A;

  // --- pc C4C1 ---
  // $C4C1: STA $8000
  mem[0x8000] = A;

  // --- pc C4C4 ---
  // $C4C4: STX $8001
  mem[0x8001] = X;

  // --- pc C4C7 ---
  // $C4C7: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_C500.ts
// Address range: $C500-$C505
// Instructions: 3
// Total hits: 467
// First seen at frame: 7


export function funcC500(): void {
  // hits: 467
  // pc range: $C500-$C505
  // --- pc C500 ---
  // $C500: JMP $C76E
  PC = 0xC76E;
  return;

  // --- pc C503 ---
  // $C503: JMP $C64E
  PC = 0xC64E;
  return;

  // --- pc C505 ---
  // $C505: DEC $4C
  mem[0x4C] = (mem[0x4C] - 1) & 0xFF; setZN(mem[0x4C]);

  // fall-through end

}



// func_C64E.ts
// Address range: $C64E-$C6BA
// Instructions: 51
// Total hits: 23,297
// First seen at frame: 0


export function funcC64E(): void {
  // hits: 23,297
  // pc range: $C64E-$C6BA
  // --- pc C64E ---
  // $C64E: LDA #$08
  A = 0x8;
  setZN(A);

  // --- pc C64F ---
  // $C64F: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc C652 ---
  // $C652: JSR $D878
  pushWord(PC + 2);
  PC = 0xD878;
  return;

  // --- pc C653 ---
  // $C653: SEI
  I = true;

  // --- pc C654 ---
  // $C654: CLD
  D = false;

  // --- pc C657 ---
  // $C657: TXS
  SP = X;

  // --- pc C65A ---
  // $C65A: JSR $FB10
  pushWord(PC + 2);
  PC = 0xFB10;
  return;

  // --- pc C65D ---
  // $C65D: LDA $2002
  A = mem[0x2002];
  setZN(A);

  // --- pc C65F ---
  // $C65F: JSR $FB10
  pushWord(PC + 2);
  PC = 0xFB10;
  return;

  // --- pc C662 ---
  // $C662: LDA #$C0
  A = 0xC0;
  setZN(A);

  // --- pc C663 ---
  // $C663: CPY #$8D
  C = Y >= 0x8D;
  setZN((Y - 0x8D) & 0xFF);

  // --- pc C666 ---
  // $C666: LDY #$A9
  Y = 0xA9;
  setZN(Y);

  // --- pc C668 ---
  // $C668: BRK
  // BRK (halt for now)
  return;

  // --- pc C66A ---
  // $C66A: BRK
  // BRK (halt for now)
  return;

  // --- pc C66C ---
  // $C66C: ORA ($A8,X)
  A = (A | mem[indX(0xA8)]) & 0xFF;
  setZN(A);

  // --- pc C66D ---
  // $C66D: TAY
  Y = A; setZN(Y);

  // --- pc C66F ---
  // $C66F: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc C671 ---
  // $C671: BRK
  // BRK (halt for now)
  return;

  // --- pc C672 ---
  // $C672: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc C675 ---
  // $C675: INC $01
  mem[0x1] = (mem[0x1] + 1) & 0xFF; setZN(mem[0x1]);

  // --- pc C676 ---
  // $C676: ORA ($CA,X)
  A = (A | mem[indX(0xCA)]) & 0xFF;
  setZN(A);

  // --- pc C677 ---
  // $C677: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc C679 ---
  // $C679: INC $A9,X
  mem[(0xA9 + X) & 0xFF] = (mem[(0xA9 + X) & 0xFF] + 1) & 0xFF; setZN(mem[(0xA9 + X) & 0xFF]);

  // --- pc C67B ---
  // $C67B: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc C67D ---
  // $C67D: JSR $06A9
  pushWord(PC + 2);
  PC = 0x06A9;
  return;

  // --- pc C67F ---
  // $C67F: ASL $85
  C = (mem[0x85] & 0x80) !== 0; mem[0x85] = (mem[0x85] << 1) & 0xFF; setZN(mem[0x85]);

  // --- pc C681 ---
  // $C681: AND ($8D,X)
  A = (A & mem[indX(0x8D)]) & 0xFF;
  setZN(A);

  // --- pc C684 ---
  // $C684: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc C686 ---
  // $C686: BRK
  // BRK (halt for now)
  return;

  // --- pc C689 ---
  // $C689: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C68B ---
  // $C68B: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C68E ---
  // $C68E: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C691 ---
  // $C691: JSR $10A9
  pushWord(PC + 2);
  PC = 0x10A9;
  return;

  // --- pc C693 ---
  // $C693: BPL $C63F
  if (!N) { PC = 0xC63F; return; }

  // --- pc C694 ---
  // $C694: TAX
  X = A; setZN(X);

  // --- pc C697 ---
  // $C697: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc C69A ---
  // $C69A: JSR $0049
  pushWord(PC + 2);
  PC = 0x0049;
  return;

  // --- pc C69C ---
  // $C69C: BRK
  // BRK (halt for now)
  return;

  // --- pc C69D ---
  // $C69D: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc C69F ---
  // $C69F: SBC $A9,X
  { const r = zp((0xA9 + X) & 0xFF) ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc C6A1 ---
  // $C6A1: BRK
  // BRK (halt for now)
  return;

  // --- pc C6A4 ---
  // $C6A4: BRK
  // BRK (halt for now)
  return;

  // --- pc C6A8 ---
  // $C6A8: JSR $CB8B
  pushWord(PC + 2);
  PC = 0xCB8B;
  return;

  // --- pc C6AB ---
  // $C6AB: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc C6AC ---
  // $C6AC: BRK
  // BRK (halt for now)
  return;

  // --- pc C6B0 ---
  // $C6B0: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc C6B1 ---
  // $C6B1: BRK
  // BRK (halt for now)
  return;

  // --- pc C6B5 ---
  // $C6B5: STA $E000
  mem[0xE000] = A;

  // --- pc C6B7 ---
  // $C6B7: CPX #$58
  C = X >= 0x58;
  setZN((X - 0x58) & 0xFF);

  // --- pc C6B8 ---
  // $C6B8: CLI
  I = false;

  // --- pc C6BA ---
  // $C6BA: BRK
  // BRK (halt for now)
  return;

  // fall-through end

}



// func_C76D.ts
// Address range: $C76D-$C772
// Instructions: 3
// Total hits: 699
// First seen at frame: 7


export function funcC76D(): void {
  // hits: 699
  // pc range: $C76D-$C772
  // --- pc C76D ---
  // $C76D: SBC $1B24,X
  { const r = mem[(0x1B24 + X) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc C770 ---
  // $C770: BVC $C775
  if (!V) { PC = 0xC775; return; }

  // --- pc C772 ---
  // $C772: JMP $C421
  PC = 0xC421;
  return;

  // fall-through end

}



// func_C820.ts
// Address range: $C820-$C825
// Instructions: 3
// Total hits: 699
// First seen at frame: 7


export function funcC820(): void {
  // hits: 699
  // pc range: $C820-$C825
  // --- pc C820 ---
  // $C820: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc C823 ---
  // $C823: BVC $C828
  if (!V) { PC = 0xC828; return; }

  // --- pc C825 ---
  // $C825: JMP $C478
  PC = 0xC478;
  return;

  // fall-through end

}



// func_CB34.ts
// Address range: $CB34-$CB98
// Instructions: 45
// Total hits: 13,184
// First seen at frame: 2


export function funcCB34(): void {
  // hits: 13,184
  // pc range: $CB34-$CB98
  // --- pc CB34 ---
  // $CB34: CLC
  C = false;

  // --- pc CB36 ---
  // $CB36: JSR $7F29
  pushWord(PC + 2);
  PC = 0x7F29;
  return;

  // --- pc CB39 ---
  // $CB39: STA $20
  mem[0x20] = A;

  // --- pc CB3A ---
  // $CB3A: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc CB3D ---
  // $CB3D: JSR $06A9
  pushWord(PC + 2);
  PC = 0x06A9;
  return;

  // --- pc CB3F ---
  // $CB3F: ASL $8D
  C = (mem[0x8D] & 0x80) !== 0; mem[0x8D] = (mem[0x8D] << 1) & 0xFF; setZN(mem[0x8D]);

  // --- pc CB42 ---
  // $CB42: JSR $20A9
  pushWord(PC + 2);
  PC = 0x20A9;
  return;

  // --- pc CB44 ---
  // $CB44: JSR $5C20
  pushWord(PC + 2);
  PC = 0x5C20;
  return;

  // --- pc CB48 ---
  // $CB48: LDA #$24
  A = 0x24;
  setZN(A);

  // --- pc CB49 ---
  // $CB49: BIT $20
  { const t = zp(0x20); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc CB4D ---
  // $CB4D: LDA #$1E
  A = 0x1E;
  setZN(A);

  // --- pc CB4E ---
  // $CB4E: ASL $018D,X
  C = (mem[(0x18D + X) & 0xFFFF] & 0x80) !== 0; mem[(0x18D + X) & 0xFFFF] = (mem[(0x18D + X) & 0xFFFF] << 1) & 0xFF; setZN(mem[(0x18D + X) & 0xFFFF]);

  // --- pc CB51 ---
  // $CB51: JSR $20A5
  pushWord(PC + 2);
  PC = 0x20A5;
  return;

  // --- pc CB53 ---
  // $CB53: JSR $8009
  pushWord(PC + 2);
  PC = 0x8009;
  return;

  // --- pc CB56 ---
  // $CB56: STA $20
  mem[0x20] = A;

  // --- pc CB57 ---
  // $CB57: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc CB5A ---
  // $CB5A: JSR $2C60
  pushWord(PC + 2);
  PC = 0x2C60;
  return;

  // --- pc CB5B ---
  // $CB5B: RTS
  PC = pullWord() + 1;
  return;

  // --- pc CB5E ---
  // $CB5E: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc CB61 ---
  // $CB61: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc CB63 ---
  // $CB63: BRK
  // BRK (halt for now)
  return;

  // --- pc CB66 ---
  // $CB66: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc CB68 ---
  // $CB68: BRK
  // BRK (halt for now)
  return;

  // --- pc CB6A ---
  // $CB6A: CPY #$A0
  C = Y >= 0xA0;
  setZN((Y - 0xA0) & 0xFF);

  // --- pc CB6D ---
  // $CB6D: STA $2007
  mem[0x2007] = A;

  // --- pc CB6F ---
  // $CB6F: JSR $D0CA
  pushWord(PC + 2);
  PC = 0xD0CA;
  return;

  // --- pc CB70 ---
  // $CB70: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc CB73 ---
  // $CB73: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc CB76 ---
  // $CB76: TXA
  A = X; setZN(A);

  // --- pc CB78 ---
  // $CB78: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc CB7B ---
  // $CB7B: JSR $D0CA
  pushWord(PC + 2);
  PC = 0xD0CA;
  return;

  // --- pc CB7C ---
  // $CB7C: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc CB7F ---
  // $CB7F: BIT $2002
  { const t = mem[0x2002]; Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc CB81 ---
  // $CB81: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc CB83 ---
  // $CB83: BRK
  // BRK (halt for now)
  return;

  // --- pc CB86 ---
  // $CB86: JSR $058D
  pushWord(PC + 2);
  PC = 0x058D;
  return;

  // --- pc CB89 ---
  // $CB89: JSR $A060
  pushWord(PC + 2);
  PC = 0xA060;
  return;

  // --- pc CB8A ---
  // $CB8A: RTS
  PC = pullWord() + 1;
  return;

  // --- pc CB8C ---
  // $CB8C: BRK
  // BRK (halt for now)
  return;

  // --- pc CB8E ---
  // $CB8E: SED
  D = true;

  // --- pc CB92 ---
  // $CB92: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc CB93 ---
  // $CB93: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc CB94 ---
  // $CB94: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc CB95 ---
  // $CB95: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc CB98 ---
  // $CB98: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_CEFD.ts
// Address range: $CEFD-$CF1B
// Instructions: 14
// Total hits: 14
// First seen at frame: 3


export function funcCEFD(): void {
  // hits: 14
  // pc range: $CEFD-$CF1B
  // --- pc CEFD ---
  // $CEFD: RTS
  PC = pullWord() + 1;
  return;

  // --- pc CEFE ---
  // $CEFE: PHA
  push(A);

  // --- pc CF00 ---
  // $CF00: BRK
  // BRK (halt for now)
  return;

  // --- pc CF04 ---
  // $CF04: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc CF05 ---
  // $CF05: BRK
  // BRK (halt for now)
  return;

  // --- pc CF09 ---
  // $CF09: STA $E000
  mem[0xE000] = A;

  // --- pc CF0B ---
  // $CF0B: CPX #$20
  C = X >= 0x20;
  setZN((X - 0x20) & 0xFF);

  // --- pc CF0F ---
  // $CF0F: JSR $CB35
  pushWord(PC + 2);
  PC = 0xCB35;
  return;

  // --- pc CF12 ---
  // $CF12: LDA $20
  A = zp(0x20);
  setZN(A);

  // --- pc CF13 ---
  // $CF13: JSR $7F29
  pushWord(PC + 2);
  PC = 0x7F29;
  return;

  // --- pc CF16 ---
  // $CF16: STA $2000
  mem[0x2000] = A;

  // --- pc CF18 ---
  // $CF18: JSR $2085
  pushWord(PC + 2);
  PC = 0x2085;
  return;

  // --- pc CF1A ---
  // $CF1A: JSR $4C68
  pushWord(PC + 2);
  PC = 0x4C68;
  return;

  // --- pc CF1B ---
  // $CF1B: PLA
  A = pull(); setZN(A);

  // fall-through end

}

