// @ts-nocheck — auto-generated de-CPU functions, mutates imported state
﻿// func_7FFF.ts
// Address range: $7FFF-$802F
// Instructions: 17
// Total hits: 12,587
// First seen at frame: 7

import { A, X, Y, PC, SP, C, Z, I, D, V, N, setZN, mem, zp, setZp, indX, indY, push, pull, pushWord, pullWord, FLAGS_BYTE, SET_FLAGS } from './state';
import { instrTable } from './instr_table';

export function func7FFF(): void {
  // hits: 12,587
  // pc range: $7FFF-$802F
  // --- pc 7FFF ---
  // $7FFF: BRK
  // BRK (halt for now)
  return;

  // --- pc 8001 ---
  // $8001: ORA $BC
  A = (A | zp(0xBC)) & 0xFF;
  setZN(A);

  // --- pc 8005 ---
  // $8005: CPY #$32
  C = Y >= 0x32;
  setZN((Y - 0x32) & 0xFF);

  // --- pc 8007 ---
  // $8007: BCS $8017
  if (C) { PC = 0x8017; return; }

  // --- pc 8008 ---
  // $8008: ASL $07A0
  C = (mem[0x7A0] & 0x80) !== 0; mem[0x7A0] = (mem[0x7A0] << 1) & 0xFF; setZN(mem[0x7A0]);

  // --- pc 800B ---
  // $800B: STY $8000
  mem[0x8000] = Y;

  // --- pc 800E ---
  // $800E: LDY $07FC
  Y = mem[0x7FC];
  setZN(Y);

  // --- pc 8011 ---
  // $8011: STY $8001
  mem[0x8001] = Y;

  // --- pc 8014 ---
  // $8014: JMP $805E
  PC = 0x805E;
  return;

  // --- pc 801E ---
  // $801E: LDX #$20
  X = 0x20;
  setZN(X);

  // --- pc 8022 ---
  // $8022: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 8023 ---
  // $8023: BRK
  // BRK (halt for now)
  return;

  // --- pc 8026 ---
  // $8026: STY $A9
  mem[0xA9] = Y;

  // --- pc 8028 ---
  // $8028: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 802C ---
  // $802C: LDA $1E
  A = zp(0x1E);
  setZN(A);

  // --- pc 802D ---
  // $802D: ASL $1029,X
  C = (mem[(0x1029 + X) & 0xFFFF] & 0x80) !== 0; mem[(0x1029 + X) & 0xFFFF] = (mem[(0x1029 + X) & 0xFFFF] << 1) & 0xFF; setZN(mem[(0x1029 + X) & 0xFFFF]);

  // --- pc 802F ---
  // $802F: BPL $8021
  if (!N) { PC = 0x8021; return; }

  // fall-through end

}



// func_805E.ts
// Address range: $805E-$8066
// Instructions: 4
// Total hits: 5,825
// First seen at frame: 7


export function func805E(): void {
  // hits: 5,825
  // pc range: $805E-$8066
  // --- pc 805E ---
  // $805E: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc 8060 ---
  // $8060: LDA ($A2,X)
  A = mem[indX(0xA2)];
  setZN(A);

  // --- pc 8062 ---
  // $8062: ORA $BC
  A = (A | zp(0xBC)) & 0xFF;
  setZN(A);

  // --- pc 8066 ---
  // $8066: BEQ $80B7
  if (Z) { PC = 0x80B7; return; }

  // fall-through end

}



// func_80B7.ts
// Address range: $80B7-$80D5
// Instructions: 13
// Total hits: 13,980
// First seen at frame: 7


export function func80B7(): void {
  // hits: 13,980
  // pc range: $80B7-$80D5
  // --- pc 80B7 ---
  // $80B7: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc 80B9 ---
  // $80B9: LDA #$A9
  A = 0xA9;
  setZN(A);

  // --- pc 80BC ---
  // $80BC: STA $F0
  mem[0xF0] = A;

  // --- pc 80BD ---
  // $80BD: BEQ $8068
  if (Z) { PC = 0x8068; return; }

  // --- pc 80C0 ---
  // $80C0: STA $F1
  mem[0xF1] = A;

  // --- pc 80C1 ---
  // $80C1: SBC ($A9),Y
  { const r = mem[indY(0xA9)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 80C3 ---
  // $80C3: BRK
  // BRK (halt for now)
  return;

  // --- pc 80C6 ---
  // $80C6: LDY #$08
  Y = 0x8;
  setZN(Y);

  // --- pc 80C7 ---
  // $80C7: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 80CA ---
  // $80CA: LDA $0706
  A = mem[0x706];
  setZN(A);

  // --- pc 80CD ---
  // $80CD: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 80D2 ---
  // $80D2: STA $0706
  mem[0x706] = A;

  // --- pc 80D5 ---
  // $80D5: BCC $810C
  if (!C) { PC = 0x810C; return; }

  // fall-through end

}



// func_810B.ts
// Address range: $810B-$8136
// Instructions: 22
// Total hits: 21,902
// First seen at frame: 7


export function func810B(): void {
  // hits: 21,902
  // pc range: $810B-$8136
  // --- pc 810B ---
  // $810B: STA ($18,X)
  mem[indX(0x18)] = A;

  // --- pc 810C ---
  // $810C: CLC
  C = false;

  // --- pc 810E ---
  // $810E: BPL $8175
  if (!N) { PC = 0x8175; return; }

  // --- pc 8110 ---
  // $8110: BEQ $8097
  if (Z) { PC = 0x8097; return; }

  // --- pc 8112 ---
  // $8112: BEQ $80BD
  if (Z) { PC = 0x80BD; return; }

  // --- pc 8115 ---
  // $8115: ADC $F2
  { const r = zp(0xF2); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8117 ---
  // $8117: STA $F2
  mem[0xF2] = A;

  // --- pc 8119 ---
  // $8119: DEC $F3
  mem[0xF3] = (mem[0xF3] - 1) & 0xFF; setZN(mem[0xF3]);

  // --- pc 811B ---
  // $811B: BNE $80CA
  if (!Z) { PC = 0x80CA; return; }

  // --- pc 811C ---
  // $811C: LDA $27A9
  A = mem[0x27A9];
  setZN(A);

  // --- pc 811F ---
  // $811F: STA $F0
  mem[0xF0] = A;

  // --- pc 8120 ---
  // $8120: BEQ $80A7
  if (Z) { PC = 0x80A7; return; }

  // --- pc 8123 ---
  // $8123: LDA #$07
  A = 0x7;
  setZN(A);

  // --- pc 8125 ---
  // $8125: STA $F1
  mem[0xF1] = A;

  // --- pc 8126 ---
  // $8126: SBC ($85),Y
  { const r = mem[indY(0x85)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8128 ---
  // $8128: SBC $03A9,X
  { const r = mem[(0x3A9 + X) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 812B ---
  // $812B: STA $F2
  mem[0xF2] = A;

  // --- pc 812D ---
  // $812D: LDA #$11
  A = 0x11;
  setZN(A);

  // --- pc 812E ---
  // $812E: ORA ($85),Y
  A = (A | mem[indY(0x85)]) & 0xFF;
  setZN(A);

  // --- pc 8131 ---
  // $8131: LDA $0706
  A = mem[0x706];
  setZN(A);

  // --- pc 8134 ---
  // $8134: AND $F3
  A = (A & zp(0xF3)) & 0xFF;
  setZN(A);

  // --- pc 8136 ---
  // $8136: BEQ $814C
  if (Z) { PC = 0x814C; return; }

  // fall-through end

}



// func_814B.ts
// Address range: $814B-$816C
// Instructions: 15
// Total hits: 11,883
// First seen at frame: 7


export function func814B(): void {
  // hits: 11,883
  // pc range: $814B-$816C
  // --- pc 814B ---
  // $814B: STA ($18,X)
  mem[indX(0x18)] = A;

  // --- pc 814C ---
  // $814C: CLC
  C = false;

  // --- pc 814E ---
  // $814E: BPL $81B5
  if (!N) { PC = 0x81B5; return; }

  // --- pc 8151 ---
  // $8151: STA $FC
  mem[0xFC] = A;

  // --- pc 8153 ---
  // $8153: STA $F0
  mem[0xF0] = A;

  // --- pc 8154 ---
  // $8154: BEQ $80FF
  if (Z) { PC = 0x80FF; return; }

  // --- pc 8156 ---
  // $8156: BRK
  // BRK (halt for now)
  return;

  // --- pc 8158 ---
  // $8158: SBC $FD85,X
  { const r = mem[(0xFD85 + X) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 815A ---
  // $815A: SBC $F185,X
  { const r = mem[(0xF185 + X) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 815C ---
  // $815C: SBC ($06),Y
  { const r = mem[indY(0x6)] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 815F ---
  // $815F: DEC $F2
  mem[0xF2] = (mem[0xF2] - 1) & 0xFF; setZN(mem[0xF2]);

  // --- pc 8161 ---
  // $8161: BPL $8131
  if (!N) { PC = 0x8131; return; }

  // --- pc 8162 ---
  // $8162: DEC $E9AD
  mem[0xE9AD] = (mem[0xE9AD] - 1) & 0xFF; setZN(mem[0xE9AD]);

  // --- pc 8166 ---
  // $8166: BEQ $816D
  if (Z) { PC = 0x816D; return; }

  // --- pc 816C ---
  // $816C: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // fall-through end

}



// func_82EC.ts
// Address range: $82EC-$82F1
// Instructions: 3
// Total hits: 700
// First seen at frame: 6


export function func82EC(): void {
  // hits: 700
  // pc range: $82EC-$82F1
  // --- pc 82EC ---
  // $82EC: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 82F0 ---
  // $82F0: LDA $4C
  A = zp(0x4C);
  setZN(A);

  // --- pc 82F1 ---
  // $82F1: JMP $F910
  PC = 0xF910;
  return;

  // fall-through end

}



// func_838A.ts
// Address range: $838A-$8396
// Instructions: 6
// Total hits: 1,401
// First seen at frame: 6


export function func838A(): void {
  // hits: 1,401
  // pc range: $838A-$8396
  // --- pc 838A ---
  // $838A: LDX #$02
  X = 0x2;
  setZN(X);

  // --- pc 838C ---
  // $838C: JSR $C4B9
  pushWord(PC + 2);
  PC = 0xC4B9;
  return;

  // --- pc 838E ---
  // $838E: CPY $20
  C = Y >= zp(0x20);
  setZN((Y - zp(0x20)) & 0xFF);

  // --- pc 8391 ---
  // $8391: LDX #$A2
  X = 0xA2;
  setZN(X);

  // --- pc 8393 ---
  // $8393: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 8396 ---
  // $8396: CPY $60
  C = Y >= zp(0x60);
  setZN((Y - zp(0x60)) & 0xFF);

  // fall-through end

}



// func_8464.ts
// Address range: $8464-$84EC
// Instructions: 68
// Total hits: 84
// First seen at frame: 6


export function func8464(): void {
  // hits: 84
  // pc range: $8464-$84EC
  // --- pc 8464 ---
  // $8464: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8465 ---
  // $8465: BRK
  // BRK (halt for now)
  return;

  // --- pc 8466 ---
  // $8466: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8467 ---
  // $8467: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 846A ---
  // $846A: TXA
  A = X; setZN(A);

  // --- pc 846C ---
  // $846C: SBC $F938,Y
  { const r = mem[(0xF938 + Y) & 0xFFFF] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 846D ---
  // $846D: SEC
  C = true;

  // --- pc 8470 ---
  // $8470: TXA
  A = X; setZN(A);

  // --- pc 8473 ---
  // $8473: TXA
  A = X; setZN(A);

  // --- pc 8474 ---
  // $8474: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8476 ---
  // $8476: BRK
  // BRK (halt for now)
  return;

  // --- pc 8478 ---
  // $8478: EOR $00A9
  A = (A ^ mem[0xA9]) & 0xFF;
  setZN(A);

  // --- pc 847A ---
  // $847A: BRK
  // BRK (halt for now)
  return;

  // --- pc 847C ---
  // $847C: LDY #$85
  Y = 0x85;
  setZN(Y);

  // --- pc 847E ---
  // $847E: LSR $5686
  C = (mem[0x5686] & 1) !== 0; mem[0x5686] = mem[0x5686] >>> 1; setZN(mem[0x5686]);

  // --- pc 8480 ---
  // $8480: LSR $A5,X
  C = (mem[(0xA5 + X) & 0xFF] & 1) !== 0; mem[(0xA5 + X) & 0xFF] = mem[(0xA5 + X) & 0xFF] >>> 1; setZN(mem[(0xA5 + X) & 0xFF]);

  // --- pc 8482 ---
  // $8482: AND $85
  A = (A & zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 8484 ---
  // $8484: SBC $B920
  { const r = mem[0xB920] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8487 ---
  // $8487: CPY $A0
  C = Y >= zp(0xA0);
  setZN((Y - zp(0xA0)) & 0xFF);

  // --- pc 8489 ---
  // $8489: BRK
  // BRK (halt for now)
  return;

  // --- pc 848B ---
  // $848B: EOR $C8AA
  A = (A ^ mem[0xC8AA]) & 0xFF;
  setZN(A);

  // --- pc 848C ---
  // $848C: TAX
  X = A; setZN(X);

  // --- pc 848D ---
  // $848D: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 848F ---
  // $848F: EOR $4E85
  A = (A ^ mem[0x4E85]) & 0xFF;
  setZN(A);

  // --- pc 8491 ---
  // $8491: LSR $4D86
  C = (mem[0x4D86] & 1) !== 0; mem[0x4D86] = mem[0x4D86] >>> 1; setZN(mem[0x4D86]);

  // --- pc 8493 ---
  // $8493: EOR $05A2
  A = (A ^ mem[0x5A2]) & 0xFF;
  setZN(A);

  // --- pc 8495 ---
  // $8495: ORA $A9
  A = (A | zp(0xA9)) & 0xFF;
  setZN(A);

  // --- pc 8497 ---
  // $8497: CMP $95
  C = A >= zp(0x95);
  setZN((A - zp(0x95)) & 0xFF);

  // --- pc 8499 ---
  // $8499: BRK
  // BRK (halt for now)
  return;

  // --- pc 849B ---
  // $849B: STY $95
  mem[0x95] = Y;

  // --- pc 849D ---
  // $849D: ORA ($A0,X)
  A = (A | mem[indX(0xA0)]) & 0xFF;
  setZN(A);

  // --- pc 849F ---
  // $849F: BVC $844A
  if (!V) { PC = 0x844A; return; }

  // --- pc 84A1 ---
  // $84A1: BRK
  // BRK (halt for now)
  return;

  // --- pc 84A5 ---
  // $84A5: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 84A6 ---
  // $84A6: BRK
  // BRK (halt for now)
  return;

  // --- pc 84A8 ---
  // $84A8: ORA $0E85
  A = (A | mem[0xE85]) & 0xFF;
  setZN(A);

  // --- pc 84AA ---
  // $84AA: ASL $00A9
  C = (mem[0xA9] & 0x80) !== 0; mem[0xA9] = (mem[0xA9] << 1) & 0xFF; setZN(mem[0xA9]);

  // --- pc 84AC ---
  // $84AC: BRK
  // BRK (halt for now)
  return;

  // --- pc 84AF ---
  // $84AF: ASL $A9
  C = (mem[0xA9] & 0x80) !== 0; mem[0xA9] = (mem[0xA9] << 1) & 0xFF; setZN(mem[0xA9]);

  // --- pc 84B1 ---
  // $84B1: CPX #$85
  C = X >= 0x85;
  setZN((X - 0x85) & 0xFF);

  // --- pc 84B3 ---
  // $84B3: INC $A9
  mem[0xA9] = (mem[0xA9] + 1) & 0xFF; setZN(mem[0xA9]);

  // --- pc 84B6 ---
  // $84B6: STA $E7
  mem[0xE7] = A;

  // --- pc 84B8 ---
  // $84B8: LDY #$01
  Y = 0x1;
  setZN(Y);

  // --- pc 84B9 ---
  // $84B9: ORA ($A2,X)
  A = (A | mem[indX(0xA2)]) & 0xFF;
  setZN(A);

  // --- pc 84BB ---
  // $84BB: JSR $55A9
  pushWord(PC + 2);
  PC = 0x55A9;
  return;

  // --- pc 84BD ---
  // $84BD: EOR $20,X
  A = (A ^ zp((0x20 + X) & 0xFF)) & 0xFF;
  setZN(A);

  // --- pc 84C0 ---
  // $84C0: TYA
  A = Y; setZN(A);

  // --- pc 84C2 ---
  // $84C2: SBC $B94C
  { const r = mem[0xB94C] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 84C5 ---
  // $84C5: CPY $A6
  C = Y >= zp(0xA6);
  setZN((Y - zp(0xA6)) & 0xFF);

  // --- pc 84C7 ---
  // $84C7: LSR $20,X
  C = (mem[(0x20 + X) & 0xFF] & 1) !== 0; mem[(0x20 + X) & 0xFF] = mem[(0x20 + X) & 0xFF] >>> 1; setZN(mem[(0x20 + X) & 0xFF]);

  // --- pc 84CA ---
  // $84CA: CPY $A9
  C = Y >= zp(0xA9);
  setZN((Y - zp(0xA9)) & 0xFF);

  // --- pc 84CC ---
  // $84CC: PHP
  push(FLAGS_BYTE() | 0x30);

  // --- pc 84CE ---
  // $84CE: EOR $A9,X
  A = (A ^ zp((0xA9 + X) & 0xFF)) & 0xFF;
  setZN(A);

  // --- pc 84D0 ---
  // $84D0: EOR #$85
  A = (A ^ 0x85) & 0xFF;
  setZN(A);

  // --- pc 84D3 ---
  // $84D3: LDA #$22
  A = 0x22;
  setZN(A);

  // --- pc 84D5 ---
  // $84D5: STA $50
  mem[0x50] = A;

  // --- pc 84D6 ---
  // $84D6: BVC $847D
  if (!V) { PC = 0x847D; return; }

  // --- pc 84D9 ---
  // $84D9: STA $51
  mem[0x51] = A;

  // --- pc 84DA ---
  // $84DA: EOR ($29),Y
  A = (A ^ mem[indY(0x29)]) & 0xFF;
  setZN(A);

  // --- pc 84DD ---
  // $84DD: STA $54
  mem[0x54] = A;

  // --- pc 84DF ---
  // $84DF: LDA $50
  A = zp(0x50);
  setZN(A);

  // --- pc 84E0 ---
  // $84E0: BVC $8467
  if (!V) { PC = 0x8467; return; }

  // --- pc 84E3 ---
  // $84E3: LDA $51
  A = zp(0x51);
  setZN(A);

  // --- pc 84E4 ---
  // $84E4: EOR ($85),Y
  A = (A ^ mem[indY(0x85)]) & 0xFF;
  setZN(A);

  // --- pc 84E7 ---
  // $84E7: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 84E8 ---
  // $84E8: BRK
  // BRK (halt for now)
  return;

  // --- pc 84EA ---
  // $84EA: EOR $D8C9
  A = (A ^ mem[0xD8C9]) & 0xFF;
  setZN(A);

  // --- pc 84EC ---
  // $84EC: CLD
  D = false;

  // fall-through end

}



// func_8503.ts
// Address range: $8503-$851D
// Instructions: 10
// Total hits: 26
// First seen at frame: 6


export function func8503(): void {
  // hits: 26
  // pc range: $8503-$851D
  // --- pc 8503 ---
  // $8503: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8505 ---
  // $8505: CPX #$B0
  C = X >= 0xB0;
  setZN((X - 0xB0) & 0xFF);

  // --- pc 8508 ---
  // $8508: SEC
  C = true;

  // --- pc 850A ---
  // $850A: CLD
  D = false;

  // --- pc 850B ---
  // $850B: TAX
  X = A; setZN(X);

  // --- pc 850E ---
  // $850E: TXA
  A = X; setZN(A);

  // --- pc 850F ---
  // $850F: PHA
  push(A);

  // --- pc 8513 ---
  // $8513: PLA
  A = pull(); setZN(A);

  // --- pc 851B ---
  // $851B: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 851D ---
  // $851D: INX
  X = (X + 1) & 0xFF; setZN(X);

  // fall-through end

}



// func_8536.ts
// Address range: $8536-$8543
// Instructions: 9
// Total hits: 36
// First seen at frame: 6


export function func8536(): void {
  // hits: 36
  // pc range: $8536-$8543
  // --- pc 8536 ---
  // $8536: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8537 ---
  // $8537: SEC
  C = true;

  // --- pc 8539 ---
  // $8539: INX
  X = (X + 1) & 0xFF; setZN(X);

  // --- pc 853A ---
  // $853A: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 853B ---
  // $853B: TAX
  X = A; setZN(X);

  // --- pc 853E ---
  // $853E: STA $48
  mem[0x48] = A;

  // --- pc 853F ---
  // $853F: PHA
  push(A);

  // --- pc 8542 ---
  // $8542: STA $48
  mem[0x48] = A;

  // --- pc 8543 ---
  // $8543: PHA
  push(A);

  // fall-through end

}



// func_8574.ts
// Address range: $8574-$8589
// Instructions: 10
// Total hits: 10
// First seen at frame: 6


export function func8574(): void {
  // hits: 10
  // pc range: $8574-$8589
  // --- pc 8574 ---
  // $8574: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8575 ---
  // $8575: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8577 ---
  // $8577: EOR $2020
  A = (A ^ mem[0x2020]) & 0xFF;
  setZN(A);

  // --- pc 857B ---
  // $857B: LDA #$02
  A = 0x2;
  setZN(A);

  // --- pc 857D ---
  // $857D: JMP $8879
  PC = 0x8879;
  return;

  // --- pc 857F ---
  // $857F: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8582 ---
  // $8582: JSR $9FA8
  pushWord(PC + 2);
  PC = 0x9FA8;
  return;

  // --- pc 8585 ---
  // $8585: JSR $997E
  pushWord(PC + 2);
  PC = 0x997E;
  return;

  // --- pc 8587 ---
  // $8587: STA $01A9,Y
  mem[(0x1A9 + Y) & 0xFFFF] = A;

  // --- pc 8589 ---
  // $8589: ORA ($4C,X)
  A = (A | mem[indX(0x4C)]) & 0xFF;
  setZN(A);

  // fall-through end

}



// func_8813.ts
// Address range: $8813-$8833
// Instructions: 12
// Total hits: 13
// First seen at frame: 6


export function func8813(): void {
  // hits: 13
  // pc range: $8813-$8833
  // --- pc 8813 ---
  // $8813: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8816 ---
  // $8816: AND #$FB
  A = (A & 0xFB) & 0xFF;
  setZN(A);

  // --- pc 8818 ---
  // $8818: JMP $881F
  PC = 0x881F;
  return;

  // --- pc 881F ---
  // $881F: STA $5B
  mem[0x5B] = A;

  // --- pc 8821 ---
  // $8821: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8823 ---
  // $8823: EOR $F720
  A = (A ^ mem[0xF720]) & 0xFF;
  setZN(A);

  // --- pc 8826 ---
  // $8826: TXA
  A = X; setZN(A);

  // --- pc 8828 ---
  // $8828: LSR $20,X
  C = (mem[(0x20 + X) & 0xFF] & 1) !== 0; mem[(0x20 + X) & 0xFF] = mem[(0x20 + X) & 0xFF] >>> 1; setZN(mem[(0x20 + X) & 0xFF]);

  // --- pc 882B ---
  // $882B: CPY $A9
  C = Y >= zp(0xA9);
  setZN((Y - zp(0xA9)) & 0xFF);

  // --- pc 882E ---
  // $882E: JMP $8879
  PC = 0x8879;
  return;

  // --- pc 8830 ---
  // $8830: DEY
  Y = (Y - 1) & 0xFF; setZN(Y);

  // --- pc 8833 ---
  // $8833: BCC $8881
  if (!C) { PC = 0x8881; return; }

  // fall-through end

}



// func_8879.ts
// Address range: $8879-$8883
// Instructions: 6
// Total hits: 21
// First seen at frame: 6


export function func8879(): void {
  // hits: 21
  // pc range: $8879-$8883
  // --- pc 8879 ---
  // $8879: CLC
  C = false;

  // --- pc 887B ---
  // $887B: EOR $4D85
  A = (A ^ mem[0x4D85]) & 0xFF;
  setZN(A);

  // --- pc 887D ---
  // $887D: EOR $4EA5
  A = (A ^ mem[0x4EA5]) & 0xFF;
  setZN(A);

  // --- pc 887F ---
  // $887F: LSR $0069
  C = (mem[0x69] & 1) !== 0; mem[0x69] = mem[0x69] >>> 1; setZN(mem[0x69]);

  // --- pc 8881 ---
  // $8881: BRK
  // BRK (halt for now)
  return;

  // --- pc 8883 ---
  // $8883: LSR $E74C
  C = (mem[0xE74C] & 1) !== 0; mem[0xE74C] = mem[0xE74C] >>> 1; setZN(mem[0xE74C]);

  // fall-through end

}



// func_891F.ts
// Address range: $891F-$895B
// Instructions: 30
// Total hits: 115
// First seen at frame: 6


export function func891F(): void {
  // hits: 115
  // pc range: $891F-$895B
  // --- pc 891F ---
  // $891F: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8922 ---
  // $8922: JSR $9DEE
  pushWord(PC + 2);
  PC = 0x9DEE;
  return;

  // --- pc 8924 ---
  // $8924: STA $ECA5,X
  mem[(0xECA5 + X) & 0xFFFF] = A;

  // --- pc 8926 ---
  // $8926: CPX $6918
  C = X >= mem[0x6918];
  setZN((X - mem[0x6918]) & 0xFF);

  // --- pc 8927 ---
  // $8927: CLC
  C = false;

  // --- pc 8929 ---
  // $8929: BRK
  // BRK (halt for now)
  return;

  // --- pc 892B ---
  // $892B: CPX $EDA5
  C = X >= mem[0xEDA5];
  setZN((X - mem[0xEDA5]) & 0xFF);

  // --- pc 892D ---
  // $892D: SBC $BF69
  { const r = mem[0xBF69] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8930 ---
  // $8930: STA $ED
  mem[0xED] = A;

  // --- pc 8931 ---
  // $8931: SBC $25A5
  { const r = mem[0x25A5] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8933 ---
  // $8933: AND $85
  A = (A & zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 8935 ---
  // $8935: NOP
  // NOP

  // --- pc 8937 ---
  // $8937: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 893A ---
  // $893A: CPY $A5
  C = Y >= zp(0xA5);
  setZN((Y - zp(0xA5)) & 0xFF);

  // --- pc 893C ---
  // $893C: SEI
  I = true;

  // --- pc 893F ---
  // $893F: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8940 ---
  // $8940: BRK
  // BRK (halt for now)
  return;

  // --- pc 8942 ---
  // $8942: CPX $798D
  C = X >= mem[0x798D];
  setZN((X - mem[0x798D]) & 0xFF);

  // --- pc 8945 ---
  // $8945: BRK
  // BRK (halt for now)
  return;

  // --- pc 8947 ---
  // $8947: BRK
  // BRK (halt for now)
  return;

  // --- pc 894A ---
  // $894A: BRK
  // BRK (halt for now)
  return;

  // --- pc 894B ---
  // $894B: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 894E ---
  // $894E: LDA ($EC),Y
  A = mem[indY(0xEC)];
  setZN(A);

  // --- pc 894F ---
  // $894F: CPX $7B99
  C = X >= mem[0x7B99];
  setZN((X - mem[0x7B99]) & 0xFF);

  // --- pc 8952 ---
  // $8952: BRK
  // BRK (halt for now)
  return;

  // --- pc 8953 ---
  // $8953: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8954 ---
  // $8954: DEX
  X = (X - 1) & 0xFF; setZN(X);

  // --- pc 8957 ---
  // $8957: LDX $EA
  X = zp(0xEA);
  setZN(X);

  // --- pc 8958 ---
  // $8958: NOP
  // NOP

  // --- pc 895B ---
  // $895B: CPY $60
  C = Y >= zp(0x60);
  setZN((Y - zp(0x60)) & 0xFF);

  // fall-through end

}



// func_8999.ts
// Address range: $8999-$89A1
// Instructions: 5
// Total hits: 5
// First seen at frame: 25


export function func8999(): void {
  // hits: 5
  // pc range: $8999-$89A1
  // --- pc 8999 ---
  // $8999: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 899B ---
  // $899B: STA $8029,Y
  mem[(0x8029 + Y) & 0xFFFF] = A;

  // --- pc 899E ---
  // $899E: ORA #$40
  A = (A | 0x40) & 0xFF;
  setZN(A);

  // --- pc 899F ---
  // $899F: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 89A1 ---
  // $89A1: STA $A060,Y
  mem[(0xA060 + Y) & 0xFFFF] = A;

  // fall-through end

}



// func_8AF7.ts
// Address range: $8AF7-$8C12
// Instructions: 132
// Total hits: 163
// First seen at frame: 6


export function func8AF7(): void {
  // hits: 163
  // pc range: $8AF7-$8C12
  // --- pc 8AF7 ---
  // $8AF7: STA $ED
  mem[0xED] = A;

  // --- pc 8AF8 ---
  // $8AF8: SBC $00A9
  { const r = mem[0xA9] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8AFA ---
  // $8AFA: BRK
  // BRK (halt for now)
  return;

  // --- pc 8AFC ---
  // $8AFC: ORA #$85
  A = (A | 0x85) & 0xFF;
  setZN(A);

  // --- pc 8AFE ---
  // $8AFE: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8B00 ---
  // $8B00: ORA $0E85
  A = (A | mem[0xE85]) & 0xFF;
  setZN(A);

  // --- pc 8B02 ---
  // $8B02: ASL $5BA5
  C = (mem[0x5BA5] & 0x80) !== 0; mem[0x5BA5] = (mem[0x5BA5] << 1) & 0xFF; setZN(mem[0x5BA5]);

  // --- pc 8B05 ---
  // $8B05: AND #$7F
  A = (A & 0x7F) & 0xFF;
  setZN(A);

  // --- pc 8B07 ---
  // $8B07: STA $5B
  mem[0x5B] = A;

  // --- pc 8B09 ---
  // $8B09: LDA $25
  A = zp(0x25);
  setZN(A);

  // --- pc 8B0A ---
  // $8B0A: AND $85
  A = (A & zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 8B0D ---
  // $8B0D: LDX #$07
  X = 0x7;
  setZN(X);

  // --- pc 8B0F ---
  // $8B0F: JSR $C4B9
  pushWord(PC + 2);
  PC = 0xC4B9;
  return;

  // --- pc 8B11 ---
  // $8B11: CPY $A9
  C = Y >= zp(0xA9);
  setZN((Y - zp(0xA9)) & 0xFF);

  // --- pc 8B13 ---
  // $8B13: BRK
  // BRK (halt for now)
  return;

  // --- pc 8B15 ---
  // $8B15: SED
  D = true;

  // --- pc 8B18 ---
  // $8B18: ORA $C8
  A = (A | zp(0xC8)) & 0xFF;
  setZN(A);

  // --- pc 8B19 ---
  // $8B19: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B1C ---
  // $8B1C: LDA $ED
  A = zp(0xED);
  setZN(A);

  // --- pc 8B1D ---
  // $8B1D: SBC $AA0A
  { const r = mem[0xAA0A] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8B1E ---
  // $8B1E: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8B1F ---
  // $8B1F: TAX
  X = A; setZN(X);

  // --- pc 8B21 ---
  // $8B21: BRK
  // BRK (halt for now)
  return;

  // --- pc 8B22 ---
  // $8B22: ROL
  { const c = C ? 1 : 0; C = (A & 0x80) !== 0; A = ((A << 1) | c) & 0xFF; setZN(A); }

  // --- pc 8B23 ---
  // $8B23: TAY
  Y = A; setZN(Y);

  // --- pc 8B24 ---
  // $8B24: TXA
  A = X; setZN(A);

  // --- pc 8B25 ---
  // $8B25: CLC
  C = false;

  // --- pc 8B27 ---
  // $8B27: BRK
  // BRK (halt for now)
  return;

  // --- pc 8B2A ---
  // $8B2A: TYA
  A = Y; setZN(A);

  // --- pc 8B2C ---
  // $8B2C: LDY #$85
  Y = 0x85;
  setZN(Y);

  // --- pc 8B2F ---
  // $8B2F: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8B30 ---
  // $8B30: BRK
  // BRK (halt for now)
  return;

  // --- pc 8B33 ---
  // $8B33: TAX
  X = A; setZN(X);

  // --- pc 8B34 ---
  // $8B34: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B37 ---
  // $8B37: STA $64
  mem[0x64] = A;

  // --- pc 8B39 ---
  // $8B39: STX $63
  mem[0x63] = X;

  // --- pc 8B3B ---
  // $8B3B: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8B3C ---
  // $8B3C: BRK
  // BRK (halt for now)
  return;

  // --- pc 8B3F ---
  // $8B3F: STA $75
  mem[0x75] = A;

  // --- pc 8B40 ---
  // $8B40: ADC $C8,X
  { const r = zp((0xC8 + X) & 0xFF); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8B41 ---
  // $8B41: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B44 ---
  // $8B44: STA $76
  mem[0x76] = A;

  // --- pc 8B45 ---
  // $8B45: ROR $C8,X
  { const c = C ? 0x80 : 0; C = (mem[(0xC8 + X) & 0xFF] & 1) !== 0; mem[(0xC8 + X) & 0xFF] = (mem[(0xC8 + X) & 0xFF] >>> 1) | c; setZN(mem[(0xC8 + X) & 0xFF]); }

  // --- pc 8B46 ---
  // $8B46: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B49 ---
  // $8B49: TAX
  X = A; setZN(X);

  // --- pc 8B4C ---
  // $8B4C: STA $48
  mem[0x48] = A;

  // --- pc 8B4D ---
  // $8B4D: PHA
  push(A);

  // --- pc 8B4E ---
  // $8B4E: TXA
  A = X; setZN(A);

  // --- pc 8B51 ---
  // $8B51: ROL
  { const c = C ? 1 : 0; C = (A & 0x80) !== 0; A = ((A << 1) | c) & 0xFF; setZN(A); }

  // --- pc 8B54 ---
  // $8B54: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B57 ---
  // $8B57: STA $5E
  mem[0x5E] = A;

  // --- pc 8B58 ---
  // $8B58: LSR $B1C8,X
  C = (mem[(0xB1C8 + X) & 0xFFFF] & 1) !== 0; mem[(0xB1C8 + X) & 0xFFFF] = mem[(0xB1C8 + X) & 0xFFFF] >>> 1; setZN(mem[(0xB1C8 + X) & 0xFFFF]);

  // --- pc 8B59 ---
  // $8B59: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B5C ---
  // $8B5C: STA $5F
  mem[0x5F] = A;

  // --- pc 8B5E ---
  // $8B5E: INY
  Y = (Y + 1) & 0xFF; setZN(Y);

  // --- pc 8B61 ---
  // $8B61: AND #$F8
  A = (A & 0xF8) & 0xFF;
  setZN(A);

  // --- pc 8B62 ---
  // $8B62: SED
  D = true;

  // --- pc 8B65 ---
  // $8B65: LDA #$02
  A = 0x2;
  setZN(A);

  // --- pc 8B67 ---
  // $8B67: STA $5D
  mem[0x5D] = A;

  // --- pc 8B68 ---
  // $8B68: EOR $5C06,X
  A = (A ^ mem[(0x5C06 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B6B ---
  // $8B6B: ROL $5D
  { const c = C ? 1 : 0; C = (mem[0x5D] & 0x80) !== 0; mem[0x5D] = ((mem[0x5D] << 1) | c) & 0xFF; setZN(mem[0x5D]); }

  // --- pc 8B6C ---
  // $8B6C: EOR $5C06,X
  A = (A ^ mem[(0x5C06 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B6F ---
  // $8B6F: ROL $5D
  { const c = C ? 1 : 0; C = (mem[0x5D] & 0x80) !== 0; mem[0x5D] = ((mem[0x5D] << 1) | c) & 0xFF; setZN(mem[0x5D]); }

  // --- pc 8B70 ---
  // $8B70: EOR $63B1,X
  A = (A ^ mem[(0x63B1 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B73 ---
  // $8B73: AND #$07
  A = (A & 0x7) & 0xFF;
  setZN(A);

  // --- pc 8B75 ---
  // $8B75: ORA $5C
  A = (A | zp(0x5C)) & 0xFF;
  setZN(A);

  // --- pc 8B77 ---
  // $8B77: STA $5C
  mem[0x5C] = A;

  // --- pc 8B79 ---
  // $8B79: ASL $5C
  C = (mem[0x5C] & 0x80) !== 0; mem[0x5C] = (mem[0x5C] << 1) & 0xFF; setZN(mem[0x5C]);

  // --- pc 8B7B ---
  // $8B7B: ROL $5D
  { const c = C ? 1 : 0; C = (mem[0x5D] & 0x80) !== 0; mem[0x5D] = ((mem[0x5D] << 1) | c) & 0xFF; setZN(mem[0x5D]); }

  // --- pc 8B7C ---
  // $8B7C: EOR $5C06,X
  A = (A ^ mem[(0x5C06 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B7F ---
  // $8B7F: ROL $5D
  { const c = C ? 1 : 0; C = (mem[0x5D] & 0x80) !== 0; mem[0x5D] = ((mem[0x5D] << 1) | c) & 0xFF; setZN(mem[0x5D]); }

  // --- pc 8B80 ---
  // $8B80: EOR $5DA5,X
  A = (A ^ mem[(0x5DA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B82 ---
  // $8B82: EOR $0C29,X
  A = (A ^ mem[(0xC29 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B85 ---
  // $8B85: BNE $8B93
  if (!Z) { PC = 0x8B93; return; }

  // --- pc 8B87 ---
  // $8B87: LDA $7B
  A = zp(0x7B);
  setZN(A);

  // --- pc 8B89 ---
  // $8B89: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8B8A ---
  // $8B8A: ASL
  C = (A & 0x80) !== 0; A = (A << 1) & 0xFF; setZN(A);

  // --- pc 8B8D ---
  // $8B8D: AND #$04
  A = (A & 0x4) & 0xFF;
  setZN(A);

  // --- pc 8B8F ---
  // $8B8F: ORA $5D
  A = (A | zp(0x5D)) & 0xFF;
  setZN(A);

  // --- pc 8B90 ---
  // $8B90: EOR $5D85,X
  A = (A ^ mem[(0x5D85 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B92 ---
  // $8B92: EOR $5EA5,X
  A = (A ^ mem[(0x5EA5 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8B94 ---
  // $8B94: LSR $09C9,X
  C = (mem[(0x9C9 + X) & 0xFFFF] & 1) !== 0; mem[(0x9C9 + X) & 0xFFFF] = mem[(0x9C9 + X) & 0xFFFF] >>> 1; setZN(mem[(0x9C9 + X) & 0xFFFF]);

  // --- pc 8B96 ---
  // $8B96: ORA #$90
  A = (A | 0x90) & 0xFF;
  setZN(A);

  // --- pc 8B9F ---
  // $8B9F: LDA $5D
  A = zp(0x5D);
  setZN(A);

  // --- pc 8BA0 ---
  // $8BA0: EOR $0429,X
  A = (A ^ mem[(0x429 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8BA3 ---
  // $8BA3: BNE $8BAB
  if (!Z) { PC = 0x8BAB; return; }

  // --- pc 8BA4 ---
  // $8BA4: ASL $20
  C = (mem[0x20] & 0x80) !== 0; mem[0x20] = (mem[0x20] << 1) & 0xFF; setZN(mem[0x20]);

  // --- pc 8BA7 ---
  // $8BA7: BCC $8BF5
  if (!C) { PC = 0x8BF5; return; }

  // --- pc 8BAD ---
  // $8BAD: BCC $8B58
  if (!C) { PC = 0x8B58; return; }

  // --- pc 8BAF ---
  // $8BAF: ORA ($20,X)
  A = (A | mem[indX(0x20)]) & 0xFF;
  setZN(A);

  // --- pc 8BB3 ---
  // $8BB3: LDA $63
  A = zp(0x63);
  setZN(A);

  // --- pc 8BB5 ---
  // $8BB5: CLC
  C = false;

  // --- pc 8BB7 ---
  // $8BB7: ASL $85
  C = (mem[0x85] & 0x80) !== 0; mem[0x85] = (mem[0x85] << 1) & 0xFF; setZN(mem[0x85]);

  // --- pc 8BBA ---
  // $8BBA: LDA $64
  A = zp(0x64);
  setZN(A);

  // --- pc 8BBC ---
  // $8BBC: ADC #$00
  { const r = 0x0; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8BBD ---
  // $8BBD: BRK
  // BRK (halt for now)
  return;

  // --- pc 8BC0 ---
  // $8BC0: LDA $5E
  A = zp(0x5E);
  setZN(A);

  // --- pc 8BC1 ---
  // $8BC1: LSR $5FA6,X
  C = (mem[(0x5FA6 + X) & 0xFFFF] & 1) !== 0; mem[(0x5FA6 + X) & 0xFFFF] = mem[(0x5FA6 + X) & 0xFFFF] >>> 1; setZN(mem[(0x5FA6 + X) & 0xFFFF]);

  // --- pc 8BC4 ---
  // $8BC4: JSR $9DEE
  pushWord(PC + 2);
  PC = 0x9DEE;
  return;

  // --- pc 8BC6 ---
  // $8BC6: STA $63A5,X
  mem[(0x63A5 + X) & 0xFFFF] = A;

  // --- pc 8BC9 ---
  // $8BC9: CLC
  C = false;

  // --- pc 8BCB ---
  // $8BCB: CPX $7085
  C = X >= mem[0x7085];
  setZN((X - mem[0x7085]) & 0xFF);

  // --- pc 8BCD ---
  // $8BCD: BVS $8B74
  if (V) { PC = 0x8B74; return; }

  // --- pc 8BD0 ---
  // $8BD0: ADC $ED
  { const r = zp(0xED); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8BD1 ---
  // $8BD1: SBC $7185
  { const r = mem[0x7185] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8BD3 ---
  // $8BD3: ADC ($A9),Y
  { const r = mem[indY(0xA9)]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8BD5 ---
  // $8BD5: BRK
  // BRK (halt for now)
  return;

  // --- pc 8BD7 ---
  // $8BD7: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8BD9 ---
  // $8BD9: ORA ($B1,X)
  A = (A | mem[indX(0xB1)]) & 0xFF;
  setZN(A);

  // --- pc 8BDB ---
  // $8BDB: BVS $8C06
  if (V) { PC = 0x8C06; return; }

  // --- pc 8BDD ---
  // $8BDD: CPX #$85
  C = X >= 0x85;
  setZN((X - 0x85) & 0xFF);

  // --- pc 8BE0 ---
  // $8BE0: LDA ($70),Y
  A = mem[indY(0x70)];
  setZN(A);

  // --- pc 8BE1 ---
  // $8BE1: BVS $8C0C
  if (V) { PC = 0x8C0C; return; }

  // --- pc 8BE4 ---
  // $8BE4: TAX
  X = A; setZN(X);

  // --- pc 8BE5 ---
  // $8BE5: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 8BE7 ---
  // $8BE7: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8BE8 ---
  // $8BE8: LSR
  C = (A & 1) !== 0; A = A >>> 1; setZN(A);

  // --- pc 8BEA ---
  // $8BEA: RTS
  PC = pullWord() + 1;
  return;

  // --- pc 8BEC ---
  // $8BEC: ADC ($8A,X)
  { const r = mem[indX(0x8A)]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8BED ---
  // $8BED: TXA
  A = X; setZN(A);

  // --- pc 8BF2 ---
  // $8BF2: BVS $8B79
  if (V) { PC = 0x8B79; return; }

  // --- pc 8BF5 ---
  // $8BF5: LDA $62
  A = zp(0x62);
  setZN(A);

  // --- pc 8BF7 ---
  // $8BF7: AND #$C0
  A = (A & 0xC0) & 0xFF;
  setZN(A);

  // --- pc 8BF8 ---
  // $8BF8: CPY #$F0
  C = Y >= 0xF0;
  setZN((Y - 0xF0) & 0xFF);

  // --- pc 8BFA ---
  // $8BFA: PHA
  push(A);

  // --- pc 8BFC ---
  // $8BFC: RTI
  SET_FLAGS(pull());
  PC = pullWord();
  return;

  // --- pc 8BFE ---
  // $8BFE: ASL $C9,X
  C = (mem[(0xC9 + X) & 0xFF] & 0x80) !== 0; mem[(0xC9 + X) & 0xFF] = (mem[(0xC9 + X) & 0xFF] << 1) & 0xFF; setZN(mem[(0xC9 + X) & 0xFF]);

  // --- pc 8C01 ---
  // $8C01: BEQ $8C0C
  if (Z) { PC = 0x8C0C; return; }

  // --- pc 8C0B ---
  // $8C0B: STY $04A9
  mem[0x4A9] = Y;

  // --- pc 8C0E ---
  // $8C0E: LDX #$01
  X = 0x1;
  setZN(X);

  // --- pc 8C0F ---
  // $8C0F: ORA ($A4,X)
  A = (A | mem[indX(0xA4)]) & 0xFF;
  setZN(A);

  // --- pc 8C12 ---
  // $8C12: JMP $8C59
  PC = 0x8C59;
  return;

  // fall-through end

}



// func_8C59.ts
// Address range: $8C59-$8C63
// Instructions: 6
// Total hits: 6
// First seen at frame: 7


export function func8C59(): void {
  // hits: 6
  // pc range: $8C59-$8C63
  // --- pc 8C59 ---
  // $8C59: STA $6D
  mem[0x6D] = A;

  // --- pc 8C5A ---
  // $8C5A: ADC $6E86
  { const r = mem[0x6E86]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8C5C ---
  // $8C5C: ROR $6F84
  { const c = C ? 0x80 : 0; C = (mem[0x6F84] & 1) !== 0; mem[0x6F84] = (mem[0x6F84] >>> 1) | c; setZN(mem[0x6F84]); }

  // --- pc 8C5F ---
  // $8C5F: LDA $5E
  A = zp(0x5E);
  setZN(A);

  // --- pc 8C60 ---
  // $8C60: LSR $07C9,X
  C = (mem[(0x7C9 + X) & 0xFFFF] & 1) !== 0; mem[(0x7C9 + X) & 0xFFFF] = mem[(0x7C9 + X) & 0xFFFF] >>> 1; setZN(mem[(0x7C9 + X) & 0xFFFF]);

  // --- pc 8C63 ---
  // $8C63: BCC $8C89
  if (!C) { PC = 0x8C89; return; }

  // fall-through end

}



// func_8C88.ts
// Address range: $8C88-$8C92
// Instructions: 5
// Total hits: 5
// First seen at frame: 7


export function func8C88(): void {
  // hits: 5
  // pc range: $8C88-$8C92
  // --- pc 8C88 ---
  // $8C88: STY $5EA4
  mem[0x5EA4] = Y;

  // --- pc 8C8A ---
  // $8C8A: LSR $5FA6,X
  C = (mem[(0x5FA6 + X) & 0xFFFF] & 1) !== 0; mem[(0x5FA6 + X) & 0xFFFF] = mem[(0x5FA6 + X) & 0xFFFF] >>> 1; setZN(mem[(0x5FA6 + X) & 0xFFFF]);

  // --- pc 8C8D ---
  // $8C8D: JSR $8E15
  pushWord(PC + 2);
  PC = 0x8E15;
  return;

  // --- pc 8C8F ---
  // $8C8F: STX $72A5
  mem[0x72A5] = X;

  // --- pc 8C92 ---
  // $8C92: BEQ $8CA5
  if (Z) { PC = 0x8CA5; return; }

  // fall-through end

}



// func_8CA5.ts
// Address range: $8CA5-$8CB7
// Instructions: 10
// Total hits: 10
// First seen at frame: 8


export function func8CA5(): void {
  // hits: 10
  // pc range: $8CA5-$8CB7
  // --- pc 8CA5 ---
  // $8CA5: LDA $75
  A = zp(0x75);
  setZN(A);

  // --- pc 8CA6 ---
  // $8CA6: ADC $85,X
  { const r = zp((0x85 + X) & 0xFF); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8CA8 ---
  // $8CA8: STX $76A5
  mem[0x76A5] = X;

  // --- pc 8CAA ---
  // $8CAA: ROR $85,X
  { const c = C ? 0x80 : 0; C = (mem[(0x85 + X) & 0xFF] & 1) !== 0; mem[(0x85 + X) & 0xFF] = (mem[(0x85 + X) & 0xFF] >>> 1) | c; setZN(mem[(0x85 + X) & 0xFF]); }

  // --- pc 8CAD ---
  // $8CAD: LDA #$00
  A = 0x0;
  setZN(A);

  // --- pc 8CAE ---
  // $8CAE: BRK
  // BRK (halt for now)
  return;

  // --- pc 8CB1 ---
  // $8CB1: STA $45
  mem[0x45] = A;

  // --- pc 8CB2 ---
  // $8CB2: EOR $85
  A = (A ^ zp(0x85)) & 0xFF;
  setZN(A);

  // --- pc 8CB5 ---
  // $8CB5: LDX $77
  X = zp(0x77);
  setZN(X);

  // --- pc 8CB7 ---
  // $8CB7: JMP $C4B9
  PC = 0xC4B9;
  return;

  // fall-through end

}



// func_8E15.ts
// Address range: $8E15-$8E40
// Instructions: 22
// Total hits: 48
// First seen at frame: 7


export function func8E15(): void {
  // hits: 48
  // pc range: $8E15-$8E40
  // --- pc 8E15 ---
  // $8E15: STY $6C
  mem[0x6C] = Y;

  // --- pc 8E16 ---
  // $8E16: JMP ($6B86)
  // JMP ($6B86)
  PC = mem[0x6B86] | (mem[0x6B87] << 8);
  return;

  // --- pc 8E19 ---
  // $8E19: LDA $63
  A = zp(0x63);
  setZN(A);

  // --- pc 8E1B ---
  // $8E1B: STA $65
  mem[0x65] = A;

  // --- pc 8E1C ---
  // $8E1C: ADC $A5
  { const r = zp(0xA5); const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E1F ---
  // $8E1F: STA $66
  mem[0x66] = A;

  // --- pc 8E20 ---
  // $8E20: ROR $A5
  { const c = C ? 0x80 : 0; C = (mem[0xA5] & 1) !== 0; mem[0xA5] = (mem[0xA5] >>> 1) | c; setZN(mem[0xA5]); }

  // --- pc 8E23 ---
  // $8E23: STA $ED
  mem[0xED] = A;

  // --- pc 8E24 ---
  // $8E24: SBC $5CA5
  { const r = mem[0x5CA5] ^ 0xFF; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E27 ---
  // $8E27: STA $73
  mem[0x73] = A;

  // --- pc 8E29 ---
  // $8E29: LDA $5D
  A = zp(0x5D);
  setZN(A);

  // --- pc 8E2A ---
  // $8E2A: EOR $7485,X
  A = (A ^ mem[(0x7485 + X) & 0xFFFF]) & 0xFF;
  setZN(A);

  // --- pc 8E2D ---
  // $8E2D: LDY #$00
  Y = 0x0;
  setZN(Y);

  // --- pc 8E2E ---
  // $8E2E: BRK
  // BRK (halt for now)
  return;

  // --- pc 8E31 ---
  // $8E31: JSR $8EF0
  pushWord(PC + 2);
  PC = 0x8EF0;
  return;

  // --- pc 8E33 ---
  // $8E33: STX $5CA5
  mem[0x5CA5] = X;

  // --- pc 8E36 ---
  // $8E36: TAX
  X = A; setZN(X);

  // --- pc 8E37 ---
  // $8E37: CLC
  C = false;

  // --- pc 8E39 ---
  // $8E39: ADC $5C85
  { const r = mem[0x5C85]; const sum = A + r + (C ? 1 : 0);
    V = ((A ^ sum) & (r ^ sum) & 0x80) !== 0;
    C = sum > 0xFF; A = sum & 0xFF; setZN(A); }

  // --- pc 8E3C ---
  // $8E3C: TXA
  A = X; setZN(A);

  // --- pc 8E3F ---
  // $8E3F: AND #$20
  A = (A & 0x20) & 0xFF;
  setZN(A);

  // --- pc 8E40 ---
  // $8E40: JSR $15F0
  pushWord(PC + 2);
  PC = 0x15F0;
  return;

  // fall-through end

}

