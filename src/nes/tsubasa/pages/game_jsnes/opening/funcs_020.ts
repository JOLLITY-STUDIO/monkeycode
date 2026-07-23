// @ts-nocheck — auto-generated de-CPU functions, mutates imported state
﻿// func_8E57.ts
// Address range: $8E57-$8EB0
// Instructions: 40
// Total hits: 71
// First seen at frame: 7

import { A, X, Y, PC, SP, C, Z, I, D, V, N, setZN, mem, zp, setZp, indX, indY, push, pull, pushWord, pullWord, FLAGS_BYTE, SET_FLAGS } from './state';
import { instrTable } from './instr_table';

export function func8E57(): void {
  // hits: 71
  // pc range: $8E57-$8EB0
  // --- pc 8E57 ---
  // $8E57: EOR $6EA5,X
  A = (A ^ mem[(0x6EA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8E59 ---
  // $8E59: ROR $1848
  { const c = C ? 0x80 : 0; C = (mem[0x1848] & 1) !== 0; mem[0x1848] = (mem[0x1848] >>> 1) | c; setZN(mem[0x1848]); }

  // --- pc 8E5A ---
  // $8E5A: PHA
  push(A);

  // --- pc 8E5B ---
  // $8E5B: CLC
  C = false;

  // --- pc 8E5E ---
  // $8E5E: STA $63
  mem[0x63] = A;

  // --- pc 8E60 ---
  // $8E60: PLA
  A = pull(); setZN(A);

  // --- pc 8E63 ---
  // $8E63: LDA $64
  A = zp(0x64);
  setZN(A);

  // --- pc 8E65 ---
  // $8E65: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E66 ---
  // $8E66: BRK
  // BRK (halt for now)
  return;

  // --- pc 8E6D ---
  // $8E6D: BRK
  // BRK (halt for now)
  return;

  // --- pc 8E70 ---
  // $8E70: DEC $ED
  mem[0xED] = (mem[0xED] - 1) & 0xFF; setZN(mem[0xED]);

  // --- pc 8E71 ---
  // $8E71: SBC $B9D0
  { const r = mem[0xB9D0] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E73 ---
  // $8E73: LDA $6FA5,Y
  A = mem[(0x6FA5 + Y) & 0xFFFF];
  setZN(A);

  // --- pc 8E76 ---
  // $8E76: PHA
  push(A);

  // --- pc 8E77 ---
  // $8E77: CLC
  C = false;

  // --- pc 8E79 ---
  // $8E79: ADC $85
  { const r = zp(0x85); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E7C ---
  // $8E7C: PLA
  A = pull(); setZN(A);

  // --- pc 8E7F ---
  // $8E7F: LDA $66
  A = zp(0x66);
  setZN(A);

  // --- pc 8E80 ---
  // $8E80: ROR $69
  { const c = C ? 0x80 : 0; C = (mem[0x69] & 1) !== 0; mem[0x69] = (mem[0x69] >>> 1) | c; setZN(mem[0x69]); }

  // --- pc 8E82 ---
  // $8E82: BRK
  // BRK (halt for now)
  return;

  // --- pc 8E89 ---
  // $8E89: BRK
  // BRK (halt for now)
  return;

  // --- pc 8E8C ---
  // $8E8C: LDA $62
  A = zp(0x62);
  setZN(A);

  // --- pc 8E8E ---
  // $8E8E: AND #$C0
  A = (A & 0xC0) & 0xFF;
  setZN(A);

  // --- pc 8E8F ---
  // $8E8F: CPY #$C9
  C = Y >= 0xC9;
  setZN((Y - 0xC9) & 0xFF);

  // --- pc 8E91 ---
  // $8E91: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 8E93 ---
  // $8E93: ROL $73A5
  { const c = C ? 1 : 0; C = (mem[0x73A5] & 0x80) !== 0; mem[0x73A5] = ((mem[0x73A5] << 1) | c) & 0xFF; setZN(mem[0x73A5]); }

  // --- pc 8E96 ---
  // $8E96: CLC
  C = false;

  // --- pc 8E99 ---
  // $8E99: STA $5C
  mem[0x5C] = A;

  // --- pc 8E9B ---
  // $8E9B: TAX
  X = A; setZN(X);

  // --- pc 8E9E ---
  // $8E9E: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E9F ---
  // $8E9F: BRK
  // BRK (halt for now)
  return;

  // --- pc 8EA1 ---
  // $8EA1: EOR $388A,X
  A = (A ^ mem[(0x388A + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8EA2 ---
  // $8EA2: TXA
  A = X; setZN(A);

  // --- pc 8EA3 ---
  // $8EA3: SEC
  C = true;

  // --- pc 8EA5 ---
  // $8EA5: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 8EA7 ---
  // $8EA7: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 8EA9 ---
  // $8EA9: EOR $00E9,X
  A = (A ^ mem[(0xE9 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8EAB ---
  // $8EAB: BRK
  // BRK (halt for now)
  return;

  // --- pc 8EAE ---
  // $8EAE: CMP #$03
  C = A >= 0x3;
  setZN((A - 0x3) & 0xFF);

  // --- pc 8EB0 ---
  // $8EB0: BNE $8EE8
  if (!Z) { PC = 0x8EE8; return; }

  // fall-through end

}



// func_8EE7.ts
// Address range: $8EE7-$8F79
// Instructions: 70
// Total hits: 666
// First seen at frame: 8


export function func8EE7(): void {
  // hits: 666
  // pc range: $8EE7-$8F79
  // --- pc 8EE7 ---
  // $8EE7: EOR $6CC6,X
  A = (A ^ mem[(0x6CC6 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8EE9 ---
  // $8EE9: JMP ($03F0)
  // JMP ($03F0)
  PC = mem[0x3F0] | (mem[0x3F1] << 8);
  return;

  // --- pc 8EEE ---
  // $8EEE: STX $AA60
  mem[0xAA60] = X;

  // --- pc 8EEF ---
  // $8EEF: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8EF0 ---
  // $8EF0: TAX
  X = A; setZN(X);

  // --- pc 8EF3 ---
  // $8EF3: STA $67
  mem[0x67] = A;

  // --- pc 8EF5 ---
  // $8EF5: LDA $5D
  A = zp(0x5D);
  setZN(A);

  // --- pc 8EF6 ---
  // $8EF6: EOR $6885,X
  A = (A ^ mem[(0x6885 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8EF8 ---
  // $8EF8: PLA
  A = pull(); setZN(A);

  // --- pc 8EFB ---
  // $8EFB: AND #$01
  A = (A & 0x1) & 0xFF;
  setZN(A);

  // --- pc 8EFC ---
  // $8EFC: ORA ($A8,X)
  A = (A | mem[indX(0xA8)]) & 0xFF;
  setZN(A);

  // --- pc 8EFD ---
  // $8EFD: TAY
  Y = A; setZN(Y);

  // --- pc 8F00 ---
  // $8F00: TXA
  A = X; setZN(A);

  // --- pc 8F02 ---
  // $8F02: NOP
  // NOP

  // --- pc 8F03 ---
  // $8F03: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8F06 ---
  // $8F06: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8F09 ---
  // $8F09: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8F0C ---
  // $8F0C: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8F0F ---
  // $8F0F: CLC
  C = false;

  // --- pc 8F11 ---
  // $8F11: NOP
  // NOP

  // --- pc 8F13 ---
  // $8F13: NOP
  // NOP

  // --- pc 8F14 ---
  // $8F14: TYA
  A = Y; setZN(A);

  // --- pc 8F17 ---
  // $8F17: STA $EB
  mem[0xEB] = A;

  // --- pc 8F19 ---
  // $8F19: LDA $EA
  A = zp(0xEA);
  setZN(A);

  // --- pc 8F1A ---
  // $8F1A: NOP
  // NOP

  // --- pc 8F1B ---
  // $8F1B: CLC
  C = false;

  // --- pc 8F1D ---
  // $8F1D: BRK
  // BRK (halt for now)
  return;

  // --- pc 8F1F ---
  // $8F1F: NOP
  // NOP

  // --- pc 8F22 ---
  // $8F22: ADC #$A0
  { const r = 0xA0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8F23 ---
  // $8F23: LDY #$85
  Y = 0x85;
  setZN(Y);

  // --- pc 8F26 ---
  // $8F26: LDX #$08
  X = 0x8;
  setZN(X);

  // --- pc 8F27 ---
  // $8F27: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 8F2A ---
  // $8F2A: CPY $A0
  C = Y >= zp(0xA0);
  setZN((Y - zp(0xA0)) & 0xFF);

  // --- pc 8F2C ---
  // $8F2C: BRK
  // BRK (halt for now)
  return;

  // --- pc 8F2E ---
  // $8F2E: NOP
  // NOP

  // --- pc 8F31 ---
  // $8F31: JSR $8FD1
  pushWord(PC + 2);
  PC = 0x8FD1;
  return;

  // --- pc 8F34 ---
  // $8F34: INC $EA
  mem[0xEA] = (mem[0xEA] + 1) & 0xFF; setZN(mem[0xEA]);

  // --- pc 8F35 ---
  // $8F35: NOP
  // NOP

  // --- pc 8F3A ---
  // $8F3A: LDA #$04
  A = 0x4;
  setZN(A);

  // --- pc 8F3C ---
  // $8F3C: STA $E8
  mem[0xE8] = A;

  // --- pc 8F3D ---
  // $8F3D: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 8F40 ---
  // $8F40: LDX $68
  X = zp(0x68);
  setZN(X);

  // --- pc 8F41 ---
  // $8F41: PLA
  A = pull(); setZN(A);

  // --- pc 8F44 ---
  // $8F44: JSR $9B28
  pushWord(PC + 2);
  PC = 0x9B28;
  return;

  // --- pc 8F47 ---
  // $8F47: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8F48 ---
  // $8F48: BRK
  // BRK (halt for now)
  return;

  // --- pc 8F4A ---
  // $8F4A: NOP
  // NOP

  // --- pc 8F4D ---
  // $8F4D: ORA $E8
  A = (A | zp(0xE8)) & 0xFF;
  setZN(A);

  // --- pc 8F4E ---
  // $8F4E: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 8F4F ---
  // $8F4F: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8F52 ---
  // $8F52: BNE $8F49
  if (!Z) { PC = 0x8F49; return; }

  // --- pc 8F53 ---
  // $8F53: SBC $20,X
  { const r = zp((0x20 + X) & 0xFF) ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8F57 ---
  // $8F57: DEC $E8
  mem[0xE8] = (mem[0xE8] - 1) & 0xFF; setZN(mem[0xE8]);

  // --- pc 8F58 ---
  // $8F58: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 8F5A ---
  // $8F5A: BVS $8F01
  if (V) { PC = 0x8F01; return; }

  // --- pc 8F5C ---
  // $8F5C: NOP
  // NOP

  // --- pc 8F5D ---
  // $8F5D: CLC
  C = false;

  // --- pc 8F60 ---
  // $8F60: STA $EA
  mem[0xEA] = A;

  // --- pc 8F61 ---
  // $8F61: NOP
  // NOP

  // --- pc 8F64 ---
  // $8F64: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8F65 ---
  // $8F65: BRK
  // BRK (halt for now)
  return;

  // --- pc 8F68 ---
  // $8F68: LDA $67
  A = zp(0x67);
  setZN(A);

  // --- pc 8F6A ---
  // $8F6A: CLC
  C = false;

  // --- pc 8F6C ---
  // $8F6C: JSR $6785
  pushWord(PC + 2);
  PC = 0x6785;
  return;

  // --- pc 8F6F ---
  // $8F6F: LDA $68
  A = zp(0x68);
  setZN(A);

  // --- pc 8F70 ---
  // $8F70: PLA
  A = pull(); setZN(A);

  // --- pc 8F72 ---
  // $8F72: BRK
  // BRK (halt for now)
  return;

  // --- pc 8F74 ---
  // $8F74: PLA
  A = pull(); setZN(A);

  // --- pc 8F77 ---
  // $8F77: CMP #$03
  C = A >= 0x3;
  setZN((A - 0x3) & 0xFF);

  // --- pc 8F79 ---
  // $8F79: BNE $8F3E
  if (!Z) { PC = 0x8F3E; return; }

  // fall-through end

}



// func_8FCB.ts
// Address range: $8FCB-$8FD6
// Instructions: 6
// Total hits: 18
// First seen at frame: 7


export function func8FCB(): void {
  // hits: 18
  // pc range: $8FCB-$8FD6
  // --- pc 8FCB ---
  // $8FCB: LDX #$07
  X = 0x7;
  setZN(X);

  // --- pc 8FCD ---
  // $8FCD: JSR $C4B9
  pushWord(PC + 2);
  PC = 0xC4B9;
  return;

  // --- pc 8FCF ---
  // $8FCF: CPY $60
  C = Y >= zp(0x60);
  setZN((Y - zp(0x60)) & 0xFF);

  // --- pc 8FD0 ---
  // $8FD0: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8FD3 ---
  // $8FD3: BCC $8FF9
  if (!C) { PC = 0x8FF9; return; }

  // --- pc 8FD6 ---
  // $8FD6: BVC $903A
  if (!V) { PC = 0x903A; return; }

  // fall-through end

}



// func_9039.ts
// Address range: $9039-$9172
// Instructions: 156
// Total hits: 6,702
// First seen at frame: 7


export function func9039(): void {
  // hits: 6,702
  // pc range: $9039-$9172
  // --- pc 9039 ---
  // $9039: BCC $8FE4
  if (!C) { PC = 0x8FE4; return; }

  // --- pc 903B ---
  // $903B: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 903F ---
  // $903F: LDA $E7
  A = zp(0xE7);
  setZN(A);

  // --- pc 9041 ---
  // $9041: STA $05E8,X
  mem[(0x5E8 + X) & 0xFFFF] = A;

  // --- pc 9043 ---
  // $9043: ORA $E8
  A = (A | zp(0xE8)) & 0xFF;
  setZN(A);

  // --- pc 9044 ---
  // $9044: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9048 ---
  // $9048: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 904B ---
  // $904B: AND #$9C
  A = (A & 0x9C) & 0xFF;
  setZN(A);

  // --- pc 904D ---
  // $904D: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 904E ---
  // $904E: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9050 ---
  // $9050: INC $29
  mem[0x29] = (mem[0x29] + 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9052 ---
  // $9052: JSR $4A4A
  pushWord(PC + 2);
  PC = 0x4A4A;
  return;

  // --- pc 9053 ---
  // $9053: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9054 ---
  // $9054: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9056 ---
  // $9056: INC $29
  mem[0x29] = (mem[0x29] + 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9059 ---
  // $9059: STA $E6
  mem[0xE6] = A;

  // --- pc 905A ---
  // $905A: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 905C ---
  // $905C: PLA
  A = pull(); setZN(A);

  // --- pc 905D ---
  // $905D: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 905E ---
  // $905E: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 905F ---
  // $905F: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9060 ---
  // $9060: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9062 ---
  // $9062: BMI $907C
  if (N) { PC = 0x907C; return; }

  // --- pc 9063 ---
  // $9063: CLC
  C = false;

  // --- pc 9065 ---
  // $9065: CPY #$05
  C = Y >= 0x5;
  setZN((Y - 0x5) & 0xFF);

  // --- pc 9067 ---
  // $9067: INC $A8
  mem[0xA8] = (mem[0xA8] + 1) & 0xFF; setZN(mem[0xA8]);

  // --- pc 9068 ---
  // $9068: TAY
  Y = A; setZN(Y);

  // --- pc 906A ---
  // $906A: PLA
  A = pull(); setZN(A);

  // --- pc 906D ---
  // $906D: ADC #$03
  { const r = 0x3; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 906F ---
  // $906F: TAX
  X = A; setZN(X);

  // --- pc 9070 ---
  // $9070: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9072 ---
  // $9072: JSR $784C
  pushWord(PC + 2);
  PC = 0x784C;
  return;

  // --- pc 9077 ---
  // $9077: BIT $85
  { const t = zp(0x85); Z = (A & t) === 0; N = (t & 0x80) !== 0; V = (t & 0x40) !== 0; }

  // --- pc 907A ---
  // $907A: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 907B ---
  // $907B: BRK
  // BRK (halt for now)
  return;

  // --- pc 907D ---
  // $907D: INC $A0
  mem[0xA0] = (mem[0xA0] + 1) & 0xFF; setZN(mem[0xA0]);

  // --- pc 907F ---
  // $907F: BPL $9023
  if (!N) { PC = 0x9023; return; }

  // --- pc 9081 ---
  // $9081: JSR $E84C
  pushWord(PC + 2);
  PC = 0xE84C;
  return;

  // --- pc 9084 ---
  // $9084: TYA
  A = Y; setZN(A);

  // --- pc 9086 ---
  // $9086: BRK
  // BRK (halt for now)
  return;

  // --- pc 9088 ---
  // $9088: ORA ($99,X)
  A = (A | mem[indX(0x99)]) & 0xFF;
  setZN(A);

  // --- pc 908C ---
  // $908C: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 908F ---
  // $908F: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 9090 ---
  // $9090: BRK
  // BRK (halt for now)
  return;

  // --- pc 9093 ---
  // $9093: LDY #$01
  Y = 0x1;
  setZN(Y);

  // --- pc 9094 ---
  // $9094: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 9096 ---
  // $9096: EOR $EC85
  A = (A ^ mem[0xEC85]) & 0xFF;
  setZN(A);

  // --- pc 9098 ---
  // $9098: CPX $4DA5
  C = X >= mem[0x4DA5];
  setZN((X - mem[0x4DA5]) & 0xFF);

  // --- pc 909A ---
  // $909A: EOR $6918
  A = (A ^ mem[0x6918]) & 0xFF;
  setZN(A);

  // --- pc 909B ---
  // $909B: CLC
  C = false;

  // --- pc 909E ---
  // $909E: STA $4D
  mem[0x4D] = A;

  // --- pc 909F ---
  // $909F: EOR $4EA5
  A = (A ^ mem[0x4EA5]) & 0xFF;
  setZN(A);

  // --- pc 90A1 ---
  // $90A1: LSR $0069
  C = (mem[0x69] & 1) !== 0; mem[0x69] = mem[0x69] >>> 1; setZN(mem[0x69]);

  // --- pc 90A3 ---
  // $90A3: BRK
  // BRK (halt for now)
  return;

  // --- pc 90A5 ---
  // $90A5: LSR $68A9
  C = (mem[0x68A9] & 1) !== 0; mem[0x68A9] = mem[0x68A9] >>> 1; setZN(mem[0x68A9]);

  // --- pc 90A7 ---
  // $90A7: PLA
  A = pull(); setZN(A);

  // --- pc 90A9 ---
  // $90A9: STY $A9,X
  mem[(0xA9 + X) & 0xFF] = Y;

  // --- pc 90AB ---
  // $90AB: ORA $85
  A = (A | zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 90AD ---
  // $90AD: STA $A6,X
  mem[(0xA6 + X) & 0xFF] = A;

  // --- pc 90AF ---
  // $90AF: AND $86
  A = (A & zp(0x86)) & 0xFF;
  setZN(A);

  // --- pc 90B1 ---
  // $90B1: SBC $00A0
  { const r = mem[0xA0] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 90B3 ---
  // $90B3: BRK
  // BRK (halt for now)
  return;

  // --- pc 90B5 ---
  // $90B5: EOR $A2A8
  A = (A ^ mem[0xA2A8]) & 0xFF;
  setZN(A);

  // --- pc 90B6 ---
  // $90B6: TAY
  Y = A; setZN(Y);

  // --- pc 90B8 ---
  // $90B8: ORA #$C9
  A = (A | 0xC9) & 0xFF;
  setZN(A);

  // --- pc 90BA ---
  // $90BA: ADC $0590
  { const r = mem[0x590]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 90BC ---
  // $90BC: ORA $38
  A = (A | zp(0x38)) & 0xFF;
  setZN(A);

  // --- pc 90BD ---
  // $90BD: SEC
  C = true;

  // --- pc 90BF ---
  // $90BF: ADC $E8A8
  { const r = mem[0xE8A8]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 90C0 ---
  // $90C0: TAY
  Y = A; setZN(Y);

  // --- pc 90C1 ---
  // $90C1: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 90C4 ---
  // $90C4: CPY $98
  C = Y >= zp(0x98);
  setZN((Y - zp(0x98)) & 0xFF);

  // --- pc 90C5 ---
  // $90C5: TYA
  A = Y; setZN(A);

  // --- pc 90C6 ---
  // $90C6: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 90C7 ---
  // $90C7: TAY
  Y = A; setZN(Y);

  // --- pc 90C9 ---
  // $90C9: BRK
  // BRK (halt for now)
  return;

  // --- pc 90CB ---
  // $90CB: BRK
  // BRK (halt for now)
  return;

  // --- pc 90CC ---
  // $90CC: TAX
  X = A; setZN(X);

  // --- pc 90CD ---
  // $90CD: TYA
  A = Y; setZN(A);

  // --- pc 90CE ---
  // $90CE: CLC
  C = false;

  // --- pc 90D0 ---
  // $90D0: BRK
  // BRK (halt for now)
  return;

  // --- pc 90D3 ---
  // $90D3: TXA
  A = X; setZN(A);

  // --- pc 90D5 ---
  // $90D5: LDY #$85
  Y = 0x85;
  setZN(Y);

  // --- pc 90D8 ---
  // $90D8: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 90D9 ---
  // $90D9: BRK
  // BRK (halt for now)
  return;

  // --- pc 90DC ---
  // $90DC: TAX
  X = A; setZN(X);

  // --- pc 90DD ---
  // $90DD: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 90E0 ---
  // $90E0: STA $93
  mem[0x93] = A;

  // --- pc 90E2 ---
  // $90E2: STX $92
  mem[0x92] = X;

  // --- pc 90E4 ---
  // $90E4: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 90E5 ---
  // $90E5: BRK
  // BRK (halt for now)
  return;

  // --- pc 90E9 ---
  // $90E9: STA ($94),Y
  mem[indY(0x94)] = A;

  // --- pc 90EA ---
  // $90EA: STY $C8,X
  mem[(0xC8 + X) & 0xFF] = Y;

  // --- pc 90EB ---
  // $90EB: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 90ED ---
  // $90ED: JSR $F6D0
  pushWord(PC + 2);
  PC = 0xF6D0;
  return;

  // --- pc 90EF ---
  // $90EF: INC $A5,X
  mem[(0xA5 + X) & 0xFF] = (mem[(0xA5 + X) & 0xFF] + 1) & 0xFF; setZN(mem[(0xA5 + X) & 0xFF]);

  // --- pc 90F1 ---
  // $90F1: AND $38
  A = (A & zp(0x38)) & 0xFF;
  setZN(A);

  // --- pc 90F2 ---
  // $90F2: SEC
  C = true;

  // --- pc 90F4 ---
  // $90F4: ORA #$A0
  A = (A | 0xA0) & 0xFF;
  setZN(A);

  // --- pc 90F6 ---
  // $90F6: BRK
  // BRK (halt for now)
  return;

  // --- pc 90F8 ---
  // $90F8: STY $91,X
  mem[(0x91 + X) & 0xFF] = Y;

  // --- pc 90FA ---
  // $90FA: STY $A0,X
  mem[(0xA0 + X) & 0xFF] = Y;

  // --- pc 90FC ---
  // $90FC: BRK
  // BRK (halt for now)
  return;

  // --- pc 90FF ---
  // $90FF: STA $49
  mem[0x49] = A;

  // --- pc 9100 ---
  // $9100: EOR #$E6
  A = (A ^ 0xE6) & 0xFF;
  setZN(A);

  // --- pc 9103 ---
  // $9103: BNE $9107
  if (!Z) { PC = 0x9107; return; }

  // --- pc 9107 ---
  // $9107: LDY #$02
  Y = 0x2;
  setZN(Y);

  // --- pc 9109 ---
  // $9109: LDA $92
  A = zp(0x92);
  setZN(A);

  // --- pc 910B ---
  // $910B: STA ($94),Y
  mem[indY(0x94)] = A;

  // --- pc 910C ---
  // $910C: STY $C8,X
  mem[(0xC8 + X) & 0xFF] = Y;

  // --- pc 910D ---
  // $910D: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9110 ---
  // $9110: STA ($94),Y
  mem[indY(0x94)] = A;

  // --- pc 9111 ---
  // $9111: STY $A6,X
  mem[(0xA6 + X) & 0xFF] = Y;

  // --- pc 9113 ---
  // $9113: SBC $B920
  { const r = mem[0xB920] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9116 ---
  // $9116: CPY $E6
  C = Y >= zp(0xE6);
  setZN((Y - zp(0xE6)) & 0xFF);

  // --- pc 9118 ---
  // $9118: EOR $02D0
  A = (A ^ mem[0x2D0]) & 0xFF;
  setZN(A);

  // --- pc 911C ---
  // $911C: LSR $94A5
  C = (mem[0x94A5] & 1) !== 0; mem[0x94A5] = mem[0x94A5] >>> 1; setZN(mem[0x94A5]);

  // --- pc 911E ---
  // $911E: STY $18,X
  mem[(0x18 + X) & 0xFF] = Y;

  // --- pc 911F ---
  // $911F: CLC
  C = false;

  // --- pc 9121 ---
  // $9121: JSR $9485
  pushWord(PC + 2);
  PC = 0x9485;
  return;

  // --- pc 9123 ---
  // $9123: STY $A5,X
  mem[(0xA5 + X) & 0xFF] = Y;

  // --- pc 9125 ---
  // $9125: STA $69,X
  mem[(0x69 + X) & 0xFF] = A;

  // --- pc 9127 ---
  // $9127: BRK
  // BRK (halt for now)
  return;

  // --- pc 9129 ---
  // $9129: STA $C6,X
  mem[(0xC6 + X) & 0xFF] = A;

  // --- pc 912B ---
  // $912B: CPX $03F0
  C = X >= mem[0x3F0];
  setZN((X - mem[0x3F0]) & 0xFF);

  // --- pc 9130 ---
  // $9130: BCC $90D4
  if (!C) { PC = 0x90D4; return; }

  // --- pc 9132 ---
  // $9132: ORA ($A9),Y
  A = (A | mem[indY(0xA9)]) & 0xFF;
  setZN(A);

  // --- pc 9135 ---
  // $9135: STA $00,X
  mem[(0x0 + X) & 0xFF] = A;

  // --- pc 9136 ---
  // $9136: BRK
  // BRK (halt for now)
  return;

  // --- pc 9138 ---
  // $9138: STA ($95),Y
  mem[indY(0x95)] = A;

  // --- pc 913A ---
  // $913A: ORA ($A0,X)
  A = (A | mem[indX(0xA0)]) & 0xFF;
  setZN(A);

  // --- pc 913C ---
  // $913C: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 913E ---
  // $913E: BRK
  // BRK (halt for now)
  return;

  // --- pc 9142 ---
  // $9142: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9144 ---
  // $9144: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 9148 ---
  // $9148: LDA #$68
  A = 0x68;
  setZN(A);

  // --- pc 9149 ---
  // $9149: PLA
  A = pull(); setZN(A);

  // --- pc 914B ---
  // $914B: STY $A9,X
  mem[(0xA9 + X) & 0xFF] = Y;

  // --- pc 914D ---
  // $914D: ORA $85
  A = (A | zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 914F ---
  // $914F: STA $A9,X
  mem[(0xA9 + X) & 0xFF] = A;

  // --- pc 9152 ---
  // $9152: STA $96
  mem[0x96] = A;

  // --- pc 9153 ---
  // $9153: STX $A0,Y
  mem[(0xA0 + Y) & 0xFF] = X;

  // --- pc 9155 ---
  // $9155: BRK
  // BRK (halt for now)
  return;

  // --- pc 9157 ---
  // $9157: STY $30,X
  mem[(0x30 + X) & 0xFF] = Y;

  // --- pc 915A ---
  // $915A: JMP $94C1
  PC = 0x94C1;
  return;

  // --- pc 915C ---
  // $915C: STY $AA,X
  mem[(0xAA + X) & 0xFF] = Y;

  // --- pc 915D ---
  // $915D: TAX
  X = A; setZN(X);

  // --- pc 9160 ---
  // $9160: JSR $974A
  pushWord(PC + 2);
  PC = 0x974A;
  return;

  // --- pc 9163 ---
  // $9163: LDY #$06
  Y = 0x6;
  setZN(Y);

  // --- pc 9164 ---
  // $9164: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 9168 ---
  // $9168: TXA
  A = X; setZN(A);

  // --- pc 916A ---
  // $916A: BPL $913C
  if (!N) { PC = 0x913C; return; }

  // --- pc 916C ---
  // $916C: AND $298A,Y
  A = (A & mem[(0x298A + Y) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 916D ---
  // $916D: TXA
  A = X; setZN(A);

  // --- pc 916F ---
  // $916F: JSR $03D0
  pushWord(PC + 2);
  PC = 0x03D0;
  return;

  // --- pc 9172 ---
  // $9172: JMP $91F3
  PC = 0x91F3;
  return;

  // fall-through end

}



// func_91F2.ts
// Address range: $91F2-$9228
// Instructions: 25
// Total hits: 32
// First seen at frame: 8


export function func91F2(): void {
  // hits: 32
  // pc range: $91F2-$9228
  // --- pc 91F2 ---
  // $91F2: CPY $01A0
  C = Y >= mem[0x1A0];
  setZN((Y - mem[0x1A0]) & 0xFF);

  // --- pc 91F4 ---
  // $91F4: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 91F6 ---
  // $91F6: STY $38,X
  mem[(0x38 + X) & 0xFF] = Y;

  // --- pc 91F7 ---
  // $91F7: SEC
  C = true;

  // --- pc 91F9 ---
  // $91F9: ORA ($91,X)
  A = (A | mem[indX(0x91)]) & 0xFF;
  setZN(A);

  // --- pc 91FB ---
  // $91FB: STY $F0,X
  mem[(0xF0 + X) & 0xFF] = Y;

  // --- pc 9200 ---
  // $9200: STY $A0,X
  mem[(0xA0 + X) & 0xFF] = Y;

  // --- pc 9202 ---
  // $9202: BRK
  // BRK (halt for now)
  return;

  // --- pc 9204 ---
  // $9204: STY $29,X
  mem[(0x29 + X) & 0xFF] = Y;

  // --- pc 9206 ---
  // $9206: ORA ($18,X)
  A = (A | mem[indX(0x18)]) & 0xFF;
  setZN(A);

  // --- pc 9207 ---
  // $9207: CLC
  C = false;

  // --- pc 9209 ---
  // $9209: ORA #$AA
  A = (A | 0xAA) & 0xFF;
  setZN(A);

  // --- pc 920A ---
  // $920A: TAX
  X = A; setZN(X);

  // --- pc 920D ---
  // $920D: CPY $A0
  C = Y >= zp(0xA0);
  setZN((Y - zp(0xA0)) & 0xFF);

  // --- pc 9210 ---
  // $9210: LDA ($94),Y
  A = mem[indY(0x94)];
  setZN(A);

  // --- pc 9211 ---
  // $9211: STY $85,X
  mem[(0x85 + X) & 0xFF] = Y;

  // --- pc 9214 ---
  // $9214: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9216 ---
  // $9216: STY $85,X
  mem[(0x85 + X) & 0xFF] = Y;

  // --- pc 9219 ---
  // $9219: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 921A ---
  // $921A: BRK
  // BRK (halt for now)
  return;

  // --- pc 921C ---
  // $921C: STY $29,X
  mem[(0x29 + X) & 0xFF] = Y;

  // --- pc 921F ---
  // $921F: BEQ $9224
  if (Z) { PC = 0x9224; return; }

  // --- pc 9223 ---
  // $9223: STY $A0,X
  mem[(0xA0 + X) & 0xFF] = Y;

  // --- pc 9225 ---
  // $9225: BRK
  // BRK (halt for now)
  return;

  // --- pc 9228 ---
  // $9228: BMI $9241
  if (N) { PC = 0x9241; return; }

  // fall-through end

}



// func_9240.ts
// Address range: $9240-$9269
// Instructions: 14
// Total hits: 23
// First seen at frame: 8


export function func9240(): void {
  // hits: 23
  // pc range: $9240-$9269
  // --- pc 9240 ---
  // $9240: STY $C9,X
  mem[(0xC9 + X) & 0xFF] = Y;

  // --- pc 9242 ---
  // $9242: LDY #$B0
  Y = 0xB0;
  setZN(Y);

  // --- pc 9245 ---
  // $9245: CLC
  C = false;

  // --- pc 9247 ---
  // $9247: JSR $E785
  pushWord(PC + 2);
  PC = 0xE785;
  return;

  // --- pc 924A ---
  // $924A: LDY #$01
  Y = 0x1;
  setZN(Y);

  // --- pc 924B ---
  // $924B: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 924E ---
  // $924E: STA $E6
  mem[0xE6] = A;

  // --- pc 924F ---
  // $924F: INC $20
  mem[0x20] = (mem[0x20] + 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 9252 ---
  // $9252: STY $A9,X
  mem[(0xA9 + X) & 0xFF] = Y;

  // --- pc 9255 ---
  // $9255: JMP $94AE
  PC = 0x94AE;
  return;

  // --- pc 9257 ---
  // $9257: STY $C9,X
  mem[(0xC9 + X) & 0xFF] = Y;

  // --- pc 9259 ---
  // $9259: CPY #$B0
  C = Y >= 0xB0;
  setZN((Y - 0xB0) & 0xFF);

  // --- pc 9268 ---
  // $9268: CMP #$E0
  C = A >= 0xE0;
  setZN((A - 0xE0) & 0xFF);

  // --- pc 9269 ---
  // $9269: CPX #$B0
  C = X >= 0xB0;
  setZN((X - 0xB0) & 0xFF);

  // fall-through end

}



// func_92A0.ts
// Address range: $92A0-$92A1
// Instructions: 2
// Total hits: 4
// First seen at frame: 8


export function func92A0(): void {
  // hits: 4
  // pc range: $92A0-$92A1
  // --- pc 92A0 ---
  // $92A0: CMP #$F0
  C = A >= 0xF0;
  setZN((A - 0xF0) & 0xFF);

  // --- pc 92A1 ---
  // $92A1: BEQ $9253
  if (Z) { PC = 0x9253; return; }

  // fall-through end

}



// func_92D7.ts
// Address range: $92D7-$92E3
// Instructions: 6
// Total hits: 18
// First seen at frame: 8


export function func92D7(): void {
  // hits: 18
  // pc range: $92D7-$92E3
  // --- pc 92D7 ---
  // $92D7: SEC
  C = true;

  // --- pc 92D9 ---
  // $92D9: BEQ $92E5
  if (Z) { PC = 0x92E5; return; }

  // --- pc 92DA ---
  // $92DA: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 92DB ---
  // $92DB: TAX
  X = A; setZN(X);

  // --- pc 92DF ---
  // $92DF: PHA
  push(A);

  // --- pc 92E3 ---
  // $92E3: PHA
  push(A);

  // fall-through end

}



// func_9338.ts
// Address range: $9338-$934D
// Instructions: 10
// Total hits: 10
// First seen at frame: 8


export function func9338(): void {
  // hits: 10
  // pc range: $9338-$934D
  // --- pc 9338 ---
  // $9338: STY $A0,X
  mem[(0xA0 + X) & 0xFF] = Y;

  // --- pc 933A ---
  // $933A: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 933D ---
  // $933D: LDY #$04
  Y = 0x4;
  setZN(Y);

  // --- pc 933F ---
  // $933F: JSR $9735
  pushWord(PC + 2);
  PC = 0x9735;
  return;

  // --- pc 9342 ---
  // $9342: LDY #$02
  Y = 0x2;
  setZN(Y);

  // --- pc 9344 ---
  // $9344: LDA ($92),Y
  A = mem[indY(0x92)];
  setZN(A);

  // --- pc 9346 ---
  // $9346: LDY #$06
  Y = 0x6;
  setZN(Y);

  // --- pc 9347 ---
  // $9347: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 934B ---
  // $934B: LDA #$03
  A = 0x3;
  setZN(A);

  // --- pc 934D ---
  // $934D: JMP $94AE
  PC = 0x94AE;
  return;

  // fall-through end

}



// func_94AE.ts
// Address range: $94AE-$9633
// Instructions: 191
// Total hits: 11,593
// First seen at frame: 8


export function func94AE(): void {
  // hits: 11,593
  // pc range: $94AE-$9633
  // --- pc 94AE ---
  // $94AE: CLC
  C = false;

  // --- pc 94B1 ---
  // $94B1: STA $92
  mem[0x92] = A;

  // --- pc 94B3 ---
  // $94B3: LDA $93
  A = zp(0x93);
  setZN(A);

  // --- pc 94B5 ---
  // $94B5: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 94B6 ---
  // $94B6: BRK
  // BRK (halt for now)
  return;

  // --- pc 94B9 ---
  // $94B9: JMP $9224
  PC = 0x9224;
  return;

  // --- pc 94BC ---
  // $94BC: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 94BD ---
  // $94BD: BRK
  // BRK (halt for now)
  return;

  // --- pc 94BE ---
  // $94BE: TAY
  Y = A; setZN(Y);

  // --- pc 94C0 ---
  // $94C0: STY $A5,X
  mem[(0xA5 + X) & 0xFF] = Y;

  // --- pc 94C2 ---
  // $94C2: STY $18,X
  mem[(0x18 + X) & 0xFF] = Y;

  // --- pc 94C3 ---
  // $94C3: CLC
  C = false;

  // --- pc 94C5 ---
  // $94C5: JSR $9485
  pushWord(PC + 2);
  PC = 0x9485;
  return;

  // --- pc 94C7 ---
  // $94C7: STY $A5,X
  mem[(0xA5 + X) & 0xFF] = Y;

  // --- pc 94C9 ---
  // $94C9: STA $69,X
  mem[(0x69 + X) & 0xFF] = A;

  // --- pc 94CB ---
  // $94CB: BRK
  // BRK (halt for now)
  return;

  // --- pc 94CD ---
  // $94CD: STA $C6,X
  mem[(0xC6 + X) & 0xFF] = A;

  // --- pc 94CF ---
  // $94CF: STX $F0,Y
  mem[(0xF0 + Y) & 0xFF] = X;

  // --- pc 94D2 ---
  // $94D2: JMP $9154
  PC = 0x9154;
  return;

  // --- pc 94D4 ---
  // $94D4: STA ($4C),Y
  mem[indY(0x4C)] = A;

  // --- pc 94D7 ---
  // $94D7: STA ($A0),Y
  mem[indY(0xA0)] = A;

  // --- pc 94D9 ---
  // $94D9: BRK
  // BRK (halt for now)
  return;

  // --- pc 94DB ---
  // $94DB: INC $09
  mem[0x9] = (mem[0x9] + 1) & 0xFF; setZN(mem[0x9]);

  // --- pc 94DE ---
  // $94DE: STA $9E
  mem[0x9E] = A;

  // --- pc 94E0 ---
  // $94E0: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 94E2 ---
  // $94E2: INC $85
  mem[0x85] = (mem[0x85] + 1) & 0xFF; setZN(mem[0x85]);

  // --- pc 94E5 ---
  // $94E5: LDY #$02
  Y = 0x2;
  setZN(Y);

  // --- pc 94E7 ---
  // $94E7: LDA ($E6),Y
  A = mem[indY(0xE6)];
  setZN(A);

  // --- pc 94E8 ---
  // $94E8: INC $85
  mem[0x85] = (mem[0x85] + 1) & 0xFF; setZN(mem[0x85]);

  // --- pc 94EA ---
  // $94EA: LDY #$C8
  Y = 0xC8;
  setZN(Y);

  // --- pc 94EB ---
  // $94EB: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 94ED ---
  // $94ED: INC $85
  mem[0x85] = (mem[0x85] + 1) & 0xFF; setZN(mem[0x85]);

  // --- pc 94EF ---
  // $94EF: LDA ($A5,X)
  A = mem[indX(0xA5)];
  setZN(A);

  // --- pc 94F1 ---
  // $94F1: INC $18
  mem[0x18] = (mem[0x18] + 1) & 0xFF; setZN(mem[0x18]);

  // --- pc 94F2 ---
  // $94F2: CLC
  C = false;

  // --- pc 94F5 ---
  // $94F5: STA $E6
  mem[0xE6] = A;

  // --- pc 94F6 ---
  // $94F6: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 94F9 ---
  // $94F9: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 94FA ---
  // $94FA: BRK
  // BRK (halt for now)
  return;

  // --- pc 94FD ---
  // $94FD: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 94FE ---
  // $94FE: BRK
  // BRK (halt for now)
  return;

  // --- pc 9500 ---
  // $9500: STY $A0,X
  mem[(0xA0 + X) & 0xFF] = Y;

  // --- pc 9502 ---
  // $9502: BPL $952D
  if (!N) { PC = 0x952D; return; }

  // --- pc 9504 ---
  // $9504: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 9507 ---
  // $9507: LDA $97
  A = zp(0x97);
  setZN(A);

  // --- pc 9509 ---
  // $9509: STA ($94),Y
  mem[indY(0x94)] = A;

  // --- pc 950A ---
  // $950A: STY $B1,X
  mem[(0xB1 + X) & 0xFF] = Y;

  // --- pc 950C ---
  // $950C: STY $85,X
  mem[(0x85 + X) & 0xFF] = Y;

  // --- pc 950E ---
  // $950E: TYA
  A = Y; setZN(A);

  // --- pc 9510 ---
  // $9510: BRK
  // BRK (halt for now)
  return;

  // --- pc 9512 ---
  // $9512: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9514 ---
  // $9514: SBC #$A0
  { const r = 0xA0 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9516 ---
  // $9516: BRK
  // BRK (halt for now)
  return;

  // --- pc 9518 ---
  // $9518: INC $30
  mem[0x30] = (mem[0x30] + 1) & 0xFF; setZN(mem[0x30]);

  // --- pc 951A ---
  // $951A: ROR $98A6
  { const c = C ? 0x80 : 0; C = (mem[0x98A6] & 1) !== 0; mem[0x98A6] = (mem[0x98A6] >>> 1) | c; setZN(mem[0x98A6]); }

  // --- pc 951C ---
  // $951C: TYA
  A = Y; setZN(A);

  // --- pc 951F ---
  // $951F: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9520 ---
  // $9520: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9522 ---
  // $9522: BPL $956E
  if (!N) { PC = 0x956E; return; }

  // --- pc 9523 ---
  // $9523: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9524 ---
  // $9524: CLC
  C = false;

  // --- pc 9526 ---
  // $9526: TXS
  SP = X;

  // --- pc 952A ---
  // $952A: STA $EA
  mem[0xEA] = A;

  // --- pc 952B ---
  // $952B: NOP
  // NOP

  // --- pc 952D ---
  // $952D: BRK
  // BRK (halt for now)
  return;

  // --- pc 9530 ---
  // $9530: JMP $9541
  PC = 0x9541;
  return;

  // --- pc 9532 ---
  // $9532: STA $38,X
  mem[(0x38 + X) & 0xFF] = A;

  // --- pc 9533 ---
  // $9533: SEC
  C = true;

  // --- pc 9534 ---
  // $9534: ROR
  { const c = C ? 0x80 : 0; C = (A & 1) !== 0; A = (A >>> 1) | c; setZN(A); }

  // --- pc 9535 ---
  // $9535: CLC
  C = false;

  // --- pc 9537 ---
  // $9537: TXS
  SP = X;

  // --- pc 953B ---
  // $953B: STA $EA
  mem[0xEA] = A;

  // --- pc 953C ---
  // $953C: NOP
  // NOP

  // --- pc 953E ---
  // $953E: BRK
  // BRK (halt for now)
  return;

  // --- pc 9541 ---
  // $9541: AND #$01
  A = (A & 0x1) & 0xFF;
  setZN(A);

  // --- pc 9542 ---
  // $9542: ORA ($85,X)
  A = (A | mem[indX(0x85)]) & 0xFF;
  setZN(A);

  // --- pc 9545 ---
  // $9545: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9547 ---
  // $9547: CPX $E8A5
  C = X >= mem[0xE8A5];
  setZN((X - mem[0xE8A5]) & 0xFF);

  // --- pc 9549 ---
  // $9549: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 954D ---
  // $954D: LDA $E9
  A = zp(0xE9);
  setZN(A);

  // --- pc 954E ---
  // $954E: SBC #$29
  { const r = 0x29 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9550 ---
  // $9550: ORA ($05,X)
  A = (A | mem[indX(0x5)]) & 0xFF;
  setZN(A);

  // --- pc 9552 ---
  // $9552: CPX $0A0A
  C = X >= mem[0xA0A];
  setZN((X - mem[0xA0A]) & 0xFF);

  // --- pc 9553 ---
  // $9553: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9554 ---
  // $9554: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9556 ---
  // $9556: CPX $00A0
  C = X >= mem[0xA0];
  setZN((X - mem[0xA0]) & 0xFF);

  // --- pc 9558 ---
  // $9558: BRK
  // BRK (halt for now)
  return;

  // --- pc 955A ---
  // $955A: INC $51
  mem[0x51] = (mem[0x51] + 1) & 0xFF; setZN(mem[0x51]);

  // --- pc 955C ---
  // $955C: STY $29,X
  mem[(0x29 + X) & 0xFF] = Y;

  // --- pc 955E ---
  // $955E: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 9560 ---
  // $9560: CPX $EC85
  C = X >= mem[0xEC85];
  setZN((X - mem[0xEC85]) & 0xFF);

  // --- pc 9562 ---
  // $9562: CPX $E6B1
  C = X >= mem[0xE6B1];
  setZN((X - mem[0xE6B1]) & 0xFF);

  // --- pc 9564 ---
  // $9564: INC $29
  mem[0x29] = (mem[0x29] + 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9567 ---
  // $9567: ORA $EC
  A = (A | zp(0xEC)) & 0xFF;
  setZN(A);

  // --- pc 9568 ---
  // $9568: CPX $6A9D
  C = X >= mem[0x6A9D];
  setZN((X - mem[0x6A9D]) & 0xFF);

  // --- pc 956C ---
  // $956C: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 956E ---
  // $956E: INC $9D
  mem[0x9D] = (mem[0x9D] + 1) & 0xFF; setZN(mem[0x9D]);

  // --- pc 9572 ---
  // $9572: LDA $98
  A = zp(0x98);
  setZN(A);

  // --- pc 9573 ---
  // $9573: TYA
  A = Y; setZN(A);

  // --- pc 9574 ---
  // $9574: CLC
  C = false;

  // --- pc 9577 ---
  // $9577: STA $98
  mem[0x98] = A;

  // --- pc 9578 ---
  // $9578: TYA
  A = Y; setZN(A);

  // --- pc 957A ---
  // $957A: INC $18
  mem[0x18] = (mem[0x18] + 1) & 0xFF; setZN(mem[0x18]);

  // --- pc 957B ---
  // $957B: CLC
  C = false;

  // --- pc 957E ---
  // $957E: STA $E6
  mem[0xE6] = A;

  // --- pc 957F ---
  // $957F: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 9582 ---
  // $9582: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9583 ---
  // $9583: BRK
  // BRK (halt for now)
  return;

  // --- pc 9586 ---
  // $9586: JMP $9515
  PC = 0x9515;
  return;

  // --- pc 9588 ---
  // $9588: STA $C9,X
  mem[(0xC9 + X) & 0xFF] = A;

  // --- pc 958A ---
  // $958A: LDY #$B0
  Y = 0xB0;
  setZN(Y);

  // --- pc 958D ---
  // $958D: LDX #$00
  X = 0x0;
  setZN(X);

  // --- pc 958E ---
  // $958E: BRK
  // BRK (halt for now)
  return;

  // --- pc 958F ---
  // $958F: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9590 ---
  // $9590: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9591 ---
  // $9591: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9593 ---
  // $9593: NOP
  // NOP

  // --- pc 9595 ---
  // $9595: ORA ($CA,X)
  A = (A | mem[indX(0xCA)]) & 0xFF;
  setZN(A);

  // --- pc 9596 ---
  // $9596: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc 9599 ---
  // $9599: LDA $9A
  A = zp(0x9A);
  setZN(A);

  // --- pc 959A ---
  // $959A: TXS
  SP = X;

  // --- pc 959B ---
  // $959B: CLC
  C = false;

  // --- pc 959D ---
  // $959D: NOP
  // NOP

  // --- pc 959F ---
  // $959F: NOP
  // NOP

  // --- pc 95A2 ---
  // $95A2: ADC $EB
  { const r = zp(0xEB); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 95A4 ---
  // $95A4: STA $EB
  mem[0xEB] = A;

  // --- pc 95A6 ---
  // $95A6: INC $E6
  mem[0xE6] = (mem[0xE6] + 1) & 0xFF; setZN(mem[0xE6]);

  // --- pc 95A7 ---
  // $95A7: INC $D0
  mem[0xD0] = (mem[0xD0] + 1) & 0xFF; setZN(mem[0xD0]);

  // --- pc 95AC ---
  // $95AC: JMP $9515
  PC = 0x9515;
  return;

  // --- pc 95AE ---
  // $95AE: STA $C9,X
  mem[(0xC9 + X) & 0xFF] = A;

  // --- pc 95B0 ---
  // $95B0: CPY #$B0
  C = Y >= 0xB0;
  setZN((Y - 0xB0) & 0xFF);

  // --- pc 95B3 ---
  // $95B3: TAX
  X = A; setZN(X);

  // --- pc 95B5 ---
  // $95B5: BRK
  // BRK (halt for now)
  return;

  // --- pc 95B7 ---
  // $95B7: STY $0A,X
  mem[(0xA + X) & 0xFF] = Y;

  // --- pc 95B8 ---
  // $95B8: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 95C1 ---
  // $95C1: TAX
  X = A; setZN(X);

  // --- pc 95C2 ---
  // $95C2: TXA
  A = X; setZN(A);

  // --- pc 95C4 ---
  // $95C4: BRK
  // BRK (halt for now)
  return;

  // --- pc 95C5 ---
  // $95C5: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 95C6 ---
  // $95C6: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 95C7 ---
  // $95C7: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 95C9 ---
  // $95C9: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 95CB ---
  // $95CB: ORA ($CA,X)
  A = (A | mem[indX(0xCA)]) & 0xFF;
  setZN(A);

  // --- pc 95CC ---
  // $95CC: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc 95CE ---
  // $95CE: SBC #$A5
  { const r = 0xA5 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 95D1 ---
  // $95D1: CLC
  C = false;

  // --- pc 95D3 ---
  // $95D3: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 95D5 ---
  // $95D5: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 95D7 ---
  // $95D7: STA $E965,X
  mem[(0xE965 + X) & 0xFFFF] = A;

  // --- pc 95D9 ---
  // $95D9: SBC #$85
  { const r = 0x85 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 95DB ---
  // $95DB: SBC #$E6
  { const r = 0xE6 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 95DD ---
  // $95DD: INC $D0
  mem[0xD0] = (mem[0xD0] + 1) & 0xFF; setZN(mem[0xD0]);

  // --- pc 95E2 ---
  // $95E2: JMP $9515
  PC = 0x9515;
  return;

  // --- pc 95E4 ---
  // $95E4: STA $C9,X
  mem[(0xC9 + X) & 0xFF] = A;

  // --- pc 95E6 ---
  // $95E6: BNE $9578
  if (!Z) { PC = 0x9578; return; }

  // --- pc 95E9 ---
  // $95E9: JMP $9684
  PC = 0x9684;
  return;

  // --- pc 95EB ---
  // $95EB: STX $AA,Y
  mem[(0xAA + Y) & 0xFF] = X;

  // --- pc 95EC ---
  // $95EC: TAX
  X = A; setZN(X);

  // --- pc 95EE ---
  // $95EE: BRK
  // BRK (halt for now)
  return;

  // --- pc 95F0 ---
  // $95F0: STY $0A,X
  mem[(0xA + X) & 0xFF] = Y;

  // --- pc 95F1 ---
  // $95F1: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 95FA ---
  // $95FA: TAX
  X = A; setZN(X);

  // --- pc 95FB ---
  // $95FB: TXA
  A = X; setZN(A);

  // --- pc 95FD ---
  // $95FD: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 95FF ---
  // $95FF: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 9600 ---
  // $9600: TXA
  A = X; setZN(A);

  // --- pc 9603 ---
  // $9603: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 9604 ---
  // $9604: BRK
  // BRK (halt for now)
  return;

  // --- pc 9607 ---
  // $9607: STX $8A,Y
  mem[(0x8A + Y) & 0xFF] = X;

  // --- pc 9608 ---
  // $9608: TXA
  A = X; setZN(A);

  // --- pc 960A ---
  // $960A: BEQ $95AC
  if (Z) { PC = 0x95AC; return; }

  // --- pc 960D ---
  // $960D: CLC
  C = false;

  // --- pc 960F ---
  // $960F: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9611 ---
  // $9611: TYA
  A = Y; setZN(A);

  // --- pc 9615 ---
  // $9615: TYA
  A = Y; setZN(A);

  // --- pc 9617 ---
  // $9617: SBC #$29
  { const r = 0x29 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9619 ---
  // $9619: ORA ($85,X)
  A = (A | mem[indX(0x85)]) & 0xFF;
  setZN(A);

  // --- pc 961B ---
  // $961B: CPX $01A0
  C = X >= mem[0x1A0];
  setZN((X - mem[0x1A0]) & 0xFF);

  // --- pc 961D ---
  // $961D: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 961F ---
  // $961F: INC $29
  mem[0x29] = (mem[0x29] + 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9622 ---
  // $9622: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9623 ---
  // $9623: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9624 ---
  // $9624: TAY
  Y = A; setZN(Y);

  // --- pc 9626 ---
  // $9626: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 9628 ---
  // $9628: ASL $1898
  C = (mem[0x1898] & 0x80) !== 0; mem[0x1898] = (mem[0x1898] << 1) & 0xFF; setZN(mem[0x1898]);

  // --- pc 9629 ---
  // $9629: TYA
  A = Y; setZN(A);

  // --- pc 962A ---
  // $962A: CLC
  C = false;

  // --- pc 962C ---
  // $962C: NOP
  // NOP

  // --- pc 9630 ---
  // $9630: LDA $EB
  A = zp(0xEB);
  setZN(A);

  // --- pc 9632 ---
  // $9632: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9633 ---
  // $9633: BRK
  // BRK (halt for now)
  return;

  // fall-through end

}



// func_9644.ts
// Address range: $9644-$9690
// Instructions: 41
// Total hits: 537
// First seen at frame: 8


export function func9644(): void {
  // hits: 537
  // pc range: $9644-$9690
  // --- pc 9644 ---
  // $9644: BRK
  // BRK (halt for now)
  return;

  // --- pc 9646 ---
  // $9646: ORA ($0A,X)
  A = (A | mem[indX(0xA)]) & 0xFF;
  setZN(A);

  // --- pc 9647 ---
  // $9647: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9649 ---
  // $9649: CPX $0A0A
  C = X >= mem[0xA0A];
  setZN((X - mem[0xA0A]) & 0xFF);

  // --- pc 964A ---
  // $964A: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 964B ---
  // $964B: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 964D ---
  // $964D: CPX $01A0
  C = X >= mem[0x1A0];
  setZN((X - mem[0x1A0]) & 0xFF);

  // --- pc 964F ---
  // $964F: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 9651 ---
  // $9651: INC $A0
  mem[0xA0] = (mem[0xA0] + 1) & 0xFF; setZN(mem[0xA0]);

  // --- pc 9653 ---
  // $9653: BRK
  // BRK (halt for now)
  return;

  // --- pc 9655 ---
  // $9655: STY $29,X
  mem[(0x29 + X) & 0xFF] = Y;

  // --- pc 9657 ---
  // $9657: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 9659 ---
  // $9659: CPX $EC85
  C = X >= mem[0xEC85];
  setZN((X - mem[0xEC85]) & 0xFF);

  // --- pc 965B ---
  // $965B: CPX $01A0
  C = X >= mem[0x1A0];
  setZN((X - mem[0x1A0]) & 0xFF);

  // --- pc 965D ---
  // $965D: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 965F ---
  // $965F: INC $29
  mem[0x29] = (mem[0x29] + 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9662 ---
  // $9662: ORA $EC
  A = (A | zp(0xEC)) & 0xFF;
  setZN(A);

  // --- pc 9663 ---
  // $9663: CPX $6A9D
  C = X >= mem[0x6A9D];
  setZN((X - mem[0x6A9D]) & 0xFF);

  // --- pc 9667 ---
  // $9667: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9669 ---
  // $9669: INC $9D
  mem[0x9D] = (mem[0x9D] + 1) & 0xFF; setZN(mem[0x9D]);

  // --- pc 966D ---
  // $966D: LDA $98
  A = zp(0x98);
  setZN(A);

  // --- pc 966E ---
  // $966E: TYA
  A = Y; setZN(A);

  // --- pc 966F ---
  // $966F: CLC
  C = false;

  // --- pc 9672 ---
  // $9672: STA $98
  mem[0x98] = A;

  // --- pc 9673 ---
  // $9673: TYA
  A = Y; setZN(A);

  // --- pc 9675 ---
  // $9675: INC $18
  mem[0x18] = (mem[0x18] + 1) & 0xFF; setZN(mem[0x18]);

  // --- pc 9676 ---
  // $9676: CLC
  C = false;

  // --- pc 9679 ---
  // $9679: STA $E6
  mem[0xE6] = A;

  // --- pc 967A ---
  // $967A: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 967D ---
  // $967D: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 967E ---
  // $967E: BRK
  // BRK (halt for now)
  return;

  // --- pc 9681 ---
  // $9681: JMP $9515
  PC = 0x9515;
  return;

  // --- pc 9683 ---
  // $9683: STA $38,X
  mem[(0x38 + X) & 0xFF] = A;

  // --- pc 9684 ---
  // $9684: SEC
  C = true;

  // --- pc 9686 ---
  // $9686: SED
  D = true;

  // --- pc 9687 ---
  // $9687: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9688 ---
  // $9688: TAX
  X = A; setZN(X);

  // --- pc 968B ---
  // $968B: STX $48,Y
  mem[(0x48 + Y) & 0xFF] = X;

  // --- pc 968C ---
  // $968C: PHA
  push(A);

  // --- pc 968F ---
  // $968F: STX $48,Y
  mem[(0x48 + Y) & 0xFF] = X;

  // --- pc 9690 ---
  // $9690: PHA
  push(A);

  // fall-through end

}



// func_96F1.ts
// Address range: $96F1-$96FF
// Instructions: 8
// Total hits: 8
// First seen at frame: 8


export function func96F1(): void {
  // hits: 8
  // pc range: $96F1-$96FF
  // --- pc 96F1 ---
  // $96F1: STA $A0,X
  mem[(0xA0 + X) & 0xFF] = A;

  // --- pc 96F3 ---
  // $96F3: BRK
  // BRK (halt for now)
  return;

  // --- pc 96F5 ---
  // $96F5: STY $29,X
  mem[(0x29 + X) & 0xFF] = Y;

  // --- pc 96F7 ---
  // $96F7: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 96F9 ---
  // $96F9: ORA #$B1
  A = (A | 0xB1) & 0xFF;
  setZN(A);

  // --- pc 96FB ---
  // $96FB: STY $09,X
  mem[(0x9 + X) & 0xFF] = Y;

  // --- pc 96FD ---
  // $96FD: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 96FF ---
  // $96FF: STY $4C,X
  mem[(0x4C + X) & 0xFF] = Y;

  // fall-through end

}



// func_9727.ts
// Address range: $9727-$9759
// Instructions: 30
// Total hits: 53
// First seen at frame: 8


export function func9727(): void {
  // hits: 53
  // pc range: $9727-$9759
  // --- pc 9727 ---
  // $9727: LDA $98
  A = zp(0x98);
  setZN(A);

  // --- pc 9728 ---
  // $9728: TYA
  A = Y; setZN(A);

  // --- pc 9729 ---
  // $9729: TAX
  X = A; setZN(X);

  // --- pc 972B ---
  // $972B: BPL $9765
  if (!N) { PC = 0x9765; return; }

  // --- pc 972C ---
  // $972C: SEC
  C = true;

  // --- pc 972E ---
  // $972E: STY $C8,X
  mem[(0xC8 + X) & 0xFF] = Y;

  // --- pc 972F ---
  // $972F: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9731 ---
  // $9731: STY $86,X
  mem[(0x86 + X) & 0xFF] = Y;

  // --- pc 9734 ---
  // $9734: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9735 ---
  // $9735: TAX
  X = A; setZN(X);

  // --- pc 9737 ---
  // $9737: BRK
  // BRK (halt for now)
  return;

  // --- pc 9739 ---
  // $9739: STY $C8,X
  mem[(0xC8 + X) & 0xFF] = Y;

  // --- pc 973A ---
  // $973A: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 973B ---
  // $973B: TXA
  A = X; setZN(A);

  // --- pc 973D ---
  // $973D: STY $0A,X
  mem[(0xA + X) & 0xFF] = Y;

  // --- pc 973E ---
  // $973E: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9741 ---
  // $9741: BRK
  // BRK (halt for now)
  return;

  // --- pc 9743 ---
  // $9743: BRK
  // BRK (halt for now)
  return;

  // --- pc 9745 ---
  // $9745: BRK
  // BRK (halt for now)
  return;

  // --- pc 9748 ---
  // $9748: BRK
  // BRK (halt for now)
  return;

  // --- pc 9749 ---
  // $9749: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 974B ---
  // $974B: STY $0A,X
  mem[(0xA + X) & 0xFF] = Y;

  // --- pc 974C ---
  // $974C: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 974D ---
  // $974D: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 974F ---
  // $974F: STY $2A,X
  mem[(0x2A + X) & 0xFF] = Y;

  // --- pc 9750 ---
  // $9750: ROL
  { const c = C ? 1 : 0; C = (A & 0x80) !== 0; A = ((A << 1) | c) & 0xFF; setZN(A); }

  // --- pc 9753 ---
  // $9753: BRK
  // BRK (halt for now)
  return;

  // --- pc 9755 ---
  // $9755: BRK
  // BRK (halt for now)
  return;

  // --- pc 9756 ---
  // $9756: ROL
  { const c = C ? 1 : 0; C = (A & 0x80) !== 0; A = ((A << 1) | c) & 0xFF; setZN(A); }

  // --- pc 9759 ---
  // $9759: BRK
  // BRK (halt for now)
  return;

  // fall-through end

}



// func_989F.ts
// Address range: $989F-$98F0
// Instructions: 33
// Total hits: 12,377
// First seen at frame: 4


export function func989F(): void {
  // hits: 12,377
  // pc range: $989F-$98F0
  // --- pc 989F ---
  // $989F: TYA
  A = Y; setZN(A);

  // --- pc 98A1 ---
  // $98A1: JSR $7F29
  pushWord(PC + 2);
  PC = 0x7F29;
  return;

  // --- pc 98A4 ---
  // $98A4: STA $2000
  mem[0x2000] = A;

  // --- pc 98A6 ---
  // $98A6: JSR $2085
  pushWord(PC + 2);
  PC = 0x2085;
  return;

  // --- pc 98A8 ---
  // $98A8: JSR $21A5
  pushWord(PC + 2);
  PC = 0x21A5;
  return;

  // --- pc 98AA ---
  // $98AA: AND ($29,X)
  A = (A & mem[indX(0x29)]) & 0xFF;
  setZN(A);

  // --- pc 98AD ---
  // $98AD: STA $2001
  mem[0x2001] = A;

  // --- pc 98AF ---
  // $98AF: JSR $2185
  pushWord(PC + 2);
  PC = 0x2185;
  return;

  // --- pc 98B1 ---
  // $98B1: AND ($A9,X)
  A = (A & mem[indX(0xA9)]) & 0xFF;
  setZN(A);

  // --- pc 98B3 ---
  // $98B3: JSR $068D
  pushWord(PC + 2);
  PC = 0x068D;
  return;

  // --- pc 98B6 ---
  // $98B6: JSR $00A9
  pushWord(PC + 2);
  PC = 0x00A9;
  return;

  // --- pc 98B8 ---
  // $98B8: BRK
  // BRK (halt for now)
  return;

  // --- pc 98BB ---
  // $98BB: JSR $08A0
  pushWord(PC + 2);
  PC = 0x08A0;
  return;

  // --- pc 98BD ---
  // $98BD: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 98BF ---
  // $98BF: BRK
  // BRK (halt for now)
  return;

  // --- pc 98C0 ---
  // $98C0: TAX
  X = A; setZN(X);

  // --- pc 98C3 ---
  // $98C3: JSR $D0E8
  pushWord(PC + 2);
  PC = 0xD0E8;
  return;

  // --- pc 98C4 ---
  // $98C4: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 98C7 ---
  // $98C7: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 98CA ---
  // $98CA: LDA $21
  A = zp(0x21);
  setZN(A);

  // --- pc 98CB ---
  // $98CB: AND ($09,X)
  A = (A & mem[indX(0x9)]) & 0xFF;
  setZN(A);

  // --- pc 98CD ---
  // $98CD: CLC
  C = false;

  // --- pc 98D0 ---
  // $98D0: JSR $2185
  pushWord(PC + 2);
  PC = 0x2185;
  return;

  // --- pc 98D2 ---
  // $98D2: AND ($A5,X)
  A = (A & mem[indX(0xA5)]) & 0xFF;
  setZN(A);

  // --- pc 98D4 ---
  // $98D4: JSR $8009
  pushWord(PC + 2);
  PC = 0x8009;
  return;

  // --- pc 98D7 ---
  // $98D7: STA $20
  mem[0x20] = A;

  // --- pc 98D8 ---
  // $98D8: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc 98DB ---
  // $98DB: JSR $A960
  pushWord(PC + 2);
  PC = 0xA960;
  return;

  // --- pc 98E7 ---
  // $98E7: TYA
  A = Y; setZN(A);

  // --- pc 98E9 ---
  // $98E9: BRK
  // BRK (halt for now)
  return;

  // --- pc 98EC ---
  // $98EC: LDA $4A
  A = zp(0x4A);
  setZN(A);

  // --- pc 98ED ---
  // $98ED: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 98F0 ---
  // $98F0: BEQ $992C
  if (Z) { PC = 0x992C; return; }

  // fall-through end

}



// func_992B.ts
// Address range: $992B-$99AD
// Instructions: 59
// Total hits: 2,171
// First seen at frame: 6


export function func992B(): void {
  // hits: 2,171
  // pc range: $992B-$99AD
  // --- pc 992B ---
  // $992B: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 992D ---
  // $992D: JSR $7F29
  pushWord(PC + 2);
  PC = 0x7F29;
  return;

  // --- pc 9930 ---
  // $9930: STA $2000
  mem[0x2000] = A;

  // --- pc 9932 ---
  // $9932: JSR $2085
  pushWord(PC + 2);
  PC = 0x2085;
  return;

  // --- pc 9934 ---
  // $9934: JSR $21A5
  pushWord(PC + 2);
  PC = 0x21A5;
  return;

  // --- pc 9936 ---
  // $9936: AND ($29,X)
  A = (A & mem[indX(0x29)]) & 0xFF;
  setZN(A);

  // --- pc 9939 ---
  // $9939: STA $2001
  mem[0x2001] = A;

  // --- pc 993B ---
  // $993B: JSR $2185
  pushWord(PC + 2);
  PC = 0x2185;
  return;

  // --- pc 993D ---
  // $993D: AND ($86,X)
  A = (A & mem[indX(0x86)]) & 0xFF;
  setZN(A);

  // --- pc 993F ---
  // $993F: SBC #$84
  { const r = 0x84 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9941 ---
  // $9941: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9943 ---
  // $9943: SBC #$A5
  { const r = 0xA5 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9946 ---
  // $9946: STA $2006
  mem[0x2006] = A;

  // --- pc 9948 ---
  // $9948: JSR $E6A5
  pushWord(PC + 2);
  PC = 0xE6A5;
  return;

  // --- pc 994A ---
  // $994A: INC $8D
  mem[0x8D] = (mem[0x8D] + 1) & 0xFF; setZN(mem[0x8D]);

  // --- pc 994D ---
  // $994D: JSR $EBA5
  pushWord(PC + 2);
  PC = 0xEBA5;
  return;

  // --- pc 9950 ---
  // $9950: STA $2007
  mem[0x2007] = A;

  // --- pc 9952 ---
  // $9952: JSR $D088
  pushWord(PC + 2);
  PC = 0xD088;
  return;

  // --- pc 9953 ---
  // $9953: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 9956 ---
  // $9956: LDA $E6
  A = zp(0xE6);
  setZN(A);

  // --- pc 9957 ---
  // $9957: INC $18
  mem[0x18] = (mem[0x18] + 1) & 0xFF; setZN(mem[0x18]);

  // --- pc 9958 ---
  // $9958: CLC
  C = false;

  // --- pc 995A ---
  // $995A: JSR $E685
  pushWord(PC + 2);
  PC = 0xE685;
  return;

  // --- pc 995C ---
  // $995C: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 995F ---
  // $995F: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9960 ---
  // $9960: BRK
  // BRK (halt for now)
  return;

  // --- pc 9963 ---
  // $9963: DEC $E8
  mem[0xE8] = (mem[0xE8] - 1) & 0xFF; setZN(mem[0xE8]);

  // --- pc 9964 ---
  // $9964: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9967 ---
  // $9967: LDA $21
  A = zp(0x21);
  setZN(A);

  // --- pc 9968 ---
  // $9968: AND ($09,X)
  A = (A & mem[indX(0x9)]) & 0xFF;
  setZN(A);

  // --- pc 996A ---
  // $996A: CLC
  C = false;

  // --- pc 996D ---
  // $996D: JSR $2185
  pushWord(PC + 2);
  PC = 0x2185;
  return;

  // --- pc 996F ---
  // $996F: AND ($A5,X)
  A = (A & mem[indX(0xA5)]) & 0xFF;
  setZN(A);

  // --- pc 9971 ---
  // $9971: JSR $8009
  pushWord(PC + 2);
  PC = 0x8009;
  return;

  // --- pc 9974 ---
  // $9974: STA $20
  mem[0x20] = A;

  // --- pc 9975 ---
  // $9975: JSR $008D
  pushWord(PC + 2);
  PC = 0x008D;
  return;

  // --- pc 9978 ---
  // $9978: JSR $8560
  pushWord(PC + 2);
  PC = 0x8560;
  return;

  // --- pc 997D ---
  // $997D: EOR #$20
  A = (A ^ 0x20) & 0xFF;
  setZN(A);

  // --- pc 9981 ---
  // $9981: JSR $9AB8
  pushWord(PC + 2);
  PC = 0x9AB8;
  return;

  // --- pc 9983 ---
  // $9983: TXS
  SP = X;

  // --- pc 9986 ---
  // $9986: TXS
  SP = X;

  // --- pc 9988 ---
  // $9988: SBC #$20
  { const r = 0x20 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 998B ---
  // $998B: CPY $A5
  C = Y >= zp(0xA5);
  setZN((Y - zp(0xA5)) & 0xFF);

  // --- pc 998D ---
  // $998D: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9990 ---
  // $9990: BCS $9994
  if (C) { PC = 0x9994; return; }

  // --- pc 9992 ---
  // $9992: INC $4A
  mem[0x4A] = (mem[0x4A] + 1) & 0xFF; setZN(mem[0x4A]);

  // --- pc 9993 ---
  // $9993: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9996 ---
  // $9996: CMP #$0F
  C = A >= 0xF;
  setZN((A - 0xF) & 0xFF);

  // --- pc 9998 ---
  // $9998: BCS $999C
  if (C) { PC = 0x999C; return; }

  // --- pc 999A ---
  // $999A: INC $4B
  mem[0x4B] = (mem[0x4B] + 1) & 0xFF; setZN(mem[0x4B]);

  // --- pc 999C ---
  // $999C: JSR $9A71
  pushWord(PC + 2);
  PC = 0x9A71;
  return;

  // --- pc 999E ---
  // $999E: TXS
  SP = X;

  // --- pc 99A0 ---
  // $99A0: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 99A4 ---
  // $99A4: LDA $4A
  A = zp(0x4A);
  setZN(A);

  // --- pc 99A5 ---
  // $99A5: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 99A6 ---
  // $99A6: CLC
  C = false;

  // --- pc 99A9 ---
  // $99A9: CMP #$1E
  C = A >= 0x1E;
  setZN((A - 0x1E) & 0xFF);

  // --- pc 99AA ---
  // $99AA: ASL $DF90,X
  C = (mem[(0xDF90 + X) & 0xFFFF] & 0x80) !== 0; mem[(0xDF90 + X) & 0xFFFF] = (mem[(0xDF90 + X) & 0xFFFF] << 1) & 0xFF; setZN(mem[(0xDF90 + X) & 0xFFFF]);

  // --- pc 99AD ---
  // $99AD: RTS
  PC = pullWord() + 1;
  return;

  // fall-through end

}



// func_99EF.ts
// Address range: $99EF-$99F4
// Instructions: 3
// Total hits: 3
// First seen at frame: 5


export function func99EF(): void {
  // hits: 3
  // pc range: $99EF-$99F4
  // --- pc 99EF ---
  // $99EF: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 99F1 ---
  // $99F1: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 99F4 ---
  // $99F4: BEQ $9A0C
  if (Z) { PC = 0x9A0C; return; }

  // fall-through end

}



// func_9A0B.ts
// Address range: $9A0B-$9A0B
// Instructions: 1
// Total hits: 1
// First seen at frame: 5


export function func9A0B(): void {
  // hits: 1
  // pc range: $9A0B-$9A0B
  // --- pc 9A0B ---
  // $9A0B: STA $A560,Y
  mem[(0xA560 + Y) & 0xFFFF] = A;

  // fall-through end

}



// func_9A42.ts
// Address range: $9A42-$9A49
// Instructions: 4
// Total hits: 4
// First seen at frame: 4


export function func9A42(): void {
  // hits: 4
  // pc range: $9A42-$9A49
  // --- pc 9A42 ---
  // $9A42: CPY $A9
  C = Y >= zp(0xA9);
  setZN((Y - zp(0xA9)) & 0xFF);

  // --- pc 9A45 ---
  // $9A45: STA $4A
  mem[0x4A] = A;

  // --- pc 9A46 ---
  // $9A46: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9A49 ---
  // $9A49: JMP $9A71
  PC = 0x9A71;
  return;

  // fall-through end

}



// func_9A71.ts
// Address range: $9A71-$9B0F
// Instructions: 74
// Total hits: 9,598
// First seen at frame: 4


export function func9A71(): void {
  // hits: 9,598
  // pc range: $9A71-$9B0F
  // --- pc 9A71 ---
  // $9A71: LDA #$20
  A = 0x20;
  setZN(A);

  // --- pc 9A72 ---
  // $9A72: JSR $00A0
  pushWord(PC + 2);
  PC = 0x00A0;
  return;

  // --- pc 9A74 ---
  // $9A74: BRK
  // BRK (halt for now)
  return;

  // --- pc 9A77 ---
  // $9A77: JSR $9B28
  pushWord(PC + 2);
  PC = 0x9B28;
  return;

  // --- pc 9A7A ---
  // $9A7A: STX $E7
  mem[0xE7] = X;

  // --- pc 9A7C ---
  // $9A7C: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 9A7D ---
  // $9A7D: BRK
  // BRK (halt for now)
  return;

  // --- pc 9A80 ---
  // $9A80: ASL $29
  C = (mem[0x29] & 0x80) !== 0; mem[0x29] = (mem[0x29] << 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9A82 ---
  // $9A82: BMI $9A9C
  if (N) { PC = 0x9A9C; return; }

  // --- pc 9A83 ---
  // $9A83: CLC
  C = false;

  // --- pc 9A85 ---
  // $9A85: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 9A88 ---
  // $9A88: TXS
  SP = X;

  // --- pc 9A8A ---
  // $9A8A: BPL $9A5C
  if (!N) { PC = 0x9A5C; return; }

  // --- pc 9A8C ---
  // $9A8C: SBC ($B9),Y
  { const r = mem[indY(0xB9)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9A8F ---
  // $9A8F: ASL $29
  C = (mem[0x29] & 0x80) !== 0; mem[0x29] = (mem[0x29] << 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9A91 ---
  // $9A91: BMI $9AAB
  if (N) { PC = 0x9AAB; return; }

  // --- pc 9A92 ---
  // $9A92: CLC
  C = false;

  // --- pc 9A95 ---
  // $9A95: JSR $9AA2
  pushWord(PC + 2);
  PC = 0x9AA2;
  return;

  // --- pc 9A97 ---
  // $9A97: TXS
  SP = X;

  // --- pc 9A99 ---
  // $9A99: JSR $F1D0
  pushWord(PC + 2);
  PC = 0xF1D0;
  return;

  // --- pc 9A9B ---
  // $9A9B: SBC ($A6),Y
  { const r = mem[indY(0xA6)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9A9E ---
  // $9A9E: JSR $9B5E
  pushWord(PC + 2);
  PC = 0x9B5E;
  return;

  // --- pc 9AA1 ---
  // $9AA1: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9AA2 ---
  // $9AA2: TAX
  X = A; setZN(X);

  // --- pc 9AA6 ---
  // $9AA6: STA $E6
  mem[0xE6] = A;

  // --- pc 9AA7 ---
  // $9AA7: INC $B9
  mem[0xB9] = (mem[0xB9] + 1) & 0xFF; setZN(mem[0xB9]);

  // --- pc 9AAA ---
  // $9AAA: ASL $29
  C = (mem[0x29] & 0x80) !== 0; mem[0x29] = (mem[0x29] << 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9AAD ---
  // $9AAD: ORA $E6
  A = (A | zp(0xE6)) & 0xFF;
  setZN(A);

  // --- pc 9AAE ---
  // $9AAE: INC $A6
  mem[0xA6] = (mem[0xA6] + 1) & 0xFF; setZN(mem[0xA6]);

  // --- pc 9AB1 ---
  // $9AB1: STA $05E8,X
  mem[(0x5E8 + X) & 0xFFFF] = A;

  // --- pc 9AB3 ---
  // $9AB3: ORA $E6
  A = (A | zp(0xE6)) & 0xFF;
  setZN(A);

  // --- pc 9AB6 ---
  // $9AB6: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9AB7 ---
  // $9AB7: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9AB9 ---
  // $9AB9: BRK
  // BRK (halt for now)
  return;

  // --- pc 9ABC ---
  // $9ABC: LDA $48
  A = zp(0x48);
  setZN(A);

  // --- pc 9ABD ---
  // $9ABD: PHA
  push(A);

  // --- pc 9ABE ---
  // $9ABE: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AC1 ---
  // $9AC1: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AC4 ---
  // $9AC4: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AC7 ---
  // $9AC7: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9ACA ---
  // $9ACA: CLC
  C = false;

  // --- pc 9ACC ---
  // $9ACC: BRK
  // BRK (halt for now)
  return;

  // --- pc 9ACE ---
  // $9ACE: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 9AD1 ---
  // $9AD1: ADC #$B0
  { const r = 0xB0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9AD2 ---
  // $9AD2: BCS $9A59
  if (C) { PC = 0x9A59; return; }

  // --- pc 9AD5 ---
  // $9AD5: LDX #$00
  X = 0x0;
  setZN(X);

  // --- pc 9AD6 ---
  // $9AD6: BRK
  // BRK (halt for now)
  return;

  // --- pc 9AD9 ---
  // $9AD9: TXS
  SP = X;

  // --- pc 9ADB ---
  // $9ADB: BRK
  // BRK (halt for now)
  return;

  // --- pc 9ADE ---
  // $9ADE: LDA $49
  A = zp(0x49);
  setZN(A);

  // --- pc 9ADF ---
  // $9ADF: EOR #$0A
  A = (A ^ 0xA) & 0xFF;
  setZN(A);

  // --- pc 9AE0 ---
  // $9AE0: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AE3 ---
  // $9AE3: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AE6 ---
  // $9AE6: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AE9 ---
  // $9AE9: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 9AEC ---
  // $9AEC: CLC
  C = false;

  // --- pc 9AEE ---
  // $9AEE: BRK
  // BRK (halt for now)
  return;

  // --- pc 9AF0 ---
  // $9AF0: INC $A5
  mem[0xA5] = (mem[0xA5] + 1) & 0xFF; setZN(mem[0xA5]);

  // --- pc 9AF3 ---
  // $9AF3: ADC #$B3
  { const r = 0xB3; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9AF5 ---
  // $9AF5: STA $E7
  mem[0xE7] = A;

  // --- pc 9AF7 ---
  // $9AF7: LDX #$10
  X = 0x10;
  setZN(X);

  // --- pc 9AF8 ---
  // $9AF8: BPL $9A9A
  if (!N) { PC = 0x9A9A; return; }

  // --- pc 9AFA ---
  // $9AFA: BRK
  // BRK (halt for now)
  return;

  // --- pc 9AFC ---
  // $9AFC: INC $9D
  mem[0x9D] = (mem[0x9D] + 1) & 0xFF; setZN(mem[0x9D]);

  // --- pc 9AFF ---
  // $9AFF: ASL $E8
  C = (mem[0xE8] & 0x80) !== 0; mem[0xE8] = (mem[0xE8] << 1) & 0xFF; setZN(mem[0xE8]);

  // --- pc 9B00 ---
  // $9B00: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B01 ---
  // $9B01: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 9B03 ---
  // $9B03: BPL $9AD5
  if (!N) { PC = 0x9AD5; return; }

  // --- pc 9B05 ---
  // $9B05: SBC $60,X
  { const r = zp((0x60 + X) & 0xFF) ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9B06 ---
  // $9B06: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9B08 ---
  // $9B08: AND $85
  A = (A & zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 9B0A ---
  // $9B0A: SBC #$A2
  { const r = 0xA2 ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9B0C ---
  // $9B0C: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 9B0F ---
  // $9B0F: CPY $60
  C = Y >= zp(0x60);
  setZN((Y - zp(0x60)) & 0xFF);

  // fall-through end

}



// func_9B27.ts
// Address range: $9B27-$9B6D
// Instructions: 32
// Total hits: 942
// First seen at frame: 4


export function func9B27(): void {
  // hits: 942
  // pc range: $9B27-$9B6D
  // --- pc 9B27 ---
  // $9B27: TXS
  SP = X;

  // --- pc 9B28 ---
  // $9B28: PHA
  push(A);

  // --- pc 9B2B ---
  // $9B2B: ASL $50
  C = (mem[0x50] & 0x80) !== 0; mem[0x50] = (mem[0x50] << 1) & 0xFF; setZN(mem[0x50]);

  // --- pc 9B2D ---
  // $9B2D: ORA #$A9
  A = (A | 0xA9) & 0xFF;
  setZN(A);

  // --- pc 9B2F ---
  // $9B2F: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 9B33 ---
  // $9B33: PLA
  A = pull(); setZN(A);

  // --- pc 9B37 ---
  // $9B37: AND #$3F
  A = (A & 0x3F) & 0xFF;
  setZN(A);

  // --- pc 9B39 ---
  // $9B39: CLC
  C = false;

  // --- pc 9B3C ---
  // $9B3C: ASL $C9
  C = (mem[0xC9] & 0x80) !== 0; mem[0xC9] = (mem[0xC9] << 1) & 0xFF; setZN(mem[0xC9]);

  // --- pc 9B3E ---
  // $9B3E: AND $EDB0,X
  A = (A & mem[(0xEDB0 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 9B40 ---
  // $9B40: SBC $0968
  { const r = mem[0x968] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 9B41 ---
  // $9B41: PLA
  A = pull(); setZN(A);

  // --- pc 9B43 ---
  // $9B43: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 9B46 ---
  // $9B46: ASL $8A
  C = (mem[0x8A] & 0x80) !== 0; mem[0x8A] = (mem[0x8A] << 1) & 0xFF; setZN(mem[0x8A]);

  // --- pc 9B47 ---
  // $9B47: TXA
  A = X; setZN(A);

  // --- pc 9B4A ---
  // $9B4A: ASL $9D
  C = (mem[0x9D] & 0x80) !== 0; mem[0x9D] = (mem[0x9D] << 1) & 0xFF; setZN(mem[0x9D]);

  // --- pc 9B4D ---
  // $9B4D: ORA $98
  A = (A | zp(0x98)) & 0xFF;
  setZN(A);

  // --- pc 9B4E ---
  // $9B4E: TYA
  A = Y; setZN(A);

  // --- pc 9B51 ---
  // $9B51: ORA $AD
  A = (A | zp(0xAD)) & 0xFF;
  setZN(A);

  // --- pc 9B54 ---
  // $9B54: ASL $29
  C = (mem[0x29] & 0x80) !== 0; mem[0x29] = (mem[0x29] << 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9B57 ---
  // $9B57: STA $05E8,X
  mem[(0x5E8 + X) & 0xFFFF] = A;

  // --- pc 9B59 ---
  // $9B59: ORA $E8
  A = (A | zp(0xE8)) & 0xFF;
  setZN(A);

  // --- pc 9B5A ---
  // $9B5A: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B5B ---
  // $9B5B: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B5C ---
  // $9B5C: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 9B5D ---
  // $9B5D: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 9B5F ---
  // $9B5F: BRK
  // BRK (halt for now)
  return;

  // --- pc 9B62 ---
  // $9B62: ORA $8E
  A = (A | zp(0x8E)) & 0xFF;
  setZN(A);

  // --- pc 9B65 ---
  // $9B65: ASL $AD
  C = (mem[0xAD] & 0x80) !== 0; mem[0xAD] = (mem[0xAD] << 1) & 0xFF; setZN(mem[0xAD]);

  // --- pc 9B68 ---
  // $9B68: ASL $29
  C = (mem[0x29] & 0x80) !== 0; mem[0x29] = (mem[0x29] << 1) & 0xFF; setZN(mem[0x29]);

  // --- pc 9B6B ---
  // $9B6B: STA $0629
  mem[0x629] = A;

  // --- pc 9B6D ---
  // $9B6D: ASL $60
  C = (mem[0x60] & 0x80) !== 0; mem[0x60] = (mem[0x60] << 1) & 0xFF; setZN(mem[0x60]);

  // fall-through end

}

